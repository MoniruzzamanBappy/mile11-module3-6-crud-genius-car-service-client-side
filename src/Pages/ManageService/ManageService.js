import React from 'react';
import useService from './../../hook/useService';

const ManageService = () => {
    
    const [services, setServices] = useService();

    const handleDelete = id =>{
        const process = window.confirm('Are you sure?')
        if(process){
            const url = `http://localhost:5000/service/${id}`
            fetch(url, {
                method: 'DELETE'
            })
            .then(res=>res.json())
            .then(result=>{
                const remaining = services.filter(s=>s._id !== id);
                setServices(remaining);
            })
        }
    }

    return (
        <div>
            <h2>Manage Service</h2>
            {
                services.map(service=><div key={service._id}>
                    <h5>{service.name} <button onClick={()=>handleDelete(service._id)}>X</button></h5>
                </div>)
            }
        </div>
    );
};

export default ManageService;