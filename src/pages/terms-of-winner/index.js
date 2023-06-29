import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import ContentLoader from '../../loader/content-loader';
import "./style.css";
const index = () => {

  return (
    <>
      <Row className="mt-5">
        <Col xs={12} className="ct">
          <div className="mb-10">
            <div className="part ml15">
              <div className="series-title">Terms of Winner</div>
            </div>
            <div className='text1'>Terms and Condition</div>
            <div>
           <span>1. Generate Top 10 monthly winners within 24 hours after monthly Competition ended.</span> <br/>
           <span>2. Make sure Goaly notified those winners through web notif.</span> <br/>
           <span>3. Customers can claim the prize after the 3 day period ends or the customer will be contacted by the organizer if they don't claim</span> <br/>
           <span>4. Additional administration step, Goaly admin should asked 10 user msisdn plain from Telkomsel and notified them through Call or Whatsapp</span> <br/>
           <span>5. Ask User to confirm the Winners through call or Whatsapp about the reward and size</span> <br/>
           <span>6. Buy the reward from Official Store within 24 hours after user confirm the size.</span> <br/>
           <span>7. Deliver the reward and inform the Winner through Whatsapp.</span> <br/>
           <span>8. Ask winner to do selfie with the reward then post to their Instagram follow and mentioned @playgoaly</span>
           </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default index