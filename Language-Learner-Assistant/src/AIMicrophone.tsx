import { Collapse } from '@mui/material';
import Fab from '@mui/material/Fab';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function AIMicrophone() {
    return (   
        <Collapse in={false} collapsedSize={100} >
            <Fab sx={{pl: 1}} color='secondary'> 
                <MoreHorizIcon sx={{ mr: 1}} fontSize='large'  
                />
            </Fab>
        </Collapse>
    )
}
export default AIMicrophone
