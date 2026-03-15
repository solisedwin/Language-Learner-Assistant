import { useState } from 'react';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type {LanguageTexts} from '@shared/types/Conversation.ts';

function Translation( { germanText, englishTranslation } : LanguageTexts ) {
    const [isOnGermanTranslation, setIsOnGermanTranslation] = useState(true);
    const handleTranslationChange = () => {
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
                value={isOnGermanTranslation ? germanText : englishTranslation}
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