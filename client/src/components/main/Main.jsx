import { Routes, Route } from 'react-router-dom'

import Home from './home/Home'
import Register from './register/Register'

export default function Main() {
    return(
        
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
            </Routes>         
        
    )
}