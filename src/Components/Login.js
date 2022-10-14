import { useState, React } from "react";
import Swal from "sweetalert2";
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignupUser = () => {
        window.location.pathname = "/signupcom";
    };

    function loginAccountCom(response,name) {
        setTimeout(function(){
            
            if (response === "SUCCESS") {
                const userEmail = JSON.stringify(email);
                const userName = JSON.stringify(name);
                localStorage.setItem("email", userEmail);
                localStorage.setItem("name", userName);
            window.location.pathname = "/home";
        } else {
            Swal.fire("Email or password incorrect");
            return;
        }},500);
    }

    function loginAccountAuth(response,name) {
        setTimeout(function(){
            
            if (response === "SUCCESS") {
                const userEmail = JSON.stringify(email);
                const authName = JSON.stringify(name);
                localStorage.setItem("email", userEmail);
                localStorage.setItem("name", authName);
            window.location.pathname = "/homeAuth";
        } else {
            Swal.fire("Email or password incorrect");
            return;
        }},500);
    }


    const handleHome = (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire("Please enter your email");
            return;
        }
        if (!email.includes("@")) {
            Swal.fire("Invalid email. There is an \"@\" missing");
            return;
        } else if (email.length > 1) {
            if (email.substring(0, email.indexOf("@")) === "") {
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

        const data = {
            email: email,
            password: password
        }

        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/users/login";
        axios
            .get(api, {params: {email: email,
                password: password}})
            .then((response) => (console.log(response.data.Message),loginAccountCom(response.data.Message,response.data.Name)))
            .catch((error) => console.log(error));
            
    };

    const handleHomeAuth = (e) => {
        e.preventDefault();

        if (!email) {
            Swal.fire("Please enter your email");
            return;
        }
        if (!email.includes("@")) {
            Swal.fire("Invalid email. There is an \"@\" missing");
            return;
        } else if (email.length > 1) {
            if (email.substring(0, email.indexOf("@")) === "") {
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

        const api = "https://ohdkylfkx2.execute-api.us-east-1.amazonaws.com/testUser/auth";
        axios
            .get(api, {params: {Email: email,
                Password: password}})
            .then((response) => (console.log(response.data.Message),loginAccountAuth(response.data.Message,response.data.Name)))
            .catch((error) => console.log(error));
            
    };



    

    return (
        <div>
            <div className="login-Left">
                <header className="login-header">FixedIt</header>
            </div>
            <div className='loginCon'>
                <form onSubmit={handleHome}>
                    <h1>Login Page</h1>

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
                </form>
                <label>Login</label>
                <div>
                    <button type="submit" className="btn" onClick={handleHome}>Community Member </button>
                    <button type="submit" className="btn" onClick={handleHomeAuth}>Authority/Company </button>
                </div>
                <label>Sign Up</label>
                <div>
                    <button className="btn" onClick={handleSignupUser}>Community member</button>
                </div>
            </div>
        </div>
    )
}

export default Login;