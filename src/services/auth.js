import axios from "axios";
import { BACKEND_URL } from "../utils/constant";

export const register = async({name, email, password}) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
            name,
            email, 
            password},{
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            return response;
            } catch (error) {
                return new Error(error.response.data.message);
                }
}

export const login = async({email, password}) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, {
            email,
            password},{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
            }
            });
            return response;
            } catch (error) {
                throw new Error(error.response.data.message);
                }
}

