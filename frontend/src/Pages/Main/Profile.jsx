import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { Avatar, Fab, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
  const { api, auth } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editMode, setEditMode] = useState(false);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${api}/auth/profile`);
      if (res) {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (auth?.token) getProfile();
  }, [auth]);

  const firstName = name.split(' ')[0] || '';
  const lastName = name.split(' ')[1] || '';

  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-12 min-h-[84.8vh] gap-8">
      {/* Left: Avatar */}
      <div className="flex justify-center lg:w-1/3">
        <Avatar
          alt="User"
          src={`${api}/auth/photo/${auth.userId}`}
          sx={{
            width: 250,
            height: 250,
            padding: 1,
            borderRadius: '20px',
            boxShadow:
              'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
          }}
        />
      </div>

      {/* Right: Info */}
      <div className="lg:w-2/3 w-full">
        <form className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <Fab
              variant="extended"
              size="small"
              onClick={() => setEditMode(!editMode)}
              className="!h-8 !min-h-[0] !px-3"
            >
              <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
              Edit
            </Fab>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <TextField
              label="First Name"
              value={firstName}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Email"
              value={email}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Phone"
              value={phone}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;

