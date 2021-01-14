import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";

import "../assets/css/Footer.css";
import pp from "../assets/images/pp.jpg";

function Footer() {
  return (
    <div className="footer_main">
      <div className="footer_container">
        <div className="footer_wrapper">
          <div className="left_side">
            <h1>Business Buzz Club</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi
              dolores consectetur pariatur ducimus incidunt dolor, alias
              delectus eaque atque illo molestiae ipsum hic adipisci ipsa
              voluptatem nihil magnam cumque assumenda?
            </p>
          </div>
          <div className="middle_side">
            <h1>Website Creators</h1>
            <div className="developer">
              <img className="dev_img" src={pp} alt="" />
              <h3>Mohd Sameer Ahmad</h3>
            </div>
            <div className="developer">
              <img className="dev_img" src={pp} alt="" />
              <h3>Vaishnavi Srivastava</h3>
            </div>
            <div className="developer">
              <img className="dev_img" src={pp} alt="" />
              <h3>Harshit Dubey</h3>
            </div>
          </div>
          <div className="right_side">
            <h1>About Us</h1>
            <li className="social_links">
              follow us on our Instagram
              <a
                href="https://www.instagram.com/businessbuzzclub/"
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon className="icon" />
              </a>
            </li>
            <li className="social_links">
              Like Our Facebook page
              <a
                href="https://www.instagram.com/businessbuzzclub/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="icon" />
              </a>
            </li>
          </div>
        </div>
      </div>
      <div className="copyright">
        <h4>
          &copy; {new Date().getFullYear()} |Business Buzz Club| made with love
          ❤️{" "}
        </h4>
      </div>
    </div>
  );
}

export default Footer;
