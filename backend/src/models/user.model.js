import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    contact : {
        type : String,
        required : true,
        unique : true
    },
    bio : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        enum : ["male" , "female" , "other"]
    },
    location : {
        city : String,
        state : String
    },
    profilePicture : {
        type : String,
        default : "https://ik.imagekit.io/flgbjchio/userimage.jpeg?updatedAt=1775172780768"
    },
    role : {
        type : String,
        enum : ["user" , "owner"],
        default : "user"
    },
    preferences : {
        sleepSchedule : {
            type : String,
            enum : ["earlyBird" , "nightOwl"]
        },
        diet : {
            type : String,
            enum : ["vegetarian" , "non-vegetarian" , "vegan"]
        },
        cleanliness : {
            type : String,
            enum : ["low" , "medium" , "high"]
        },
        smoking : {
            type : Boolean,
            default : false
        },
        drinking : {
            type : Boolean,
            default : false
        },
        pets : {
            type : Boolean,
            default : false
        },
        guestFrequency : {
            type : String,
            enum : ["rarely" , "sometimes" , "often"]
        },
        noiseTolerance : {
            type : String,
            enum : ["low" , "medium" , "high"]
        },
        studyEnvironment : {
            type : String,
            enum : ["quiet" , "moderate" , "social"]
        },
        workSchedule : {
            type : String,
            enum : ["workFromHome" , "office" , "hybrid" , "student"]
        },
        sharingPreference : {
            type : String,
            enum : ["shareRoom" , "privateRoom"]
        },
        preferredGender : {
            type : String,
            enum : ["male" , "female" , "any"]
        }
    }
},
    {timestamps : true}
)

userSchema.pre("save" , async function(){
    if(!this.isModified("password")) return
    const hash = await bcrypt.hash(this.password , 10)
    this.password = hash
})

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password)
}

const userModel = mongoose.model("users" , userSchema)

export default userModel