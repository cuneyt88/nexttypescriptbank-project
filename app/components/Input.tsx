import React, { useContext } from 'react'
import UserContext from '../context'

type TcknInputProps = {
  register: any;
};


export const TcknInput = ({register}: TcknInputProps) => {
  return (
    <div className='tcknClass'>
      <label>TCKN</label>
      <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register('tckn')} type="text" />
    </div>
  )
}

export const NameSurInput = ({register}: { register: any }) => {
  const { userData } = useContext(UserContext);
  const name = userData && userData.name ? userData.name : [];

  return (
    <div>
      <label>İsim Soyisim</label>
      <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...register('name')} type="text" value={name} readOnly/>
    </div>
  )
}

export const AddressInput = ({register}: { register: any }) => {
  const { userData } = useContext(UserContext);
  // const address = userData && userData.address ? userData.address : [];
  const sokak = userData && userData.address[0]?.sokak ? userData.address[0].sokak : [];
  const cadde = userData && userData.address[1]?.cadde ? userData.address[1].cadde : [];
  const mahalle = userData && userData.address[2]?.mahalle ? userData.address[2].mahalle : [];
  const bina = userData && userData.address[3]?.bina ? userData.address[3].bina : [];
  const ilce = userData && userData.address[4]?.ilce ? userData.address[4].ilce : [];
  const il = userData && userData.address[5]?.il ? userData.address[5].il : [];

  return (
    <div className='adressDiv'>
      {/* <label >Adres</label>
      <input className='input-primary' {...register('address')} type="text" value={address} readOnly/> */}
      <label >Sokak</label>
      <input className='input-primary'  {...register('sokak')}  type="text" value={sokak}  />
      <label >Cadde</label>
      <input className='input-primary'  {...register('cadde')}  type="text"  value={cadde}  /> 
      <label >Mahalle</label>
      <input className='input-primary'  {...register('mahalle')}  type="text"  value={mahalle}  /> 
      <label >Bina</label>
      <input className='input-primary'  {...register('bina')}  type="text"  value={bina}  />
      <label >İlçe</label>
      <input className='input-primary'  {...register('ilce')}  type="text" value={ilce}  />
      <label >İl</label>
      <input className='input-primary'  {...register('il')}  type="text" value={il}  />
    </div>
  )
}


