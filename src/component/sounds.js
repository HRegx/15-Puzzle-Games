import nopeEffect from "./effect/nope.wav";
import pauseEffect from "./effect/pause.wav";
import slideEffect from "./effect/slide.wav";
import topEffect from "./effect/top.wav"
import successEffect from "./effect/success.mp3";
import openningEffect from "./effect/openning.mp3"

let audioComponent = [];
audioComponent[0] =  new Audio(openningEffect);                        
audioComponent[1] =  new Audio(slideEffect);                        
audioComponent[2] =  new Audio(topEffect);                        
audioComponent[3] =  new Audio(successEffect);                        
audioComponent[4] =  new Audio(pauseEffect);                        
audioComponent[5] =  new Audio(nopeEffect); 


export function soundEffect(effects){

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
        audioComponent[x].currentTime = 0;
        audioComponent[x].play();        
    }

}
