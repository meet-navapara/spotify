import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/auth/authSlice'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .max(50, 'Name must be less than 50 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    number: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be at least 10 digits')
      .max(15, 'Must be less than 15 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  })

  return (
    <Grid container sx={{ minHeight: '100vh', width: '100vw' }}>
      {/* LEFT SIDE */}
      <Grid
        item
        size={6}
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'black',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 6,
          textAlign: 'center'
        }}
      >
        <Typography variant='h3' gutterBottom sx={{ color: 'green' }}>
          Join Us!
        </Typography>
        <Typography variant='body1' sx={{ mb: 4 }}>
          Already have an account?
        </Typography>
        <Button
          variant='outlined'
          onClick={() => navigate('/login')}
          sx={{
            borderColor: 'green',
            color: 'green',
            '&:hover': {
              backgroundColor: 'green',
              color: 'white'
            }
          }}
        >
          Login Here
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
          padding: 6
        }}
      >
        <Box sx={{ width: '100%', maxWidth: isSmallScreen ? '100%' : 400 }}>
          <Typography variant='h4' gutterBottom sx={{ color: 'green' }}>
            Register here !
          </Typography>

          <Formik
            initialValues={{ name: '', email: '', number: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await dispatch(registerUser(values)).unwrap()
                navigate('/login')
              } catch (error) {
                console.error('Registration failed:', error)
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isSubmitting
            }) => (
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
                  id='name'
                  name='name'
                  label='Full Name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <TextField
                  fullWidth
                  margin='normal'
                  id='email'
                  name='email'
                  label='Email Address'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <TextField
                  fullWidth
                  margin='normal'
                  id='number'
                  name='number'
                  label='Phone Number'
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.number && Boolean(errors.number)}
                  helperText={touched.number && errors.number}
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{ style: { color: 'white' } }}
                />

                <TextField
                  fullWidth
                  margin='normal'
                  id='password'
                  name='password'
                  label='Password'
                  type='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                    mb: 2,
                    bgcolor: 'green',
                    '&:hover': { bgcolor: 'darkgreen' }
                  }}
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    'Register'
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

export default RegisterForm
