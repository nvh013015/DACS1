import { useState } from 'react'
import { ButtonComponent } from '../components/Button'

export default function TestConnection() {
    const [connectionStatus, setConnectionStatus] = useState<string>('Chưa kết nối')
    const [isLoading, setIsLoading] = useState(false)
    const [serverUrl, setServerUrl] = useState('http://localhost:8080')
    
    const testLoginApi = async () => {
        setIsLoading(true)
        setConnectionStatus('Đang test kết nối...')
        
        try {
            // Create AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const url = `${serverUrl}/api/auth/login`;
            console.log('Đang gửi request đến:', url);
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: 'test@example.com',
                    password: 'password123'
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const data = await res.text();
            setConnectionStatus(`Kết nối thành công. Status: ${res.status}, Response: ${data}`);
        } catch (error) {
            console.error('Test connection error:', error);
            if (error instanceof DOMException && error.name === 'AbortError') {
                setConnectionStatus('Timeout: Server không phản hồi sau 5 giây');
            } else {
                setConnectionStatus(`Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    const testRegisterApi = async () => {
        setIsLoading(true)
        setConnectionStatus('Đang test kết nối...')
        
        try {
            // Create AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const url = `${serverUrl}/api/auth/register`;
            console.log('Đang gửi request đến:', url);
            
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: `test${Date.now()}@example.com`,
                    password: 'password123'
                }),
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const data = await res.text();
            setConnectionStatus(`Kết nối thành công. Status: ${res.status}, Response: ${data}`);
        } catch (error) {
            console.error('Test connection error:', error);
            if (error instanceof DOMException && error.name === 'AbortError') {
                setConnectionStatus('Timeout: Server không phản hồi sau 5 giây');
            } else {
                setConnectionStatus(`Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    const pingServer = async () => {
        setIsLoading(true);
        setConnectionStatus('Đang kiểm tra kết nối cơ bản...');
        
        try {
            // Create AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);
            
            const url = serverUrl;
            console.log('Đang ping server:', url);
            
            const res = await fetch(url, {
                method: 'GET',
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            setConnectionStatus(`Ping thành công. Server status: ${res.status}`);
        } catch (error) {
            console.error('Ping error:', error);
            if (error instanceof DOMException && error.name === 'AbortError') {
                setConnectionStatus('Timeout: Server không phản hồi sau 5 giây');
            } else {
                setConnectionStatus(`Lỗi kết nối: ${error instanceof Error ? error.message : String(error)}`);
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerUrl(e.target.value);
    };
    
    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Test Kết Nối Đến Server</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <label>
                    Server URL:
                    <input
                        type="text"
                        value={serverUrl}
                        onChange={handleUrlChange}
                        style={{ width: '100%', padding: '8px', marginTop: '8px' }}
                    />
                </label>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
                <h2>Trạng thái:</h2>
                <div style={{ 
                    padding: '10px', 
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#f5f5f5',
                    minHeight: '60px',
                    wordBreak: 'break-word'
                }}>
                    {isLoading ? 'Đang kiểm tra...' : connectionStatus}
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <ButtonComponent onClick={pingServer} disabled={isLoading}>
                    Ping Server
                </ButtonComponent>
                
                <ButtonComponent onClick={testLoginApi} disabled={isLoading}>
                    Test API Login
                </ButtonComponent>
                
                <ButtonComponent onClick={testRegisterApi} disabled={isLoading}>
                    Test API Register
                </ButtonComponent>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                <h3>Hướng dẫn sửa lỗi "Failed to fetch":</h3>
                <ol style={{ textAlign: 'left' }}>
                    <li>Kiểm tra server đã khởi động (mvn spring-boot:run)</li>
                    <li>Kiểm tra port server đúng (mặc định 8080)</li>
                    <li>Kiểm tra URL endpoint đúng (/api/auth/login)</li>
                    <li>Kiểm tra CORS đã được cấu hình trên server</li>
                    <li>Kiểm tra firewall không chặn kết nối</li>
                </ol>
            </div>
        </div>
    )
} 