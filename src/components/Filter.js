import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Filter = ({ category, setCategory }) => {
  const categories = ['main course', 'dessert', 'salad', 'appetizer', 'breakfast'];

  return (
    <Box sx={{ mb: 3 }}>
      <Box display="flex" alignItems="center" mb={1}>
        <RestaurantMenuIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" fontWeight={500}>
          Filter Recipes
        </Typography>
      </Box>

      <FormControl
        fullWidth
        sx={{
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filter;
