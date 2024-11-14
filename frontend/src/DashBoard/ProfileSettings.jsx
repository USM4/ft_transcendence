import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import { UserDataContext } from "./UserDataContext.jsx";
import oredoine from "/oredoine.jpeg";
import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";

function ProfileSettings() {
  const [isTwoFactor, setisTwoFactor] = useState(false);
  const { user } = useContext(UserDataContext);
  const [QrCodeUrl, setQrCodeUrl] = useState(null);
  const [code, setCode] = useState("");
  const [isEnabled, setIsEnabled] = useState(user.twoFa);

  const saveCode = async () => {
    const endpoint = isEnabled
      ? "http://localhost:8000/auth/activate2fa/"
      : "http://localhost:8000/auth/desactivate2fa/";
    try {
      console.log(
        // "---------------------------------------------> isEnabled ",
        isEnabled
      );
      // console.log("---------------------------------------------> ", code);
      const response = await fetch(`${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: code }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setIsEnabled(false);
      } else {
        toast.error(data.error);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleSwitch = () => {
    setisTwoFactor(!isTwoFactor);
  };
  const getQRCode = async () => {
    console.log("get qr code");
    try {
      const response = await fetch("http://localhost:8000/auth/2fa/", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log(data.qrcode);
        setQrCodeUrl(data.qrcode);
      } else console.log("error");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isEnabled) getQRCode();
    else setQrCodeUrl(null);
  }, [isEnabled]);

  return (
    <div className="settings-component">
      <div className="profile-settings">
        <div className="settings-user-image">
          <img src={user?.avatar || player} alt="" />
          <p> {user.username} </p>
        </div>
        <div className="settings-options">
          <div
            className="general-profile-settings"
            onClick={() => setisTwoFactor(false)}
          >
            <button>General settings</button>
          </div>
          <div className="two-fa-settings" onClick={() => setisTwoFactor(true)}>
            <button> Two Factor Settings </button>
          </div>
        </div>
      </div>
      <div className="profile-edit-settings">
        <div className="profile-edit-settings-title">
          {isTwoFactor ? "Two Factor Settings" : "General Settings"}
        </div>
        {isTwoFactor ? (
          <>
            <div className="two-factor-collection">
              <p>
                Two Factor Authentication (2FA) adds an extra layer of security
                to your account. With 2FA enabled, you'll need to provide a
                second form of verification, such as a code sent to your mobile
                device, in addition to your password.
              </p>
              <div className="two-fa-options">
                <div className="switch-toggle">
                  <Switch
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                    color="secondary"
                  />
                </div>
                <div className="enable-text">
                  Enable Two Factor Authentication
                </div>
              </div>
              {isEnabled && user.twoFa ? (
                <>
                  <div className="enable-info">
                    <p>
                      Please download an authentication app (like Google
                      Authenticator) or check your SMS for codes. Make sure to
                      keep your backup codes safe!
                    </p>
                  </div>
                  <div className="two-foctor-tools">
                    <div className="confirmation-input">
                      <input
                        type="text"
                        maxLength={6}
                        value={code}
                        placeholder="Enter the code"
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>
                    <div className="qr-code-component">
                      <img src={QrCodeUrl} alt="" />
                    </div>
                  </div>
                </>
              ) : !isEnabled && user.twoFa ? (
                <div>
                  {" "}
                  ENTER THE CODE TO DISABLE 2FA
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    placeholder="Enter the code"
                    onChange={(e) => setCode(e.target.value)}
                  />{" "}
                  <button onClick={saveCode}> disable</button>
                </div>
              ) : (
                <div>2FA IS DISABLED</div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="update-avatar">
              <p> Update Avatar : </p>
              {/* onChange={handleFileChange} */}
              <div className="custom-file-upload">
                <input type="file" accept="image/*" />
              </div>
            </div>
            <div className="update-nickname">
              <p>Update Nickname : </p>
              <input type="text" placeholder="Enter your new nickname" />
            </div>
          </>
        )}

        <div className="save-settings">
          <button onClick={saveCode}>Save</button>
        </div>
      </div>
    </div>
  );
}
export default ProfileSettings;
