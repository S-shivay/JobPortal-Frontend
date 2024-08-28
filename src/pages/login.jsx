import { useState } from "react";
import { login } from "../services/auth";
import toast from "react-hot-toast";

export default function Login() {

    const [userData, setUserData] = useState({
        email : null,
        password : null
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
        setUserData({
            ...userData, 
            [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!userData.email || !userData.password){
            return;
        }
        try {
            const {email, password} = userData;
            const response = await login ({email, password})
            console.log(response);
            if(response.status === 200){
                const {data} = response;
                localStorage.setItem('token', data.token);
                toast.success("User logged in Successfully");
            }
        }
        catch (error) {
            toast.error("Login failed");
            }
            finally{
                setLoading(false);
            }
            }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label for="email">Email:</label><br/>
                <input type="email" id="email" name="email" placeholder="Your Email" value={userData.email} onChange={handleChange}/>
                <br/>
                <label for="password">Password:</label><br/>
                <input type="password" id="password" name="password" placeholder="Your Password" value={userData.password} onChange={handleChange}/>
                <br/>
                <button disabled={loading} type="submit">Login</button>
            </form>
        </div>
    );

}