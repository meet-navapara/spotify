import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Stack,
  LinearProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  fetchPlaylists,
  fetchTracks,
  clearError,
  clearTracks
} from '../store/auth/spotifySlice'
import { addTrack } from '../store/auth/playlistSlice'
import AddIcon from '@mui/icons-material/Add';

const Home = () => {
  const dispatch = useDispatch()
  const { playlists, tracks, loading, tracksLoading, error } = useSelector(
    state => state.spotify
  )
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const user = useSelector(state => state.auth.user)

  const handleAddToPlaylist = track => {
    console.log('Adding track to playlist:', track.name)
    dispatch(addTrack({ ...track, addedBy: user?.data?.email }))
  }

  const handlePlaylistClick = playlist => {
    setSelectedPlaylist(playlist)
    dispatch(fetchTracks(playlist.id))
  }

  const handleBack = () => {
    setSelectedPlaylist(null)
    dispatch(clearTracks())
    dispatch(clearError())
  }

  const CenteredLoader = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999
      }}
    >
      <CircularProgress size={60} />
    </Box>
  )

  useEffect(() => {
    if (playlists.length === 0) dispatch(fetchPlaylists())
  }, [dispatch])

  if (loading) return <CenteredLoader />

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      {error && (
        <Typography color='error' sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {selectedPlaylist ? (
        <Box>
          <IconButton onClick={handleBack} sx={{ mb: 2 }}>
            <ArrowBackIcon />
          </IconButton>

          <Card sx={{ mb: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }}>
              <CardMedia
                component='img'
                image={selectedPlaylist.images?.[0]?.url}
                alt={selectedPlaylist.name}
                sx={{ width: { xs: '100%', md: 300 }, height: 300 }}
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant='h4' gutterBottom>
                  {selectedPlaylist.name}
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='text.secondary'
                  gutterBottom
                >
                  By {selectedPlaylist.owner?.display_name}
                </Typography>
                <Typography variant='body1'>
                  {selectedPlaylist.description || 'No description available'}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ mt: 2, color: 'success.main' }}
                >
                  {selectedPlaylist.tracks?.total} tracks
                </Typography>
              </CardContent>
            </Stack>
          </Card>

          {tracksLoading ? (
            <LinearProgress sx={{ my: 2 }} />
          ) : (
            <Grid container spacing={2}>
              {tracks.map((track, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={track.track.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: 270,
                      maxWidth: 270,
                      position: 'relative',
                      '&:hover': {
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={
                        track.track?.album?.images?.[0]?.url ||
                        'https://www.shutterstock.com/image-photo/retro-golden-microphone-headphones-on-600nw-694098472.jpg'
                      }
                      alt={track.track?.name || 'Track artwork'}
                      sx={{
                        height: 180,
                        objectFit: 'cover',
                        backgroundColor: theme =>
                          !track.track?.album?.images?.[0]?.url
                            ? theme.palette.grey[200]
                            : 'inherit'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, pb: 6 }}>
                      <Typography
                        variant='subtitle1'
                        fontWeight='bold'
                        gutterBottom
                        noWrap
                      >
                        {index + 1}. {track.track.name || 'No Name Found'}
                      </Typography>
                      <Typography variant='body2' color='text.secondary' noWrap>
                        {track.track.artists
                          .map(artist => artist.name)
                          .join(', ')}
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 5,
                        right: 8,
                        zIndex: 1
                      }}
                    >
                      <IconButton
                        onClick={() => handleAddToPlaylist(track.track)}
                        sx={{
                          backgroundColor: 'green',
                          color: 'white',
                          width: 40,
                          height: 40,
                          '&:hover': {
                            backgroundColor: 'green',
                            transform: 'scale(1.1)'
                          },
                          transition: 'all 0.3s ease',
                          boxShadow: 3
                        }}
                        aria-label='add to playlist'
                      >
                        <AddIcon fontSize='medium' />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ) : (
        <Box>
          <Typography variant='h4' gutterBottom sx={{ mb: 4 }}>
            Featured Playlists
          </Typography>
          <Grid container spacing={3}>
            {playlists.map(playlist => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={playlist.id}>
                <Card
                  sx={{
                    minWidth: 270,
                    maxWidth: 270,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': { transform: 'translateY(-4px)' }
                  }}
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  <CardMedia
                    component='img'
                    height='200'
                    image={playlist.images?.[0]?.url}
                    alt={playlist.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant='h6' noWrap sx={{ mb: 1 }}>
                      {playlist.name}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        mb: 1
                      }}
                    >
                      {playlist.description || 'No description'}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {playlist.tracks?.total} songs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default Home
