import {Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
        </Routes>
    )
}