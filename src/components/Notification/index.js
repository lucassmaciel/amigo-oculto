import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.type === 'error' ? '#FF342B' : '#4CAF50'};
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1100;
  animation: fade-in 0.3s ease, fade-out 0.3s ease 2.7s;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
  }
`;

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setVisible(false), 2700);
    const removeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  if (!visible) return null;

  return <NotificationContainer type={type}>{message}</NotificationContainer>;
}

export default Notification;