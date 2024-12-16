import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/UseAxios';
import RentModal from './RentModal';
import '../styles/BikeList.css';
import { useAuth } from '../contexts/AuthContext';
import { getIdByToken } from '../utils/jwtUtils';
import { accessoryLabels } from '../utils/accessoryLabels';

function BikesRents() {
    const { token } = useAuth();
    const [userRents, setUserRents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isReturnModalOpen, setReturnModalOpen] = useState(false);
    const [selectedRent, setSelectedRent] = useState(null);
    const [devolutionTrigger, setDevolutionTrigger] = useState(false);
    const userId = getIdByToken(token);

    const { data, loading: apiLoading, error: apiError } = useAxios({
        url: `http://localhost:5555/rents/renter/${userId}`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        trigger: true,
    });

    const { loading: rentLoading, error: rentError } = useAxios({
        url: 'http://localhost:5555/rents/devolution',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: selectedRent ? {
            rent_id: selectedRent._id,
        } : null,
        trigger: devolutionTrigger && selectedRent !== null,
    });

    useEffect(() => {
        if (data) {
            setUserRents(data);
            setLoading(false);
        }
        if (apiError) {
            setError(apiError);
            setLoading(false);
        }
    }, [data, apiError]);

    const handleOpenReturnModal = (rent) => {
        setSelectedRent(rent);
        setReturnModalOpen(true);
    };

    const handleConfirmBikeReturn = () => {
        if (selectedRent) {
            console.log('Confirmação de devolução para o aluguel:', selectedRent._id);
            setDevolutionTrigger(prev => !prev);
            setReturnModalOpen(false);
            refreshPage();
        }
    };

    function refreshPage() {
        window.location.reload(false);
    }

    useEffect(() => {
        if (!rentLoading && selectedRent) {
            setSelectedRent(null);
        }
    }, [rentLoading]);

    return (
        <div>
            <h2>Bicicletas Alugadas</h2>
            {loading || apiLoading ? (
                <p>Carregando...</p>
            ) : error ? (
                <p>Erro: {error.message}</p>
            ) : userRents.filter(rent => rent.active).length === 0 ? (
                <h3 className="centered-message">Você não possui bicicletas alugadas.</h3>
            ) : (
                <div className="bike-card-container">
                    {userRents
                        .filter(rent => rent.active)
                        .map(rent => (
                            <div className="bike-card" key={rent._id}>
                                <h3>{rent.bike.brand} - {rent.bike.model}</h3>
                                <p>{rent.bike.description}</p>
                                <p>Observações: {rent.bike.observations ?? 'Nenhuma'}</p>
                                <p>Acessórios:</p>
                                <div className="accessories-container">
                                    {Object.entries(rent.bike.accessories)
                                        .filter(([, value]) => value === true)
                                        .map(([key], index) => (
                                            <span key={index} className="accessory-tag">
                                                {accessoryLabels[key]}
                                            </span>
                                        ))}
                                </div>
                                <p>Peso: {rent.bike.weight}</p>
                                <p>Data de Início: {new Date(rent.startDate).toLocaleDateString()}</p>
                                <p>Data de Fim: {new Date(rent.endDate).toLocaleDateString()}</p>
                                <p>Preço do Aluguel: R$ {rent.rentPrice}</p>
                                <button onClick={() => handleOpenReturnModal(rent)}>
                                    {new Date(rent.startDate) > new Date() ? "Cancelar" : "Devolver"}
                                </button>

                            </div>
                        ))}
                </div>
            )}
            <RentModal
                isOpen={isReturnModalOpen}
                onClose={() => setReturnModalOpen(false)}
                onConfirm={handleConfirmBikeReturn}
                bike={selectedRent?.bike}
                type="devolucao"
            />
            {rentLoading && <p>Devolvendo a bike...</p>}
            {rentError && <p>Erro ao devolver a bike: {rentError.message}</p>}
        </div>
    );
}

export default BikesRents;
