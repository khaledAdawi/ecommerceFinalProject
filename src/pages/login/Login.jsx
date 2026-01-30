import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Dialog, DialogContent, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '../../validations/LoginSchema';
import { Link, useNavigate } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { loginMutation, serverErrors } = useLogin();
  const { register, handleSubmit, formState: { errors,isSubmitting }} = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onBlur'
  });
  const {t} = useTranslation();
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      setOpen(false);
      navigate('/');
    }
  };
  const loginForm = async (values) => {
    await loginMutation.mutateAsync(values);
  };
  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogContent>

        <Box component={"form"} onSubmit={handleSubmit(loginForm)}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            {t("LOGIN")}
          </Typography>

          {serverErrors.length > 0 ?
            <Box sx={{ backgroundColor: '#fdecea', border: '1px solid #f5c6cb', borderRadius: 2, p: 2, mb: 2, }}>
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

          <TextField {...register('email')} fullWidth margin="dense" label={t("Email")} variant="outlined"
            error={errors.email} helperText={errors.email?.message}
          />
          <TextField {...register('password')} fullWidth margin="dense" type="password" label={t("Password")} variant="outlined"
            error={errors.password} helperText={errors.password?.message}
          />
          <Button variant="contained" type='submit' disabled={isSubmitting} fullWidth sx={{ mt: 2, py: 1.2 }}>
            {isSubmitting ? <CircularProgress /> : t("LOGIN")}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Link to="/sendCode" style={{ textDecoration: 'none' }}>
              {t("Forgot your password?")}
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  )
}
