import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Container, Typography, Box, useMediaQuery } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const fetchRecipes = async () => {
    const params = {
      number: 12,
      apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
      ...(query && { query }),
      ...(category && { type: category }),
    };

    try {
      const res = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, { params });
      setRecipes(res.data.results);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query, category]);

  return (
    <Box sx={{ bgcolor: '#fffaf5', py: 5 }}>
      <Container>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <RestaurantMenuIcon sx={{ fontSize: 50, color: '#ff7043' }} />
          <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
            Discover Delicious Recipes
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Search and filter your favorite dishes in one place 🍲
          </Typography>
        </Box>

        {/* Search + Filter */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Box sx={{ flex: 1, width: '100%' }}>
            <SearchBar query={query} setQuery={setQuery} />
          </Box>
          <Box sx={{ width: isMobile ? '100%' : '250px' }}>
            <Filter category={category} setCategory={setCategory} />
          </Box>
        </Box>

        {/* Recipe Grid */}
        {recipes.length > 0 ? (
          <Grid container spacing={4}>
            {recipes.map((recipe) => (
              <Grid item xs={12} sm={6} md={4} key={recipe.id}>
                <RecipeCard recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', mt: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No recipes found. Try different keywords or filters.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
