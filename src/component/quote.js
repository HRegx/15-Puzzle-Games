import React from "react";

import { modalLayout, _boxQ, _bsize, _button, _b2 } from "./variable";

export default function Quote(props){    
  const _number = {  
    borderRadius: "8px",               
    boxShadow: "5px 5px 10px #888888",         
  }
  const _quote = {
    position: 'absolute',
    top: '30%', // Place the text 50% from the top of the container.
    left: '50%', // Place the text 50% from the left of the container.
    transform: 'translate(-50%, -50%)', // Center the text using translate.
    // fontFamily: "Typew",
    fontSize: '64px',    
  }

    return(
        <>        
            <div style={modalLayout}>
                <div style={{..._boxQ, height: "650px", width: "1150px"}}>
                    <p style={_quote}>Repetetion is the mother of skill.. Action is where all of your power is found.. knowledge is not power. EXECUTION is. </p>
                    <img src={'../quotes.png'} alt="" style={_number} />
                    <h1>Random Quotes</h1>
                    <h1>15 Puzzle</h1>
                    <button style={{..._bsize, ..._button, ..._b2}} onClick={()=>{props._showQuote(false)}}>RESUME GAME</button>
                </div>
            </div>
        </>
    );  
}

