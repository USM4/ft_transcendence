import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    return <h1>
        404 Not Found
        {/* {navigate('/')} */}
    </h1>;
    }
export default NotFound;