import React, { useState } from 'react'
import styles from'../page.module.css'
import { CheckButton, ClearSaveButton } from '../components/Buttons';
import { TcknInput, NameSurInput, AddressInput} from '../components/Input';
import { useForm } from 'react-hook-form';

export default function Dashboard() {

  const {register,handleSubmit,setValue,watch}=useForm();
  
  const onSubmit=(data:any)=>{
    console.log(data)
  }
  
    return (
      <main>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='border-2 border-violet-500 rounded-xl p-5 '>
                <TcknInput register={register}/>
                <CheckButton setValue={setValue} watch={watch}/>
                <NameSurInput register={register}/>
              </div>
            </form>
      </main>
    );
 }
