import React from "react";

const handleLogin = () => {
    window.location.pathname = "/login";
  };

const Community = ({ onChange, value }) => (
    <div className="form-control">
        <label htmlFor="community">Community:</label>
        <input
            id="community"
            type="text"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="Type community you are a part of..."
            required
        />
    </div>
);

const Authority = ({ onChange, value }) => (
    <div className="form-control">
        <label htmlFor="name">Authority/Company name:</label>
        <input
            id="name"
            type="text"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="Type Authority/Company name..."
            required
        />
    </div>
);

const ActivationCode = ({ onChange, value }) => (
    <div className="form-control">
        <label htmlFor="name">Activation Code:</label>
        <input
            id="code"
            type="text"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="Type activation code..."
            required
        />
    </div>
);

const Email = ({ onChange, value }) => (
    <div className="form-control">
        <label htmlFor="email">Email:</label>
        <input
            id="email"
            type="email"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="Type email..."
            required
        />
    </div>
);

const Password = ({ onChange, value }) => (
    <div className="form-control">
        <label htmlFor="password">Password:</label>
        <input
            id="password"
            type="password"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="Type password..."
            required
        />
        <label htmlFor="password">Repeat Password:</label>
        <input
            id="password"
            type="password"
            onChange={onChange}
            maxLength="25"
            value={value}
            placeholder="repeat password.."
            required
        />
    </div>
);

const handleHome = (e) => {
    e.preventDefault();
    window.location.pathname = "/";
};

const Profile = ({ onSubmit, name, email, community }) => (
    <div className="card">
        <form onSubmit={onSubmit}>
            <h1>Successfully Registered</h1>
            <div >{name}</div>
            <div >{email}</div>
            <div >{community}</div>
            <button type="submibtn" className="btn">
                Edit Details{" "}
            </button>
        </form>
    </div>
);

const Edit = ({ onSubmit, children }) => (
    <div className='loginCon'>
        <form onSubmit={onSubmit}>
            <h1>Authority Registration</h1>
            {children}
            <button type="submit" className="btn">
                Sign Up{" "}
            </button>
            <button className="btn" onClick={handleLogin}>
                {" "}
                Back{" "}
            </button>
        </form>
    </div>
);

class SignUpAuthority extends React.Component {
    state = {
        file: "",
        imagePreviewUrl:
            "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true",
        name: "",
        email: "",
        password: "",
        active: "edit",
    };

    photoUpload = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    editCommunity = (e) => {
        const community = e.target.value;
        this.setState({
            community,
        });
    };

    editCode = (e) => {
        const code = e.target.value;
        this.setState({
            code,
        });
    };

    editCompanyName = (e) => {
        const name = e.target.value;
        this.setState({
            name,
        });
    };

    editEmail = (e) => {
        const email = e.target.value;
        this.setState({
            email,
        });
    };

    editPassword = (e) => {
        const password = e.target.value;
        this.setState({
            password,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state;
        var string = "%";
        if (data.username.includes(string)) {
            return;
        }
        const requestOpt = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
                email: data.email,
                avatar_url: document.getElementById("avatar_url_upload").value,
            }),
        };

        async function fetchFunc() {
            return await fetch("http://127.0.0.1:5000/register", requestOpt)
                .then((response) => response.json())
                .catch((error) => console.log(error));
        }
        (async () => {
            let info = await fetchFunc();
            if (info.success) {
                window.location.pathname = "/login";
            }
        })();
    };

    render() {
        const { imagePreviewUrl, name, email, password, community, code, active } = this.state;
        return (
            <div>
                <div className="login-Left">
                    <header className="login-header">FixedIt</header>

                </div>
                <div>
                    {active === "edit" ? (
                        <Edit onSubmit={this.handleSubmit}>
    
                            <Authority onChange={this.editName} value={name} />
                            <Email onChange={this.editEmail} value={email} />
                            <Community onChange={this.editCommunity} value={community} />
                            <Password onChange={this.editPassword} value={password} />
                            <ActivationCode onChange={this.editCode} value={code} />
                        </Edit>
                    ) : (
                        <Profile
                            onSubmit={this.handleSubmit}
                            src={imagePreviewUrl}
                            name={name}
                            email={email}
                            password={password}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default SignUpAuthority;