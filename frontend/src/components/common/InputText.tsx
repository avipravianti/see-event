import { OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material';
import type { ChangeEvent } from 'react';

interface InputTextProps {
  text: string;
  name: string;
  data: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  error?: boolean;
}

export default function InputText({
  text,
  name,
  data,
  changeHandler,
  errorMessage,
  error,
}: InputTextProps) {
  return (
    <FormControl error={error} sx={{ marginBottom: '16px', width: 600 }}>
      <InputLabel>{text}</InputLabel>
      <OutlinedInput label={text} value={data} name={name} onChange={changeHandler} fullWidth />
      {errorMessage ? <FormHelperText>{errorMessage}</FormHelperText> : null}
    </FormControl>
  );
}
