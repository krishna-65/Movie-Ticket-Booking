const  mongoose  = require('mongoose');
const Movie = require('../models/Movie');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
exports.addMovie = async(req,res)=>{
    try{
       
        const token = req.body.headers.Authorization.split(" ")[1];
        if(!token && token.trim() === ""){
            return res.status(404).json({
                success: false,
                message: 'unauthorized access',
            });
        }

    let adminId =  jwt.verify(token,process.env.SECRET_KEY,(err,decrypted)=>{
 
        if(err){
            return res.status(401).json({
                success: false,
                message: 'invalid token',
                err
            });

        }
        else{
            // adminId =  decrypted.id;
            return decrypted.id;
        }
    })

    

        const {title, releaseDate,actors, description, posterUrl, featured} = req.body.body;

    if(!title && title.trim() ==="" ||  !description && description.trim()==="" || !posterUrl && posterUrl.trim()===""||!featured &&featured.trim()==""){
        return res.status(422).json({
            success: false,
            message: 'Please provide all fields',
        });
    }

    let movie;
          try{

            movie = new Movie(
                {
                    title,
                    releaseDate: new Date(`${releaseDate}`),
                    description,
                    posterUrl,
                    featured,
                    actors,
                    admin:adminId})

                    const session = await mongoose.startSession();
                    session.startTransaction();
                    await movie.save({session});
                    const admin = await Admin.findById(adminId);
                    if (!Array.isArray(admin.addedMovies)) {
                        admin.addedMovies = [];
                    }
                    admin.addedMovies.push(movie);
                    await admin.save({session});
                    session.commitTransaction();


         }catch(error){
            return res.status(500).json({
                success: false,
                message: ` error in adding movie`,
                error:error.message,

            })
          }

    if(!movie){
        return res.status(400).json({
            success: false,
            message: 'Failed to add movie',
        })
    }
    return res.status(200).json({
        success: true,
        message: 'Movie added successfully',
        movie
    })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: `server error in adding movie`,
            error,
        })
    }
}

exports.getAllMovies = async(req,res)=>{
    try{
        const movies = await Movie.find();
        if(!movies){
            return res.status(404).json({
                success: false,
                message: 'No movies found',
            })
        }
        return res.status(200).json({
            success: true,
            data: movies
        })
    }catch(error){
        return res. status(500).json({
            success: false,
            message: 'An error occurred while fetching all movies',
            error
        })
    }
}

exports.getMovieById = async(req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({
                success: false,
                message: 'Movie not found',
            })
        }
        return res.status(200).json({
            success: true,
            data: movie
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching movie by id',
            error
        })
    }
}

exports.getMovieByAdminId = async(req,res)=>{
        try{
                const response = await Movie.find({admin:req.params.id});
                if(!response){
                    return res.status(404).json({
                        success: false,
                        message: 'No movies found',
                    })
                }
                return res.status(200).json({
                    success: true,
                    data: response
                })
        }catch(error){
                return res.status(500).json({
                    success: false,
                    message: 'An error occurred while fetching movie by admin id',
                    error
                });
        }
}
