import React from "react";
import { Result } from "antd";

function Approval() {
  return (
    <div className="max-w-xl mt-10 mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-10 ">
        <Result
          status="success"
          title="Your Prescription has been successfully submitted!"
          subTitle="Please wait until approval."
        />
      </div>
    </div>
  );
}

export default Approval;
