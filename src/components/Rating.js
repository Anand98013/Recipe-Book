import { Rating, Box, Typography, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent',
};

const RecipeRating = ({ recipeId }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${recipeId}`);
    if (saved) setValue(parseInt(saved));
  }, [recipeId]);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    localStorage.setItem(`rating-${recipeId}`, newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        bgcolor: '#fdf8f3',
        borderRadius: 2,
        p: 2,
        boxShadow: 3,
        maxWidth: 300,
        margin: 'auto'
      }}
    >
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#3e3e3e' }}>
        Rate this Recipe
      </Typography>
      <Tooltip title={labels[hover !== -1 ? hover : value] || ''} arrow>
        <Rating
          name={`recipe-rating-${recipeId}`}
          value={value}
          precision={1}
          max={5}
          onChange={handleChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          icon={<StarIcon fontSize="inherit" htmlColor="#ff6d00" />}
          emptyIcon={<StarIcon fontSize="inherit" htmlColor="#ddd" />}
          size="large"
        />
      </Tooltip>
      <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
        {value !== 0 ? labels[value] : 'No rating yet'}
      </Typography>
    </Box>
  );
};

export default RecipeRating;
