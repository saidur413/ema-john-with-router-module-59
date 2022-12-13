import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //user creation
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    
    //sign in method
    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign out method
    const logOut = () =>{
        
        return signOut(auth);
    }
    
    //get user currently signed-in
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('current user inside state change', currentUser)
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    // authInfo provide
    const authInfo = {user, loading, createUser, signIn, logOut}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;