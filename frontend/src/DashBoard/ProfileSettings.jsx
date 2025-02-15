import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import { UserDataContext } from "./UserDataContext.jsx";
import oredoine from "/oredoine.jpeg";
import anonyme from '../../public/anonyme.png'

import Switch from "@mui/material/Switch";
import toast from "react-hot-toast";

function ProfileSettings() {
  const [isTwoFactor, setisTwoFactor] = useState(false);
  const { user, updateUser } = useContext(UserDataContext);
  const [QrCodeUrl, setQrCodeUrl] = useState(null);
  const [code, setCode] = useState("");
  const [isEnabled, setIsEnabled] = useState(user?.twoFa);
  const [avatar, setAvatar] = useState("");
  const [bio, setbio] = useState("");
  const [phone, setPhone] = useState("");
  const [display_name, setDisplayName] = useState("");
  const formData = new FormData();
  formData.append('avatar', avatar);
  formData.append('bio', bio);
  formData.append('phone', phone);
  formData.append('display_name', display_name);

  const saveCode = async (e) => {
    e.preventDefault();
    const host=import.meta.env.VITE_HOST_URL;
    const endpoint = isEnabled
    ? `${host}/auth/activate2fa/`
    : `${host}/auth/desactivate2fa/`;
    try {
      const response = await fetch(`${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 'code': code }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setIsEnabled(data.is_2fa_enabled);
        updateUser((prevUser) => ({ ...prevUser, twoFa: data.is_2fa_enabled}));
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
    }
    setCode("");
  };
  const updateInfos = async () => {
    if (!avatar && !bio && !phone && !display_name) {
      toast.error("You must fill at least one field");
      return;
    }
    try {
      const host=import.meta.env.VITE_HOST_URL;
      setbio("");
      setPhone("");
      setAvatar("");
      setDisplayName("");
      const response = await fetch(`${host}/auth/update_infos/`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        updateUser((prevUser) => ({ ...prevUser, avatar: data.user.avatar, email: data.user.email, username: data.user.username, bio: data.user.bio, phone: data.user.phone, display_name: data.user.display_name }));
        toast.success(data.message);
      } else {
        toast.error(data.error);
      };
    } catch (error) {
      console.log(error);
    }
  };


  const getQRCode = async () => {
    try {
      const host=import.meta.env.VITE_HOST_URL;
      const response = await fetch(`${host}/auth/2fa/`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setQrCodeUrl(data.qrcode);
      } else console.log("error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEnabled && !user?.twoFa) getQRCode();
    else setQrCodeUrl(null);
  }, [isEnabled, user?.twoFa]);

  return (
    <div className="settings-component">
      <div className="profile-settings">
        <div className="settings-user-image">
          <img src={user?.avatar || anonyme} alt="" />
          <p> {user?.username} </p>
        </div>
        <div className="settings-options">
          <div className="settings-title"> Settings </div>
          <div className="edit-and-twofa">
            <div
              className="general-profile-settings"
              onClick={() => setisTwoFactor(false)}
            >
              <button>Edit Profile Informations</button>
            </div>
            <div className="two-fa-settings" onClick={() => setisTwoFactor(true)}>
              <button>
                Two Factor Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-edit-settings">
        <div className="profile-edit-settings-title">
          {isTwoFactor ? "Two Factor Settings" : "Edit Profile Informations"}
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
                    onChange={() => {
                      setIsEnabled((prev) => !prev)
                    }
                    }
                    color="secondary"
                  />
                </div>
                <div className="enable-text">
                  Enable Two Factor Authentication
                </div>
              </div>
              {isEnabled && !user.twoFa ? (
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
              ) : isEnabled && user.twoFa ? (
                <div>2FA IS ENABLED</div>
              ) : (
                user.twoFa ? (
                  <div className="disable-component">
                    <p>ENTER THE CODE TO DISABLE 2FA</p>
                    <div className="desable-input">
                      <input
                        type="text"
                        maxLength={6}
                        value={code}
                        placeholder="Enter the code"
                        onChange={(e) => setCode(e.target.value)}
                      />
                      <div className="disable-btn"><button onClick={saveCode}> disable </button></div>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )}
            </div>
          </>
        ) : (
          <>
            <div className="update-avatar">
              <p> Update Avatar : </p>
              <div className="custom-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </div>
            </div>
            <div className="update-nickname">
              <p>Update BIO : </p>
              <input
                type="text"
                maxLength={100}
                placeholder="Enter your new bio"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
              />
            </div>
            <div className="update-nickname">
              <p>Set a Tournament Display Name: </p>
              <input
                type="text"
                maxLength={9}
                placeholder="Set a Smasher Name"
                value={display_name}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="update-nickname">
              <p>Update Phone number : </p>
              <input
                type="number"
                maxLength={10}
                placeholder="Enter your new phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="save-settings">
          {isTwoFactor ? (
            user.twoFa || <button onClick={saveCode}>Save</button>
          ) : (
            <button onClick={updateInfos}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProfileSettings;
