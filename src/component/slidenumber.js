import React from "react"


export default function SlideNumber({aLeft, aTop, value, ifClick, _png}){    
    const numContainer = {
        transition: ".3s", 
        position: "absolute", 
        left: aLeft, 
        top: aTop 
    }

    const numContainerChild = {     
        textAlign: "center", 
        color: "white", 
    }

    const _number = {  
        borderRadius: "8px",               
        fontSize: "55px",
        width: "70px", 
        height: "70px", 
        cursor: "pointer", 
        position: "absolute", 
        boxShadow: "5px 5px 10px #888888",     
        fontFamily: "Typew",  
        
        // webkitUserSelect: "none", /* Safari */
        // msUserSelect: "none", /* IE 10 and IE 11 */
        // userSelect: "none", /* Standard syntax */
    }

    return(
        <>                      
                <div style={numContainer}>
                    <div style={numContainerChild} >
                            <img src={_png} alt="" style={_number} />
                            <div onClick={ifClick} style={_number}><strong>{value}</strong></div>                               
                    </div>  
                </div>  
        </>
    );
};
