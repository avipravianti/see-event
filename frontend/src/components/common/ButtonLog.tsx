import { Button } from '@mui/material';

interface ButtonLogProps {
  text: string;
  disabled?: boolean;
}

export default function ButtonLog({ text, disabled }: ButtonLogProps) {
  return (
    <Button
      variant="contained"
      type="submit"
      disabled={disabled}
      sx={{ backgroundColor: '#214457', height: 56 }}
      fullWidth
    >
      {text}
    </Button>
  );
}
