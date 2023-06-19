import {Routes, Route} from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import Planner from '../pages/Planner'

import Private from './Private'

export default function RoutesApp(){
    return(
        <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/' element={ <Private><Planner/></Private>   } />
        </Routes>
    )
}