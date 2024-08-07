"use client"

import React from 'react'
import Link from "next/link"
import {useState,useEffect} from "react"
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import {ImSpinner8} from 'react-icons/im'
//import React from 'react'
   //import { supabase } from '@/superbaseConfig'
    import {
        FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText,
        Input
      } from '@chakra-ui/react'
    
 import { Button, ButtonGroup } from '@chakra-ui/react'
 import {useRouter} from "next/navigation"
 import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {firebaseapp} from "../../../Firebase"
import {getFirestore} from "firebase/firestore"
import {getAuth} from  "firebase/auth";
import {setDoc,doc} from "firebase/firestore"
import {signInWithEmailAndPassword} from 'firebase/auth';

function Login() {
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [isError, setError] = useState(false)
const [loading, setLoading]= useState('')
const [errMessage, setErrorMessage] = useState('')
const [success,setSuccess] = useState(false)
const router = useRouter()
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const projectfirestore = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)

  const loginInUser = async(e)=>{

    e.preventDefault();

    setSuccess(true)

    if(password !== "" || email !== "" ){

      if(emailRegex.test(email) == false){
        toast('Email is not valid',{autoClose:1000,type:'error',position:'top-right'})
        setSuccess(false);
        setLoading(false);
        return;
    }


   try{
    await signInWithEmailAndPassword(auth,email,password).then((response)=>{
      console.log(response)
  setTimeout(()=>{
       router.push("/createTimeTable")
     }, 3000)
    })
    setSuccess(false);
    setLoading(false);
   }
   catch(err){
    console.log("ERROR")
    setErrorMessage(err.message);
    setLoading(false);
    setSuccess(false);
   }
   }

   

  


    else{
      
      toast('Fields are empty, check',{autoClose:1000,type:'error',position:'top-right'})
      setErrorMessage("Fields are empty, check")
      setSuccess(false);
      setLoading(false);

    }
   
    
   
  }
  return (
   
    
  
        <>
        <div className="w-[50%] m-auto md:mt-[10%] mt-[200px]">
          <div>
            <h2 className="text-center text-2xl font-bold">Sign In</h2>
          </div>
         <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
          

           <Button colorScheme='red' onClick={loginInUser} className="w-[200px] mt-[30px] md:ml-[0px] p-[20px]">{success ?<ImSpinner8 className="text-white animate-spin w-[30px] "/>:<p className="text-[17px]">Login</p>}</Button>
        </FormControl>

        <div className="text-red-900 text-[12px] mt-[12px]">{errMessage ?<p>{errMessage}</p>: null}</div>

        <div className="flex justify-between flex-col mt-3 text-sm">
              <p>Do not have an account? <span className="text-red-600 cursor-pointer text-sm font-bold" onClick={()=> router.push("/authentication/signup")}>sign up</span></p>
             
        </div>
       
        </div>
        </>
      )
    }
    
        
  


export default Login