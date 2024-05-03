import mongoose,{Schema,Document} from "mongoose";


export interface IUsers extends Document {
    name:string;
    address:string;
    tckn:string;
    id:number;
    cards: { cardNumber: string; amount: number }[];
}

const userSchema:Schema = new mongoose.Schema({
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    tckn:{
        type:String,

    },
    id:{
        type:Number,
    },
    cards: [
        {
          cardNumber: { type: String},
          amount: { type: Number},
        },
      ],
})

const Users = mongoose.models.Users || mongoose.model<IUsers>("Users",userSchema,'bankaccountcollection')

export default Users