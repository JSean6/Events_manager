import React from "react";
import Item from "./Item";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube, FaFacebook } from 'react-icons/fa';

const ItemsContainer = () => {
    return (<div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
    <Item />
    <span>© 2024 Apply. All rights reserved.</span>
    <span>Terms. Privacy Pospancy</span>
    <span><FaGithub /> GitHub</span>
            <span><FaInstagram /> Instagram</span>
            <span><FaLinkedin /> LinkedIn</span>
            <span><FaYoutube /> YouTube</span>
            <span><FaFacebook /> Facebook</span>
    </div>
    );
};

export default ItemsContainer;