
import React from "react";
import { useState, useRef } from "react";
import LoadButton from "./component/button";



import { AudioPlayer } from "./component/sounds";
import { playAudio } from "./component/sounds";

import ShowTimer from "./component/showtimer";
import SlideNumber from "./component/slidenumber";
import TopScore from "./component/topscore";
import WellDone from "./component/welldone";




import Quote from "./component/quote";
import About from "./component/about";
import { getHighScore } from "./component/db";
import { titleFont } from "./component/variable";

import "../src/component/myfont.css";



var oO = 1;
const _scoreLabels = {  
    fontFamily: "Typew",
    height:"35px",
    right: "0px",
    padding: "5px",
    paddingRight: "15px",
    position: "absolute",             
    borderRadius: "5px",
    background:"#F4B400", 
    color:"white"
}  
const container = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "40px"
}

const centerDiv = {
    position: "absolute",
}
const numInfo =[      
    [15,270,360], [0,0,90],   [1,90,90],   [2,180,90],  
    [3,270,90],   [4,0,180],  [5,90,180],  [6,180,180], 
    [7,270,180],  [8,0,270],  [9,90,270],  [10,180,270], 
    [11,270,270], [12,0,360], [13,90,360], [14,180,360]                        
];

export default function Main(){            
    const ref = useRef();         
    const [about, setAbout] = useState(false);
    const [isTop, setIsTop] = useState(null);
    const [showTop, setShowTop] = useState(false);
    const [well, setWell] = useState(false);
    const [_score, setScore] = useState(0);
    const [_value, setValue] = useState(numInfo);    
    const [_png, setPNG] = useState();
    const [quote, setQuote] = useState(false);
    

    var new_value = [..._value];
    var thisArray = [];
    var _swap =[];

    const sideCheck = (i, c) => {    
        if(((i===3) || (i===7) || (i===11)) && (c===1)){
            return false;
        }
        if(((i===4) || (i===8) || (i===12)) && (c===2)){
            return false;
        }        
        return true;
    }

    function shuffleNumber(){
        setValue(numInfo);

        let _path = [15,14,13,9,5,1,2,3,4,8,7,6,10,11,12,15]; //just to make sure each number moves

        for(let i=0;i<=15;i++){
            swapper(_path[i])
        }

        for(let i=1;i<=155;i++){
            canSlide(true);
        }
        setValue(new_value);        
    }    

    function _shuffle(_max){
        const  _random = Math.floor(Math.random() * (_max));
        return _swap[_random];
    }

    function swapper(i){          
        [new_value[i],new_value[0]] = [new_value[0],new_value[i]];  
        setValue(new_value);                       
    }

    function canSlide(isShuffle){        
        const holdValue = [...new_value];
        let _max=holdValue[0][0]+4;
        let _p = [0,3,5,8];        
        let _zero = 0;
        let _index = 0;  
        _swap = [];

        function getIndex(arg){
            for(let x=0;x<=15;x++){
                if(holdValue[x][0]===arg){
                    return x;
                }
            }
        }

        for(let c=0;c<=3;c++){   
            if(sideCheck(holdValue[0][0], c)===true){
                _zero=_max-_p[c];
                if((_zero>=0) && (_zero<=15)){                 
                    _index=getIndex(_zero);                                             
                    _swap.push(_index);                                   
                }
            }                
        }

        if(isShuffle===true){
            swapper(_shuffle(_swap.length))    
        }
    }

    function isFinish(){
        let _clover = true;
        for(let i=1;i<=15;i++){
            if(i===(new_value[i][0]+1)){                               
            }else{
                _clover=false;            
                return;
            }
        }
        if((_clover===true) && (new_value[0][0]===15)){
            // alert("Success...");
            playAudio("success");
            setWell(true);
        }
    }

    function handleClick(i){            
        _swap = [];      
        
        canSlide(false);                
        for(let j=0;j<_swap.length;j++){
            if(_swap[j]===i){
                playAudio("slide");       
                swapper(i);
                isFinish();
                setScore(_score + 1);                
                return;
            }
        }    
        // soundEffect("nope");
        // sound effect goes here for not movable button
    }


    
    function loadBoard(){
        // console.log("called function loadBoard");
        
        for(let i=0;i<=15;i++){      
            if(i!==0){                
                thisArray.push(                    
                    <SlideNumber key={i}                                                   
                        aLeft={_value[i][1]} 
                        aTop={_value[i][2]} 
                        value={i} 
                        ifClick={()=>handleClick(i)}                                                    
                        _png={_png}
                    />
                );              
            }
        }
        return thisArray;
    }

    function callTimerReset(){
        // console.log("Reset");
        ref.current.resetFC();
    }

    function callTimerPause(){
        // console.log("callTimerPause");        
        ref.current.toggleFC();
    }    

    function loadOnce(){
        if(oO===1){
            oO=0;
            AudioPlayer();            
            setPNG(Math.floor(Math.random() * (9))+".png");    
            shuffleNumber();
            // soundEffect("openning");

            const topTen = Promise.resolve(getHighScore());
            topTen.then(arg=>setIsTop(arg[0].f_score));              
            // topTen.then(arg=>console.log(arg));                   
        }
    }

    loadOnce();

    return(
        <>                  
            {about && <About _showAbout = {x=>setAbout(x)}/>}
            {quote && <Quote _showQuote = {x=>setQuote(x)}/>}

            {well &&    <WellDone 
                            getTime={ref.current.getTime()} 
                            _isTop={isTop} 
                            _score={_score} 
                            _show={x=>setWell(x)} 
                            resetTime={callTimerReset} 
                            shuffle={shuffleNumber} 
                            reset={x=>setScore(x)}                             
                        />
            }

            {showTop && <TopScore 
                            _showTop={x=>setShowTop(x)} 
                            topScore={_score} 
                            getTime={ref.current.getTime()} 
                            onOff={0}                                
                        />
            }                
                    
            <h1 style={titleFont}>15 Puzzle</h1>    
                <div>
                        <div style={container}>
                            <div style={centerDiv}>
                                    <h1 style={_scoreLabels}>{_score}</h1>                        
                                    <ShowTimer ref={ref}/>
                                    {loadBoard()}
                                    <LoadButton pauseTime={callTimerPause} resetTime={callTimerReset} shuffle={shuffleNumber} reset={x=>setScore(x)}/>                                                                                                          
                            </div>
                        </div>     
                    {/* <button onClick={()=>{setWell(true)}}>Well don</button>                     */}
                </div>   
                {/* <div className="glassmorphism">
                    <div style={_bottom}>
                        <h1>About</h1>
                        <h1>Top 10 Best Players</h1>                    
                        <p>The Man Who Wins Is The Man Who Thinks He Can.</p>
                        <p>A Quitter Never Wins And A Winner Never Quits</p>
                    </div>
                </div> */}

                <div className="_footer">
                    <div className="glassmorphism">            
                        <button onClick={()=>{playAudio("top"); setShowTop(true)}} className="_puzzle">Top 10 Best Players</button>
                        <button className="_puzzle" onClick={()=>{setAbout(true)}}>About</button>
                        <button className="_puzzle"><a href="https://15puzzle.s3.amazonaws.com/index.html">How To</a></button>
                        <button className="_puzzle" onClick={()=>{setQuote(true)}}>Quote</button>                        
                    </div>
                </div>
                

                {/* 
                powered by:
                AWS 
                React
                NodeJS
                MySQL                
                Author: Regin B. Calaguas
                */}
        </>
    );
}

