import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Register() {

    const [userData, setUserData] = useState({
        name: null,
        email: null,
        password: null
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setUserData({
            ...userData, 
            [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if(!userData.name || !userData.email || !userData.password){
            return;
        }
        try {
            const {name, email, password} = userData;
            const response = await register({name, email, password})
            console.log(response);
            if(response.status === 200){
                alert("User Created Successfully");
                navigate('/login');
            }
        }
        catch (error) {
            console.log(error.message);
            }
            finally{
                setLoading(false);
            }
            }

    return(
        <div>
            <h1>Create an Account</h1>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" placeholder="Your Name" name="name" value={userData.name} onChange={handleChange} />
                <br/>
                <label>Email:</label>
                <input type="email" placeholder="Your Email" name="email" value={userData.email} onChange={handleChange} />
                <br/>
                <label>Password:</label>
                <input type="password" placeholder="Your Password" name="password" value={userData.password} onChange={handleChange} />
                <br/>
                <button disabled={loading} type="submit">Submit</button>
            </form>
        </div>
    );
        

}

export default Register;