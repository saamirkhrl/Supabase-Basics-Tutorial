import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import supabaseClient from "./supabaseClient";

function App() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const { data: notes, error } = await supabaseClient
        .from("notes")
        .select("*")
        .order("created_at", { ascending: false });

      setNotes(notes);
      console.log(notes);
    }

    fetchNotes();
  }, []);

  async function createNote(e) {
    e.preventDefault();
    const { data: createData, error } = await supabaseClient
      .from("notes")
      .insert([title, ""]);
  }

  return (
    <>
      <div>{notes.length === 0 && <p>No notes..</p>}</div>
      <div>
        <form onSubmit={createNote}>
          <input type="text" placeholder="Title..." />
          <button onClick={createNote} type="submit">
            Create note
          </button>
        </form>
      </div>
    </>
  );
}

export default App;
