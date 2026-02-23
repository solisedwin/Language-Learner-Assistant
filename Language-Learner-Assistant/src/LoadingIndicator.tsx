
import { CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';

function LoadingIndicator({message} : {message?: string}) {
    return (
        <>
       <CircularProgress />
            {
                message &&  <Alert severity="info">{message}</Alert>
            }
        </>
    
    )
}
export default LoadingIndicator;