import { useState, useEffect, Component } from "react";
import React from "react";
import axios from 'axios';
import Swal from "sweetalert2";

export const AddTicket = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [progress, setProgress] = useState("");
  const [location, setLocation] = useState([]);
  const [photo, setPhoto] = useState("");
  const [authority, setAuthority] = useState("");
  const [community, setCommunity] = useState("");
  const [urgency, setUrgency] = useState("");

  function setIssueLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude])
      },
      (err) => {
        console.log(err);
      }
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (!description) {
      Swal.fire("Please include an issue description", "Try again!", "warning");
      return;
    }
    if (!heading) {
      Swal.fire("Please include an issue description", "Try again!", "warning");
      return;
    }
    if (location[0] != null) {
      if (
        !/^[+-]?(([1-8]?[0-9])(\.[0-9]{1,12})?|90(\.0{1,9})?)$/.test(
          location[0].toString()
        )
      ) {
        Swal.fire(
          "Please include an appropriate latitude",
          "Try again!",
          "warning"
        );
        return;
      }
    }
    if (location[1] != null) {
      if (
        !/^[+-]?(([1-8]?[0-9])(\.[0-9]{1,12})?|90(\.0{1,9})?)$/.test(
          location[1].toString()
        )
      ) {
        Swal.fire(
          "Please include an appropriate longitude",
          "Try again!",
          "warning"
        );
        return;
      }
    }
    if (authority === "") {
      Swal.fire("Please select an Authority/Company that must respond to this issue", "Try again!", "warning");
      return;
    }

    const data = {
      TicketNo: 10003,
      email: "communitymember@email.com",
      heading: heading,
      description: description,
      urgency: urgency,
      Authority: authority,
      latitude: location[0],
      longitude: location[1]
    }

      const api = "https://6mby5e4aqe.execute-api.us-east-1.amazonaws.com/ticket/tickets";
      axios
        .post(api, data)
        .then((response) => (console.log(response),window.location.reload()))
        .catch((error) => console.log(error));

  };


  return (
    <div className='home-right'>
      <h2>Report an Issue</h2>
      <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
          <label>Heading: </label>
          <input
            type='text'
            placeholder='Add heading...'
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <label>Description: </label>
          <input
            type='text'
            placeholder='Add description...'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='form-control form-control-check'>
          <label>Share Location:</label>
          <input
            type='radio'
            name="location"
            onChange={() => setIssueLocation()}
          />
        </div>
        <div className="form-control">
          <label>Select urgency:</label>
          <span> </span>
          <select
            required
          //value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          >
            <option value={urgency} hidden>
              Select urgency
            </option>
            <option value={"Extremely urgent"}>Extremely urgent</option>
            <option value={"Very urgent"}>Very urgent</option>
            <option value={"Moderately urgent"}>moderately urgent</option>
            <option value={"Not urgent"}>Not urgent</option>
          </select>
        </div>
        <div className="form-control">
          <label>Select Authority/Company to take care of this issue:</label>
          <span> </span>
          <select
            required
            id="group_name"
            //value={urgency}
            onChange={(e) => setAuthority(e.target.value)}
          >
            <option value={authority} hidden>
              Authority/Company
            </option>
            <option value={"Road Works"}>Road Works</option>
            <option value={"Park People"}>Park People</option>
            <option value={"Water Works"}>Water Works</option>
          </select>
        </div>


        <div className="post-btn-div">
          <button
            className="btn"
            onClick={() => {
              onSubmit();
            }}
          >
            Post issue
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTicket;

