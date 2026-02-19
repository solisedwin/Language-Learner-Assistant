import Button from '@mui/material/Button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useEffect, useRef } from 'react';

function Microphone() {
    // https://www.geeksforgeeks.org/javascript/how-to-record-and-play-audio-in-javascript/
    const microphone = useRef<HTMLAudioElement> (null);
    let mediaRecorder : MediaRecorder;
    let dataArray : BlobPart[] = []; 

    const setAudioMicrophoneRecording = () => {
        let audioIN = { audio: true };
        navigator.mediaDevices.getUserMedia(audioIN)
            .then( mediaStreamObj => {
                if ("srcObject" in microphone) {
                    microphone.srcObject = mediaStreamObj;
                }
                mediaRecorder = new MediaRecorder(mediaStreamObj);

                 // If audio data available then push 
                // it to the chunk array
        mediaRecorder.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        }

        mediaRecorder.onstop = function (ev) {
          // blob of type mp3
          let audioData = new Blob(dataArray, { 'type': 'audio/mp3;' });
          
          dataArray = [];
  
          let audioSrc = window.URL.createObjectURL(audioData);
          if(microphone.current){
              microphone.current.src = audioSrc;
             microphone.current.play();
          }
        }
      })
    }

    const startAudioRecording = () => {
        console.log('Start audio recording');
        mediaRecorder.start();
    }

    const stopAudioRecording = () => {
        mediaRecorder.stop();
        console.log('Stop audio recording');
    }

    useEffect( () => {
        setAudioMicrophoneRecording();
    }, []);

    return (   
        <div>
            <audio
                ref={microphone}
                controls
            >
            </audio>

            <Button
                variant="outlined" 
                startIcon={<RadioButtonCheckedIcon />}
                onClick= {startAudioRecording} 
            >
                Record
            </Button>

            <Button
                variant="outlined" 
                startIcon={<RadioButtonCheckedIcon />}
                onClick= {stopAudioRecording} 
            >
                Stop Recording
            </Button>

        </div>
    )
}
export default Microphone;
