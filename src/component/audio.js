import openningEffect from "./effect/openning.mp3"
import slideEffect from "./effect/slide.wav";
import topEffect from "./effect/top.wav"
import successEffect from "./effect/success.mp3";
import pauseEffect from "./effect/pause.wav";
import nopeEffect from "./effect/nope.wav";

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioBuffers = [];
let holdAudio = null;

export default function AudioPlayer(){

  const audiofileNames  = [openningEffect, slideEffect, topEffect, successEffect, pauseEffect, nopeEffect];
  Promise.all(audiofileNames.map(fileName => fetch(fileName)
                                .then(response => response.arrayBuffer())
                                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                                )
             )
             .then((buffers) =>  {audioBuffers = buffers;                                                                    
                                  window.addEventListener("canplaythrough",playAudio("openning"));
                                 }
                  )
             .catch(error => console.error(error));
}

export function playAudio( effects ){

let buffer = null;
  switch (effects) {
    case 'openning':
      buffer = audioBuffers[0];
      break;        
    case 'slide':            
      buffer = audioBuffers[1];
      break;
    case 'top':
      buffer = audioBuffers[2];
      break;
    case 'success':
      buffer = audioBuffers[3];
      break;
    case 'pause':
      buffer = audioBuffers[4];
      break;
    case 'nope':
      buffer = audioBuffers[5];
      break;        

    default:
    break;
}

  
  if(holdAudio){
    holdAudio.stop();
  }


  if(buffer){          
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = buffer;
    sourceNode.connect(audioContext.destination);
    holdAudio = sourceNode;
    sourceNode.start();    
  }
}
