import { useState } from "react";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { LanguageTexts } from "@shared/types/Conversation.ts";

function Translation({ languageText, englishTranslation }: LanguageTexts) {
  const [isOnEnglishTranslation, setisOnEnglishTranslation] = useState(false);

  const handleTranslationChange = () => {
    setisOnEnglishTranslation((isOnEnglishTranslation) => !isOnEnglishTranslation);
  };

  return (
    <div>
      <ToggleButtonGroup
        value={isOnEnglishTranslation}
        exclusive
        onChange={handleTranslationChange}
        aria-label="TranslationButtons"
      >
        <ToggleButton value="german" color="primary">
          DE
        </ToggleButton>
        <ToggleButton value="english" color="secondary">
          EN
        </ToggleButton>
      </ToggleButtonGroup>

      <TextField
        id="translation-box"
        label={isOnEnglishTranslation ? "English" : "German"}
        multiline
        rows={4}
        value={isOnEnglishTranslation ? englishTranslation : languageText}
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    </div>
  );
}

export default Translation;
