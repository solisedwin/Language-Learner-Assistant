import Button from '@mui/material/Button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';
import { useSpeechRecongnition } from './hooks/useSpeechRecognition';

function Microphone() {
  const { isRecordingSpeech, speechTranscript, speechRecognitionStart, speechRecognitionEnd } = useSpeechRecongnition();
    
  return (   
        <div>
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
