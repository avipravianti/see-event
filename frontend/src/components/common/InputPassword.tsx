import { useState, type ChangeEvent, type MouseEvent } from 'react';
import {
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface InputPasswordProps {
  text: string;
  name: string;
  data: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  error?: boolean;
}

export default function InputPassword({
  text,
  name,
  data,
  changeHandler,
  errorMessage,
  error,
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <FormControl error={error} sx={{ marginBottom: '16px' }}>
      <InputLabel>{text}</InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        label={text}
        value={data}
        name={name}
        onChange={changeHandler}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword((prev) => !prev)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              aria-label="toggle password visibility"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        sx={{ width: 600 }}
      />
      {errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
    </FormControl>
  );
}
