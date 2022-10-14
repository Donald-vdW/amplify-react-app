import '../App.css';
import React from 'react'

const handleLogout = () => {
    window.location.pathname = "/";
};

const handleProfile = () => {
    window.location.pathname = "/profile";
};

const handleHome = () => {
    window.location.pathname = "/homeAuth";
};


const ProfileAuth = () => {
    return (
        <>
            <nav id="navbar" >
                <div className="nav-wrapper">
                    <div>
                        <h1 className="logo" onClick={handleHome}>FixedIt</h1>
                    </div>
                        <ul>
                            <li>
                                <label onClick={handleProfile}>
                                    Profile  {" "}
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

            <div className='profile-center'>
                <h2>Profile</h2>
                <form className='add-form'>
                    <div className='form-control'>
                        <label>Company/Authority Name: {JSON.parse(localStorage.getItem("name"))}</label>
                    </div>
                    <div className='form-control'>
                        <label>Email: {JSON.parse(localStorage.getItem("email"))}</label>
                    </div>
                </form>
            </div>
        </>
    )

}

export default ProfileAuth;
