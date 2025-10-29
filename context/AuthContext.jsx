'use client';
import { auth, db } from '@/lib/firebaseClient';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const docSnap = await getDoc(doc(db, "users", firebaseUser.uid));
          setUser({ uid: firebaseUser.uid, ...docSnap.data() });
        } else {
          setUser(null);
        }
      });

  return () => unsubscribe();
}, []);
  const registerUser = async ({ email, password, fullname, birthdate, roleform })=>{
    try {
      setIsLoading(true)
      const { user } = await createUserWithEmailAndPassword(auth, email, password)

      await setDoc(doc(db, "users", user.uid), {
        email,
        fullname,
        birthdate,
        role : roleform.role ,
        roleform, 
        createdAt: new Date(),
      });

      toast.success('User registred successfully')
    
      const docSnap = await getDoc(doc(db, "users", user.uid));
      setUser({ uid: user.uid, ...docSnap.data() });
      router.push('/login')
    } catch (error){
        console.log(error)
        toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const loginUser = async ({email , password})=>{
    try {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth , email , password)
      toast.success('User login successfully')
      router.push('/dashboard')
    }
    catch(error){
      toast.error(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }
  return (
    <AuthContext.Provider value={{ isLoading, user, registerUser , loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
