// src/components/AmigoSecreto/index.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Notification from '../Notification';

const Container = styled.div`
  background: #121212;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #1E1E1E;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
  margin: 20px 0;

  @media (max-width: 768px) {
    width: 95%;
    padding: 20px 15px;
  }
`;

const Title = styled.h2`
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Input = styled.input`
  background: #2D2D2D;
  color: #FFFFFF;
  border: 1px solid #404040;
  margin: 10px 0;
  padding: 10px;
  width: 90%;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #FF342B;
  }
`;

const Button = styled.button`
  padding: 12px 30px;
  background: ${props => props.primary ? '#FF342B' : '#2D2D2D'};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: ${props => props.primary ? '#E52E26' : '#404040'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ParticipantsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
  color: #FFFFFF;
`;

const ParticipantItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background: #2D2D2D;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
`;

const Result = styled.div`
  color: #FF342B;
  font-size: 20px;
  margin: 20px 0;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
`;

function AmigoSecreto() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [drawnPerson, setDrawnPerson] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const savedParticipants = localStorage.getItem('secretSantaParticipants');
    if (savedParticipants) {
      setParticipants(JSON.parse(savedParticipants));
    }
  }, []);

  const handleRegister = () => {
    if (!name || !password) {
      setNotification({ message: 'Preencha todos os campos!', type: 'error' });
      return;
    }

    if (participants.some(p => p.name === name)) {
      setNotification({ message: 'Este nome já está registrado!', type: 'error' });
      return;
    }

    const newParticipant = { name, password, drawn: null };
    const updatedParticipants = [...participants, newParticipant];
    setParticipants(updatedParticipants);
    localStorage.setItem('secretSantaParticipants', JSON.stringify(updatedParticipants));
    setIsRegistered(true);
    setNotification({ message: 'Registro realizado com sucesso!', type: 'success' });
  };

  const handleLogin = () => {
    const participant = participants.find(p => p.name === name && p.password === password);
    if (participant) {
      setIsRegistered(true);
      if (participant.drawn) {
        setDrawnPerson(participant.drawn);
      }
    } else {
      setNotification({ message: 'Nome ou senha incorretos!', type: 'error' });
    }
  };

  const handleDraw = () => {
    const currentParticipant = participants.find(p => p.name === name);
    if (currentParticipant.drawn) {
      setDrawnPerson(currentParticipant.drawn);
      return;
    }

    const availablePeople = participants.filter(p => 
      p.name !== name && !participants.some(part => part.drawn === p.name)
    );

    if (availablePeople.length === 0) {
      setNotification({ message: 'Não há mais participantes disponíveis!', type: 'error' });
      return;
    }

    const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)];
    const updatedParticipants = participants.map(p => 
      p.name === name ? { ...p, drawn: randomPerson.name } : p
    );

    setParticipants(updatedParticipants);
    localStorage.setItem('secretSantaParticipants', JSON.stringify(updatedParticipants));
    setDrawnPerson(randomPerson.name);
  };

  return (
    <Container>
      <Card>
        <Title>Amigo Secreto</Title>
        {!isRegistered ? (
          <>
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button primary onClick={handleRegister}>Registrar</Button>
            <Button onClick={handleLogin}>Login</Button>
          </>
        ) : (
          <>
            <Title>Bem-vindo(a), {name}!</Title>
            {drawnPerson ? (
              <Result>Você tirou: {drawnPerson}</Result>
            ) : (
              <Button primary onClick={handleDraw}>Sortear</Button>
            )}
          </>
        )}
      </Card>

      <Card>
        <Title>Participantes</Title>
        <ParticipantsList>
          {participants.map((participant, index) => (
            <ParticipantItem key={index}>{participant.name}</ParticipantItem>
          ))}
        </ParticipantsList>
      </Card>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </Container>
  );
}

export default AmigoSecreto;