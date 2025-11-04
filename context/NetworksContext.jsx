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
                passengers : [] , 
                drivers : [],
                passengersIds : [],
                driversIds : [],
                created_at : new Date()
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
  const joinNetwork = async (id) => {
  setIsLoading(true);
  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
    const userData = userDoc.data();
    if (!userData) throw new Error("User data not found");

    const docRef = doc(db, 'networks', id);
    const networkSnap = await getDoc(docRef);

    if (!networkSnap.exists()) throw new Error("Network not found");

    const networkData = networkSnap.data();
    const uid = auth.currentUser.uid;

   
    const alreadyPassenger = networkData.passengersIds?.includes(uid);
    const alreadyDriver = networkData.driversIds?.includes(uid);
    if (alreadyPassenger || alreadyDriver) {
      toast.error("You have already joined this network");
      return;
    }

  
    if (userData.role === "passenger") {
      await updateDoc(docRef, {
        passengersIds: arrayUnion(uid),
        passengers: arrayUnion({
          id: uid,
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone,
          status: "pending",
          joined_at: new Date(),
        }),
      });
    } else if (userData.role === "driver") {
      await updateDoc(docRef, {
        driversIds: arrayUnion(uid),
        drivers: arrayUnion({
          id: uid,
          fullname: userData.fullname,
          email: userData.email,
          phone: userData.phone,
          status: "pending",
          joined_at: new Date(),
        }),
      });
    } else {
      throw new Error("Invalid user role");
    }

    toast.success("Network joined successfully");
  } catch (error) {
    console.error(error);
    toast.error(error.message);
  } finally {
    setIsLoading(false);
  }
};


  // Get single network 
  const getNetwork = async (id)=>{
    try {
        const userId = auth.currentUser.uid;
        const currNetwork = doc(db , 'networks' , id)
        const snapshot = await getDoc(currNetwork)
        const data = snapshot.data()
        if (snapshot.exists()) {
          const isAuthorized =
            data.directorId === userId ||
            data.passengersIds?.includes(userId) ||
            data.driversIds?.includes(userId);
            console.log('eeree')
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

      const networkRef = doc(db, "networks", networkId);
      const snapshot = await getDoc(networkRef);

      const data = snapshot.data();
      const driver = data.drivers.find(p => p.id === auth.currentUser.uid);

      if (!driver){
        throw new Error('Unknown error') 
      }

      const status = driver.status


      if (userData?.role == 'driver'){
        if (status === 'approved'){
          await setDoc(doc(db , 'rides' , `ride-${inviteCode}`) , 
            {
                ...rideData , 
                available_seats : rideData.total_seats,
                driver : {...userData , id : auth.currentUser.uid},
                network_id : networkId,
                passengers : [],
                ride_status : 'pending' ,
                createdAt : new Date()
            })
          toast.success('Ride created successfully')
        }
        else {
          throw new Error('You need director approval first')
        }
        
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

      const networkRef = doc(db, "networks", networkId);
      const snapshot = await getDoc(networkRef);

      const data = snapshot.data();
      const passenger = data.passengers.find(p => p.id === auth.currentUser.uid);

      if (!passenger){
        throw new Error('Unknown error') 
      }

      const status = passenger.status



      if (userData?.role === 'passenger'){
        if (status === 'approved'){
          const q = query(ridesRef, where("departure", "==", departure.toLowerCase()) ,
                                    where("arrival", "==", arrival.toLowerCase()),
                                    where("departure_date", "==", departure_date) , 
                                    where("network_id", "==", networkId));
          const snapshot = await getDocs(q);
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          return data 
        }
        else {
          throw new Error('You need director approval first')
        }

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

  const changeUserStatus = async (id , newStatus , networkId , role)=>{
    try {
      setIsLoading(true)

      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();
      const docRef = doc(db , 'networks' , networkId)
      const snapshot = await getDoc(docRef)
      const data = snapshot.data();

      if (userData?.role == 'director'){
        let updateUsers
        if (role === 'passenger'){
          updateUsers = data.passengers.map(p => p.id === id ? {...p , status : newStatus} : p)
        }
        else if (role === 'driver'){
          updateUsers = data.drivers.map(p => p.id === id ? {...p , status : newStatus} : p)
        }
        
        await updateDoc(docRef , {[`${role}s`] : updateUsers})
        toast.success('User status changed successfully')
      }
      else {
        throw new Error('You do not have permission to create Ride')
      }
    }
    catch (error){
      console.log(error)
      toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  const getRide = async (id , networkId)=>{
    try {
        const userId = auth.currentUser.uid;
        const network = doc(db , 'networks' , networkId)
        const networkSnapshot = await getDoc(network)
        const networkData = networkSnapshot.data()

        const ride = doc(db , 'rides' , id)
        const rideSnapshot = await getDoc(ride)
        const rideData = rideSnapshot.data()
        if (networkSnapshot.exists() && rideSnapshot.exists()) {
          const isAuthorized =
            networkData.directorId === userId ||
            networkData.passengersIds?.includes(userId) ||
            networkData.driversIds?.includes(userId);
          return isAuthorized ? rideData : null;
        }
        return null
    }
    catch (error){
        toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  const bookRide = async ({driver : { id } , rideId , 
    departure , departure_date , departure_time ,
    arrival , arrival_date , arrival_time , price , available_seats} , booked_seats , networkId)=>{
    try {
      setIsLoading(true)
      const inviteCode = generateInviteCode()

      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userData = userDoc.data();

      const networkRef = doc(db, "networks", networkId);
      const networkSnapshot = await getDoc(networkRef);

      const networkData = networkSnapshot.data();
      const networkpassenger = networkData.passengers.find(p => p.id === auth.currentUser.uid);


      const rideRef = doc(db, "rides", rideId);
      const rideSnapshot = await getDoc(rideRef);

      const rideData = rideSnapshot.data();
      const ridepassenger = rideData.passengers.find(p => p.id === auth.currentUser.uid);

      if (!networkpassenger && !ridepassenger){
        throw new Error('Unknown error') 
      }

      const status = networkpassenger.status
      const booked = ridepassenger !== undefined ? true : false

      if (userData?.role === 'passenger'){
        if (status === 'approved'){
          if (!booked) {
            await setDoc(doc(db , 'booking' , `book-${inviteCode}`) , 
            {
                driver : id ,
                passenger : auth.currentUser.uid , 
                ride_id : rideId,
                departure ,
                departure_date , 
                departure_time ,
                arrival , 
                arrival_date , 
                arrival_time , 
                booked_seats ,
                price : price * booked_seats , 
                networkId ,
                ride_status : 'not started',
                booked_At : new Date()
            })
            
            await updateDoc(doc(db , 'rides' , rideId) , {available_seats : available_seats - booked_seats , 
              passengers : arrayUnion({...userData , id : auth.currentUser.uid})})
            toast.success('Ride Booked successfully')
          }
          else {
            throw new Error('ride already booked')
          }
        }
        else {
          throw new Error('you need admin approval first')
        }
      }

      
    }
    catch (error){
      toast.error(error.message)
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
                else if (userData?.role === 'passenger'){
                  q = query(networksRef , where("passengersIds", "array-contains", user.uid));
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
    
  

    return <NetworkContext.Provider value={{createNetwork , joinNetwork , getNetwork , offerRide ,findRide , changeUserStatus , getRide , bookRide , isLoading , networksList}}>
        {children}
    </NetworkContext.Provider>
}

export const useNetwork = ()=> useContext(NetworkContext)