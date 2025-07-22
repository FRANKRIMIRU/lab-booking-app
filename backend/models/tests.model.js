import mongoose from 'mongoose'

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type: String,
    required:true
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
   
    default: "General",
  },
  availability: {
    type:Boolean,
  },

  sampleRequired: {
    type: String,
    
    default:"General"
  },
 
  
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{ timestamps: true }//createdAt,updatedAt
);
const Test = mongoose.model('Test', testSchema);//mongoose.model(modelName, schema)

export default Test;
