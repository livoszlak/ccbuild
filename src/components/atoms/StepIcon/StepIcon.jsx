import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function StepIcon(props) {
    const { active, completed } = props;

    if (completed) {
        return <CheckCircleIcon color='success' style={{ marginLeft: '24px' }} />;
    } else if (active) {
        return  <><PlayArrowIcon/> <CheckCircleOutlineIcon color='disabled'/></>
    } else {
        return <CheckCircleOutlineIcon color='disabled' style={{ marginLeft: '24px' }} />;
    }
}

export default StepIcon;