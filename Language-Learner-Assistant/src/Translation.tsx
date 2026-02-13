
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

function Translation({germanText} : {germanText: string}) {
    
    const [text, setText] = useState(germanText);
      
    return (
        <Card>
            <CardContent>
            <Typography variant="body2">
                {germanText}
            </Typography>        
            </CardContent>
        </Card>


    )

}

export default Translation;