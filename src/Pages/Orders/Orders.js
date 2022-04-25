import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const [orders, setOrders]= useState([])
    const getOrders = async ()=>{

    
    const email = user.email;
        const url = `http://localhost:5000/order?email=${email}`
        try{
            const {data} = await axios.get(url, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setOrders(data);
        }
        catch(error){
            console.log(error.message);
            if(error.response.status===401 || error.response.status===403){
                signOut(auth);
                navigate('/login')
            }
        }
    }
    getOrders()
    return (
        <div>
            <h1>These are your Orders</h1>
            {
                orders.map(o=><li key={o._id}>{o.service}</li>)
            }
        </div>
    );
};

export default Orders;