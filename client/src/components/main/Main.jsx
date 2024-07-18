import { Routes, Route } from 'react-router-dom'

import Home from './home/Home'

export default function Main() {
    return(
        
            <Routes>
                <Route path='/home' element={<Home></Home>}></Route>
            </Routes>         
        
    )
}