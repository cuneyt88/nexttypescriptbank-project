import React, { useContext } from 'react';
import UserContext from '../context';


type CheckButtonProps = {
  setValue: Function; 
  watch: Function; 
}


export const CheckButton = ({ setValue, watch }: CheckButtonProps) => {

  console.log('CheckButton')
  const {setUserData}=useContext(UserContext)

  const handleCheckTckn = async () => {

    let tckn = watch('tckn');

    try{
      console.log(tckn)
      console.log(typeof tckn)
      console.log(`/api/allcards/${tckn}`)

      const res = await fetch(`/api/allcards/${tckn}`,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        
      });

      if(!res.ok){
        throw new Error("Böyle bir Tckn bulunamamıştır.")
      }
      const userData = await res.json();
      console.log(userData)  //check data
      setUserData(userData);

    }catch(error:any){
      console.log(error)
      alert(error.message);
      setUserData({
        tckn: '',
        name: '',
        address: [],
        amount: 0,
        cards: [],
        selectedCard: '',
        selectedRows: [],
      }); // Yanlış tckn olduğunda userData'yı sıfırla
    }

  }

  // const handleCheckAll = async (e:any) => {
  //   e.preventDefault();

  //   try{
  //     console.log(`/api/allcards`)

  //     const res = await fetch(`/api/allcards`,{
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
        
  //     });

  //     if( !res.ok){
  //       throw new Error("Böyle bir data bulunamamıştır.")
  //     }
  //     const data  =await res.json();
  //     console.log(data)  //check data

  //   }catch(error:any){
  //     console.log(error)
  //     alert(error.message);
  //   }

    
  // }

  const tckn = watch('tckn')

  return (
    <div>
      <button className='btn-primary' type='button' onClick={handleCheckTckn}>
        Check TCKN
      </button>
    </div>
  )
}



// ------------------------------------------------------

export const DepositButton = ({ withdrawAmount = '' }) => {
  
    const { userData, setUserData } = useContext(UserContext);

    const handleDeposit = async (e:any) => {

      e.preventDefault();
      
      try {
      // setUserData({ ...userData, tckn: tckn, amount: amount });
      const amount = parseFloat(withdrawAmount);
      const selectedCard = userData.selectedRows[0]?.cardNumber;
      const tckn = userData?.tckn
      const response = await fetch(`/api/allcards/putAdd/${tckn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tckn: userData.tckn,
          cardNumber: selectedCard, 
          amount: amount, // 
        }),
      });
      
      if (!response?.ok) {
        throw new Error('Para çekme işlemi başarısız oldu.');
      }

      const data = await response.json();
      console.log("Güncellenmiş userData:", userData);
      console.log(data.message); 
      setUserData(data.userData); // Kullanıcı verisini güncelleme
    } catch (error:any) {
      console.error('Error:', error.message);
      alert(error.message);
    }
  
  }
  return (
    <div>
      <button className='btn-primary' type='button' onClick={handleDeposit}>Para Yatır</button>
    </div>
  )

}




// ------------------------------------------------------------
export const ClearSaveButton = ({ withdrawAmount = '' }) => {
  
  const { userData, setUserData } = useContext(UserContext);

    const handleClear = async () => {
      
      setUserData({
        tckn: '',
        name: '',
        address: [],
        amount: 0,
        cards: [],
        selectedCard: '',
        selectedRows: [],
      });
      
    }

    const handleSave = async () => {
      let tckn = userData.tckn;

      console.log("Güncellenmiş userData:", userData);

      
      fetch(`/api/allcards/addressChange/${tckn}`, {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tckn: userData.tckn,
          sokak:userData.address[0]?.sokak,
          cadde:userData.address[1]?.cadde,
          mahalle:userData.address[2]?.mahalle,
          bina:userData.address[3]?.bina,
          ilce:userData.address[4]?.ilce,
          il:userData.address[5]?.il
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message); // Server'dan gelen yanıtı kontrol et
          setUserData(data.userData);
        })
        .catch(error => {
          console.error('Error:', error);
        });

    }


return (
  <div>
    <button className='btn-primary' type='submit' onClick={handleClear}>Temizle</button>
    {/* <button className='btn-primary' type='submit' onClick={handleSave}>Kaydet</button> */}
  </div>
)
}


