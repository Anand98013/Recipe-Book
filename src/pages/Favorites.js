import { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RecipeCard from '../components/RecipeCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(fav);
  }, []);

  return (
    <Container sx={{ mt: 6, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#3e3e3e', mb: 4 }}
      >
        ❤️ Favorite Recipes
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            mt: 10,
            color: '#888',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
          <Typography variant="h6">
            You haven't added any recipes to your favorites yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
