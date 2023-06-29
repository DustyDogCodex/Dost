import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        path='/register'
                        element={<Register />}
                    />
                    <Route 
                        path='/homepage'
                        element={<Homepage />}
                    />
                    <Route 
                        path='/profile/:userId'
                        element={<UserProfile />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
