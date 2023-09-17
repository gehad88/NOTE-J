import React, { Fragment, useEffect, useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Note from "../Component/Note";
import AddNotePopup from "../Component/AddNotePopUp";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetch("https://localhost:44317/api/Note/")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [notes]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const addNote = (newNote) => {
    // Define the logic to add a new note here
    // This function should handle the addition of the new note to your state or API
    // For example, you can update the 'notes' state with the new note
    setNotes([...notes, newNote]);
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
              <button className="btn btn-primary" onClick={openPopup}>
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
      <AddNotePopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        onAddNote={addNote}
      />
      <Footer />
    </Fragment>
  );
}

export default Notes;
