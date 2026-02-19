import Button from '@mui/material/Button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Microphone() {
    // https://www.geeksforgeeks.org/javascript/how-to-record-and-play-audio-in-javascript/
    const microphoneRef = useRef<HTMLAudioElement> (null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const [dataArray, setDataArray] = useState<BlobPart[]>([]);
  
    const setAudioMicrophoneRecording = () => {
        let audioIN = { audio: true };
        navigator.mediaDevices.getUserMedia(audioIN)
            .then( mediaStreamObj => {
                if ('srcObject' in microphoneRef) {
                    microphoneRef.srcObject = mediaStreamObj;
                }
                mediaRecorderRef.current = new MediaRecorder(mediaStreamObj);

        // If audio data available then push 
        // it to the chunk array
        mediaRecorderRef.current.ondataavailable = function (ev) {
          dataArray.push(ev.data);
        }

        mediaRecorderRef.current.onstop = () => {
          // blob of type mp3
          let audioData = new Blob(dataArray, { 'type': 'audio/mp3;' });

          setDataArray([]);
  
          let audioSrc = window.URL.createObjectURL(audioData);
          if(microphoneRef.current){
              microphoneRef.current.src = audioSrc;
             microphoneRef.current.play();
          }
        }
      })
    }

    const startAudioRecording = () => {
        console.log('Start audio recording');
        mediaRecorderRef.current?.start();
        setIsRecording(true);
    }

    const stopAudioRecording = () => {
        console.log('Stop audio recording');
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    }

    useEffect( () => {
        setAudioMicrophoneRecording();
    }, []);

    return (   
        <div>
            <audio
                ref={microphoneRef}
                controls
            >
            </audio>

            <Button
                variant="outlined" 
                startIcon={ isRecording ?  <CircularProgress />  :   <RadioButtonCheckedIcon />}
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
