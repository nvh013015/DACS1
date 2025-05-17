import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled, alpha } from '@mui/material/styles';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Messbox = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: '16px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(1),
    width: '100%',
    marginLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
  }));
  
const LeftIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    left: 0, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }));

const RightIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    right: 0, 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }));
  
const StyledInputBase = styled(TextareaAutosize)(({ theme }) => ({
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 'none',
    resize: 'none',
    outline: 'none',
    padding: theme.spacing(1.5, 4, 1, 4),
    width: '100%',
    fontSize: '1.0rem',       
    fontFamily: 'inherit',   
    lineHeight: 1.0,  
  }));
  
export default function Messinput() {
  const handleEmojiClick = () => {
    alert('Emoji icon clicked!');
  };

  const handleSendClick = () => {
    alert('Send message!');
  };

  return (
    <Messbox>
      <LeftIconWrapper onClick={handleEmojiClick}>
        <SentimentVerySatisfiedOutlinedIcon />
      </LeftIconWrapper>
      <StyledInputBase placeholder="Nhập tin nhắn..." />
      <RightIconWrapper onClick={handleSendClick}>
        <SendOutlinedIcon />
      </RightIconWrapper>
    </Messbox>
  );
}