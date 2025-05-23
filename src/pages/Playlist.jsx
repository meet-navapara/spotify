import React, { useEffect, useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPlaylist,
  removeTrack,
  updateTrack
} from '../store/auth/playlistSlice'

const Playlist = () => {
  const dispatch = useDispatch()
  const tracks = useSelector(state => state.playlist.tracks)
  const { user } = useSelector(state => state.auth)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedTrack, setSelectedTrack] = useState(null)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    dispatch(fetchPlaylist(user.data.email))
  }, [])

  // --- Edit Logic ---
  const handleEditClick = track => {
    setSelectedTrack(track)
    setNewName(track.name)
    setEditOpen(true)
  }

  // --- Update Logic ---
  const handleUpdate = () => {
    dispatch(
      updateTrack({
        id: selectedTrack._id,
        addedBy: user.data.email,
        name: newName
      })
    )
    setEditOpen(false)
    setSelectedTrack(null)
  }

  // --- Delete Logic ---
  const handleDeleteClick = track => {
    setSelectedTrack(track)
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    dispatch(removeTrack({ id: selectedTrack._id, addedBy: user.data.email }))
    setDeleteOpen(false)
    setSelectedTrack(null)
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Grid container spacing={2} justifyContent='center'>
        {tracks.map((track, index) => (
          <Grid
            item
            xs={11}
            sm={6}
            md={4}
            lg={3}
            key={track._id}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: 270,
                minWidth: 270,
                boxShadow: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)'
                }
              }}
            >
              <CardMedia
                component='img'
                image={
                  track.album?.images[0]?.url ||
                  'https://via.placeholder.com/345x180.png?text=No+Image'
                }
                alt={track.name}
                sx={{
                  height: 180,
                  objectFit: 'cover',
                  backgroundColor: theme => theme.palette.grey[900]
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  gutterBottom
                  noWrap
                  title={track.name}
                >
                  {index + 1}. {track.name || 'Untitled Track'}
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  noWrap
                  title={track.artists?.map(artist => artist.name).join(', ')}
                >
                  {track.artists?.map(artist => artist.name).join(', ') ||
                    'Unknown Artist'}
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 2,
                  pb: 2,
                  borderTop: 1,
                  borderColor: 'divider'
                }}
              >
                <IconButton
                  color='primary'
                  onClick={() => handleEditClick(track)}
                  aria-label='Edit track'
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color='error'
                  onClick={() => handleDeleteClick(track)}
                  aria-label='Delete track'
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Track Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Track Name'
            fullWidth
            variant='standard'
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdate} color='primary' variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete{' '}
            <strong>{selectedTrack?.name}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color='error' variant='contained'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Playlist
