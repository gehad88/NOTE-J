import React, { Fragment, useEffect, useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Note from "../Component/Note";

function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("https://localhost:44317/api/Note/")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  // Function to handle adding a new note
  const handleAddNote = () => {
    // You can implement the logic to add a new note here
    // This can involve opening a modal or redirecting to a new note creation page
    // For simplicity, I'll just show an alert for demonstration purposes
    alert("Implement your logic to add a new note here.");
  };

  return (
    <Fragment>
      <Menu />
      <section className="blog_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Your Notes</h2>
          </div>
          <div className="row">
            <div className="col-md-12">
              <button onClick={handleAddNote} className="btn btn-primary">
                Add Note
              </button>
            </div>
          </div>
          <div className="row">
            {notes.map((note) => (
              <div key={note.noteId} className="col-md-6 col-lg-4">
                <Note note={note} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </Fragment>
  );
}

export default Notes;
