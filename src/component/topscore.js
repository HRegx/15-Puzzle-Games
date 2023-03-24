import React, { useEffect, useState } from "react";

import { getTopTen } from "./db.js";

// import { people } from './data.js'
import { bright, cbutton, modalLayout } from "./variable.js";
import "../component/myfont.css"
import { titleFont } from "./variable";

export default function TopScore(props){    
    const [scorer, setScorer] = useState([]);
    
    const acenter = {    
        // backgroundColor: "rgba(0,0,0,.90)", /* Black w/ opacity */
        color: "white",
        // borderRadius: "5px",
    }

    const ulfo = {
        margin: "0px",
        padding: "5px",
        listStyleType: "none",
        width: "350px",
    }

    const lifo = {
        display: "flex",
        justifyContent: "space-between",
        width: "350px",
    }
    
    const setw = {
        width: "80px",
    }

    const nameStyle = {
        width: "200px",
    }    

    const setID = {
        width: "20px",
    }
    
    const  listItems = scorer.map((person,key)=>
        <li key={person.f_id} style={lifo}>
                <p style={setID}>{key+1}</p> 
                <p style={nameStyle}>{person.f_screen_name}</p>
                <p style={setw}>{person.f_time}</p>
                <p style={setw}>{person.f_score}</p>
        </li>  
    )

    useEffect(()=>{
        const top = getTopTen();
        const promise = Promise.resolve(top);
        promise.then(arg=>setScorer(arg));        
    },[])

    
    return(
    <>                      
            <div style={modalLayout}>        
                <div style={acenter}>
                <div style={bright}><button onClick={()=>{props._showTop(false)}} style={cbutton}><span>&#10006;</span></button></div>                
                    <div style={{textAlign: "center"}}>
                        <h1 style={titleFont}>15 Puzzle</h1>
                        <h3 className="blink">TOP 10 BEST PLAYERS</h3>
                        <div style={{...lifo, marginLeft: "5px"}}>
                            <p style={setID}>RANK</p> 
                            <p style={nameStyle}>NAME</p>
                            <p style={setw}>TIME</p>
                            <p style={setw}>MOVES</p>
                        </div>
                        <ul style={ulfo}>{listItems}</ul>
                    </div>                
                </div>
            </div>            
    </>
    );
}