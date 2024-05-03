// money add

import { dbConnect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,res: NextResponse) {
    if (req.method === 'PUT') {
  
    try {

        const reqBody =  await req.json();
        console.log("bodyy",reqBody);
        let   {tckn, cardNumber, amount}:{tckn: string, cardNumber:string, amount:number}  = reqBody;

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
      
      if (!user) {
        return NextResponse.json({ message: 'Kullanıcı bulunamadı.'});
      }
  
      // Seçilen kart
      const selectedCardIndex = user.cards.findIndex((card:Card) => card.cardNumber === cardNumber);
      if (selectedCardIndex === -1) {
        NextResponse.json({ error: 'Kart bulunamadı.' });
        return;
      }
  
      // Kullanıcı bulunduğunda card bilgilerini güncelleme işlemi
      user.cards[selectedCardIndex].amount += amount;
      await db.collection('bankaccountcollection').updateOne({ tckn }, { $set: { cards: user.cards } });
      console.log("kişi deposit banka bütçesi:",user.cards[0].amount)
      
      return NextResponse.json({ message: 'Bakiye başarıyla güncellendi.' });
  
    }catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Bakiye güncellenirken bir hata oluştu.' });
    }
}
}

