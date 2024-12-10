import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AmigoSecreto from './components/AmigoSecreto';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background: #121212;
    font-family: 'Poppins', sans-serif;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Routes>
          <Route path="/" element={<AmigoSecreto />} />
        </Routes>
      </AppContainer>
    </>
  );
}

export default App;