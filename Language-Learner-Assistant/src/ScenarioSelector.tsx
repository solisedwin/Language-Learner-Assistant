import LoadingIndicator from './LoadingIndicator.tsx';
import { useLoading } from './hooks/useLoading.ts';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import type { RoleplayScenario } from './../shared/types/RoleplayScenario.ts';
import { startConversation } from './api/features/Conversation/Conversation.ts';
import RolePlayOptionButtons from './RolePlayOptionButtons.tsx';
import Microphone from './Microphone.tsx';
import Translation from './Translation.tsx';
import type { AIConversationResponse } from '@shared/types/Conversation.ts';

type LanguageTexts = {
    germanText: string,
    englishTranslation: string
}

function ScenarioSelector() {
    const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
    const [isShowingRoleplayOptionButtons, setIsShowingRoleplayOptionButtons] = useState(true);

    const [languageTexts , setLanguageTexts] = useState<LanguageTexts>({
        germanText: '',
        englishTranslation: ''
    });
    const [audioSource, setAudioSource] = useState('');

    const AIAudioSpeechRef = useRef<HTMLAudioElement>(null)
  
    const onRolePlaySelection = (rolePlay: RoleplayScenario) => {
        setRoleplayScenario(rolePlay);
    }

    const startRolePlay = async () => {
        setIsShowingRoleplayOptionButtons(false);
        startRequest();
        try{
            const {germanText, englishTranslation, audioURLSrc} : AIConversationResponse  = await startConversation(roleplayScenario);
            
            setLanguageTexts({
                germanText:germanText,
                englishTranslation: englishTranslation
            });

            if(audioURLSrc){
                setAudioSource(audioURLSrc);
                AIAudioSpeechRef.current?.play();
            }
        }
        catch(error){
            console.error('Error: ', error);
        } 
        finally{
            stopRequest();
        }
    };

    const {isLoading, startRequest, stopRequest} = useLoading();

    return (
        <div>
            Current Roleplay scenario: {roleplayScenario}
            { 
                isShowingRoleplayOptionButtons 
                    &&  
                <RolePlayOptionButtons
                    onRolePlaySelection = {onRolePlaySelection}
                /> 
            }
                
            <Button
                variant="contained"
                color='success'
                onClick={startRolePlay}>
                Start Roleplay
            </Button>

            {isLoading && <LoadingIndicator /> }

       {audioSource && (
            <audio
                ref={AIAudioSpeechRef}
                src={audioSource}
                controls
            />
        )}
        <Button
            onClick={() => AIAudioSpeechRef.current?.play()}
        >
        Play AI Audio Response
        </Button>

            <Microphone />

            <Translation 
                {...languageTexts}
             />

        </div>
    );
}

export default ScenarioSelector;