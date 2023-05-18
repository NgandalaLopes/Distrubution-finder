const { Schema, model } = require ("mongoose");


const charitySchema = new Schema ({
    name :{
        type : String,
        required: true,
    },
    description: {
        type : String,
    },
    logoUrl: {
      type: String,
    },
    coverImageUrl: {
        type: String,
      }, 
      logoCloudinaryId: {
        type: String, 
      },
    ein: {
        type: String, 
      },
    
      matchedTerm :{
        type: String,
        },
        location:{
        type: String,
      },
      profileUrl:{
        type: String,
      },
    });

    const Charity = model("Charity", charitySchema);
    
module.exports =Charity;