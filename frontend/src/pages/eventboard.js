import React from "react";
import "../stylesheets/eventboard.css";

export const Eventboard = () => {
  return (
    <div className="eventboard__container">
        
        {/* NAV BAR */}
        <div className="eventboard__navbar">
            <h1>EventEase</h1>
            <div className="navbar_middle">
                Search
            </div>
            <div className="navbar_right">
                <div>Browse</div> 
                <div>My Events</div> 
            </div>
        </div>

        {/* EVENT BOARD FRAME */}
        <div className="eventboard__frame">

            {/* EVENT DETAILS */}
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

            {/* EVENT PINS */}
            <div className="eventboard__pins">
                <div className="pins_section">
                    <div className="cards">
                        <h1>VENUES</h1>
                        <div className="cards_container">
                            <div className="spcard">
                                <img className="spcard_img" alt="insert img" />
                                <div className="event_details_1"> 
                                    <div className="details_front">
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2 className="front_name"> Madre de Dios Chapel</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> Tagaytay Highlands, Talisay, Batangas</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> PHP 30,000</h2>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                    <div className="details_showmore">
                                        <div className="showmore-div">
                                            <p>More Details</p>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="spcard">
                                <img className="spcard_img" alt="insert img" />
                                <div className="event_details_2"> 
                                    <div className="details_front">
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2 className="front_name"> Madre de Dios Chapel</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> Tagaytay Highlands, Talisay, Batangas</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> PHP 30,000</h2>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                    <div className="details_showmore">
                                        <div className="showmore-div">
                                            <p>More Details</p>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* <div className="pins_section">
                    <div className="cards">
                        <h1>CATERER</h1>
                        <div className="cards_container">
                            <div className="spcard">
                                <img className="spcard_img" alt="insert img" />
                                <div className="event_details_3"> 
                                    <div className="details_front">
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2 className="front_name"> Madre de Dios Chapel</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> Tagaytay Highlands, Talisay, Batangas</h2>
                                        </div>
                                        <div className="front">
                                            <svg alt="insert svg" />
                                            <h2> PHP 30,000</h2>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                    <div className="details_showmore">
                                        <div className="showmore-div">
                                            <p>More Details</p>
                                            <svg alt="insert svg" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
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

            {/* EVENT BUDGET */}
            <div className="eventboard__budget">
                <h1>BUDGET</h1>
                <p className="budget_interact">Interact with the check boxes to see your total cost.</p>
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

        {/* EVENT FOOTER */}
        <div className="eventboard__footer">

        </div>
    </div>
  );
};

export default Eventboard;
