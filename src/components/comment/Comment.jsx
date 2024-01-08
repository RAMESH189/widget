import React, { useState, useRef } from "react";
import "./comment.css";

export default function Comment({ comment, addReply, deleteComment }) {
  const [replyText, setReplyText] = useState("");
  const [replyBox, setReplyBox] = useState(false);
  const inputRef = useRef(null);

  return (
    <li key={comment.id}>
      <div className="comment-item">
        {comment.display}
        {!replyBox && (
          <div className="comment-buttons">
            <button
              className="comment-delete"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="comment-reply"
              onClick={() => {
                setReplyBox(true);
                setTimeout(() => inputRef.current.focus());
              }}
            >
              Reply
            </button>
          </div>
        )}
      </div>
      {replyBox && (
        <div className="comment-nest">
          <input
            ref={inputRef}
            onChange={(e) => {
              setReplyText(e.target.value);
            }}
            type="text"
            placeholder="Enter your comment"
          />

          <button
            type="button"
            className="save"
            onClick={() => {
              addReply(comment.id, replyText);
              setReplyBox(false);
              setReplyText("");
            }}
          >
            save
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => {
              setReplyBox(false);
              setReplyText("");
            }}
          >
            cancel
          </button>
        </div>
      )}
      {comment.children.length > 0 && (
        <ul style={{ listStyle: "none" }}>
          {comment.children.map((childComment) => (
            <Comment
              deleteComment={deleteComment}
              key={childComment.id}
              comment={childComment}
              addReply={addReply}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
