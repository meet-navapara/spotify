import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/auth/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, user } = useSelector(state => state.auth)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  })

  return (
    <Grid
      container
      sx={{ minHeight: '100vh', minWidth: '100vw', overflow: 'hidden' }}
    >
      {/* LEFT SIDE */}
      <Grid
        item
        size={6}
        xs={0}
        md={6}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isSmallScreen ? 4 : 8,
          textAlign: 'center'
        }}
      >
        <Typography variant='h3' gutterBottom sx={{ color: 'green' }}>
          Welcome Back!
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          Don’t have an account?
        </Typography>
        <Button
          variant='outlined'
          sx={{
            borderColor: 'green',
            color: 'green',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white'
            }
          }}
          onClick={() => navigate('/register')}
        >
          Register Here
        </Button>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid
        item
        size={6}
        xs={12}
        md={6}
        sx={{
          backgroundColor: '#121212',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: isSmallScreen ? 4 : 8
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant='h4' gutterBottom sx={{ color: 'green' }}>
            Login
          </Typography>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              try {
                const result = await dispatch(loginUser(values)).unwrap() // returns payload if success
                if (result) {
                  navigate('/') // ✅ redirect after login
                }
              } catch (err) {
                console.error('Login failed:', err) // handled via redux error state
              }
            }}
          >
            {({ handleSubmit, handleChange, values, errors, touched }) => (
              <Box component='form' onSubmit={handleSubmit}>
                {error && (
                  <Alert
                    severity='error'
                    sx={{ mb: 2, bgcolor: 'red', color: 'white' }}
                  >
                    {error}
                  </Alert>
                )}

                <TextField
                  fullWidth
                  margin='normal'
                  label='Email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <TextField
                  fullWidth
                  margin='normal'
                  label='Password'
                  name='password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 3,
                    bgcolor: 'green',
                    '&:hover': { bgcolor: 'darkgreen' }
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    'Login'
                  )}
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginForm
