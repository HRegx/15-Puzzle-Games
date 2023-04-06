import React from "react";

import { modalLayout, _box, _bsize, _button, _b2 } from "./variable";

export default function ShowModal(props){    

    function closeModal(){
        props.toggleTF();
    }

    return(
        <>        
            <div style={modalLayout}>
                <div style={{..._box, height: "250px"}}>
                    <h1>You Paused The Game</h1>
                    <h1>15 Puzzle</h1>
                    <button style={{..._bsize, ..._button, ..._b2}} onClick={closeModal}>RESUME GAME</button>
                </div>
            </div>
        </>
    );  
}

