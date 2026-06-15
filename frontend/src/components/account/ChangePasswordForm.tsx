import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InputPassword from '@/components/common/InputPassword';
import { useChangePassword } from '@/api/auth';
import { validatePassword, type PasswordErrors } from '@/utils/validate';

const EMPTY = { oldPassword: '', newPassword: '', confirmPassword: '' };

export default function ChangePasswordForm() {
  const changePassword = useChangePassword();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [done, setDone] = useState(false);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setDone(false);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePassword(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    changePassword.mutate(
      { oldPassword: values.oldPassword, newPassword: values.newPassword },
      {
        onSuccess: () => {
          setDone(true);
          setValues(EMPTY);
        },
        onError: () => setErrors({ oldPassword: 'Old password is incorrect.' }),
      },
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 600 }}>
      <InputPassword
        name="oldPassword"
        text="Old Password"
        data={values.oldPassword}
        changeHandler={changeValue}
        error={Boolean(errors.oldPassword)}
        errorMessage={errors.oldPassword}
      />
      <InputPassword
        name="newPassword"
        text="New Password"
        data={values.newPassword}
        changeHandler={changeValue}
        error={Boolean(errors.newPassword)}
        errorMessage={errors.newPassword}
      />
      <InputPassword
        name="confirmPassword"
        text="Confirm New Password"
        data={values.confirmPassword}
        changeHandler={changeValue}
        error={Boolean(errors.confirmPassword)}
        errorMessage={errors.confirmPassword}
      />

      {done ? (
        <Typography sx={{ color: '#2e7d32', mb: 1, fontFamily: 'Noto Sans' }}>
          Password changed.
        </Typography>
      ) : null}

      <Button
        type="submit"
        variant="contained"
        disabled={changePassword.isPending}
        sx={{ backgroundColor: '#214457', height: 56, width: 600 }}
      >
        Change Password
      </Button>
    </Box>
  );
}
