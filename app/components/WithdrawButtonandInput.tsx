'use client'
import React, { useContext, useState,  } from 'react'
import UserContext from '../context';
import { DepositButton } from './Buttons';
import { Alert, AlertTitle } from '@mui/material';


export const WitdrawButtonandInput = ({ register }: { register: any }) => {
    console.log('WitdrawButtonandInput')
    const [withdrawAmount, setWithdrawAmount] = useState('0'); 
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { userData, setUserData } = useContext(UserContext);

    const handleWithdrawAmountChange = (e:any) => {
        const amount = e.target.value;
        setWithdrawAmount(amount); 
        console.log(amount)
      }

    const handleWithdrawal = async (e:any) => {
        e.preventDefault(); 

    
        try {

          const tckn = userData?.tckn
          const selectedCard = userData.selectedRows[0]?.cardNumber;
          const amount = parseFloat(withdrawAmount);
          
          const response = await fetch(`/api/allcards/post/${tckn}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tckn: userData.tckn,
              cardNumber: selectedCard, 
              amount: amount, // Inputtan alınan değer
            }),
          });
          
          if (!response?.ok) {
            throw new Error('Para çekme işlemi başarısız oldu.');
          }
    
          const data = await response.json();
          setSuccessMessage('Para çekme işlemi başarıyla gerçekleştirildi.');
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
          setUserData(data.userData); // Kullanıcı verisini güncelleme
        } catch (error:any) {
          console.error('Error:', error.message);
          setErrorMessage(error.message);
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      }



  return (
    <div >
        <label>Çekilecek/Yatırılacak Miktar</label>
        <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register('withdrawAmount')} type="number" name="withdrawAmount" onChange={handleWithdrawAmountChange}/>
        
        <div className='buttonContainer'>
            <button className='btn-primary' onClick={handleWithdrawal} type='button'>Para Çek</button>
            <DepositButton withdrawAmount={withdrawAmount}/>             
        </div>

        {successMessage && ( 
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}

        {errorMessage && ( 
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      )}
        
    </div>
  )
}
