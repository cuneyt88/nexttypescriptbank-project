// money add

import { dbConnect } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,res: NextResponse) {
    if (req.method === 'PUT') {
  
    try {

        const reqBody =  await req.json();
        console.log("bodyy",reqBody);
        let   {tckn, sokak, cadde, mahalle, bina, ilce, il}:{tckn: string, sokak:string, cadde:string, mahalle:string, bina:string, ilce:string, il:string}  = reqBody;


      const db = await dbConnect();

      if (db === null) {
        console.error('Veritabanı bağlantısı kurulamadı.');
        return;
      }
      const user = await db.collection('bankaccountcollection').findOne({ tckn });
      
      if (!user) {
        return NextResponse.json({ message: 'Kullanıcı bulunamadı.'});
      }

      
      await db.collection('bankaccountcollection').updateOne({ tckn }, { $set: {
        'address.0.sokak': sokak,
        'address.1.cadde': cadde,
        'address.2.mahalle': mahalle,
        'address.3.bina': bina,
        'address.4.ilce': ilce,
        'address.5.il': il
      } });
      console.log("kişi deposit banka bütçesi:",user.address)
      
      return NextResponse.json({ message: 'Adres bilgileri başarıyla güncellendi.' });
  
    }catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Adres bilgileri güncellenirken bir hata oluştu.' });
    }
}
}

