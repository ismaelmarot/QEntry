import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #F2F2F7;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px 24px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
  color: #007AFF;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
  text-align: center;
  color: #1C1C1E;
`;

const Subtitle = styled.p`
  color: #8E8E93;
  text-align: center;
  margin-bottom: 32px;
  font-size: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 14px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;
  transition: all 0.2s;
  color: #1C1C1E;

  &::placeholder {
    color: #8E8E93;
  }

  &:focus {
    border-color: #007AFF;
    background: white;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #007AFF;
  color: white;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s;
  margin-top: 8px;

  &:hover {
    background: #0066DD;
  }

  &:disabled {
    background: #007AFF;
    opacity: 0.5;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Error = styled.p`
  color: #FF3B30;
  font-size: 14px;
  text-align: center;
  padding: 12px;
  background: #FFF0F0;
  border-radius: 10px;
`;

const Footer = styled.p`
  color: #8E8E93;
  font-size: 13px;
  text-align: center;
  margin-top: 24px;
`;

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.auth.login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Logo>
          <HiOutlineOfficeBuilding size={56} />
        </Logo>
        <Title>QEntry</Title>
        <Subtitle>Ingresa a tu cuenta</Subtitle>
        
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          
          {error && <Error>{error}</Error>}
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </Button>
        </Form>

        <Footer> admin@mail.com / admin123 </Footer>
      </Card>
    </Container>
  );
}