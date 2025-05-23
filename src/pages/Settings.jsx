import { Typography, Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../store/auth/authSlice'

const Settings = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Settings
      </Typography>
      <Button
        variant='contained'
        color='error'
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  )
}

export default Settings
