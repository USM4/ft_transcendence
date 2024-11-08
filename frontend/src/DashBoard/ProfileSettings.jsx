import React, { useContext, useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import SendIcon from "@mui/icons-material/Send";
import GamepadIcon from "@mui/icons-material/Gamepad";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ReorderIcon from "@mui/icons-material/Reorder";
import { UserDataContext } from './UserDataContext.jsx'
import oredoine from '/oredoine.jpeg'

function ProfileSettings(){
    const [isTwoFactor,setisTwoFactor] = useState(false)
    const [isEnabled,setIsEnabled] = useState(false)
    const {user} = useContext(UserDataContext);
    const [QrCodeUrl,setQrCodeUrl] = useState('./anonymous.png');
    
    const handleSwitch = () => {
        setisTwoFactor(!isTwoFactor);
    };
    const getQRCode = () => {
        if (isEnabled) {
            try {
                const response = fetch('http://localhost:8000/auth/2fa/',
                    {
                        method: 'GET',
                        credentials: 'include',
                    }
                )
                if(response.ok)
                {
                    const data = response.json();
                    print(data.qr_code);
                    setQrCodeUrl(data.qr_code);
                }
            }
            catch (error) {
            }
        }
    }
    useEffect(() => {
        if(isEnabled)
        console.log("--------------------->", isEnabled)
        getQRCode();
    }, [isEnabled]);
    return(
        <div className="settings-component">
            <div className="profile-settings">
                <div className="settings-user-image">
                    <img src={user?.avatar || player} alt=""/>
                    <p> {user.username} </p>
                </div>
                <div className="settings-options">
                    <div className="general-profile-settings" onClick={() => setisTwoFactor(false)}><button >General settings</button></div>
                    <div className="two-fa-settings" onClick={() => setisTwoFactor(true)}><button > Two Factor Settings </button></div>
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
                            Two Factor Authentication (2FA) adds an extra layer of security to your account. 
                            With 2FA enabled, you'll need to provide a second form of verification, such as a code sent to your mobile device, in addition to your password.
                        </p>
                    <div className="two-fa-options">
                        <input
                            type="checkbox" 
                            checked={isEnabled || ""}
                            onChange={()=>setIsEnabled(true)}
                        readOnly={true}
                        />
                        Enable 2FA
                        <input 
                            type="checkbox" 
                            checked={!isEnabled || ""}
                            onChange={()=>setIsEnabled(false)}
                            readOnly={false}
                            />
                        Disable 2FA
                        </div>
                        {isEnabled && (
                            <div className="enable-info">
                                <p>
                                Please download an authentication app (like Google Authenticator) or check your SMS for codes.
                                Make sure to keep your backup codes safe!
                                </p>
                            </div>
                        )}
                        <div className="qr-code-component">
                            <img src={QrCodeUrl} alt=""/>
                        </div>
                    </div>
                </>
                    ) : (
                    <>
                        <div className="update-avatar">
                            <p> Update Avatar : </p>
                            {/* onChange={handleFileChange} */}
                            <div className="custom-file-upload">
                                <input type="file" accept="image/*"/>
                            </div>
                        </div>
                        <div className="update-nickname"> 
                            <p>Update Nickname : </p>
                            <input type="text"/>
                        </div>
                    </>
                    )}
                
                <div className="save-settings">
                    <button>Save</button>
                </div>
            </div>
        </div>
    );
}
export default ProfileSettings;
