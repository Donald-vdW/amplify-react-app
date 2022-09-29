import React from "react"

const Email = ({
    onChange,
    value
}) =>
    <div className="form-control">
        <label htmlFor="username">
            Username:
        </label>
        <input
            id="username"
            type="text"
            onChange={onChange}
            maxlength="25"
            value={value}
            placeholder="username"
            required />
    </div>

const Password = ({
    onChange,
    value
}) =>
    <div className="form-control">
        <label htmlFor="password">
            Password:
        </label>
        <input
            id="password"
            type="password"
            onChange={onChange}
            maxlength="25"
            value={value}
            placeholder="password"
            required />
    </div>

const handleSignupUser = () => {
    window.location.pathname = "/signupcom";
};

const handleSignupAuthority = () => {
    window.location.pathname = "/signupAuth";
};

const handleHome = () => {
    window.location.pathname = "/";
};

const handleHomeAuth = () => {
    window.location.pathname = "/homeAuth";
};

const Edit = ({
    onSubmit,
    children,
}) =>
    <div className="form-control">
        <form onSubmit={onSubmit}>
            {children}
            <div className="form-control-check">
                <label for="rememberMe">Remember me</label><input type="checkbox" id="rememberMe" />
            </div>
            <label>Login</label>
            <div>
                <button type="submit" className="btn" onClick={handleHome}>Community Member </button>
                <button type="submit" className="btn" onClick={handleHomeAuth}>Authority/Company </button>
            </div>
            <label>Sign Up</label>
            <div>
                <button className="btn" onClick={handleSignupUser}>Community member</button>
                <button className="btn" onClick={handleSignupAuthority}>Authority/Company</button>

            </div>

        </form>
    </div>

const Profile = ({
    onSubmit,
    email,
    password,
}) =>
    <div className="form-control">
        <form onSubmit={onSubmit}>
            <h1>Successfully Logged in</h1>
            <div className="email">{email}</div>
            <div className="password">{password}</div>

        </form>
    </div>

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        active: 'edit',
    }

    editEmail = e => {
        const email = e.target.value;
        this.setState({
            email,
        });
    }

    editPassword = e => {
        const password = e.target.value;
        this.setState({
            password,
        });
    }

    render() {
        const {
            email,
            password,
            active } = this.state;

        return (
            <div >
                <div className="login-Left">
                    <header className="login-header">FixedIt</header>

                </div>
                <div className='loginCon'>
                    <header className="login-leftheader">Login</header>

                    {(active === 'edit') ? (

                        <Edit onSubmit={this.handleSubmit}>
                            <Email onChange={this.editEmail} value={email} />
                            <Password onChange={this.editPassword} value={password} />
                        </Edit>


                    ) : (
                        <Profile
                            onSubmit={this.handleSubmit}
                            email={email}
                            password={password}
                        />)}

                </div>
            </div>
        )
    }
}

export default Login;