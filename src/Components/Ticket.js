import '../App.css';
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import ShowMap from './ShowMap';
import { Link, useLocation } from "react-router-dom";

function Ticket() {

    const [ticket, setTicket] = useState([]);
    const [comments, setComments] = useState("");
    const [commentsArray, setCommentsArray] = useState([]);
    const [comment, setComment] = useState("");

    const handleLogout = () => {
        window.location.pathname = "/";
    };

    const handleProfile = () => {
        window.location.pathname = "/Profile";
    };

    const handleHome = () => {
        window.location.pathname = "/home";
    };

    const handleTickets = () => {
        window.location.pathname = "/userTickets";
    };

    const submitComment = (e) => {
        const message = comments + "\n" + JSON.parse(localStorage.getItem("name")) + ": " + comment;
        setAddComment(message);

    };

    function setUnsatisfied() {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: state.state.ticketNo,
            updateKey: "Progress",
            updateValue: 'Community member is unsatisfied with the issue solution'
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);
    }

    function setSatisfied() {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: state.state.ticketNo,
            updateKey: "Progress",
            updateValue: 'Issue closed'
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);
    }

    function setAddComment(comm) {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: state.state.ticketNo,
            updateKey: "Comments",
            updateValue: comm
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);

    };


    const state = useLocation();

    async function getTicket() {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets/ticket";
        axios
            .get(api, { params: { TicketNo: state.state.ticketNo } })
            .then((response) => (console.log(response.data.Ticket.Items[0].Comments), setTicket(response.data.Ticket.Items), setComments(response.data.Ticket.Items[0].Comments), setCommentsArray(response.data.Ticket.Items[0].Comments.split(/\r?\n/))))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getTicket();
    }, []);

    return (
        <>
            <nav id="navbar" >
                <div className="nav-wrapper">
                    <div >
                        <h1 className="logo" onClick={handleHome}>FixedIt</h1>
                    </div>
                    <ul >
                        <li >
                            <label onClick={handleProfile}>
                                Profile  {" "}
                            </label>
                        </li>
                        <li >
                            <label onClick={handleTickets}>
                                Your Tickets  {" "}
                            </label>
                        </li>
                        <li>
                            <label onClick={handleLogout}>
                                Logout  {" "}
                            </label>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="App">

                {ticket.map((t) => (
                    <>
                        <div className="container-Auth">
                            <div className="ticket-left">
                                <h2 >
                                    {t.heading}
                                </h2>
                                <label >{t.description}</label><br></br>
                                {t.urgency === "Extremely urgent" ? (
                                    <>
                                        <label >Urgency: </label>
                                        <label className="Ext-urgent">{t.urgency}</label><br></br>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {t.urgency === "Very urgent" ? (
                                    <>
                                        <label >Urgency: </label>
                                        <label className="very-urgent">{t.urgency}</label><br></br>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {t.urgency === "Not urgent" ? (
                                    <>
                                        <label >Urgency: </label>
                                        <label className="not-urgent">{t.urgency}</label><br></br>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {t.urgency === "Moderately urgent" ? (
                                    <>
                                        <label >Urgency: </label>
                                        <label className="mod-urgent">{t.urgency}</label><br></br>
                                    </>
                                ) : (
                                    <></>
                                )}
                                <label >Authority: {t.Authority}</label><br></br>
                                <label>Progress: {t.Progress}</label><br></br>
                                {t.email == JSON.parse(localStorage.getItem("email")) ? (
                                    <>
                                    {t.Progress == "Authority has fixed the issue" ? (
                                        <>
                                        <label>Are you satisified with the solution?</label><br></br>
                                        <button type="submit" className="btn" onClick={() => setSatisfied()}>Yes</button>
                                        <button type="submit" className="btn" onClick={() => setUnsatisfied()}>No</button>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="ticket-right">
                                <label className="issue-content">Day Posted: {t.Time}</label><br></br>
                                {t.latitude != null ? (
                                    <>
                                        <ShowMap lat={t.latitude} lng={t.longitude}></ShowMap><br></br>
                                        <label className="ticket-right">Location</label>
                                    </>
                                ) : (
                                    <></>
                                )}

                            </div>

                            <div className="ticket-chat" >
                                <label >Chat</label>
                                <div>
                                    <div className="container-Chat">

                                    {commentsArray.map((c) => (
                                            <>
                                                {c != "" ? (
                                                    <>
                                                    {c.startsWith(JSON.parse(localStorage.getItem("name"))) ? (
                                                        <><label className='commentsYou'>{c}</label><br></br><label></label><br></br></>
                                                    ) : (
                                                        <><label className='commentsOther'>{c}</label><br></br><label></label><br></br></>
                                                    )}
                                                        
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

                            </div>
                        </div>
                    </>
                ))}

            </div>

        </>
    );


}

export default Ticket;