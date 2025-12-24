
import { Box, Button, CircularProgress, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from '../../validations/RegisterSchema';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';



export default function Register() {

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const [serverErrors, setServerErrors] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: 'onBlur'
  });

  const registerForm = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(`https://knowledgeshop.runasp.net/api/Auth/Account/Register`, values);
      console.log(response);
      if (response.status === 200) {
        setOpen(false);
        navigate('/login');
      }

    } catch (err) {
      const data = err.response?.data;

      if (data?.errors) {
        const messages = Object.values(data.errors).flat();
        setServerErrors(messages);
      } else if (data?.message) {
        setServerErrors([data.message]);
      } else {
        setServerErrors(['Register failed. Please try again.']);
      }
    }
  }

  const handleClose = (event, reason) => {

    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setOpen(false);
      navigate('/');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogContent>

        <Box component={"form"} onSubmit={handleSubmit(registerForm)}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            REGISTER
          </Typography>

          {serverErrors.length > 0 ?
            <Box sx={{
              backgroundColor: '#fdecea',
              border: '1px solid #f5c6cb',
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
            >
              {serverErrors.map((err, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: '#b71c1c' }}
                >
                  {err}
                </Typography>
              ))}
            </Box>
            : null}

          <TextField {...register('userName')} fullWidth margin="dense" label="User Name" variant="outlined"
            error={errors.userName} helperText={errors.userName?.message}
          />
          <TextField {...register('fullName')} fullWidth margin="dense" label="Full Name" variant="outlined"
            error={errors.fullName} helperText={errors.fullName?.message}
          />
          <TextField {...register('email')} fullWidth margin="dense" label="Email" variant="outlined"
            error={errors.email} helperText={errors.email?.message}
          />
          <TextField {...register('password')} fullWidth margin="dense" type="password" label="Password" variant="outlined"
            error={errors.password} helperText={errors.password?.message}
          />
          <TextField {...register('phoneNumber')} fullWidth margin="dense" label="Phone Number" variant="outlined"
            error={errors.phoneNumber} helperText={errors.phoneNumber?.message}
          />
          <Button variant="contained" type='submit' disabled={isSubmitting} fullWidth sx={{ mt: 2, py: 1.2 }}>
            {isSubmitting ? <CircularProgress /> : 'REGISTER'}
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Do you have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#1976d2',
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
