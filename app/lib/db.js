import mongoose from "mongoose";

export async function dbConnect() {
  try{
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection.db;
    }
  
    const MONGO_URI = `mongodb+srv://aveiroman01:cuneyt7088@cluster0.w8rzxom.mongodb.net/bankaccountdb?retryWrites=true&w=majority&appName=Cluster0`;
    const DATABASE_NAME = "bankaccountdb";
  
    await mongoose.connect(`${MONGO_URI}`);
  
    console.log('Veritabanı bağlantısı başarılı.');
    return mongoose.connection.db;

  } catch (error) {
    console.error('Veritabanına bağlanırken bir hata oluştu:', error);
    return null;
  }
}
