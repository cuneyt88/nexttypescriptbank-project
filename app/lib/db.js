import mongoose from "mongoose";

export async function dbConnect() {
  try{
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection.db;
    }
  
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(`${MONGO_URI}`);
  
    console.log('Veritabanı bağlantısı başarılı.');
    return mongoose.connection.db;

  } catch (error) {
    console.error('Veritabanına bağlanırken bir hata oluştu:', error);
    return null;
  }
}
