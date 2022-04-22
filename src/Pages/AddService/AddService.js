import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
  const onSubmit = data =>{
      const url = `http://localhost:5000/service`
      fetch(url, {
          method: 'POST',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(result=>{
          console.log(result);
      })
  }
   
  return (
    <div className='w-50 mx-auto my-5'>
        <form  onSubmit={handleSubmit(onSubmit)}>
      <input className='mb-3' placeholder="Name" {...register("name", { required: true, maxLength: 20 })} /> <br />
      <textarea className='mb-3' placeholder="Description" {...register("description")} /> <br />
      <input className='mb-3' placeholder="Photo URL" {...register("img")} /> <br />
      <input className='mb-3' placeholder="Price" type="number" {...register("price")} /> <br />
      <input type="submit" />
    </form>
    </div>
  );
};

export default AddService;