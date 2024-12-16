import React from 'react';
import '../styles/RentModal.css';

function RentModal({ isOpen, onClose, onConfirm, bike, children, type }) {
    console.log(children);
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{type === 'devolucao' ? 'Confirmação de Devolução' : 'Confirmação de Aluguel'}</h2>
                <p>Você gostaria de {type === 'devolucao' ? 'devolver' : 'alugar'} a bicicleta</p>
                <h3>{bike?.brand} - {bike?.model}</h3>

                {type === 'aluguel' && (
                    <>
                        {bike.observations && bike.observations.trim() !== '' && (
                            <p>Observações: {bike.observations}</p>
                        )}
                        <p>Preço por dia: R$ {bike.price}</p>
                        <p>Total: R$ {bike.price * children.props.children[3].props.value}</p>
                    </>
                )}

                {children}
                <div className="modal-buttons">
                    <button onClick={onConfirm}>{type === 'devolucao' ? 'Confirmar Devolução' : 'Confirmar Aluguel'}</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default RentModal;
