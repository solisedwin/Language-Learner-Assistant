import Fab, { type FabProps } from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { ToggleButton, type SvgIconTypeMap } from '@mui/material';
import type { RoleplayScenario } from '../backend/scenarios/types.ts';
import {request} from './AxiosUtil';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import Microphone from './Microphone.tsx';
import Translation from './Translation.tsx';

type MuiIconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

type RoleplayScenarioButtons = {
    scenario: RoleplayScenario,
    icon: MuiIconComponent,
    color:  FabProps['color'],
}

function ScenarioSelector() {
    const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
    const [showAudioPlayer, setShowAudioPlayer] = useState(false);
    const [languageTexts , setLanguageTexts] = useState({
        germanText: '',
        englishTranslation: ''
    });
  
    const [audioSource, setAudioSource] = useState('');

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

    const startRolePlay = () => {
        request({
            method: 'POST',
            url: '/converse',
            data: {
                scenario: roleplayScenario
            },
        }).then(response => {
            if('data' in response) {
                const germanText = response.data.text ?? '';
                const englishTranslation = response.data.translation ?? '';
                
                setLanguageTexts({
                    germanText: germanText,
                    englishTranslation: englishTranslation
                });
              
                setAudioSource(response.data.audioURLSrc);
                setShowAudioPlayer(true);
            }
        }).catch(error => {
            console.log(error)
        })
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

          { showAudioPlayer && 
                <Card sx={{maxWidth: 300}}>
                    <CardMedia
                        sx={{height:40}}
                        component="audio"
                        controls
                        src={audioSource}
                    >
                    </CardMedia>
                </Card>
        }   

            <Microphone />

            <Translation 
                {...languageTexts}
             />

        </div>
    );
}

export default ScenarioSelector;