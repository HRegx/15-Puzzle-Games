import React from "react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const _timerBoard = {
    background: "#F4B400",
    width:"345px", 
    height:"45px", 
    borderRadius: "5px",
    boxShadow: "5px 10px 8px #888888"
}

const _timerLabels = {
    fontFamily: "Typew",        
    height:"35px", 
    borderRadius: "5px",
    padding: "5px",        
    paddingLeft: "15px",
    background:"#F4B400", 
    color:"white"        
} 

const _timeHeader = {
        paddingLeft: "10px",
        paddingRight: "10px",        
        fontFamily: "monospace",
        fontWeight: "bold",
        position: "absolute",
        top: "-20px",
        display: "flex",
        fontSize: "20px",
        color: "green"
}

const _right = {
        right: "0px"
}


const ShowTimer = forwardRef((props, ref)=>{
    const [_second, setSecond] = useState(0);
    const [_minute, setMinute] = useState(0);
    const [_hour, setHour] = useState(0);
    const [_active, setActive] = useState(true);
    const [_time, setTime] = useState("00:00:00");

    useImperativeHandle(ref, () => ({

        toggleFC(){
            setActive(!_active);
            // console.log("Pause toggle");
        },
        
        resetFC(){
            setTime("00:00:00");
            setSecond(0);
            setMinute(0);
            setHour(0);            
        },

        getTime(){
            return _time;
        }
    
    }));

    function toString(ans){
        return (ans<=9)? "0"+ ans.toString() : ans.toString();
    }
    
    useEffect(()=>{
        let _interval = null;
            if(_active===true){
                _interval = setInterval(()=>{
                    setSecond(s=>s+1);
                    if(_second===59){
                        setSecond(0);
                        setMinute(m=>m+1);
                    }
                    if(_minute===59){
                        setSecond(0);
                        setMinute(0);
                        setHour(h=>h+1);
                    }
    
                    setTime(toString(_hour)+":"+toString(_minute)+":"+toString(_second));
                },1000);
    
                return ()=>clearInterval(_interval);
            }
    },[_hour,_minute,_second,_active,_time]);

    return(
        <>
                <div style={_timeHeader}><p>TIME</p></div>                   
                <div style={{..._timeHeader, ..._right}}><p>MOVES</p></div>                   
                <div style={_timerBoard}>     
                        <h1 style={_timerLabels}>{_time}</h1>
                </div>
        </>
    );
});

export default ShowTimer;