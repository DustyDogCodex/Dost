import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import { useContext } from 'react'
import { UserContext } from './LoggedInUserContext'

function App() {
    //using context to check for a loggedIn user
    const { loggedInUser } = useContext(UserContext) 
    console.log('logged in user',loggedInUser)
    
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path='/'
                        element={<Login />}
                    />
                    <Route 
                        path='register'
                        element={<Register />}
                    />
                    <Route 
                        path='homepage'
                        element={loggedInUser ? <Homepage /> : <Login />}
                    />
                    <Route 
                        path='profile/:userId'
                        element={<UserProfile />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
