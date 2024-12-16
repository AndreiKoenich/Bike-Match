import { jwtDecode } from "jwt-decode";

export const getIdByToken = (token) => {
    if (!token) {
        throw new Error("Token não fornecido");
    }

    const decoded = jwtDecode(token);
    if (!decoded) {
        throw new Error("Token inválido");
    }

    return decoded.id;
};

export const getRoleByToken = (token) => {
    if (!token) {
        throw new Error("Token não fornecido");
    }

    const decoded = jwtDecode(token);
    if (!decoded) {
        throw new Error("Token inválido");
    }
    
    return decoded.role;
};