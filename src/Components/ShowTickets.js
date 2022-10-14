import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";

const ShowTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sortUrgency, setUrgency] = useState("");
  const [sortAuthority, setAuthority] = useState("");
  const [authorities, setAuthorities] = useState([]);

  const navigate = useNavigate()

  async function getTickets() {
    const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/tickets";
    axios
      .get(api)
      .then((response) => (console.log(response), setTickets(Object.keys(response.data.tickets.Items).map((key) => response.data.tickets.Items[key])), console.log(tickets)))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getTickets();
  }, []);

  async function getAuthorities() {
    const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/auth/all";
    axios
      .get(api)
      .then((response) => (console.log(response), setAuthorities(Object.keys(response.data.auths.Items).map((key) => response.data.auths.Items[key])), console.log(response.data.auths.Items)))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getAuthorities();
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

  const sortByAuthority = (e) => {

  }





  return (
    <div className="home-left">
      <h2>Current Issues in your Community</h2>
      <div className="container-Auth">
        <h3>Sort Feed</h3>
        <label>Sort by urgency:</label>
        <span> </span>
        <select
          required
          //value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value={sortUrgency} hidden>
            Select urgency
          </option>
          <option value={"Extremely urgent"}>Extremely urgent</option>
          <option value={"Very urgent"}>Very urgent</option>
          <option value={"Moderately urgent"}>moderately urgent</option>
          <option value={"Not urgent"}>Not urgent</option>
        </select><br></br>
        <label>Sort by Authority:</label>
        <span> </span>
        <select
          required
          id="group_name"
          //value={urgency}
          onChange={(e) => setAuthority(e.target.value)}
        >
          <option value={sortAuthority} hidden>
            Authority/Company
          </option>
          {authorities.map((a) => (
            <option value={a.Authority}>{a.Authority}</option>
          ))}
        </select>

      </div>
      <div>
        {tickets.map((t) => (
          <>
            {t.Progress == "Issue closed" ? (
              <></>
            ) : (
              <>
                {(sortAuthority === "" && sortUrgency === "") ? (
                  <>
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
                  </>
                ) : (
                  <>
                    {(t.Authority == sortAuthority && sortUrgency == "") ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        {(sortAuthority == "" && sortUrgency == t.urgency) ? (
                          <>
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
                                    <>
                                    </>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            {(sortAuthority == t.Authority && sortUrgency == t.urgency) ? (
                              <>
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
                                        <>
                                        </>
                                      )}
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>
                    )}

                  </>
                )}

              </>
            )}

          </>
        ))}
      </div>
    </div >
  )
}

export default ShowTickets

