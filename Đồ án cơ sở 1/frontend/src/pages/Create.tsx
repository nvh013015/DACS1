import { TextFieldComponent } from "../components/Textfield"
import { ButtonComponent } from "../components/Button"
import styles from "../styles/Create.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Accountcreate() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [messageType, setMessageType] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleRegister = async () => {
        // Check if passwords match
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match")
            setMessageType("error")
            return
        }
        
        try {
            // Remove confirmPassword from the data sent to server
            const { confirmPassword, ...userData } = form;
            
            const response = await axios.post('http://localhost:8080/api/user/register', userData);
            
            // If registration successful
            setMessage("Registration successful! You can now login.");
            setMessageType("success");
            alert("Registration successful! You can now login.");
            navigate('/signin'); // Redirect to sign-in page
            
            // Optional: Reset form after successful registration
            setForm({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            
        } catch (error) {
            // Handle error
            if (axios.isAxiosError(error) && error.response) {
                // User already exists
                if (error.response.status === 400) {
                    setMessage("Username or email already exists");
                } else {
                    setMessage("Registration failed. Please try again.");
                }
                setMessageType("error");
            } else {
                setMessage("Network error. Please check your connection.");
                setMessageType("error");
            }
        }
    }

    return (
        <div className={styles.create_account_container}>
            <h1>This is create account page</h1>
            <div className={styles.form}>
            <TextFieldComponent label="Username" name="username" onChange={handleChange} />
            <TextFieldComponent label="Email" name="email" onChange={handleChange} />
            <TextFieldComponent label="Password" type="password" name="password" onChange={handleChange} />
            <TextFieldComponent label="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} />
            </div>
            <div className={styles.button_container}>
                <ButtonComponent className="button" onClick={handleRegister}>Create account</ButtonComponent>
                <a href="/signin" className={styles.link}>Sign in</a>
            </div>
            {message && (
                <div style={{ 
                    color: messageType === 'success' ? 'green' : 'red',
                    marginTop: '10px',
                    fontWeight: 'bold'
                }}>
                    {message}
                </div>
            )}
        </div>
    )
}
