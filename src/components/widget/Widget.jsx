import React, { useState } from "react";
import Comment from "../comment/Comment";

import "./widget.css";

export default function Widget() {
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState([]);

  function addReply(commentId, replyText) {
    let commentsWithNewReply = [...comments];
    addComment(commentsWithNewReply, commentId, replyText);
    setComments(commentsWithNewReply);
  }

  function deleteComment(commentId) {
    const updatedComments = removeComment(comments, commentId);
    setComments(updatedComments);
  }

  function removeComment(commentsArray, id) {
    return commentsArray.filter((comment) => {
      if (comment.id === id) {
        return false;
      }

      comment.children = removeComment(comment.children, id);
      return true;
    });
  }

  function newComment(text) {
    return {
      id: Date.now(),
      display: text,
      children: [],
    };
  }

  function addComment(comments, parentId, text) {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      addComment(comment.children, parentId, text);
    }
  }

  return (
    <>
      <h2 className="widget-header">Common Widgets</h2>
      <div className="widget">
        <input
          type="text"
          placeholder="Enter your Comment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setComments([newComment(comment), ...comments]);
            setComment("");
          }}
          disabled={comment.trim() === ""}
        >
          Submit
        </button>
      </div>
      <ul className="widget-list" style={{ listStyle: "none" }}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        ))}
      </ul>
    </>
  );
}
