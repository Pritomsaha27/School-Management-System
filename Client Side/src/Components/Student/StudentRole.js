import React from "react";
import "../../assets/css/StudentRole.css";

const Student_Role = () => {
  return (
    <div>
      <div className="container1">
        <h1 className="heading">Student Profile Form</h1>
        <div className="container2">
          <form className="Student_form" action="/submit" method="post">
            <label>First Name</label>
            <input type="text" id="firstName" required />

            <label>Last Name</label>
            <input type="text" id="lastName" required />

            <label>Parent Name</label>
            <input type="text" id="parentName" required />

            <label>Phone Number</label>
            <input type="tel" id="phone" required />

            <label>Email</label>
            <input type="email" id="email" required />

            <label>className</label>
            <input type="text" id="className" required />

            <label>Section</label>
            <input type="text" id="section" required />

            <label>SPOC</label>
            <input type="text" id="spoc" required />

            <input className="Std_submitbtn" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Student_Role;
