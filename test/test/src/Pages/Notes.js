import React, { Fragment, useEffect, useState } from "react";
import Menu from "../Component/Menu";
import Footer from "../Component/Footer";
import Note from "../Component/Note";
import AddNotePopup from "../Component/AddNotePopUp";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true); // Initialize with a default value

  useEffect(() => {
    fetch("https://localhost:44317/api/Note/")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [notes]);

  useEffect(() => {
    // Check if the user is signed in by reading the userId cookie
    const userIdCookie = Cookies.get("userId");
    setIsUserSignedIn(!!userIdCookie); // Convert the value to boolean
  }, []); // This effect runs only once on component mount

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

  // Use the useNavigate hook to programmatically navigate the user
  const navigate = useNavigate();

  // Check if the user is not signed in and redirect them to the login page
  if (!isUserSignedIn) {
    navigate("/Login");
    return null; // Return null to prevent rendering the rest of the component
  }

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
