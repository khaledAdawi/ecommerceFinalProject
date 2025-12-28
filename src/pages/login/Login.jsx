import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../../validations/LoginSchema';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Api/axiosInstance';
import { AuthContext } from '../../context/AuthContext';


export default function Login() {

  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const {setToken,setAccessToken} = useContext(AuthContext);


  const [serverErrors, setServerErrors] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur'
  });

  const loginForm = async (values) => {
    console.log(values);
    try {
      const response = await axiosInstance.post(`/Auth/Account/Login`, values);
      if (response.status === 200) {
        setToken(response.data.accessToken);
        setAccessToken(response.data.accessToken);
        setOpen(false);
        navigate('/home');
      }
      console.log(response);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        const messages = Object.values(data.errors).flat();
        setServerErrors(messages);
      } else if (data?.message) {
        setServerErrors([data.message]);
      } else {
        setServerErrors(['Login failed. Please try again.']);
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

        <Box component={"form"} onSubmit={handleSubmit(loginForm)}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            LOGIN
          </Typography>

          {serverErrors.length > 0 ?
            <Box sx={{ backgroundColor: '#fdecea', border: '1px solid #f5c6cb', borderRadius: 2, p: 2, mb: 2,}}>
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

          <TextField {...register('email')} fullWidth margin="dense" label="Email" variant="outlined"
            error={errors.email} helperText={errors.email?.message}
          />
          <TextField {...register('password')} fullWidth margin="dense" type="password" label="Password" variant="outlined"
            error={errors.password} helperText={errors.password?.message}
          />
          <Button variant="contained" type='submit' disabled={isSubmitting} fullWidth sx={{ mt: 2, py: 1.2 }}>
            {isSubmitting ? <CircularProgress /> : 'LOGIN'}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link to="/sendCode" style={{ textDecoration: 'none' }}>
              Forgot your password?
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
