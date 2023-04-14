import React from "react";
import { useState } from "react";
import ShowModal from "./modal"
import { _bsize, _buttonAbsolute, _button, _b1, _b2} from "./variable.js"; 
import { soundEffect } from "./sounds";


export default function LoadButton(props){
    const [popModal, setPopModal] = useState(false);
    const bstyle = {..._bsize, ..._buttonAbsolute, ..._button};

   
    function tF(){
        (popModal === true)? setPopModal(false) : setPopModal(true);
        props.pauseTime();
    }

    function newGame() {
        soundEffect("nope");
        props.resetTime();
        props.shuffle();
        props.reset(0);                        
    }

    function pauseGame(){
        soundEffect("pause");
        setPopModal(true);
        props.pauseTime();
    }

    return(
        <>            
            {popModal && <ShowModal toggleTF={tF} />}
            <div>            
                <button style={{...bstyle, ..._b1}} onClick={newGame}>New Game</button>
                <button style={{...bstyle, ..._b2}} onClick={pauseGame}>Pause</button>
            </div> 
        </>
    );
}
