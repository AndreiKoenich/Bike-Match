import React from 'react';
import '../styles/LogoutModal.css';

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Você deseja sair?</p>
        <button className="confirm-button" onClick={onConfirm}>Sim</button>
        <button className="cancel-button" onClick={onCancel}>Não</button>
      </div>
    </div>
  );
};

export default LogoutModal;
