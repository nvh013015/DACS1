import Searchbar from "../components/Searchbar"
import styles from "../styles/Homepage.module.css"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Chatbox from "../components/Chatbox/chatbox";
export default function HomePage () {
    return(
        <div className={styles.HomePage}>
            <div className={styles.CaibidinhchungvoiSearchbar}>
                <Searchbar />
            </div>
            <div className={styles.HomePage_container}>
                <div className={styles.sidebar}>
                    <SettingsOutlinedIcon style={{fontSize: "32px",
                        marginTop: "10px",
                    }}></SettingsOutlinedIcon>
                </div>
                <div className={styles.chatbox}>
                    <Chatbox />
                </div>
                <div style={{backgroundColor: 'blue'}}>
                        haha
                </div>
            </div>
        </div>
    )
}