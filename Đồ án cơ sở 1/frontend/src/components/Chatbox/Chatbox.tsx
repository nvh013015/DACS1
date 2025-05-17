import Messinput from "./messinput";
import styles from "./Chatbox.module.css";
import { Avatar } from "@mui/material";

interface message{
    id: number;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
}
const messages: message[] = [
  { id: 1, text: "Hello!", sender: "other", timestamp: new Date() },
  { id: 2, text: "Hi, how are you?", sender: "user", timestamp: new Date() },
  { id: 3, text: "I'm good. How about you?", sender: "other", timestamp: new Date() },
  { id: 4, text: "I'm fine too!", sender: "user", timestamp: new Date() },
];

const handleSendMessage = (message: string) => {
    const newMessage: message = {
        id: Date.now(),
        text: message,
        sender: 'user',
        timestamp: new Date()
    };
    console.log(newMessage);
}

export default function Chatbox() {
    return (
        <div className={styles.chatbox}>
            <div className={styles.chatfield}>
            <div className={styles.chatbox_header}>
                <Avatar sx={{ mr: 1, bgcolor: 'secondary.main' }}></Avatar>
                <h3>Nguyễn Văn A</h3>
            </div>
            <div className={styles.chatbox_body}>
                {messages.map((message) => (
                    <div key={message.id} className={`${styles.message} ${styles[message.sender]}`}>
                        <div className={styles.message_content}>
                            <p>{message.text}</p>
                            <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.messinput}><Messinput /></div>
            </div>
        </div>
    )
}