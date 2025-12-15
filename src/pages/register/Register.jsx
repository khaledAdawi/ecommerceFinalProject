import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form'

export default function Register() {


  const { register, handleSubmit } = useForm({});

  const registerForm = async (values) => {
    console.log(values);

    try {

      const response = await axios.post(`https://knowledgeshop.runasp.net/api/Auth/Account/Register`, values);
      console.log(response);

    } catch (err) {
      console.log(err.response?.data);
    }

  }



  return (
    <Dialog open={true} fullWidth maxWidth="xs">
      <DialogContent>

        <Box component={"form"} onSubmit={handleSubmit(registerForm)}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            REGISTER
          </Typography>

          <TextField {...register('userName')} fullWidth margin="dense" label="User Name" variant="outlined" />
          <TextField {...register('fullName')} fullWidth margin="dense" label="Full Name" variant="outlined" />
          <TextField {...register('email')} fullWidth margin="dense" label="Email" variant="outlined" />
          <TextField {...register('password')} fullWidth margin="dense" type="password" label="Password" variant="outlined" />
          <TextField {...register('phoneNumber')} fullWidth margin="dense" label="Phone Number" variant="outlined" />

          <Button variant="contained" type='submit' fullWidth sx={{ mt: 2, py: 1.2 }}>
            REGISTER
          </Button>

        </Box>



      </DialogContent>
    </Dialog>
  )
}
