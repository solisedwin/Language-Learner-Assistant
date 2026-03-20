import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

type SaveTranslationButtonProps = {
  onSave: () => void;
};

function SaveTranslationButton({ onSave }: SaveTranslationButtonProps) {
  return (
    <Tooltip title="Save translation & audio speech content">
      <IconButton size="large" onClick={onSave}>
        <SaveIcon />
      </IconButton>
    </Tooltip>
  );
}
export default SaveTranslationButton;
