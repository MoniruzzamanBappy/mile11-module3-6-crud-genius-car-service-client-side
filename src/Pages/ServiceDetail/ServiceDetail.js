import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetail = () => {
    const {serviceId} = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({})
    useEffect(()=>{
        const url = `http://localhost:5000/service/${serviceId}`
        fetch(url)
        .then(res=>res.json())
        .then(data=> setService(data))
    },[serviceId])
    const handleCheckout = () =>{
        navigate('/checkout')
    }
    return (
        <div>
            <h2>Welcome to detail: {service.name}</h2>

            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default ServiceDetail;