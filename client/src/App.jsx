import './App.css'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import UserSettings from './pages/UserSettings'
import { useContext } from 'react'
import { UserContext } from './LoggedInUserContext'
import EditPost from './pages/EditPost'

function App() {
    //using context to check for a loggedIn user
    const { loggedInUser, friends } = useContext(UserContext) 
    console.log('logged in user',loggedInUser)
    console.log('friends list', friends)
    
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
                        path='settings'
                        element={loggedInUser ? <UserSettings /> : <Login />}
                    />
                    <Route 
                        path='profile/:userId'
                        element={<UserProfile />}
                    />
                    <Route 
                        path='edit/:postId'
                        element={loggedInUser ? <EditPost /> : <Login />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
