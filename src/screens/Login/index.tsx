import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
// import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { FormControl, InputLabel, 
        FilledInput, InputAdornment, IconButton, Typography } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material'

import {CustomizedCardHeader} from './styles';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../provider/authProvider';
const Login = () => {

  const { token, setToken } = useAuth();

  const [isButtonActive, setIsButtonActive] = useState(true);
  const [username, setUsername] = useState<string|null>(null)
  const [password, setPassword] = useState<string|null>(null)
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string|null>(null)

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if(token) {
      navigate('/tarefas', {replace: true});
    }
  }, [token])

  useEffect(() => {
    if(username !== null && username !== '' &&
       password !== null && password !== '') {
        setIsButtonActive(false);
      } else {
        setIsButtonActive(true);
      }
  }, [username, password]);

  const postLogin = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        login: username,
        senha: password
      })
  };
    setErrorMessage('');
    fetch('http://localhost:3000/usuarios/login', requestOptions)
      .then(async (response) => {
        const dataResponse = await response.json()
        return {
          responseStatus: response.status,
          data: dataResponse
        }
      })
      .then(data => {
        console.log('sucesso', JSON.stringify(data))
        console.log(data)
        if(data.responseStatus === 422 && data.data?.mensagem) {
          setErrorMessage(data.data?.mensagem)
        } else if(data.responseStatus === 400) {
          setErrorMessage('Requisição inválida!')
        } else if(data.responseStatus === 200) {
          if(data?.data?.token){
            setToken(data?.data?.token)
          }
        } 
      })
      .catch(error => setErrorMessage('Erro no servidor, tente novamente em alguns minutos!'));
  }
  return (
      <Box sx={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
      }}
       >
        <Card sx={{ maxWidth: 480 }}>
          <CustomizedCardHeader
            title="Tafeito"
            subheader="Transforme suas tarefas em ações"
          />
          <CardContent>
            <Box py={1}>
              <TextField
                onChange={(newValue) => {
                  setUsername(newValue.target.value);
                }}
                fullWidth id="username"
                label="Usuário"
                variant="filled"
              />
            </Box>
            <Box py={1}>
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
              <FilledInput
                onChange={(newValue) => {
                  setPassword(newValue.target.value);
                }}
                id="filled-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            </Box>
          </CardContent>
          <CardActions>
            <Box sx={{
              display:'flex',
              flexDirection:'row',
              width:'100%',
              flexWrap: 'wrap'
            }}>

              <Box width={'100%'}>
                {errorMessage && <Typography color={'red'}>
                  {errorMessage}
                </Typography>}
              </Box>
              <Box width={'100%'}>
                
              <Button
                sx={{
                  width: '100%'
                }}
                onClick={() => {postLogin()}}
                disabled={isButtonActive} fullWidth variant="contained">Login</Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
  )
}


export default Login;