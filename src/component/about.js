import React from "react";
import { bright, cbutton, modalLayout } from "./variable.js";

export default function About(props){
    return(
        <>
            <div style={{...modalLayout, backgroundColor: "rgba(0,0,0,0.10"}}>            
                <div className="glassmorphism wihe">
                    <div style={bright}><button onClick={()=>{props._showAbout(false)}} style={cbutton}><span>&#10006;</span></button></div>
                 
                    <img className="bradius-size" src="../about.png" alt="Monkey D. Luffy"/>
                    <h3>Regin Calaguas</h3>
                    <a href="https://www.linkedin.com/in/regin-calaguas-8b89a426a/">Contact Me</a>
                    <h3>Powered By:</h3>
                    <h3 className="_blue">AWS</h3> 
                    <h3 className="_aqua">React</h3> 
                    <h3>N<span className="_green">o</span>de<span className="_green">JS</span></h3> 
                    <h3>My<span className="_orange">SQL</span></h3> 
                    <p className="_quote">The Man Who Wins Is The Man Who Thinks He Can</p>                
                    <p className="_quote">A Quitter Never Wins And A Winner Never Quits</p>
                </div>
            </div>
        </>
    )
}
