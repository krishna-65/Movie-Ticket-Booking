
const User = require('../models/User');
const sendEmail = require('./sentEmail');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
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

exports.addUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Check if required fields are provided
        if (!userName || !email || !password) {
            return res.status(422).json({
                success: false,
                message: 'Please provide all fields',
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        // If user exists and is verified, return an error
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        let user;

        // If the user does not exist, create a new one
        if (!existingUser) {
            user = new User({
                userName,
                email,
                password: hashedPassword,
                booking: [],
            });
        } else {
            // If the user exists but isn't verified, use the existing user
            user = existingUser;
        }

        // Generate a verification token with an expiration time of 10 minutes
        const verificationToken = jwt.sign(
            { id: user._id },
            process.env.SECRET_KEY, // Correctly access SECRET_KEY
            { expiresIn: '10m' }
        );

        // Save the verification token to the user object
        user.verificationToken = verificationToken;
        await user.save();

        // Send verification email
        const verificationLink = `${process.env.API_URL}/verify/${verificationToken}`;
        await sendEmail(
            user.email,
            'Verify your email',
            `
            <h2>Thanks for visiting</h2>
            <p>Please verify your email by clicking the link below:${verificationLink}</p>
            `
        );

        return res.status(200).json({
            success: true,
            message: 'Check your email for email verification',
        });

    } catch (error) {
        console.error('Error in signup:', error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: 'Server error in signup',
            error: error.message,
        });
    }
};

exports.verifyAccount =  async (req, res) => {
    const { token } = req.params;

    try {
        console.log("hi");
      
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // This will throw an error if the token is expired
        const user = await User.findById(decoded.id);
       
        if (!user) {
            return res.status(400).json({ message: "Email is not registered" });
        }
            console.log("hi");
        user.isVerified = true;
        user.verificationToken = null; // Clear the token
        await user.save();

       sendEmail(user.email, 'Account created successfully', `
                <h2>Thank you ${user.userName} for creating account!</h2>
                <p>Visit login page for continue : ${process.env.API_URL}/user/login <p>
                <p>Enjoy your day!</p>
            `);
            
            return res.status(200).json({
                success: true,
                message: 'User registered successfully',
                user,
            })
            
    } catch (error) {
console.log(error);
        res.status(400).json({ message: "Invalid or expired token" ,error: error });
    }
};


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
            message: `Email is not registered`,     
           })
         }

         const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(404).json({
                success: false,
                message: 'Password is incorrect',
            })
        }

            if(!user.isVerified){
                return res.status(403).json({
                    success: false,
                    message: 'Email is not verified, please verify your email',
                })     // Account is not verified, return 403 status code with error message
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

