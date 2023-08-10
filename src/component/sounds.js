
import openningEffect from "./effect/openning.mp3"
import slideEffect from "./effect/slide.wav";
import topEffect from "./effect/top.wav"
import successEffect from "./effect/success.mp3";
import pauseEffect from "./effect/pause.wav";
import nopeEffect from "./effect/nope.wav";


let audioComponent = [];
let holdAudio = null;
export function AudioPlayer(){
    audioComponent[0] =  new Audio(openningEffect);                        
    audioComponent[1] =  new Audio(slideEffect);                        
    audioComponent[2] =  new Audio(topEffect);                        
    audioComponent[3] =  new Audio(successEffect);                        
    audioComponent[4] =  new Audio(pauseEffect);                        
    audioComponent[5] =  new Audio(nopeEffect); 
}

export function playAudio(effects){

    switch (effects) {
        case 'openning':
            _play(0);
        break;        
        case 'slide':            
            _play(1);
        break;
        case 'top':
            _play(2);
        break;
        case 'success':
            _play(3);
        break;
        case 'pause':
            _play(4);
        break;
        case 'nope':
            _play(5);
        break;        

        default:
        break;
    }

    function _play(x){
        

        if(holdAudio === audioComponent[2]) {
            console.log(holdAudio.currentTime)
            holdAudio.currentTime = 10.541859;
        }
        
        audioComponent[x].currentTime = 0;
        audioComponent[x].play();        

        holdAudio = audioComponent[x];
               
    }

}
