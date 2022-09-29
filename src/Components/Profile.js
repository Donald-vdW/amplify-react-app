import '../App.css';
import React from 'react'

const handleLogout = () => {
    //backendLogout();
    //localStorage.clear();
    //sessionStorage.clear();
    window.location.pathname = "/login";
};

const handleProfile = () => {
    window.location.pathname = "/profile";
};

const handleHome = () => {
    window.location.pathname = "/";
};

const handleChangePassword = () => {
    console.log("Change password");
};

const handleChangeLocation = () => {
    console.log("Change location");;
};

const Profile = () => {
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
                        <label>Name:</label>
                    </div>
                    <div className='form-control'>
                        <label>Username:</label>
                    </div>
                    <div className='form-control'>
                        <label>Email:</label>
                    </div>
                    <div className="post-btn-div">
                        <button className="btn" onClick={handleChangePassword}>
                            Change password
                        </button>
                    </div>
                    <div className="post-btn-div">
                        <button className="btn" onClick={handleChangeLocation}>
                            Change location
                        </button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Profile;
