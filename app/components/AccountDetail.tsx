import React, { useContext } from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserContext from '../context';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function AccountDetail() {

  const { userData,setUserData  } = useContext(UserContext);
  const name = userData && userData.name ? userData.name : [];
  const selectedCard = userData && userData.selectedRows ? userData.selectedRows[0]?.cardNumber : [];
  const userAmount = userData && userData.selectedRows ? userData.selectedRows[0]?.amount : []

  console.log('seçilen kart detayda:',selectedCard)
  
  return (
    <Card className='my-5' sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {name == '' ? 'İsim Soyisim' : name}
        </Typography>
        <Typography variant="h4" component="div">
          {selectedCard == '' ? 'Kart Numarası' : selectedCard}
        </Typography>
        <Typography variant="h5">
          Hesap Bakiyesi
          <br />
          {userAmount == '' ? '----' : userAmount +' TL'}
        </Typography>
      </CardContent>
    </Card>
  );
}