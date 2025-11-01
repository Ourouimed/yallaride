'use client'
import { auth, db } from "@/lib/firebaseClient";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { toast } from "sonner";
import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";

const NetworkContext = createContext()

export const NetworkProvider = ({children})=>{
    const [isLoading, setIsLoading] = useState(true);
    const [networksList , setNetworksList] = useState([])
    const generateInviteCode = ()=>{
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = '';
      for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    }
    // Create New network 
  const createNetwork = async (data)=>{
    try {
      setIsLoading(true)
      const inviteCode = generateInviteCode()

      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();


      if (userData?.role == 'director'){
        await setDoc(doc(db , 'networks' , inviteCode) , 
            {
                ...data , 
                director : auth.currentUser.uid,
                passangers : [],
                drivers : [],
                createdAt : new Date()
            })
        toast.success('Network created successfully')
      }
      else {
        throw new Error('You do not have permission to create network')
      }
      
    } 
    catch (error){
        console.log(error)
        toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
    
  } 

  // Join netwrok func
  const joinNetwrok = async (id)=>{
    setIsLoading(true)
    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();
      const docRef = doc(db , 'networks' , id)
      if (userData?.role == 'passanger'){
        await updateDoc(docRef , {
          passangers : arrayUnion(auth.currentUser.uid)
        })
        toast.success('Network joined successfully')
      }
      else if (userData?.role == 'driver'){
        await updateDoc(docRef , {
          drivers : arrayUnion(auth.currentUser.uid)
        })
        toast.success('Network joined successfully')
      }
      else {
        throw new Error('Unvalid user')
      }
    }
    catch (error){
        console.log(error)
        toast.error(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , async (user)=>{
        if (user){
            try {
                const userDoc = await getDoc(doc(db, 'users', user.uid));
                const userData = userDoc.data();
                const networksRef = collection(db , 'networks')
                let q;
                if (userData?.role === 'director'){
                  q = query(networksRef, where("director", "==", user.uid));
                }
                else if (userData?.role === 'driver'){
                  q = query(networksRef , where("drivers", "array-contains", user.uid));
                }
                else if (userData?.role === 'passanger'){
                  q = query(networksRef , where("passangers", "array-contains", user.uid));
                }
                else {
                  throw new Error('Unvalid user')
                }
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setNetworksList(data)
            }
            catch (err){
                toast.error(err.message)
            }
            finally{
                setIsLoading(false)
            }
        }
        else{
            setNetworksList([])
        }
    })
    return ()=> unsubscribe()
  }, [])
    
  

    return <NetworkContext.Provider value={{createNetwork , joinNetwrok , isLoading , networksList}}>
        {children}
    </NetworkContext.Provider>
}

export const useNetwork = ()=> useContext(NetworkContext)