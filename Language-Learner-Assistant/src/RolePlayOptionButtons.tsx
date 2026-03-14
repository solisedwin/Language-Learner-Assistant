import Fab, { type FabProps } from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import type { RoleplayScenario } from './../shared/types/RoleplayScenario.ts';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import TrainIcon from '@mui/icons-material/Train';
import HotelIcon from '@mui/icons-material/Hotel';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToggleButton, type SvgIconTypeMap } from '@mui/material';

type MuiIconComponent = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

type RoleplayScenarioButtons = {
    scenario: RoleplayScenario,
    icon: MuiIconComponent,
    color:  FabProps['color'],
}

type RolePlayOptionButtonsProps = {
    onRolePlaySelection: (rolePlaySelection: RoleplayScenario) => void;
}

function RolePlayOptionButtons({onRolePlaySelection}: RolePlayOptionButtonsProps){

    const roleplayScenarioOptions : RoleplayScenarioButtons[]  = [
        {
            scenario: 'Supermarket',
            icon: LocalGroceryStoreIcon,
            color: 'primary'
        },
        {
            scenario: 'TrainStation',
            icon: TrainIcon,
            color: 'secondary'
        },
        {
            scenario: 'Hotel',
            icon: HotelIcon,
            color: 'warning'            
    }];

    return ( 
        <ToggleButtonGroup
                    onChange={(_, roleplayScenario) => onRolePlaySelection(roleplayScenario)}
                    exclusive
                    aria-label='Roleplay Buttons'
        >
            <Grid container spacing={3}>
                {
                    roleplayScenarioOptions.map( ({scenario, icon : Icon, color}, _ ) => (
                        <ToggleButton 
                            key={scenario}
                             value={scenario}
                        >
                            <Fab
                                variant='extended'
                                color={color}
                                component='div'
                            >
                            <Icon sx={{ mr: 1 }} />
                                    {scenario}
                            </Fab>
                            </ToggleButton>
                        ))
                }

            </Grid>
        </ToggleButtonGroup>
    )
}
export default RolePlayOptionButtons;