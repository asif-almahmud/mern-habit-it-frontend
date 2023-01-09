import React from "react";

const Footer = () => {
    return (
        <div className="border-t flex justify-center items-center h-16 text-sm tracking-wider">
            <p>Copyright&copy; {new Date().getFullYear()}, HABITit</p>
        </div>
    );
};

export default Footer;
