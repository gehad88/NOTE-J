import React from "react";
import "./Styles/Trash.css";
import Swal from "sweetalert2";

function Note({ note }) {
  const deleteNote = () => {
    Swal.fire({
      title: `Are You Sure Want To Delete ${note.title} ?`,
      showCancelButton: true,
    }).then((data) => {
      if (data.isConfirmed) {
        fetch(`https://localhost:44317/api/Note/${note.noteId}`, {
          method: "DELETE",
        }).then((res) => res.json());
      }
    });
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
          <a href="/">Read More</a>
          <button
            onClick={deleteNote}
            style={{ border: "none" }}
            className="trash"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="40"
              style={{ fill: "red" }} // Set the fill color to red
              className="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;
