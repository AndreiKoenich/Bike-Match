import React from "react";
import "../styles/PaymentModal.css";

function PaymentModal({ isOpen, onClose, price, onPay }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Pagamento</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onPay();
                    }}
                >
                    <div className="form-group">
                        <label>Nome do Titular</label>
                        <input type="text" placeholder="Nome completo" required />
                    </div>
                    <div className="form-group">
                        <label>Número do Cartão</label>
                        <input
                            type="text"
                            maxLength="16"
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group small">
                            <label>Validade</label>
                            <input type="text" placeholder="MM/AA" required />
                        </div>
                        <div className="form-group small">
                            <label>CVV</label>
                            <input type="text" maxLength="3" placeholder="123" required />
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <button type="submit" className="pay-button">
                            Pagar
                        </button>
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PaymentModal;
