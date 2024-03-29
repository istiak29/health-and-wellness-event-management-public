import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../firebase/firebase.config"
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);
const auth = getAuth(app)


const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    const gProvider = new GoogleAuthProvider();
    const gitHubProvider = new GithubAuthProvider();

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, gProvider);
    }

    const gitHubSign = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubProvider);
    }




    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (CurrentUser) => {
            // console.log('user is in onAuthChange', CurrentUser);
            setLoading(false);
            setUser(CurrentUser);
        });
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        logout,
        login,
        googleSignIn,
        gitHubSign
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};