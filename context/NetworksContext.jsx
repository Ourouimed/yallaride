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
                directorId : auth.currentUser.uid,
                director : userData,
                passangers : [] , 
                drivers : [],
                passangersIds : [],
                driversIds : [],
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
          passangersIds : arrayUnion(auth.currentUser.uid) , 
          passangers : arrayUnion({...userData ,id : [auth.currentUser.uid] })
        })
        toast.success('Network joined successfully')
      }
      else if (userData?.role == 'driver'){
        await updateDoc(docRef , {
          driversIds : arrayUnion(auth.currentUser.uid) , 
          drivers : arrayUnion({...userData ,id : [auth.currentUser.uid] })
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

  // Get single network 
  const getNetwork = async (id)=>{
    try {
        const userId = auth.currentUser.uid;
        const currNetwork = doc(db , 'networks' , id)
        const snapshot = await getDoc(currNetwork)
        const data = snapshot.data()
        console.log(data)
        if (snapshot.exists()) {
          const isAuthorized =
            data.directorId === userId ||
            data.passangersIds?.includes(userId) ||
            data.driversIds?.includes(userId);
          return isAuthorized ? data : null;
        }
        return null
    }
    catch (error){
        toast.error(error.message)
    }
    
  }

  const offerRide = async (rideData , networkId)=>{
    try {
      setIsLoading(true)
      const inviteCode = generateInviteCode()

      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();


      if (userData?.role == 'driver'){
        await setDoc(doc(db , 'rides' , `ride-${inviteCode}`) , 
            {
                ...rideData , 
                driver : userData,
                network_id : networkId,
                passangers : [],
                ride_status : 'pending' ,
                createdAt : new Date()
            })
        toast.success('Ride created successfully')
      }
      else {
        throw new Error('You do not have permission to create Ride')
      }
      
    } 
    catch (error){
        console.log(error)
        toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const findRide = async ({departure , arrival , departure_date} , networkId)=>{
    try {
      setIsLoading(true)
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();
      const ridesRef = collection(db , 'rides')
      if (userData?.role === 'passanger'){
          const q = query(ridesRef, where("departure", "==", departure.toLowerCase()) ,
                                    where("arrival", "==", arrival.toLowerCase()),
                                    where("departure_date", "==", departure_date) , 
                                    where("network_id", "==", networkId));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return data 

      }
      else {
          throw new Error('Unvalid user')
      }
                
    }
    catch (error){
      toast.error(error.message)
      return [] 
    }
    finally{
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
                  q = query(networksRef, where("directorId", "==", user.uid));
                }
                else if (userData?.role === 'driver'){
                  q = query(networksRef , where("driversIds", "array-contains", user.uid));
                }
                else if (userData?.role === 'passanger'){
                  q = query(networksRef , where("passangersIds", "array-contains", user.uid));
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
    
  

    return <NetworkContext.Provider value={{createNetwork , joinNetwrok , getNetwork , offerRide ,findRide , isLoading , networksList}}>
        {children}
    </NetworkContext.Provider>
}

export const useNetwork = ()=> useContext(NetworkContext)