import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);
    const navigate = useNavigate()

    //sign out method
    const signout = () =>{
        logOut();
        navigate('/login')
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                    user?.uid ?
                    <>
                        <span className='email'>{user.email}</span>
                        <button onClick={signout}>LogOut</button>
                    </>
                    :
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                }
            </div>
        </nav>
    );
};

export default Header;