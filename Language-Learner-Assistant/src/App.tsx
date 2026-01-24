import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from 'react';
import { ToggleButton } from '@mui/material';
import type { RoleplayScenario } from '../backend/types';
import AIMicrophone from './AIMicrophone';

import axios from 'axios';

function App() {
  const [roleplayScenario, setRoleplayScenario] = useState<RoleplayScenario>('Supermarket');
  const [showMicrophone, setShowMicrophone] = useState(false);
  
  useEffect(() => {
    //Call backend on page load to get AI text response 
    axios.post('http://localhost:3000/OpenAI')
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));    
  }, []);

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
              {!showMicrophone &&  <Button variant="contained" color='success' onClick={() => setShowMicrophone(true)}> Start Roleplay </Button> }
          </Grid>
        </Grid>
      </ToggleButtonGroup>

        {showMicrophone && <AIMicrophone/> }
    </div>
     
  )
}

export default App
