import nopeEffect from "./effect/nope.wav";
import pauseEffect from "./effect/pause.wav";
import slideEffect from "./effect/slide.wav";
import topEffect from "./effect/top.wav"
import successEffect from "./effect/success.mp3";
import openningEffect from "./effect/openning.mp3"

export default function AudioEffect({ effects }){    
    //Nothing in Here ....
}


export function soundEffect(effects){
    
    let audioEffects = null;
        console.log(audioEffects);
        
    switch (effects) {
        case 'openning':
            audioEffects = new Audio(openningEffect);            
        break;        
        case 'slide':            
            audioEffects = new Audio(slideEffect);            
        break;
        case 'top':
            audioEffects = new Audio(topEffect);
        break;
        case 'success':
            audioEffects = new Audio(successEffect);
        break;
        case 'pause':
            audioEffects = new Audio(pauseEffect);
        break;
        case 'nope':
            audioEffects = new Audio(nopeEffect);
        break;        

        default:
        break;
    }

    audioEffects.currentTime = 0;
    audioEffects.play();   
}
