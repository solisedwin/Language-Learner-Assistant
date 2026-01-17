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
import AIMicrophone from './AIMicrophone';

function App() {

  const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
  const [showMicrophone, setShowMicrophone] = useState(false);

  return (
    <div>
      <ToggleButtonGroup
        value={roleplayScenario}
        onChange={(_,roleplayScenario:RoleplayScenario) => setRoleplayScenario(roleplayScenario)}
        exclusive
        aria-label='Roleplay Buttons'
        >

      <Grid container spacing={3}>
        <Grid size={4}>
          <ToggleButton value='Supermarket'>
            <Fab variant="extended" color='primary'>
                <LocalGroceryStoreIcon sx={{ mr: 1 }} />
                Grocery Store
            </Fab>
          </ToggleButton>
        </Grid>

          <Grid size={4}>
            <ToggleButton value='TrainStation'>
              <Fab variant="extended" color='secondary'>
              <TrainIcon sx={{ mr: 1 }} />
              Train Station
              </Fab>
            </ToggleButton>
          </Grid>

        <Grid size={4}>
          <ToggleButton value='Hotel'>
          <Fab variant="extended" color='warning'>
              <HotelIcon sx={{ mr: 1 }} />
              Hotel
          </Fab>
          </ToggleButton>
        </Grid>

        <Grid size={12}>

        {!showMicrophone &&  <Button variant="contained" color='success' onClick={() => setShowMicrophone(true)}> Start Roleplay </Button> }
        
        </Grid>
        </Grid>
      </ToggleButtonGroup>

        {showMicrophone && <AIMicrophone/> }
    </div>
     
  )
}

export default App
