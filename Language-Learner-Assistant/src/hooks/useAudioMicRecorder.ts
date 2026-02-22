import {useEffect, useRef, useState } from "react";

export function useAudioMicRecorder() {
    // https://www.geeksforgeeks.org/javascript/how-to-record-and-play-audio-in-javascript/

    const microphoneRef = useRef<HTMLAudioElement> (null);
    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const [dataArray, setDataArray] = useState<BlobPart[]>([]);
    const [isRecording, setIsRecording] = useState(false);

     useEffect( () => {
            setAudioMicrophone();
     }, []);

    const setAudioMicrophone = () => {
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

    const audioRecordingActions = () => {
        if(!(isRecording)){
            startAudioRecording();
        } else{
            stopAudioRecording();
        }
        setIsRecording(isRecording => !isRecording);
    }

    const startAudioRecording = () => {
        console.log('Start audio recording');
        mediaRecorderRef.current?.start();
    }

    const stopAudioRecording = () => {
        console.log('Stop audio recording');
        mediaRecorderRef.current?.stop();
    }

    return {
        isRecording,
        microphoneRef,
        audioRecordingActions
    }
}