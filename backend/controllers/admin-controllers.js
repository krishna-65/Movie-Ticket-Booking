const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllAdmin = async(req,res)=>{
    try{
        const user = await Admin.find();
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'No admins found',
            });
        } 
        
        return res.status(200).json({
            success: true,
            data: user
        });

}catch(error){
        return res.status(500).json({
            success:'false',
            message:'server error in getAllAdmin',
            error: error
        })
    }
}
exports.addAdmin = async(req,res)=>{
    try{
            const {userName,email,password} = req.body;

            if(!userName || !email || !password)
            {
                return res.status(422).json({
                    success:false,
                    message: 'Please provide all fields',
                })
            }

            const existingUser = await Admin.findOne({email});
            if(existingUser)
            {
                return res.status(400).json({
                    success:false,
                    message: `Email Already Registered`,
                })
            }

            let hashedpassword;

           try{
             hashedpassword =  await bcrypt.hash(password,10);
            
           }catch(error){
            return res.status(400).json({
                success:false,
                message: 'Error hashing password',
                error
            })
           }

           
    
            let user = new Admin({
                userName,
                email,
                password:hashedpassword,
                addedMovies:[]
            });
            user = await user.save();
 
           

           return res.status(200).json({
            success:true,
            message: 'Admin added successfully',
            user,
        })
           

    }catch(error){
        return res.status(500).json({
            success:false,
            message: 'An error occurred while adding an admin',
            error
        })
    }
}


exports.adminLogin = async(req,res)=>{
    try{

        const {email,password} = req.body;

        if(!email || !password){
            return res.status(422).json({
                success: false,
                message: 'Please provide both email and password',
            })
        }
        const user = await Admin.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Email is not registered',
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect',
            })
        }

        let token;

        try{
            token = jwt.sign({id:user._id,user:"admin",name:user.userName},process.env.SECRET_KEY, {expiresIn:"1d"});

        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error generating token',
                err
            })  // Error generating token, return 500 status code with error message
        }
        return res.status(200).json({
            success: true,
            message: 'Admin logged in successfully',
            token,
            id: user._id
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'An error occurred while logging in',
            error
        })
    }
}