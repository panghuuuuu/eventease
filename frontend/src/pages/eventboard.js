import React from "react";
import "../stylesheets/eventboard.css";
export const Eventboard = () => {
  return (
    <div className="eventboard__container">
        <div className="eventboard__navbar">

        </div>

        <div className="eventboard__frame">
            <div className="eventboard__details">
                <h1>EVENT DETAILS</h1>
                <div className="details_frame">
                    <p className="details_head">DATE</p> 
                    <p> May 13, 2022</p>
                </div>
                <div className="details_frame">
                    <p className="details_head">BUDGET</p> 
                    <p> PHP 500,000</p>
                </div>
                <div className="details_frame">
                    <p className="details_head">PAX</p> 
                    <p> 100 PAX</p>
                </div>
                <div className="details_frame">
                    <p className="details_head">REQUIREMENTS</p>
                </div>

                {/* add the selection of requirements */}
            </div>
            <div className="eventboard__pins">
                <h1>VENUES</h1>
                <h1>CATERERS</h1>
                <h1>HOSTS</h1>
                <p> Aw. You haven’t found any hosts yet. <span>Click here to browse.</span></p>
                <h1>PHOTOGRAPHERS</h1>
                <p> Aw. You haven’t found any hosts yet. <span>Click here to browse.</span></p>
                <h1>ENTERTAINERS</h1>
                <p> Aw. You haven’t found any hosts yet. <span>Click here to browse.</span></p>
                <h1>GOWNS OR SUITS</h1>
                <p> Aw. You haven’t found any hosts yet. <span>Click here to browse.</span></p>

            </div>
            <div className="eventboard__budget">
                <h1>BUDGET</h1>
                <p>Interact with the check boxes to see your total cost.</p>
                <p className="budget_php">PHP</p>
                <div className="budget_receipt">
                    <h2>Venue</h2>
                    <div className="receipt_frame">
                        <p>Midlands Verdana</p>
                        <p>160,000</p>
                    </div>

                    <h2>Caterer</h2>                
                    <div className="receipt_frame">
                        <p>Hizon's Catering</p>
                        <p>110,000</p>
                    </div>

                    <div className="receipt_frame">
                        <p>Total</p>
                        <p>270,000</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="eventboard__footer">

        </div>
    </div>


    
  );
};



export default Eventboard;
