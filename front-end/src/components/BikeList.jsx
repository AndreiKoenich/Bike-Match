import React, { useEffect, useState } from 'react';
import useAxios from '../hooks/UseAxios';
import RentModal from './RentModal';
import PaymentModal from './PaymentModal';
import '../styles/BikeList.css';
import { useAuth } from '../contexts/AuthContext';
import { calculateRentalDates } from '../utils/dateUtils';
import { getIdByToken } from '../utils/jwtUtils';
import { accessoryLabels } from '../utils/accessoryLabels';

function BikeList() {
  const { token } = useAuth();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedBike, setSelectedBike] = useState(null);
  const [rentTrigger, setRentTrigger] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [imageIndices, setImageIndices] = useState({});
  const [selectedRegion, setSelectedRegion] = useState('all');

  const { data, loading: apiLoading, error: apiError } = useAxios({
    url: 'http://localhost:5555/bikes',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    trigger: true,
  });

  const { loading: rentLoading, error: rentError } = useAxios({
    url: 'http://localhost:5555/rents',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: selectedBike ? {
      bike: selectedBike._id,
      renter: getIdByToken(token),
      ...calculateRentalDates(startDate, rentalDays),
      landlord: selectedBike.landlord,
      rentPrice: selectedBike.price * rentalDays
    } : null,
    trigger: rentTrigger,
  });

  useEffect(() => {
    if (data) {
      setBikes(data);
      setLoading(false);

      const initialIndices = {};
      data.forEach(bike => {
        if (bike.images && bike.images.length > 0) {
          initialIndices[bike._id] = 0;
        }
      });
      setImageIndices(initialIndices);
    }
    if (apiError) {
      setError(apiError);
      setLoading(false);
    }
  }, [data, apiError]);

  useEffect(() => {
    if (rentLoading === false && rentTrigger) {
      if (!rentError) {
        console.log('Aluguel confirmado!');
        setPaymentModalOpen(true);
      } else {
        console.error('Erro ao alugar a bike:', rentError);
      }
      setModalOpen(false);
      setRentTrigger(false);
    }
  }, [rentLoading, rentTrigger, rentError]);

  const handleRentClick = (bike) => {
    setSelectedBike(bike);
    setModalOpen(true);
    setRentalDays(1);
    setPrice(selectedBike.price * rentalDays);
  };

  const handleConfirmRent = () => {
    setRentTrigger(true);
  };

  const handlePay = () => {
    alert('Pagamento realizado com sucesso!');
    setPaymentModalOpen(false);
    refreshPage();
  };

  const handlePrevImage = (bikeId, totalImages) => {
    setImageIndices(prev => ({
      ...prev,
      [bikeId]: prev[bikeId] === 0 ? totalImages - 1 : prev[bikeId] - 1
    }));
  };

  const handleNextImage = (bikeId, totalImages) => {
    setImageIndices(prev => ({
      ...prev,
      [bikeId]: prev[bikeId] === totalImages - 1 ? 0 : prev[bikeId] + 1
    }));
  };

  const hasBikes = () => {
    return bikes.filter(bike => bike.available);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div>
      <h2>Bicicletas Disponíveis para Aluguel</h2>
      <div className="filter-container">
        <label htmlFor="regionFilter">Filtrar por região:</label>
        <select
          id="regionFilter"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="all">Todas as regiões</option>
          <option value="Porto Alegre e região metropolitana">Porto Alegre e região metropolitana</option>
          <option value="Litoral Norte">Litoral Norte</option>
          <option value="Serra Gaúcha">Serra Gaúcha</option>
        </select>
      </div>
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : hasBikes() == false ? (
        <h3 className="centered-message">Não existem bicicletas disponíveis para aluguel.</h3>
      ) : (
        <div className="bike-card-container">
          {bikes
            .filter((bike) => selectedRegion === 'all' || bike.region === selectedRegion)
            .map(bike => (
              bike.available && (
                <div className="bike-card" key={bike._id}>
                  <h3>{bike.brand} - {bike.model}</h3>
                  <p>{bike.description}</p>
                  <p>Observações: {bike.observations ? bike.observations : null} </p>
                  <p>Acessórios:</p>
                  <div className="accessories-container">
                    {Object.entries(bike.accessories)
                      .filter(([, value]) => value === true)
                      .map(([key], index) => (
                        <span key={index} className="accessory-tag">
                          {accessoryLabels[key]}
                        </span>
                      ))}
                  </div>
                  <p>Diária do aluguel: R$ {bike.price}</p>
                  <p>Peso: {bike.weight}kg</p>
                  {bike.images && bike.images.length > 0 && (
                    <div className="bike-images-container">
                      <button
                        onClick={() => handlePrevImage(bike._id, bike.images.length)}
                        className="carousel-btn prev"
                      >
                        ‹
                      </button>
                      <img
                        src={`http://localhost:5555/uploads/${bike.images[imageIndices[bike._id] || 0]}`}
                        alt={`${bike.brand} ${bike.model} - imagem ${(imageIndices[bike._id] || 0) + 1}`}
                        className="bike-image"
                      />
                      <button
                        onClick={() => handleNextImage(bike._id, bike.images.length)}
                        className="carousel-btn next"
                      >
                        ›
                      </button>
                    </div>
                  )}
                  <button onClick={() => handleRentClick(bike)}>Alugar</button>
                </div>
              )
            ))}
        </div>
      )}
      <RentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmRent}
        bike={selectedBike}
        type="aluguel"
      >
        <div>
          <p>Data de aluguel:</p>
          <input
            type="date"
            id="startDate"
            value={startDate || ''}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <p>Quantidade de dias </p>
          <input
            type="number"
            id="rentalDays"
            value={rentalDays}
            min="1"
            onChange={(e) => setRentalDays(e.target.value)}
          />
        </div>
      </RentModal>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPay={handlePay}
      />
      {rentLoading && <p>Confirmando aluguel...</p>}
    </div>
  );
}

export default BikeList;
