import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import { useForm } from 'react-hook-form';


export default function Login() {
  const { register, handleSubmit } = useForm({});
  
    const loginForm = async (values) => {
      console.log(values);
  
      try {
  
        const response = await axios.post(`https://knowledgeshop.runasp.net/api/Auth/Account/Login`, values);
        if(response.status == 200){
          localStorage.setItem("token",response.data.accessToken);
        }

        console.log(response);
  
      } catch (err) {
        console.log(err.response?.data);
      }
  
    }
  
  
  
    return (
      <Dialog open={true} fullWidth maxWidth="xs">
        <DialogContent>
  
          <Box component={"form"} onSubmit={handleSubmit(loginForm)}>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              LOGIN
            </Typography>
  
            
            <TextField {...register('email')} fullWidth margin="dense" label="Email" variant="outlined" />
            <TextField {...register('password')} fullWidth margin="dense" type="password" label="Password" variant="outlined" />
  
            <Button variant="contained" type='submit' fullWidth sx={{ mt: 2, py: 1.2 }}>
              LOGIN
            </Button>
  
          </Box>
  
  
  
        </DialogContent>
      </Dialog>
    )
}
