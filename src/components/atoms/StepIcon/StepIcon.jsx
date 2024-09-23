import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function StepIcon(props) {
    const { active, completed } = props;

    if (completed) {
        return <CheckCircleIcon style={{ color: '#44A036', marginLeft: '24px' }} />;
    } else if (active) {
        return  <><ArrowRightIcon/> <CheckCircleOutlineIcon style={{ color: 'grey' }}/></>
    } else {
        return <CheckCircleOutlineIcon style={{ color: 'grey', marginLeft: '24px' }} />;
    }
}

export default StepIcon;