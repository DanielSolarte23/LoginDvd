import axios from "axios";

export const registroRequest = user => axios.post('/registro', user);
export const loginRequest = user => axios.post('/inicio', user);
export const verifyTokenRequest = user => axios.get('/verificar', user);