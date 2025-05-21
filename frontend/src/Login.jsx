import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    
    


    async function handleSubmit (e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5555/login", { email, password })
            setMessage("Login successful")
            navigate("/dashboard")
        } catch (error) {
            setMessage(error.response.data.message);
        }
        
    }

    return (
        <>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" required/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter your password" required/>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </>
    )
}

export default Login;