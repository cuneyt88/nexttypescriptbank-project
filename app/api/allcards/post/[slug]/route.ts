//// money witdrawal

import { dbConnect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req:NextRequest,res: NextResponse) {
    if (req.method === 'PUT') {
        try {
            const reqBody =  await req.json();
            console.log("bodyy",reqBody);
          let   {tckn, cardNumber, amount}:{tckn: string, cardNumber:string, amount:number}  = reqBody;

          console.log("gelen Tc", tckn);

        interface Card {
            cardNumber: string;
            amount: number;
        }
    
        const db = await dbConnect();
        if (db === null) {
            console.error('Veritabanı bağlantısı kurulamadı.');
            return;
        }
      
        const user = await db.collection('bankaccountcollection').findOne({ tckn });
      
        console.log("kişi banka bütçesi:",user !== null && user.cards[0].amount)
        console.log(user);
          if(!user){
            return NextResponse.json({error:'Kart bulunamadı user.'});
          }
      
      
          // Seçilen kart
          const selectedCardIndex = user.cards.findIndex((card:Card) => card.cardNumber === cardNumber);
          if (selectedCardIndex === -1) {
            return NextResponse.json({ error: 'Kart bulunamadı.' });
        
          }
    
      
           // Kullanıcının bakiyesi
           if (amount !== null && user.cards[selectedCardIndex].amount < amount) {
            return NextResponse.json({ error: 'Yetersiz bakiye.' });
           }
      
           console.log('amount bilgisi almak istediğim kartaki:',user.cards[selectedCardIndex].amount)
          // Kartın amount güncellemesi
          if (amount !== null && typeof amount === 'number') {
            user.cards[selectedCardIndex].amount = user.cards[selectedCardIndex].amount - amount;
            await db.collection('bankaccountcollection').updateOne({ tckn }, { $set: { cards: user.cards } });
          }
      
          return NextResponse.json({ message: 'Bakiye başarıyla güncellendi.'});
      
        } catch (error) {
          console.error(error);
          return NextResponse.json({ error: 'Bakiye güncellenirken bir hata oluştu.'});
        }
    }
}