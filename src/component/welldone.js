import React from "react";
import { useRef } from "react"

import { modalLayout, _box, _textbox } from "./variable";
import { bright, cbutton } from "./variable.js";
import { _button } from "./variable.js";
import { _b2 } from "./variable.js";
import "../component/myfont.css"

import { inject } from "./db"; //when importing child sub function make sure use {}

export default function WellDone(props){

    let inputRef = useRef(null);
    
    const medal = {
        width: "100px",
        height: "95px"
    }

    function newGame() {
        props.resetTime();
        props.shuffle();
        props.reset(0);                        
        props._show(false);
    }

    function addRec(){

        if(inputRef.current.value===""){
            // alert("Empty");
        }else{
            inject(props._score,props.getTime,inputRef.current.value);
        }
        newGame();
    }

    return(
        <>
                <div style={modalLayout}>
                    <div style={_box}>
                    <div style={bright}><button onClick={newGame} style={cbutton}><span>&#10006;</span></button></div>                
                        <img  style={medal} src="../medal.png" alt="Medal"/>
                        <h1 className="blink">Congratulations!</h1>
                        <p>You solved 15 Puzzle in <strong className="blink">{props._score}</strong> Moves</p>
                        {console.log(props._isTop +"::"+ props._score)}
                        {props._score < props._isTop?         
                            <div>
                                <p>Enter Your Name... You are One of the Top 10 best player</p>
                                <input type="text" ref={inputRef} placeholder="Enter your Name... " style={_textbox}/>                     
                                <button onClick={addRec} style={{..._button, ..._b2}}>Save</button>
                            </div>                
                            :
                            <p>But you didn't even get to the Top 10</p>
                        }
                    </div>                    
                </div>

        </>
    );
}