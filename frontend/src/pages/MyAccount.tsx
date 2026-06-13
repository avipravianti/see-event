import { Avatar } from '@mui/material';
import ButtonSignOut from '@/components/common/ButtonSignOut';
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
      </div>
    </div>
  );
}
