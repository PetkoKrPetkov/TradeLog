import { Routes, Route } from 'react-router-dom'

import Home from './home/Home'
import Register from './register/Register'
import Login from './login/Login'
import Trades from './catalog/Trades'
import Profile from './profile/Profile'
import CreateTrade from './create-trade/CreateTrade'
import Details from './details/Details'


export default function Main() {
    return(
        
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/trades' element={<Trades></Trades>}></Route>
                <Route path='/trades/:tradeId/details' element={<Details></Details>}></Route>              
                <Route path='/profile' element={<Profile></Profile>}></Route>
                <Route path='/create-trade' element={<CreateTrade></CreateTrade>}></Route>
            </Routes>         
        
    )
}