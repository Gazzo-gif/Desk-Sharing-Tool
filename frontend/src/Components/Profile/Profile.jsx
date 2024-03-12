import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import profilePicture from "../../images/profilepicture.jpg";
import onePicture from "../../images/one.png";
import twoPicture from "../../images/two.png";
import Toogle from "react-toggle";
import "./Profile.css";
import "react-toggle/style.css"; // for ES6 modules

import { CgProfile } from "react-icons/cg";
const Profile = () => {

  
  const navigate = useNavigate();
  const [image, setImage] = useState(onePicture);
  const [anonymous, setAnonymous] = useState(false);

  function back(){
    navigate(-1);
  }

  const ProfileDescription = () => {
    return (
      <div className="profile-description">
        <hr class="rounded"></hr>
        <img className="profiepicture" src={profilePicture} alt=""></img>
        {anonymous ? <h2>Jane Doe</h2> : <h2>Anonymous</h2>}
        <p>General Manager</p>
        <Toogle
          defaultChecked={false}
          onClick={() => setAnonymous(!anonymous)}
        //   onChange={() => setAnonymous(!anonymous)}
        />
      </div>
    );
  };
  const History = () => {
    return (
      <div className="history-container">
        <div
          style={{
            display: "flex",
          }}
        >
          <CgProfile /> <h3>History</h3>
        </div>
        <div style={{ display: "flex", width: "100vw" }}>
          <div className="history">
            <div className="history-item" onClick={() => setImage(onePicture)}>
              <img className="floor-image" src={onePicture} alt=""></img>
              <div className="history-description">
                <p>Room 123</p>
                <p>Date: 23-01-2024</p>
              </div>
            </div>
            <div className="history-item" onClick={() => setImage(onePicture)}>
              <img className="floor-image" src={onePicture} alt=""></img>
              <div className="history-description">
                <p>Room 123</p>
                <p>Date: 23-01-2024</p>
              </div>
            </div>
            <div className="history-item" onClick={() => setImage(twoPicture)}>
              <img className="floor-image" src={twoPicture} alt=""></img>
              <div className="history-description">
                <p>Room 123</p>
                <p>Date: 23-01-2024</p>
              </div>
            </div>
            <div className="history-item" onClick={() => setImage(onePicture)}>
              <img className="floor-image" src={onePicture} alt=""></img>
              <div className="history-description">
                <p>Room 123</p>
                <p>Date: 23-01-2024</p>
              </div>
            </div>
            <div className="history-item" onClick={() => setImage(twoPicture)}>
              <img className="floor-image" src={twoPicture} alt=""></img>
              <div className="history-description">
                <p>Room 123</p>
                <p>Date: 23-01-2024</p>
              </div>
            </div>
          </div>
          <div className="desk-display">
            <img className="desk-image" src={image}></img>
          </div>
        </div>
      </div>
    );
  };
  const About = () => {
    return (
      <div className="about-container">
        <div
          style={{
            display: "flex",
          }}
        >
          <CgProfile /> <h3>About</h3>
        </div>
        <div className="about-contents">
          <div className="about-title">
            {/* <img src={profilePicture} alt=""></img> */}
            <p>First Name :</p>
            <p>Jane</p>
          </div>
          <div className="about-title">
            <p>Gender :</p>
            <p>Female</p>
          </div>
          <div className="about-title">
            <p>Email:</p>
            <p>example@gmail.com</p>
          </div>
          <div className="about-title">
            <p>Member since :</p>
            <p>Feb 11</p>
          </div>
          <div className="about-title">
            <p>Last Name :</p>
            <p>Doe</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <><div  className="backButtonDiv">
      <button className="backButton" onClick={back}>Back</button>
    </div><div
      style={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        margin: "15px",
        height: "100%",
        width: "100%",
        // background: "#aaa",
      }}
    >

        <div className="description-container">
          <ProfileDescription></ProfileDescription>
        </div>

        <div className="info-container">
          <About></About>
          <History></History>
        </div>
      </div></>
  );
};

export default Profile;
