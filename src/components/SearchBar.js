import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ query, setQuery }) => (
  <TextField
    label="Search by name or ingredient"
    variant="outlined"
    fullWidth
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    sx={{
      mt: 2,
      bgcolor: '#fff',
      borderRadius: 2,
      boxShadow: 2,
      transition: 'box-shadow 0.3s ease',
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        minHeight: '56px', 
        '&:hover': {
          boxShadow: 4,
        },
        '&.Mui-focused': {
          boxShadow: 5,
          borderColor: '#ff7043',
        },
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon sx={{ color: '#ff7043' }} />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchBar;
