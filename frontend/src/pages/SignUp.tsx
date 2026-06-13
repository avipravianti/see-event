import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import InputText from '@/components/common/InputText';
import InputPassword from '@/components/common/InputPassword';
import ButtonLog from '@/components/common/ButtonLog';
import { useSignUp } from '@/api/auth';
import { validateSignUp, type SignUpErrors } from '@/utils/validate';
import type { SignUpPayload } from '@/types';
import './Auth.css';

const EMPTY: SignUpPayload = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUp() {
  const navigate = useNavigate();
  const signUp = useSignUp();
  const [values, setValues] = useState<SignUpPayload>(EMPTY);
  const [errors, setErrors] = useState<SignUpErrors>({});

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignUp(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    signUp.mutate(values, {
      onSuccess: () => navigate('/signin'),
      onError: () => setErrors({ email: 'Sign up failed. Please try again.' }),
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h1>Join us!</h1>
        <form onSubmit={handleSubmit}>
          <InputText
            name="firstName"
            text="First Name"
            error={Boolean(errors.firstName)}
            errorMessage={errors.firstName}
            data={values.firstName}
            changeHandler={changeValue}
          />
          <InputText
            name="lastName"
            text="Last Name"
            error={Boolean(errors.lastName)}
            errorMessage={errors.lastName}
            data={values.lastName}
            changeHandler={changeValue}
          />
          <InputText
            name="email"
            text="Email"
            error={Boolean(errors.email)}
            errorMessage={errors.email}
            data={values.email}
            changeHandler={changeValue}
          />
          <InputPassword
            name="password"
            text="Password"
            error={Boolean(errors.password)}
            errorMessage={errors.password}
            data={values.password}
            changeHandler={changeValue}
          />
          <InputPassword
            name="confirmPassword"
            text="Confirm Password"
            error={Boolean(errors.confirmPassword)}
            errorMessage={errors.confirmPassword}
            data={values.confirmPassword}
            changeHandler={changeValue}
          />
          <ButtonLog text="Sign Up" disabled={signUp.isPending} />
        </form>
        <p className="auth-help">Having issue when signup?</p>
      </div>
    </div>
  );
}
