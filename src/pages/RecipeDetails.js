import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import RecipeRating from '../components/Rating';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      );
      setRecipe(res.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const already = favorites.find((f) => f.id === recipe.id);
    if (!already) {
      favorites.push({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('✅ Added to favorites!');
    } else {
      alert('⚠️ Already in favorites.');
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress color="warning" />
      </Box>
    );
  }

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: '#fffdf9',
          boxShadow: 6,
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}
        >
          {recipe.title}
        </Typography>

        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'cover',
            borderRadius: 2,
            boxShadow: 2,
            mb: 3,
          }}
        />

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff7043',
            '&:hover': { backgroundColor: '#ff5722' },
            textTransform: 'none',
            fontWeight: 'bold',
            mb: 3,
          }}
          onClick={saveToFavorites}
        >
          ❤️ Add to Favorites
        </Button>

        <Typography
          variant="h6"
          sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#444' }}
        >
          🧂 Ingredients:
        </Typography>
        <List sx={{ pl: 2 }}>
          {recipe.extendedIngredients.map((ing) => (
            <ListItem key={ing.id} sx={{ py: 0.5 }}>
              • {ing.original}
            </ListItem>
          ))}
        </List>

        <Typography
          variant="h6"
          sx={{ mt: 3, mb: 1, fontWeight: 'bold', color: '#444' }}
        >
          🧑‍🍳 Instructions:
        </Typography>
        <Typography
          sx={{ lineHeight: 1.7 }}
          dangerouslySetInnerHTML={{ __html: recipe.instructions }}
        />

        <Typography
          variant="h6"
          sx={{ mt: 4, mb: 1, fontWeight: 'bold', color: '#444' }}
        >
          ⭐ Rate this Recipe:
        </Typography>
        <RecipeRating recipeId={recipe.id} />
      </Paper>
    </Container>
  );
};

export default RecipeDetails;
