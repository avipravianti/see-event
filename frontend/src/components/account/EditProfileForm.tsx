import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useUpdateProfile } from '@/api/auth';
import { validateProfile, type ProfileErrors } from '@/utils/validate';
import type { ProfileInput, UserDetail } from '@/types';

interface EditProfileFormProps {
  user: UserDetail;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const updateProfile = useUpdateProfile();
  const fileInput = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<ProfileInput>({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    setValues({
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      email: user.email ?? '',
      image: user.image ?? '',
    });
  }, [user]);

  const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setSaved(false);
      setValues((prev) => ({ ...prev, image: String(reader.result) }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    const validationErrors = validateProfile(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    updateProfile.mutate(values, {
      onSuccess: () => setSaved(true),
      onError: (err) => {
        const serverMessage = axios.isAxiosError(err)
          ? (err.response?.data as { message?: string } | undefined)?.message
          : undefined;
        setFormError(
          serverMessage ??
            'Could not save profile. The image may be too large — try a smaller one.',
        );
      },
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {values.image ? (
          <Avatar src={values.image} sx={{ width: 64, height: 64 }} />
        ) : (
          <Avatar sx={{ width: 64, height: 64 }}>{values.firstName[0] ?? '?'}</Avatar>
        )}
        <Button
          variant="contained"
          startIcon={<FileUploadIcon />}
          onClick={() => fileInput.current?.click()}
          sx={{ backgroundColor: '#214457', textTransform: 'unset' }}
        >
          Upload new picture
        </Button>
        <Button
          variant="outlined"
          startIcon={<DeleteOutlineIcon />}
          onClick={() => {
            setSaved(false);
            setValues((prev) => ({ ...prev, image: '' }));
          }}
          sx={{ color: '#214457', borderColor: '#214457', textTransform: 'unset' }}
        >
          Delete
        </Button>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFile}
        />
      </Box>

      <TextField
        name="firstName"
        label="First Name"
        value={values.firstName}
        onChange={changeValue}
        error={Boolean(errors.firstName)}
        helperText={errors.firstName}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={values.lastName}
        onChange={changeValue}
        error={Boolean(errors.lastName)}
        helperText={errors.lastName}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        name="email"
        label="Email"
        value={values.email}
        onChange={changeValue}
        error={Boolean(errors.email)}
        helperText={errors.email}
        fullWidth
        sx={{ mb: 2 }}
      />

      {saved ? (
        <Typography sx={{ color: '#2e7d32', mb: 1, fontFamily: 'Noto Sans' }}>
          Profile saved.
        </Typography>
      ) : null}
      {formError ? (
        <Typography sx={{ color: '#d32f2f', mb: 1, fontFamily: 'Noto Sans' }}>
          {formError}
        </Typography>
      ) : null}

      <Button
        type="submit"
        variant="contained"
        disabled={updateProfile.isPending}
        sx={{ backgroundColor: '#214457', height: 56 }}
        fullWidth
      >
        Save Profile
      </Button>
    </Box>
  );
}
