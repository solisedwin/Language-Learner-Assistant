import Button from '@mui/material/Button';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import StopIcon from '@mui/icons-material/Stop';
import { useAudioMicRecorder } from './hooks/useAudioMicRecorder';

function Microphone() {
  const {isRecording, microphoneRef, audioRecordingActions} = useAudioMicRecorder();
    return (   
        <div>
            <audio
                ref={microphoneRef}
                controls
            >
            </audio>

            <Button
                variant="outlined" 
                startIcon={ isRecording ?  <StopIcon /> : <RadioButtonCheckedIcon />}
                onClick= {audioRecordingActions} 
            >
              {isRecording ? 'Stop' : 'Record' }  
            </Button>
        </div>
    )
}
export default Microphone;
