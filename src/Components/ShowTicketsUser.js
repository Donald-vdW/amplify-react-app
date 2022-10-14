import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";

const ShowTicketsUser = () => {
  const [ticket, setTicket] = useState([]);

  async function getTickets() {
    const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets/user-tickets";
    axios
      .get(api, { params: { email: JSON.parse(localStorage.getItem("email")) } })
      .then((response) => (console.log(response), setTicket(Object.keys(response.data.usertickets.Items).map((key) => response.data.usertickets.Items[key])), console.log(ticket)))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTickets();
  }, []);

  function setUnsatisfied(ticketNo) {
    const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
    const data = {
      TicketNo: ticketNo,
      updateKey: "Progress",
      updateValue: 'Community member is unsatisfied with the issue solution'
    }
    axios
      .patch(api, data)
      .then((response) => (console.log(response)))
      .catch((error) => console.log(error));
    setTimeout(function () { window.location.reload() }, 500);
  }

  function setSatisfied(ticketNo) {
    const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
    const data = {
      TicketNo: ticketNo,
      updateKey: "Progress",
      updateValue: 'Issue closed'
    }
    axios
      .patch(api, data)
      .then((response) => (console.log(response)))
      .catch((error) => console.log(error));
    setTimeout(function () { window.location.reload() }, 500);
  }



  return (
    <div className="container-Auth">
      <h2>Issues You Have Posted</h2>
      <div>
        {ticket.map((t) => (
          <div className="container-Auth">
            <label className="issue-content">Day Posted: {t.Time}</label>
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
                "/Ticket"
              }
              state={{ ticketNo: t.TicketNo }}
            >view issue</Link><br></br>
            {t.email == JSON.parse(localStorage.getItem("email")) ? (
              <>
                {t.Progress == "Authority has fixed the issue" ? (
                  <>
                    <label>Are you satisified with the solution?</label><br></br>
                    <button type="submit" className="btn" onClick={() => setSatisfied(t.TicketNo)}>Yes</button>
                    <button type="submit" className="btn" onClick={() => setUnsatisfied(t.TicketNo)}>No</button>
                  </>
                ) : (
                  <></>
                )}
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

export default ShowTicketsUser

