import React, { useEffect, useState } from "react";
import "../Styles/Trash.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import NoteDetails from "./NoteDetails.js";
import "../Styles/ReadMoreButton.css";

function Note({ note, onDeleteNote, onUpdateNotes }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  useEffect(() => {
    const userIdCookie = Cookies.get("userId");
    setIsUserSignedIn(!!userIdCookie);
  }, []);

  const navigate = useNavigate();

  if (!isUserSignedIn) {
    navigate("/NotFound");
    return null;
  }

  const deleteNote = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`https://localhost:44317/api/Note/${note.noteId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            onDeleteNote(note.noteId);
          })
          .catch((error) => {
            console.error("Error deleting note:", error);
          });
      }
    });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.activeElement.blur();
  };

  return (
    <div className="box">
      <div className="img-box">
        <img src="images/b1.jpg" alt="" />
      </div>
      <div className="detail-box">
        <h5>{note.title}</h5>
        <p>
          {note.content.length > 40
            ? note.content.substring(0, 40) + "..."
            : note.content}
        </p>
        <div className="button-container">
          <button className="button-5" onClick={openPopup}>
            Read More
          </button>
          <button
            onClick={deleteNote}
            style={{ border: "none" }}
            className="trash"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="40"
              style={{ fill: "red" }}
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
        <NoteDetails
          note={note}
          isOpen={isPopupOpen}
          onClose={closePopup}
          onUpdateNote={onUpdateNotes}
        />
      </div>
    </div>
  );
}

export default Note;
