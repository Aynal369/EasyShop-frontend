import React from "react";
import { Link } from "react-router-dom";
import FooterColumns from "./FooterColumns";
import Newsletters from "./Newsletters";
import payment from "../../../../images/payment.png";

const MakeMoneyWithUs = [
  { name: "Sell on Easy Shop", link: "/" },
  { name: "Sell Your Services on Easy Shop", link: "/" },
  { name: "Sell on Easy Shop Business", link: "/" },
  { name: "Sell Your Apps on Easy Shop", link: "/" },
  { name: "Become an Affiliate", link: "/" },
  { name: "Advertise Your Products", link: "/" },
  { name: "Sell-Publish with Us", link: "/" },
  { name: "Become an Easy Shop Vendor", link: "/" },
];
const ProductCategories = [
  { name: "Apple", link: "/" },
  { name: "Camera & Photo", link: "/" },
  { name: "Cell Phones", link: "/" },
  { name: "Computers & Accessories", link: "/" },
  { name: "Headphones", link: "/" },
  { name: "Smartwatches", link: "/" },
  { name: "Sports & Outdoors", link: "/" },
  { name: "Television & Video", link: "/" },
  { name: "Video Games", link: "/" },
];
const LetUsHelpYou = [
  { name: "Your Account", link: "/" },
  { name: "Your Orders", link: "/" },
  { name: "Returns & Replacements", link: "/" },
  { name: "Shipping Rates & Policies", link: "/" },
  { name: "Refund and Returns Policy", link: "/" },
  { name: "Privacy Policy", link: "/" },
  { name: "Terms and Conditions", link: "/" },
  { name: "Help Center", link: "/" },
];
const GetToKnowUs = [
  { name: "Careers", link: "/" },
  { name: "About Easy Shop", link: "/" },
  { name: "Invertors Relations", link: "/" },
  { name: "Easy Shop Devices", link: "/" },
  { name: "Customer reviews", link: "/" },
  { name: "Privacy Policy", link: "/" },
  { name: "Contact Us", link: "/" },
];

const Footer = () => {
  return (
    <footer>
      <Newsletters />
      <div className="clear-both bg-light">
        <div className="container-fluid">
          <div className="row">
            <FooterColumns
              key={1}
              Title="Make Money With Us"
              Items={MakeMoneyWithUs}
            />
            <FooterColumns
              key={2}
              Title="Product Categories"
              Items={ProductCategories}
            />
            <FooterColumns
              key={3}
              Title="Let Us Help You"
              Items={LetUsHelpYou}
            />
            <FooterColumns key={4} Title="Get to Know Us" Items={GetToKnowUs} />
          </div>
        </div>
        <hr />
        <div className="d-md-flex justify-content-between align-items-center mb-3">
          <div className="text-sm-center">
            <small>
              Copyright &copy; {new Date().getFullYear()}
              <Link to="/" style={{ textDecoration: "none" }}>
                <span> easyshop.com </span>
              </Link>
              . All Rights Reserved
            </small>
          </div>
          <img src={payment} alt="payment" className="img-fluid" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
