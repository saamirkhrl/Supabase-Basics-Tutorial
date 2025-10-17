import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import supabaseClient from "../supabaseClient";

function Note() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchNote() {
      const { data, error } = await supabaseClient
        .from("notes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.error(error);
      else {
        setNote(data);
        setContent(data.content || "");
      }
    }

    fetchNote();
  }, [id]);

  async function saveNote() {
    setSaving(true);
    const { error } = await supabaseClient
      .from("notes")
      .update({ content })
      .eq("id", id);

    if (error) console.error(error);
    setSaving(false);
  }

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h2>{note.title}</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
      />

      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={saveNote} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default Note;
