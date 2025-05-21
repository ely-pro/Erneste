import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register () {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    
    


    async function handleSubmit (e) {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5555/register", { username, email, password })
            setMessage("Registration successful")
            navigate("/login")
        } catch (error) {
            console.log("Error:", error)
            setMessage("Fail to register user");
        }
        
    }

    return (
        <>
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                <input onChange={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Enter your username" required/>
                <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Enter your email" required/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Enter your password" required/>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </>
    )
}

export default Register;