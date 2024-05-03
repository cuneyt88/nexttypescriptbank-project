import {dbConnect} from '../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(){

    const con=await dbConnect();
    
    if (con) {
        console.log('Veritabanı bağlantısı başarılı.');
    } else {
        console.error('Veritabanına bağlanırken bir hata oluştu.');
    }

    return new NextResponse('connected')
    const MONGO_URI=`mongodb+srv://aveiroman01:cuneyt7088@cluster0.w8rzxom.mongodb.net/`

}