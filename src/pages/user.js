import React from "react";


function User() {
    return(
        <div>

            <h1>User info</h1>
            <h2>Balance={localStorage.getItem("balance")}</h2>
            <h2>Address={localStorage.getItem("address")}</h2>
        </div>
        );
}

export default User;