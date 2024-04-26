import React from "react";

import "../stylesheets/aboutus.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer.js";

export const AboutUs = () => {
  return (
    <>
      <Navbar />
      <section id="aboutus">
        <div className="abtus_container" id="abtus_container">
          <div className="abtus__left_container">
            <h1>About Us</h1>
            <h2>About Event Ease</h2>
            <p>
              Planning events can be overwhelming, especially for those new to
              the task. Challenges like selecting the perfect venue and staying
              within budget may surface. EventEase is a website that provides
              assistance to users for seamless event planning. We present a list
              of potential venues, catering options, experienced hosts,
              entertainers, and reliable party-needs suppliers, streamlining the
              entire event preparation process. 
            </p>
            <h2>Developers</h2>
            <p>EventEase made by five developers for fun!</p>
            <div className="dev_container">
              <div className="pics_container">
                <p>Brescia Amandy</p>
                <p>Ross Batacan</p>
                <p>Julia Espera</p>
                <p>Caryn Lopez-Go</p>
                <p>Ysabella Panghulan</p>
              </div>
            </div>
          </div>
          <div className="abtus__right_container"></div>
        </div>
        <Footer />
      </section>
    </>
  );
};

export default AboutUs;
