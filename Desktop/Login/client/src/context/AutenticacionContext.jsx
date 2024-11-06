import { createContext, useState, useContext, useEffect } from "react";
import { registroRequest, loginRequest, verifyTokenRequest } from "../api/autenticacion"
import Cookie from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("debe estar dentro del provider");
    }
    return context;
}

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
}