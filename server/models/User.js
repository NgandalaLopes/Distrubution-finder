const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema ({
    username:{
        type: String,
        required:true,
        unique:true,
        match:[/.+@.+\..+/, "Must use a valid email address"],
    },
    email: {
      type: String, 
      required: true,
      trim: true
    },
    password:{
        type: String,
        required:true,
    },
    donations:[
        {
        type: Schema.Types.ObjectId,
        ref:"Donation",
     },
    ],
    charities: [{
        type: Schema.Types.ObjectId,
        ref:"Charity"
      },
    ],
    categories:[
        {
      type:Schema.Types.ObjectId,
      ref:"Category",
     },
    ],

});

//hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };
  



 
  
const User = model("User", userSchema);

module.exports = User;