import React from 'react';
import Service from '../Service/Service';
import './Services.css';
import useService from './../../../hook/useService';

const Services = () => {

    const [services] = useService()

    return (
        <div id="services" className='container'>
            <div className="row">
            <h1  className='text-primary text-center mt-5'> Our Services</h1>
            <div className="services-container">
            {
                services.map(service => <Service
                    key={service._id}
                    service={service}
                >
                </Service>)
            }
            </div>
            </div>
        </div>
    );
};

export default Services;