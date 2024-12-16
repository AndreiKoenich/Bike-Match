const fetch = require('node-fetch');

async function getAddressFromCEP(cep) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.erro) {
        throw new Error(`CEP ${cep} não encontrado.`);
    }

    return {
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf
    };
}

async function getCoordinatesFromAddress(address) {
    const query = `${address.logradouro}, ${address.bairro}, ${address.cidade} - ${address.estado}`;
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`;

    const response = await fetch(url, { headers: { 'User-Agent': 'test_app' } });
    const data = await response.json();

    if (data.length === 0) {
        throw new Error(`Coordenadas não encontradas para o endereço: ${query}`);
    }

    const location = data[0];
    return {
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon)
    };
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRadians = (degree) => degree * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R*c; 
}

async function getDistanceBetweenCEPs(cep1, cep2) {
    try {

        const address1 = await getAddressFromCEP(cep1);
        const coordinates1 = await getCoordinatesFromAddress(address1);

        const address2 = await getAddressFromCEP(cep2);
        const coordinates2 = await getCoordinatesFromAddress(address2);

        const distance = calculateDistance(
            coordinates1.latitude,
            coordinates1.longitude,
            coordinates2.latitude,
            coordinates2.longitude
        );

        console.log(`A distância entre ${cep1} e ${cep2} é de aproximadamente ${distance.toFixed(2)} km.`);
        return distance;

    } catch (error) {
        console.error(error.message);
        return null;
    }
}

module.exports = {
    getAddressFromCEP,
    getCoordinatesFromAddress,
    calculateDistance,
    getDistanceBetweenCEPs
}