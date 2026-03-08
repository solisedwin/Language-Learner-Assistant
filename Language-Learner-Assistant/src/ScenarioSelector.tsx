import LoadingIndicator from './LoadingIndicator.tsx';
import { useLoading } from './hooks/useLoading.ts';
import Fab, { type FabProps } from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useRef, useState } from 'react';
import { ToggleButton, type SvgIconTypeMap } from '@mui/material';
import type { RoleplayScenario } from './../shared/types/RoleplayScenario.ts';
import { startConversation } from './api/features/Conversation/Conversation.ts';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import Microphone from './Microphone.tsx';
import Translation from './Translation.tsx';

type MuiIconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

type RoleplayScenarioButtons = {
    scenario: RoleplayScenario,
    icon: MuiIconComponent,
    color:  FabProps['color'],
}

type LanguageTexts = {
    germanText: string,
    englishTranslation: string
}

function ScenarioSelector() {
    const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
    const [languageTexts , setLanguageTexts] = useState<LanguageTexts>({
        germanText: '',
        englishTranslation: ''
    });
    const [audioSource, setAudioSource] = useState('');

    const AIAudioSpeechRef = useRef<HTMLAudioElement>(null)
    const roleplayScenarioOptions : RoleplayScenarioButtons[]  = [
        {
            scenario: 'Supermarket',
            icon: LocalGroceryStoreIcon,
            color: 'primary'
        },
        {
            scenario: 'TrainStation',
            icon: TrainIcon,
            color: 'secondary'
        },
        {
            scenario: 'Hotel',
            icon: HotelIcon,
            color: 'warning'
            
        }];

    const {isLoading, startRequest, stopRequest} = useLoading();

    const startRolePlay = async () => {
        startRequest();
        try{
            const {germanText, englishTranslation, audioURLSrc} = await startConversation(roleplayScenario);
            
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

    return (
        <div>
            Current Roleplay scenario: {roleplayScenario}
            <ToggleButtonGroup
                value={roleplayScenario}
                onChange={(_, roleplayScenario) => setRoleplayScenario(roleplayScenario)}
                exclusive
                aria-label='Roleplay Buttons'
            >
                <Grid container spacing={3}>
            {
                    roleplayScenarioOptions.map( ({scenario, icon : Icon, color}, _ ) => (
                         <ToggleButton 
                            key={scenario}
                            value={scenario}
                        >
                            <Fab
                                variant='extended'
                                color={color}
                                component='div'
                            >
                                <Icon sx={{ mr: 1 }} />
                                {scenario}
                            </Fab>
                        </ToggleButton>
                    ))
            }

            <Grid size={12}>
                <Button
                    variant="contained"
                    color='success'
                    onClick={startRolePlay}>
                        Start Roleplay
                </Button>
            </Grid>

            </Grid>
            </ToggleButtonGroup>

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