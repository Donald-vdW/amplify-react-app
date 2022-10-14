import { useState, React } from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const handleLogin = () => {
        window.location.pathname = "/";
      };

export const SignUpAuthority = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (!email) {
            Swal.fire("Please enter your email");
            return;
        }
        if (!email.includes("@")) {
            Swal.fire("Invalid email. There is an \"@\" missing");
            return;
        } else if (email.length > 1) {
            if (email.substring(0,email.indexOf("@")) === "") {
                Swal.fire("Invalid email. No characters found before the \"@\"");
                return;
            }
            if (email.indexOf("@") + 1 === email.length) {
                Swal.fire("Invalid email. No characters found after the \"@\"");
                return;
            }
        } else {
            Swal.fire("Invalid email. Email must consist out of more than an \"@\"");
            return;
        }

        if (!password) {
            Swal.fire("Please enter a password");
            return;
        }
        if (!repeatPassword) {
            Swal.fire("Please re-enter your password");
            return;
        }
        if (password !== repeatPassword) {
            Swal.fire("Passwords do not match");
            return;
        }

        const data = {
            email: email,
            password: password
        }
        
        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/auth";
        axios
            .post(api, data)
            .then((response) => (console.log(response),window.location.reload()))
            .catch((error) => console.log(error));

    };

    return (
        <div>
          <div className="login-Left">
            <header className="login-header">FixedIt</header>
          </div>
          <div className='loginCon'>
            <form onSubmit={onSubmit}>
              <h1>Authority Registration</h1>

              <div className="form-control">
                <label htmlFor="email">Email:</label>
                <input
                  type='text'
                  placeholder='Type email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label htmlFor="password">Password:</label>
                <input
                  type='password'
                  placeholder='Type password...'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label htmlFor="repeatPassword">Repeat Password:</label>
                <input
                  type='password'
                  placeholder='Repeat password...'
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>

              <button className="btn" onClick={() => onSubmit()}>
                Sign Up
              </button>
              <button className="btn" onClick={handleLogin}>
                Back
              </button>
            </form>
          </div>
        </div>
    )
}

export default SignUpAuthority;