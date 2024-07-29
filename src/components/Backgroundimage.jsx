import React from "react";
//import { Button } from "./ui/button";
import Header from "./ui/Header";
import Footer from "./ui/footer";
import Contenue from "./contenue";
import './style.css';


function BackgroundImage() {
    return (
        <div className=" bg-my-image bg-cover bg-no-repeat bg-center bg-fixed h-screen">
            <Header />
            <Contenue/>
            <Footer/>
        </div>
    )
}

export default BackgroundImage;