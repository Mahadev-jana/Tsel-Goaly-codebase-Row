import React from "react";

import { useHistory } from "react-router-dom";
import "./prize.css";

import successImg from "../../assets/img/claim-prize/icon-success.png";

const RedeemPrize = () => {
  const history = useHistory();
  const routeChange = () => {
    let path = "/";
    history.push(path);
  };
  return (
    <div class="container-fluid">
      <div class="text-center py-2">
        <img
          src={successImg}
          class="mb-1"
          alt="Success"
          width="100"
          height="100"
        />
        <h4>
          <strong>Congratulations!</strong>
        </h4>
        <p>You have redeemed your prize, our team will contact you.</p>
      </div>
      <div class="alert mb-1" style={{ backgroundColor: "#E5E5E5" }}>
        <p>
          <strong>Important information:</strong>
        </p>
        <ol style={{ paddingLeft: "15px" }}>
          <li>Shipping costs are the responsibility of the organizer.</li>
          <li>Claim reward will be sent 1x24 hours.</li>
          <li>Claim rewards will be sent 1x24 hours.</li>
          <li>Receipt No. will be sent 1x24 hours</li>
        </ol>
      </div>
      <a
        onClick={routeChange}
        class="btn bg-grey p-1 w-100 my-2 text-black shadow"
      >
        <strong>Back</strong>
      </a>
    </div>
  );
};

export default RedeemPrize;
