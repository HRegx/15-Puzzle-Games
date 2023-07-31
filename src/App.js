import React from 'react';
import { useState, useRef } from "react";


import { Button, Dimensions, TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

import Square from "./component/comSquare"; 
import PersonalFont from './component/customFont';
import LoadButton from './component/button';
import ShowModal from './component/modal';
import ShowTimer from './component/showtimer';
import WellDone from './component/welldone';
import TopScore from './component/topscore';
import BlinkingText from './component/blink';


// const numInfo =[      
//   [15,270,360], [0,0,90],   [1,90,90],   [2,180,90],  
//   [3,270,90],   [4,0,180],  [5,90,180],  [6,180,180], 
//   [7,270,180],  [8,0,270],  [9,90,270],  [10,180,270], 
//   [11,270,270], [12,0,360], [13,90,360], [14,180,360]                        
// ];


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const sQ = screenWidth / 5;
const sM = sQ / 5;
// const leftMargin = squareSpan / 2;


var oO = 1;
const c_1 = 0;
const c_2 = Math.floor(sQ + sM);
const c_3 = Math.floor((sQ * 2) + (sM * 2));
const c_4 = Math.floor((sQ * 3) + (sM * 3));
const mainSQ = Math.floor((sQ * 4) + (sM * 3) + 5);

const numInfo =[      
          [15,c_4,c_4], 
          [0,c_1,c_1],   [1,c_2,c_1],   [2,c_3,c_1],  [3,c_4,c_1],   
          [4,c_1,c_2],  [5,c_2,c_2],  [6,c_3,c_2], [7,c_4,c_2],  
          [8,c_1,c_3],  [9,c_2,c_3],  [10,c_3,c_3], [11,c_4,c_3], 
          [12,c_1,c_4], [13,c_2,c_4], [14,c_3,c_4]                        
];




const screenConfig = (sWidth) => {
  sWidth = sWidth;
          return StyleSheet.create({
                    superWhite:{
                              backgroundColor: 'white',
                              paddingTop: 20,
                    },        
                    centered:{
                              // flex: 1,
                              alignItems: 'center',
                              // justifyContent: 'center',                              
                              // paddingTop: 20,
                    },                    
                    mainBoard: {
                              // borderWidth: 2,
                              // borderColor: 'red',
                              // backgroundColor: 'green',
                              // position: "absolute",
                              height: 400,
                              width: mainSQ,
                              // left: 0,
                              top: 30,
                              padding: 0,
                              margin: 0,
                              border: 0,
                    },
                    marginTop30:{
                              top : 30,                   
                    },
                    scoreTitle: {
                              width: screenWidth-(sM*2),
                              height: 20,                              
                    },                                        
                    scoreContainer: {                              
                              width: screenWidth-(sM*2),
                              height: 50,
                              // backgroundColor: '#fff',
                              backgroundColor: '#F4B400',
                              borderRadius: 5,
                              // shadowColor: "#F4B400",
                              shadowColor: 'black',
                              shadowOpacity: 0.2,
                              shadowOffset: {
                                width: 2,
                                height: 2,
                              },
                              shadowRadius: 10,
                              elevation: 20, // For Android shadow
                    },   

                    buttonContainer: {
                              width: screenWidth-(sM*2),
                              height: 50,
                              // backgroundColor: "black",
                    },                    
                    
                    
                    titleContainer: {
                              flexDirection: 'row', // Aligns the columns horizontally                              
                              // justifyContent: 'space-between', // Adds space between the columns                              
                    },
                    column: {
                              flex: 1, // Makes the columns occupy equal width                                                            
                    },
                    leftText: {
                              textAlign: 'left', // Aligns the text to the left
                              // paddingLeft: 0,
                    },
                    rightText: {
                              textAlign: 'right', // Aligns the text to the right                              
                    },
                    bleft: {
                              alignItems: 'center', // Aligns the text to the left
                    },
                    bright: {
                              alignItems: 'center', // Aligns the text to the right
                    },  
                    footerContainer:{
                      paddingTop: 20,
                      textAlign: 'center',
                      left: 0,
                      bottom: 0,
                      // position: 'absolute',
                      alignItems: 'center',
                      width: '100%',
                    },           
          });
}








export default function Main(){ 

console.log("Main")

const style = screenConfig(screenWidth);

const ref = useRef();     
const [pGame, setPGame] = useState(false);    
// const [about, setAbout] = useState(false);
const [isTop, setIsTop] = useState(100);
const [showTop, setShowTop] = useState(false);
const [well, setWell] = useState(false);
const [_score, setScore] = useState(0);
const [_value, setValue] = useState(numInfo);    
const [count, setCount] = useState(0);
const [_png, setPNG] = useState();


var new_value = [..._value];
var thisArray = [];
var _swap =[];

function loadBoard(){    
          for(let i=0;i<=15;i++){
                    if(i!==0){          
                              thisArray.push(<Square 
                                        key={i}
                                        sLeft={_value[i][1]} 
                                        sTop={_value[i][2]} 
                                        ifClick={()=>handleClick(i)}
                                        sValue={i} 
                                        sSize ={sQ}
                                        _png={_png}
                                        />
                                        );
                    }                 
          }    
          return thisArray;
}

const sideCheck = (i, c) => {    
          if(((i===3) || (i===7) || (i===11)) && (c===1)){
          return false;
          }
          if(((i===4) || (i===8) || (i===12)) && (c===2)){
          return false;
          }        
          return true;
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
          //     alert("Success...");
          //     playAudio("success");
                setWell(true);
          }
}
  
function handleClick(i){            
_swap = [];        
canSlide(false);                
          for(let j=0;j<_swap.length;j++){
          if(_swap[j]===i){
                    // playAudio("slide");       
                    swapper(i);
                    isFinish();
                    setScore(_score + 1);                 
                    return;
          }
          }    
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

function newGame(){
          shuffleNumber() ;
          setScore(0);    
          ref.current.resetFC();  
}

function pauseGame(){
          console.log("pause Game");
          if(pGame===false){
                    setPGame(true);
          }else{
                    setPGame(false);
          }          
          ref.current.toggleFC();          
}

function closeWell(){
          shuffleNumber();
          setScore(0);    
          ref.current.resetFC();            
          setWell(false);          
}

function loadOnce(){
          if(oO===1){
              oO=0;
          //     AudioPlayer();            
                    setPNG(Math.floor(Math.random() * (9)));    
                    shuffleNumber();
          //     soundEffect("openning");
  
          //     const topTen = Promise.resolve(getHighScore());
          //     topTen.then(arg=>setIsTop(arg[0].f_score));              
             
          }
}
  
loadOnce();

return (
                    
          <View style={[style.centered, style.superWhite]}> 

          {pGame && <ShowModal myToggle={pauseGame}/>}

                    {well &&    <WellDone _isTop={isTop} _score={_score} _time={ref.current.getTime()} onClicks={closeWell}/> }
                    

                    {/* {showTop && <TopScore />} */}


                    <View>
                              <PersonalFont myText={"15 Puzzle"} myFont={"RubikVinyl-Regular"} mySize={50} myColor={"#0F9D58"}/>
                    </View>

                    <View style={style.scoreTitle}>
                              <View style={style.titleContainer}>
                                        <View style={style.column}>
                                                  <Text style={style.leftText}>TIME</Text>
                                        </View>
                                        <View style={style.column}>
                                                  <Text style={style.rightText}>MOVES</Text>
                                        </View>
                              </View>    
                    </View>                    

                    <View style={style.scoreContainer}>
                              <View style={style.titleContainer}>
                                        <View style={style.column}>
                                                  <Text style={style.leftText}>
                                                            {console.log("Main ShowTimer")}
                                                            <ShowTimer ref={ref}/>
                                                            {/* {console.log(ref.current.getTime())} */}
                                                  </Text>
                                        </View>
                                        <View style={style.column}>
                                                  {/* <Text style={style.rightText}> */}
                                                            <PersonalFont myText={_score} myFont={"STAMPWRITERKIT"} mySize={40} myColor={"white"}/>                                        
                                                  {/* </Text> */}
                                        </View>
                              </View>                                          
                    </View>               

                    <View style={style.centered}>
                              <View style={style.mainBoard}>           
                                        {loadBoard()}
                                        {/* <Button title="Press Me" onPress={handlePress} />                               */}
                              </View>    
                    </View>

                    <View style={style.buttonContainer}>
                              <View style={style.titleContainer}>
                                        <View style={style.column}>
                                                  <View style={style.bleft}>
                                                            <LoadButton shuffle={newGame} bheight={50} bwidth={(sQ * 2)} bbcolor={"#0F9D58"} btcolor={"white"} bfontsize={22} btext={"NEW GAME"} />                                                            
                                                  </View>
                                        </View>
                                        <View style={style.column}>
                                                  <View style={style.bright}>
                                                            <LoadButton shuffle={pauseGame} bheight={50} bwidth={(sQ * 2)} bbcolor={"#DB4437"} btcolor={"white"} bfontsize={22} btext={"PAUSE"} />
                                                  </View>
                                        </View>
                              </View>
                    </View> 

                    <View style={style.footerContainer}>  
                              <Text>TOP TEN BEST PLAYERS</Text>
                              <Text>ABOUT</Text>
                              <Text>HOW TO</Text>
                    </View>         

                   
          </View>

  

);

};


