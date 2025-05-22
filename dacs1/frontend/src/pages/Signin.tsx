import styles from '../styles/SignIn.module.css'
import { TextFieldComponent } from '../components/Textfield'
import { ButtonComponent } from '../components/Button'
import { useState } from 'react'
function Signin(){
    const [form,setform] = useState({
        email: '',
        password: ''
    })
    const [apiStatus, setApiStatus] = useState('')
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setform((prev) => ({
            ...prev,
            [name]: value
        }))
        setApiStatus(form.email + ' ' + form.password)
    }

    const PostData = async () => {
        try {
            setApiStatus('Đang kết nối đến server...')
            console.log('Đang gửi request đến:', 'http://localhost:8080/api/user/login')
            console.log('Request body:', JSON.stringify({
                email: form.email,
                password: form.password
            }))
            
            const res = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: form.email,
                    password: form.password
                })
            });
            
            const data = await res.text();
            console.log('Server response status:', res.status);
            console.log('Server response data:', data);
            setApiStatus(`Status: ${res.status}, Response: ${data}`);
            
            if (res.status === 200) {
                alert('Login successful');
                window.location.href = '/homepage';
            } else {
                alert(data || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setApiStatus(`Error: ${error instanceof Error ? error.message : String(error)}`);
            alert('Error connecting to server');
        }
    }

    return (
        <div className={styles.signin_container}>
            <h1>This is sign in page</h1>
            <div className={styles.form}>
            <TextFieldComponent label="Email" placeholder='Example@gmail.com' name='email' onChange={handleChange}/>
            <TextFieldComponent label="Password" type="password" name='password' onChange={handleChange}/>
            </div>
            {apiStatus && <div className={styles.status}><pre>{apiStatus}</pre></div>}
            <div className={styles.button_container}>
            <ButtonComponent className="button" onClick={ PostData } >Sign in</ButtonComponent>
                <div className={styles.link}>
                    <p >If you dont have account :</p>
                    <small className="little"><a href="/createaccount">Create account</a></small>
                </div>
            </div>
        </div>
    )
}

export default Signin