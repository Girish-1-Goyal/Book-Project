import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function signup(email, password, name) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        role: 'user',
        userType: 'general',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return userCredential;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  }

  async function resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Reset password error:", error);
      throw error;
    }
  }

  async function updateUserProfile(data) {
    try {
      if (!currentUser) throw new Error("No user logged in");
      const userRef = doc(db, 'users', currentUser.uid);
      await setDoc(userRef, {
        ...data,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  }

  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
              setCurrentUser({ ...user, ...userDoc.data() });
            } else {
              setCurrentUser(user);
            }
          } else {
            setCurrentUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(error);
        } finally {
          setLoading(false);
        }
      });
    } catch (error) {
      console.error("Auth state change error:", error);
      setError(error);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    error,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}