import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowTicketsAuthority = () => {
    const [tickets, setTickets] = useState([]);
    const [ticket, setTicket] = useState("");
    const [date, setDate] = useState("");

    async function getTickets() {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets/auth-tickets";
        axios
            .get(api, { params: { Authority: JSON.parse(localStorage.getItem("name")) } })
            .then((response) => (console.log(response), setTickets(Object.keys(response.data.Authoritytickets.Items).map((key) => response.data.Authoritytickets.Items[key])), console.log(tickets)))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getTickets();
    }, []);

    function isBeforeToday(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayFixed = new Date(date);

        return dayFixed < today;

    }

    function setProgress(ticket) {
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: ticket,
            updateKey: "Progress",
            updateValue: 'Active'
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);
    }

    const submitDate = (e) => {
        if (date === "") {
            Swal.fire("Please choose a day you are going to fix this issue", "Try again!", "warning");
            return;
          }
          if (isBeforeToday(date)) {
            Swal.fire("Please choose an appropriate day", "Try again!", "warning");
            return;
          }
          const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
          const data = {
            TicketNo: ticket,
            updateKey: "Progress",
            updateValue: 'Day to commence fixing this issue is ' + date
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response), setTickets(Object.keys(response.data.tickets.Items).map((key) => response.data.tickets.Items[key])), window.location.reload()))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);
       
    }

    function setProgressDone(ticket) {
        console.log(ticket)
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
        const data = {
            TicketNo: ticket,
            updateKey: "Progress",
            updateValue: 'Authority has fixed the issue'
        }
        axios
            .patch(api, data)
            .then((response) => (console.log(response)))
            .catch((error) => console.log(error));
        setTimeout(function () { window.location.reload() }, 500);

    }

    return (
        <div className="container-Auth">
            <h2>Current Issues in your Community</h2>
            <div>
                {tickets.map((t) => (
                    <div className="container-Auth">
                        <label className="issue-content">{t.Time}</label>
                        <h3 >
                            {t.heading}
                        </h3>

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
                        <Link
                            to={
                                "/TicketAuth"
                            }
                            state={{ ticketNo: t.TicketNo }}
                        >view issue</Link><br></br>
                        {t.Progress === "Not attended to" ? (
                            <>
                                <button type="submit" className="btn" onClick={() => setProgress(t.TicketNo)}>Take issue</button>
                            </>
                        ) : (
                            <></>
                        )}
                        {t.Progress === "Active" ? (
                            <>
                                <label>Set the day to start fixing this issue: </label>
                                <input
                                    type='date'
                                    placeholder='Add heading...'
                                    value={date}
                                    onChange={(e) => (setDate(e.target.value),setTicket(t.TicketNo))}
                                /><br></br>
                                <button type="submit" className="btn" onClick={() => submitDate()}>Set Day</button>
                            </>
                        ) : (
                            <></>
                        )}
                        {t.Progress.includes("Day") ? (
                            <>
                                <br></br>
                                <button type="submit" className="btn" onClick={() => setProgressDone(t.TicketNo)}>Issue fixed</button>
                            </>
                        ) : (
                            <></>
                        )}
                        {t.Progress === "Community member is unsatisfied with the issue solution" ? (
                                    <>
                                        <button type="submit" className="btn" onClick={() => setProgress(t.TicketNo)}>Retake Issue</button>
                                    </>
                                ) : (
                                    <></>
                                )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowTicketsAuthority

