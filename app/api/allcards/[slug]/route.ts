import { dbConnect } from "@/app/lib/db";
import { NextRequest,NextResponse } from "next/server"; 

interface Slug{
    slug:string
}

///get tckn

export async function GET(request:NextRequest,{params}:{params:Slug}){
   
    try {
        const db = await dbConnect();
        if (!db) {
            NextResponse.json({ error: 'Veritabanına bağlanırken bir hata oluştu.' });
            return;
        }


        const  tckn  = params.slug
        console.log("quer:",params.slug)

        if (!params.slug) {
            return NextResponse.json({ error: 'tckn parametresi eksik veya yanlış.' });
        }

        const user = await db.collection('bankaccountcollection').findOne({ tckn });

        if (!user) {
            return NextResponse.json({ error: 'Kullanıcı bulunamadı.' });
        }

        const { name, address, cards } = user;

        console.log("eee",user)

        return NextResponse.json({ name, address, tckn, cards });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Kullanıcı getirilirken bir hata oluştu.' });
    }

}


