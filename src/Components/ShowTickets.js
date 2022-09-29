import { useState, useEffect} from "react";
import React from "react";
import axios from 'axios';

const ShowTickets = () => {
  const [ticket, setTicket] = useState([]);

  async function getTickets() {
    const api = "https://6mby5e4aqe.execute-api.us-east-1.amazonaws.com/ticket/tickets";
    const data = {
      TicketNo: 10003
    }
      axios
        .get(api, data)
        .then((response) => (console.log(response),setTicket(Object.keys(response.data.tickets.Items).map((key) => response.data.tickets.Items[key])),console.log(ticket)))
        .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div className="home-left">
      <h2>Current Issues in your Community</h2>
      <div>
        {ticket.map((t) => ( 
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
          <label>Progress: {t.Progress}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowTickets

