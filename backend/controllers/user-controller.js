
const User = require('../models/User');
const sendEmail = require('./sentEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
exports.getAllUsers = async(req,res)=>{
    try{
            const users = await User.find();
            if(!users){
                return res.status(404).json({
                    success: false,
                    message: 'No users found',
                });
            }
            return res.status(200).json({
                success: true,
                data: users,
            });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in getting all users`,
            error,
        })
    }
}

exports.addUser = async(req,res) =>{

    try{
            const {userName,email,password} = req.body;
            if(!userName || !email || !password)
            {
                return res.status(422).json({
                    success:false,
                    message: 'Please provide all fields',
                })
            }

            const existingUser = await User.findOne({email});

            if(existingUser) {
                return res.status(400).json({
                    success:false,
                    message: `User already exists with this email`,
                })
            };

            let hashedpassword;
                 hashedpassword = await bcrypt.hash(password, 10);
            
            const user = await new User({userName,email,password:hashedpassword,booking:[]}).save();

            sendEmail(email, 'Account created successfully', `
                <h2>Thank you ${userName} for creating account!</h2>
                <p>Enjoy your day!</p>
            `);
            
            return res.status(201).json({
                success: true,
                message: 'User registered successfully',
                user,
            })
            

    }catch(error){
        return res.status(500).json({
            success:false,
            message: `server error in signup`,
            error,
        })
    }
}
exports.updateUser = async(req,res)=>{
    try{
            const id = req.params.id;


            const {userName,email,password} = req.body;

            if(!userName || !email || !password){
                return res.status(422).json({
                    success:false,
                    message: 'Please provide all fields',
                })
            }
            

            
             let hashedpassword;
                        try{
                             hashedpassword = await bcrypt.hash(password,10);
                        }catch(error){
                            return res.status(500).json({
                                success: false,
                                message: 'Error hashing password',
                                error
                            })
                
                        }


            const user = await User.findByIdAndUpdate(id, {
                userName,
                email,
                password:hashedpassword
            });


            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user,
            })


        }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in updating user`,
            error,
        })
    }
}

exports.deleteUser = async(req,res)=>{
    try{

        const id= req.params.id;

        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: 'Error detecting while deleting user',
            })
        }
        return res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            user,
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message: `server error in deleting user`,
            error,
        })
    }
}

exports.login = async(req,res)=>{
    try{

        const {email, password}  = req.body;

        if(!email&&email.trim()==="" && !password &&password.trim()===""){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            })
        }
        
        const user = await User.findOne({email});
         if(!user){
            return res.status(404).json({
                success:false,
            message: `User not found with this email`,     
           })
         }

         const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: 'Incorrect password',
            })
        }
        let token;

        try{
            token = jwt.sign({id:user._id,user:"user",name:user.userName},process.env.SECRET_KEY, {expiresIn:"1d"});
        }catch(err){
            return res.status(500).json({
                success: false,
                message: 'Error generating token',
                err
            })  // Error generating token, return 500 status code with error message
        }
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            token,
            id: user._id
        })


    }catch(error){
        return res.status(500).json({
            success:false,
            message: `server error in login`,
            error,
        })
    }
}

