import Button from '@mui/material/Button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';
import { useAudioMicRecorder } from './hooks/useAudioMicRecorder';
import { useSpeechRecongnition } from './hooks/useSpeechRecognition';

function Microphone() {
  //const {isRecording, microphoneRef, audioRecordingActions} = useAudioMicRecorder();
  const { isRecordingSpeech, speechRecognitionStart, speechRecognitionEnd } = useSpeechRecongnition();
    
  return (   
        <div>
            <audio
              //  ref={microphoneRef}
                controls
            >
            </audio>

            <Button
                variant="outlined" 
                startIcon={ isRecordingSpeech ?  <StopIcon /> : <RadioButtonCheckedIcon />}
                onClick=  { (!isRecordingSpeech) ? speechRecognitionStart : speechRecognitionEnd} 
            >
              {isRecordingSpeech ? 'Stop' : 'Record' }  
            </Button>

           

        </div>
    )
}
export default Microphone;
