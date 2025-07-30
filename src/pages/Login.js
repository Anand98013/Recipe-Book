import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper
} from '@mui/material';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const res = login(email, password);
    if (res.success) {
      navigate('/');
    } else {
      setErr(res.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 5, mt: 10, borderRadius: 3, bgcolor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#ff7043' }}>
          Login
        </Typography>

        {err && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {err}
          </Typography>
        )}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleLogin}
          sx={{
            backgroundColor: '#ff7043',
            '&:hover': { backgroundColor: '#f4511e' },
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          Login
        </Button>

        <Typography align="center" sx={{ mt: 3 }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#ff7043', textDecoration: 'none', fontWeight: 600 }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
