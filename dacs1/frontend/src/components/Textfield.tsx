import TextField, {TextFieldProps} from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
export const TextFieldComponent = (props: TextFieldProps) => {
    const theme = useTheme();
    return (
        <TextField
            {...props}
            variant="outlined"
            fullWidth
            sx={{
                '& label': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'white',
                    },
                    '&:hover fieldset': {
                        borderColor: '#888',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#007bff',
                    },
                },
                '& .MuiInputBase-input': {
                    color: 'white',
                },
                margin: '10px',

            }}
        />
    );
}