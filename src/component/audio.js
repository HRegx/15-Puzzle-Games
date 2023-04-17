import openningEffect from "./effect/openning.mp3"
import slideEffect from "./effect/slide.wav";
import topEffect from "./effect/top.wav"
import successEffect from "./effect/success.mp3";
import pauseEffect from "./effect/pause.wav";
import nopeEffect from "./effect/nope.wav";


const audioContext = new AudioContext();
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
                                  playAudio("openning");
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


//<button onClick={() => playAudio(audioBuffers[0])}>Play Audio 1</button> 


// function AudioPlayer() {
//   const [audioContext, setAudioContext] = useState(null);
//   const [audioBuffers, setAudioBuffers] = useState([]);

//   useEffect(() => {
//     // create new AudioContext object
//     const context = new AudioContext();
//     setAudioContext(context);

//     // load audio files as buffers
//     const audioFileNames = [openningEffect, pauseEffect, slideEffect];
//     Promise.all(audioFileNames.map(fileName => fetch(fileName)
//       .then(response => response.arrayBuffer())
//       .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
//     ))
//     .then(buffers => setAudioBuffers(buffers))
//     .catch(error => console.error(error));
//   }, []);

//   const playAudio = (buffer) => {
//     if (audioContext && buffer) {
//       // create audio source node and connect to context
//       const sourceNode = audioContext.createBufferSource();
//       sourceNode.buffer = buffer;
//       sourceNode.connect(audioContext.destination);

//       // start playing audio
//       sourceNode.start();
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => playAudio(audioBuffers[0])}>Play Audio 1</button>
//       <button onClick={() => playAudio(audioBuffers[1])}>Play Audio 2</button>
//       <button onClick={() => playAudio(audioBuffers[2])}>Play Audio 3</button>
//     </div>
//   );
// }

// export default AudioPlayer;




