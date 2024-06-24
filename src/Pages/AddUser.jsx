import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AddPost } from '../Slices/AddSlice';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AddUser() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const {} = useSelector((state)=>{
    //   console.log("ADD_USER_STATE....", state?.add)
    //   return state?.add
    // })

    const {register, watch, reset, setValue, formState : {errors}, handleSubmit} = useForm()

    console.log(watch(["name", "email", "phone"]))

    const {isPending, mutate}= useMutation({
        mutationFn : (data) => dispatch(AddPost(data)),

        onSuccess : (response)=>{
            console.log("User Added Successfully....", response)
            if (response?.payload){
                toast.success("User Added Successfully.")
                navigate("/allusers")
                reset()
            }
        },

        onError : (error)=>{
            console.log("Error : ",error)
        }
    })



  const onsubmit = async(data) => {
    console.log("DATA......", data)

    mutate(data)
    // await dispatch(AddPost(data))
   
  };



  

  return (
    <Layout>

    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}  >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onsubmit)} noValidate sx={{ mt: 1 }}>
            
            <TextField   margin="normal" required  fullWidth  id="name"  label="Name"  {...register("name", { required: true })} />
            <br />
            {errors.name?.type === "required" && (<span style={{color : "red"}}> This Field is required</span> )}

            <TextField   margin="normal" required  fullWidth  id="email"  label="Email Address"  {...register("email", { required: true })} />
            <br />
            {errors.email?.type === "required" && (<span style={{color : "red"}}> This Field  is required</span> )}

            <TextField   margin="normal" required  fullWidth  id="phone"  label="Phone"  {...register("phone", { required: true })} />
            <br />
            {errors.phone?.type === "required" && (<span style={{color : "red"}}> This Field  is required</span> )}

           
            
            <Button type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} >
             Add User
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>

    </Layout>

  );
}