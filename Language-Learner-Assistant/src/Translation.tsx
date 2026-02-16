import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Translation( { germanText } : { germanText:string } ) {
    const [isOnGermanTranslation, setIsOnGermanTranslation] = useState(true);
    const [englishText, setEnglishText] = useState('');

    useEffect(() => {
        if(!(germanText)){
            // Error message (how should we handle it ?)
            return;
        }

        // Translate from German to English 
    //    const englishTranslation = translateToEnglish(germanText);
     //   setEnglishText(englishText);

    },[]);

    const handleTranslationChange = () => {
        console.log('Changing translation button');
        setIsOnGermanTranslation(currentLanguage => !currentLanguage);
    };

    return (
        <div> 
            <ToggleButtonGroup
                    value={isOnGermanTranslation}
                    exclusive
                    onChange={handleTranslationChange}
                    aria-label="TranslationButtons"
            >
                <ToggleButton 
                    value="german"
                    color='primary'
                >
                    DE
                </ToggleButton>
                <ToggleButton 
                    value="english"
                    color="secondary"
                >
                    EN
                </ToggleButton>
            </ToggleButtonGroup>


            <TextField
                id="translation-box"
                label={isOnGermanTranslation ? 'German' : 'English'}
                multiline
                rows={4}
                value={isOnGermanTranslation ? germanText : englishText}
                slotProps={{
                    input: {
                        readOnly: true,
                    },
            }}
            />
        </div>
    )
}

export default Translation;