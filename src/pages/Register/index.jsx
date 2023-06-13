import styles from './styles.module.css'

import Form from "../../components/Home/form"
import Home from "../../components/Home"

export default function Register(){
    return(
        <div className={styles.container}>
            
            <Form/>
            <Home/>
        </div>
    )
}