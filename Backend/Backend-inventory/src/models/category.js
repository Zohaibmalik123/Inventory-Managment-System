const mongoose =require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    Id:{
        type:Number,
        trim:true
    },
    Category_name :{
        type : String,
        required:true,
        trim:true
    },
    Category_status :{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})
 

userSchema.methods.generateAuthToken = async function () {
        const category = this
        const token = jwt.sign({Id : category.Id.toString()} , 'thisismynewcourse')
        category.tokens = category.tokens.concat({token})
        await  category.save()
        return token
}

// userSchema.statics.findByCredentials = async (email , password) =>{
//     const user = await User.findOne({ email })
//     if (!user){
//         throw new Error ('unable to login')
//     }

//     const isMatch = await bcrypt.compare(password , user.password)
     
//     if(!isMatch){
//         throw new Error ('unable to login')
//     }
//     return user
// }

// userSchema.pre('save' , async function (next) {
//     const user = this 
    
//     if(user.isModified('password')){
//         user.password = await bcrypt.hash(user.password , 8)
//     }

//     next()
// })

const Category = mongoose.model('Category' , userSchema)
module.exports= Category
