import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/auth';
import { Avatar, Fab, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import avatar from "../../Assets/Avatar.jpg";

const Profile = () => {
  const { api, auth } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(false);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${api}/auth/profile`, {
        headers: { Authorization: `${auth?.token}` },
      });
      if (res?.data?.user) {
        const [fName, lName] = res.data.user.name.split(' ');
        setFirstName(fName || '');
        setLastName(lName || '');
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setPreview(res.data.user.photo.length>0);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
console.log(preview)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', `${firstName} ${lastName}`);
      formData.append('email', email);
      formData.append('phone', phone);
      if (photo) formData.append('photo', photo);

      await axios.put(`${api}/auth/update`, formData, {
        headers: {
          Authorization: `${auth?.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setEditMode(false);
      getProfile();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  useEffect(() => {
    if (auth?.token) getProfile();
  }, [auth]);

  return (
    <div className="flex flex-col lg:flex-row p-6 lg:p-12 min-h-[84.8vh] gap-8">
      {/* Left: Avatar */}
      <div className="flex flex-col  items-center lg:w-1/3 gap-4 mix-blend-multiply">
        <Avatar
          alt="User"
          src={preview?`${api}/auth/photo/${auth.userId}`: avatar}
          sx={{
            width: 250,
            height: 250,
            padding: 1,
            borderRadius: '20px',
            boxShadow:
              'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
          }}
        />
        {editMode && (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="text-sm"
          />
        )}
      </div>

      {/* Right: Info */}
      <div className="lg:w-2/3 w-full">
        <form className="w-full" onSubmit={handleUpdate}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <Fab
              variant="extended"
              size="small"
              onClick={() => setEditMode(!editMode)}
              className="!h-8 !min-h-[0] !px-3"
            >
              <EditIcon sx={{ fontSize: '16px', mr: 1 }} />
              {editMode ? 'Cancel' : 'Edit'}
            </Fab>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              InputProps={{ readOnly: !editMode }}
            />
          </div>

          {editMode && (
            <Button variant="contained" type="submit" color="primary">
              Save Changes
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
