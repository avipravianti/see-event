import { useState, type SyntheticEvent } from 'react';
import { Avatar, Box, Tab, Tabs } from '@mui/material';
import ButtonSignOut from '@/components/common/ButtonSignOut';
import EditProfileForm from '@/components/account/EditProfileForm';
import ChangePasswordForm from '@/components/account/ChangePasswordForm';
import { useAccount } from '@/api/auth';
import './MyAccount.css';

const FALLBACK = {
  firstName: 'Pratur',
  lastName: 'Anahata Pratama',
  email: 'praturanhata45@gmail.com',
  image: undefined as string | undefined,
};

export default function MyAccount() {
  const { data } = useAccount();
  const user = data ?? FALLBACK;
  const fullName = `${user.firstName} ${user.lastName ?? ''}`.trim();
  const [tab, setTab] = useState(0);

  const changeTab = (_e: SyntheticEvent, value: number) => setTab(value);

  return (
    <div className="account-container">
      <div className="account-hero">
        <div className="account-id">
          {user.image ? (
            <img src={user.image} className="account-img" alt="avatar" />
          ) : (
            <Avatar sx={{ width: 130, height: 130, mb: '11px' }}>{user.firstName[0]}</Avatar>
          )}
          <h1>{fullName}</h1>
          <p>{user.email}</p>
        </div>
        <ButtonSignOut />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 6, width: 600 }}>
          <Tabs value={tab} onChange={changeTab}>
            <Tab label="Edit Profile" sx={{ textTransform: 'unset', fontWeight: 'bold' }} />
            <Tab label="Password" sx={{ textTransform: 'unset', fontWeight: 'bold' }} />
          </Tabs>
        </Box>

        <Box sx={{ mt: 4 }}>
          {tab === 0 ? <EditProfileForm user={user} /> : <ChangePasswordForm />}
        </Box>
      </div>
    </div>
  );
}
