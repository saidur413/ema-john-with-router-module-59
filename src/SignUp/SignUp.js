import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/UserContext';
import './SignUp.css'

const SignUp = () => {
    const {createUser} = useContext(AuthContext);

    const [error, setError] = useState(null);

    //Sign Up
    const handleSignUp = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        
        if(password.length <6){
            setError('Provide at least 6 characters')
        }
        if(password !== confirm){
            setError('Your Password did not match');
            return;
        }

        console.log(email, password, confirm);

        //create user method
        createUser(email, password)
            .then(result=>{
                const user = result.user;
                form.reset();
                console.log(user);
            })
            .catch(error=>{
                console.error(error)
            })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>SignUp</h2>
            <form onSubmit={handleSignUp}>
               <div className='form-control'>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' required />
               </div> 
               <div className='form-control'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' name='password' required />
               </div> 
               <div className='form-control'>
                    <label htmlFor='confirm'>Confirm Password:</label>
                    <input type='password' name='confirm' required />
               </div>
                <p className='text-error'>{error}</p> 
               <input className='btn-submit' type='submit' value='SignUp' />
            </form>
            <p>Already have an account? <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default SignUp;