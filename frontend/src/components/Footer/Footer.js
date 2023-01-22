import React from "react";
import "./footerStyles.css";

function Footer() {
  return (
    <footer id="footer">
      <div className="topFooter">
        <h1>EShop</h1>
      </div>

      <div className="midFooter">
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </p>
      </div>

      <div className="bottomFooter">
        <p>Copyrights 2021 &copy; Chirag Simkhada</p>
      </div>
    </footer>
  );
}

export default Footer;
