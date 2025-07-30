import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <Card
    sx={{
      maxWidth: 300,
      borderRadius: 3,
      boxShadow: 6,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: 10,
      },
      bgcolor: '#fff9f3',
      overflow: 'hidden',
    }}
  >
    <CardMedia
      image={recipe.image}
      title={recipe.title}
      sx={{
        height: 200,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
    <CardContent>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontWeight: 'bold',
          color: '#3e3e3e',
          minHeight: 60,
        }}
      >
        {recipe.title.length > 50
          ? recipe.title.slice(0, 50) + '...'
          : recipe.title}
      </Typography>
    </CardContent>
    <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        size="small"
        component={Link}
        to={`/recipe/${recipe.id}`}
        sx={{
          bgcolor: '#ff7043',
          '&:hover': {
            bgcolor: '#ff5722',
          },
          textTransform: 'none',
          fontWeight: 'bold',
          px: 2
        }}
      >
        View
      </Button>
    </CardActions>
  </Card>
);

export default RecipeCard;
