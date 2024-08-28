import axios from "axios";
import { BACKEND_URL } from "../utils/constant";


export const createJob = async ({data, id}) => {
    try {
        const URL = id ? `${BACKEND_URL}/job/${id}` : `${BACKEND_URL}/job`;
        const token = localStorage.getItem('token');
        const response = await axios.post(URL, data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : token
            }
        });
        return response;}
        catch (error) {
            return new Error(error.response.data.message);
            }

}

export const getJobs = async({id, skills})=>{
    try {
        const skillsQuery = skills ? `skills = ${skills.join(',')}` : null;
        const URL = id ? `${BACKEND_URL}/job/${id}` : skillsQuery ? `${BACKEND_URL}/job?skills=${skillsQuery}` : `${BACKEND_URL}/job`;
        const response = await axios.get(URL);
        return response;
        }
        catch (error) {
            return new Error(error.response.data.message);
            }
}


export const deleteJob = async (id) => {
    try {
        const URL = `${BACKEND_URL}/job/${id}`;
        const token = localStorage.getItem('token');
        const response = await axios.delete(URL, {
            headers: {
                'Authorization' : token
                }
                });
                return response;
                }
                catch (error) {
                    return new Error(error.response.data.message);
                    }
}