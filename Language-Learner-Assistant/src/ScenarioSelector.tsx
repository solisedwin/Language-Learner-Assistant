import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import type { RoleplayScenario } from '../backend/scenarios/types.ts';
import {request} from './AxiosUtil';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

function ScenarioSelector() {
    const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
    const [showAudioPlayer, setShowAudioPlayer] = useState<boolean>(false);
    const [audioSource, setAudioSource] = useState<string | undefined>('');

    const startRolePlay = () => {
        request({
            method: 'POST',
            url: '/converse',
            data: {
                scenario: roleplayScenario
            },
        }).then(response => {
            if('data' in response) {
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
                    <Grid size={4}>
                        <ToggleButton value='Supermarket'>
                            <Fab
                                variant='extended'
                                color='primary'
                                component='div'
                            >
                                <LocalGroceryStoreIcon sx={{ mr: 1 }} />
                                Grocery Store
                            </Fab>
                        </ToggleButton>
                    </Grid>

                    <Grid size={4}>
                        <ToggleButton value='TrainStation'>
                            <Fab
                                variant='extended'
                                color='secondary'
                                component='div'
                            >
                                <TrainIcon sx={{ mr: 1 }} />
                                Train Station
                            </Fab>
                        </ToggleButton>
                    </Grid>

                    <Grid size={4}>
                        <ToggleButton value='Hotel'>
                            <Fab
                                variant='extended'
                                color='warning'
                                component='div'
                            >
                                <HotelIcon sx={{ mr: 1 }} />
                                Hotel
                            </Fab>
                        </ToggleButton>
                    </Grid>

                    <Grid size={12}>
                        <Button 
                            variant="contained" 
                            color='success' 
                            onClick={() => startRolePlay()}>
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
        </div>
    );
}

export default ScenarioSelector;