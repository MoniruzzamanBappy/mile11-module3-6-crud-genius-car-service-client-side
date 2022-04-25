import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useServiceDetail from '../../hook/useServiceDetail';

const ServiceDetail = () => {
    const {serviceId} = useParams();
    const navigate = useNavigate();
    const [service] = useServiceDetail(serviceId)
    const handleCheckout = () =>{
        navigate(`/checkout/${serviceId}`)
    }
    return (
        <div>
            <h2>Welcome to detail: {service.name}</h2>

            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default ServiceDetail;