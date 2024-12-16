import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getIdByToken } from '../utils/jwtUtils';
import { accessoryLabels } from '../utils/accessoryLabels';
import { currentDate } from '../utils/dateUtils';
import '../styles/RegisterBike.css';

function RegisterBike() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const userId = getIdByToken(token);
    const [landlord, setLandlord] = useState(userId);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');
    const [region, setRegion] = useState('');
    const [observations, setObservations] = useState('');
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(true);
    const [accessories, setAccessories] = useState({
        basket: false,
        lights: false,
        fenders: false,
        bottleHolder: false,
        bell: false,
        lock: false,
        phoneHolder: false,
        saddleBag: false,
        comfortableSeat: false,
        mirrors: false,
        clipPedals: false,
        suspension: false,
        rearRack: false,
        chainGuard: false,
        onboardComputer: false,
        helmet: false,
        gloves: false,
    });
    const [images, setImages] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('landlord', landlord);
        formData.append('brand', brand);
        formData.append('model', model);
        formData.append('weight', weight);
        formData.append('description', description);
        formData.append('observations', observations);
        formData.append('price', price);
        formData.append('available', available);
        formData.append('registerDate', currentDate());
        formData.append('accessories', JSON.stringify(accessories));
        formData.append('region', region);

        if (images.length > 0) {
            images.forEach((file) => formData.append('images', file));
        }

        try {
            const response = await fetch('http://localhost:5555/bikes', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao cadastrar a bicicleta.');
            }

            const result = await response.json();
            console.log('Bicicleta cadastrada com sucesso:', result);
            navigate('/landlordBikeList');
        } catch (error) {
            console.error('Erro no envio:', error);
        }
    };

    const handleAccessoryChange = (e) => {
        const { name, checked } = e.target;
        setAccessories((prevAccessories) => ({
            ...prevAccessories,
            [name]: checked,
        }));
    };

    const handleImageChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImages(selectedFiles);
    };

    return (
        <div className="register-bike-container">
            <h2>Cadastro de Nova Bicicleta</h2>
            <form onSubmit={handleSubmit} className="register-bike-form">
                <div className="form-grid">
                    <div className="form-group">
                        <label>Marca</label>
                        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Modelo</label>
                        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Peso</label>
                        <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Preço do aluguel</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Região</label>
                        <select value={region} onChange={(e) => setRegion(e.target.value)} required>
                            <option value="" disabled>Selecione a região</option>
                            <option value="Porto Alegre e região metropolitana">Porto Alegre e região metropolitana</option>
                            <option value="Litoral Norte">Litoral Norte</option>
                            <option value="Serra Gaúcha">Serra Gaúcha</option>
                        </select>
                    </div>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Observações</label>
                        <textarea value={observations} onChange={(e) => setObservations(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Imagens</label>
                    <input type="file" onChange={handleImageChange} accept="image/*" multiple />
                </div>

                <h3>Acessórios</h3>
                <div className="accessories-grid">
                    {Object.keys(accessories).map((accessory) => (
                        <label key={accessory} className="accessory-label">
                            <input
                                type="checkbox"
                                name={accessory}
                                checked={accessories[accessory]}
                                onChange={handleAccessoryChange}
                            />
                            {accessoryLabels[accessory]}
                        </label>
                    ))}
                </div>
                <button type="submit" className="submit-button">Cadastrar bicicleta</button>
            </form>
        </div>
    );
}

export default RegisterBike;
