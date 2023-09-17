import React from "react";

function Note({ note }) {
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
        <a href="/">Read More</a>
      </div>
    </div>
  );
}

export default Note;
