import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import axios from "axios";
import { auth, provider } from "../../firebase.js";



export const LoginPage = () => {

    const [pageType, setPageType] = useState("register");
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

    function changePageTypeReg(){
        setPageType("register")
    }

    function changePageTypeLog(){
        setPageType("login")
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
          const res = await axios.post("/auth/signin", { name, password });
          dispatch(loginSuccess(res.data));
          navigate("/")
        } catch (err) {
          dispatch(loginFailure());
        }
      };

      const handleRegister = async(e)=>{
        e.preventDefault();
        dispatch(loginStart());
        try{
            const res = await axios.post("/auth/signup", {name,password,email});
            dispatch(loginSuccess(res.data));
            navigate("/")
        }catch (err) {
            dispatch(loginFailure());
      }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart());
        signInWithPopup(auth, provider)
          .then((result) => {
            axios
              .post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
              })
              .then((res) => {
                console.log(res)
                dispatch(loginSuccess(res.data));
                navigate("/")
              });
          })
          .catch((error) => {
            dispatch(loginFailure());
          });
      };

  return (
    <div className='flex' >
           <Card className="w-[350px] absolute m-auto left-0 right-0 top-1/5">
      <CardHeader>
        <CardTitle className="text-center">{pageType=="register" ? <p>Register</p> : <p>Login</p>}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name"  placeholder="Username" onChange={(e) => setName(e.target.value)} />
            </div>
            {pageType=="register" && 
<div className="flex flex-col space-y-1.5">
<Label htmlFor="framework">Email</Label>
<Input id="email"  placeholder="email" onChange={(e) => setEmail(e.target.value)} />
</div>
            }
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="password" type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className=" grid items-center  ">
        {pageType=="register" ?
        <div className=" grid items-center">
             <Button onClick={handleRegister}>Register</Button> 
         <p className='text-center'>or </p>
         <Button variant="outline" onClick={signInWithGoogle}>Register with Google </Button>
         <p className='text-center'>or </p>
         <Button variant="outline" onClick={changePageTypeLog}>Go to Login</Button>
        </div>
         :
         <div className=" grid items-center">
 <Button onClick={handleLogin}>Login</Button>
 <p className='text-center'>or</p>
 <Button variant="outline" onClick={changePageTypeReg}>Go to Register</Button>
         </div>
         }
      </CardFooter>
    </Card>
    </div>
  )
}
