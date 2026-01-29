import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { ToggleButton } from '@mui/material';
import type { RoleplayScenario } from '../backend/types';
import {request} from './AxiosUtil';

function ScenarioSelector() {
    const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');

    const startRolePlay = () => {
        request({
            method: 'POST',
            url: '/OpenAI/converse'
        }).then(response => {
            console.log(response);
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
                        <Button variant="contained" color='success' onClick={() => startRolePlay()}> Start Roleplay </Button>
                    </Grid>
                </Grid>
            </ToggleButtonGroup>

        </div>
    );
}

export default ScenarioSelector;