**Inspect the Database Schema**   
>PRAGMA table_info(authentification_client);  

temporary
// <div>
//     <p>
//         Two Factor Authentication (2FA) adds an extra layer of security to your account. 
//         With 2FA enabled, you'll need to provide a second form of verification, such as a code sent to your mobile device, in addition to your password.
//     </p>
//     <div className="two-fa-options">
//         <label>
//             <input 
//                 type="radio" 
//                 value="enable" 
//                 checked={isEnabled} 
//                 onChange={handleEnableChange} 
//             />
//             Enable 2FA
//         </label>
//         <label>
//             <input 
//                 type="radio" 
//                 value="disable" 
//                 checked={!isEnabled} 
//                 onChange={handleEnableChange} 
//             />
//             Disable 2FA
//         </label>
//     </div>
//     {isEnabled && (
//         <div className="enable-info">
//             <p>
//                 To complete the setup of 2FA, please download an authentication app (like Google Authenticator) or check your SMS for codes. 
//                 Make sure to keep your backup codes safe!
//             </p>
//             {/* Add fields for entering the verification code or app information */}
//         </div>
//     )}
// </div>