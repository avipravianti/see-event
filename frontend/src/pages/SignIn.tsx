import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, FormHelperText } from '@mui/material';
import InputText from '@/components/common/InputText';
import InputPassword from '@/components/common/InputPassword';
import ButtonLog from '@/components/common/ButtonLog';
import { useSignIn } from '@/api/auth';
import './Auth.css';

export default function SignIn() {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    signIn.mutate(values, {
      onSuccess: () => navigate('/'),
      onError: () => setErrorMessage('Invalid email and password combination'),
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '40px', textAlign: 'center' }}>
          Welcome back !
          <FormHelperText
            error
            sx={{
              fontSize: '20px',
              textAlign: 'center',
              visibility: errorMessage ? 'visible' : 'hidden',
            }}
          >
            {errorMessage || ' '}
          </FormHelperText>
        </Typography>
        <form onSubmit={handleSubmit}>
          <InputText
            name="email"
            text="Email"
            error={Boolean(errorMessage)}
            data={values.email}
            changeHandler={changeValue}
          />
          <InputPassword
            name="password"
            text="Password"
            error={Boolean(errorMessage)}
            data={values.password}
            changeHandler={changeValue}
          />
          <ButtonLog text="Sign In" disabled={signIn.isPending} />
        </form>
        <p className="auth-help">Forgot Password?</p>
      </div>
    </div>
  );
}
