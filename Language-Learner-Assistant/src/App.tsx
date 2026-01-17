import Fab from '@mui/material/Fab';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

function App() {
  return (
    <Grid container spacing={3}>
      <Grid size={4}>
       <Fab variant="extended" color='primary'>
          <LocalGroceryStoreIcon sx={{ mr: 1 }} />
          Grocery Store
      </Fab>
      </Grid>

        <Grid size={4}>
           <Fab variant="extended" color='secondary'>
          <TrainIcon sx={{ mr: 1 }} />
          Train Station
          </Fab>
        </Grid>

      <Grid size={4}>
        <Fab variant="extended" color='warning'>
            <HotelIcon sx={{ mr: 1 }} />
            Hotel
        </Fab>
      </Grid>

      <Grid size={12}>
        <Button variant="contained" color='success'>Start Roleplay</Button>
      </Grid>
    </Grid>
     
  
  )
}

export default App
