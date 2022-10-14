import React from 'react'
import { useState, useEffect, Component } from "react";
import axios from 'axios';
import Swal from "sweetalert2";

const Comment = ({com, ticket}) => {
    const [comments, setComments] = useState("");
    const [comment, setComment] = useState("");
    const [commentsArray, setCommentsArray] = useState([]);

    const submitComment = (e) => {
        const message = comments + "\n" + JSON.parse(localStorage.getItem("name")) + ": " + comment;
        setAddComment(ticket, message);

    };

    function setAddComment(ticket, comm) {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: ticket,
            updateKey: "Comments",
            updateValue: comm
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
            setTimeout(function () { window.location.reload() }, 500);
            
    };

    useEffect(() => {
        setComments(com);
        setCommentsArray(comments.split(/\r?\n/));
        console.log(comments)

    }, []);


    return (
        <div>
            <div className="container-Chat">
                          
                {commentsArray.map((c) => (
                    <>
                    {c != "" ? (
                        <>
                        <label>{c}</label><br></br>
                        </>
                    ) : (
                        <>
                        </>
                    )}
                    </>
                ))}
            </div>
            <div className='ticket-chat'>
                <div className='form-control'>
                    <input
                        type='text'
                        placeholder='Add comment...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="post-btn-div">
                    <button
                        className="btn"
                        onClick={() => {
                            submitComment();
                        }}
                    >
                        Post comment
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Comment;