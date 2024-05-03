import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Accounts = ({register}: { register: any }) => {
  console.log('Account')

  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const { userData,setUserData  } = useContext(UserContext);
  const cards:any = userData && 'cards' in userData ? userData.cards : [];
  const name = userData && userData.name ? userData.name : [];
  const tckn = userData && userData.tckn ? userData.tckn : [];

  const handleRowSelection = (selection: any) => {
    setSelectedRows(selection);
  };


  useEffect(() => {
    if (selectedRows.length > 0) {
      const selectedCardNumbers = selectedRows.map((id: any) =>
        rows.find((row) => row.id === id)
      );
      console.log('selectedCardNumbers bakma:', selectedCardNumbers);
      setUserData((prevUserData: any) => ({
        ...prevUserData,
        selectedRows: selectedCardNumbers,
      }));
    }
  }, [selectedRows]);

  

  const cardData = Array.isArray(cards)
  ? cards.map((card:any) => ({
    cardNumber: card.cardNumber,
    amount: card.amount,
  })): [];

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'tckn',
      headerName: 'Kimlik Numarası',
      width: 150,
      editable: true,
    },
    {
      field: 'firstName',
      headerName: 'İsim',
      width: 150,
      editable: true,
    },
    {
      field: 'cardNumber',
      headerName: 'Kart Numarası',
      width: 150,
      editable: true,
    },
    
  ];
  
  const rows = cardData.map((card,index) => ({
    id: index + 1, 
    firstName: name,
    cardNumber: card.cardNumber,
    tckn:tckn,
    amount:card.amount
  }));


  console.log('user nasıl geliyor',userData)

  return (
    <div className='my-7'>
      <label>Banka Hesapları</label>
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelection}
        disableMultipleRowSelection 
      />
    </Box>
    </div>
  )
}

export default Accounts