import { ButtonComponent } from '../components/Button'
import { useNavigate } from 'react-router-dom'
function Auth() {
    const navigate = useNavigate()
    const handleSignIn = () => {
        navigate('/Signin')
    }
    const handleCrAccount = () => {
        navigate('/createaccount')
    }

    return (
        <div className="auth-container">
            <h1 className="h1">This is auth pages</h1>
            <ButtonComponent variant="outlined" className="button" onClick={handleCrAccount}>Create account</ButtonComponent>
            <h2 className='h2'>or</h2>
            <ButtonComponent variant="outlined" className="button" onClick={handleSignIn}>Sign in</ButtonComponent>
        </div>
    )
}

export default Auth