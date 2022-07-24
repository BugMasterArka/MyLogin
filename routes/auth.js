const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// jwt secret token 
const JWT_SECRET = 'My$ign#ere';

// route to create user "/api/auth/createuser"
router.post('/createuser',[
    body('fname','Enter a valid first name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must have 5 or more characters').isLength({min: 5})
], async (req,res)=>{

    // if any errors are there, then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        // checking if user already exists
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(500).json({error: "A user with these credential already exists"});
        }

        // generating salt
        const salt = await bcrypt.genSalt(5);
        // adding salt to password
        const securePass = await bcrypt.hash(req.body.password,salt);

        // creating user
        user = await User.create({
            first_name: req.body.fname,
            last_name: req.body.lname,
            email: req.body.email,
            password: securePass,
        });
        // .then(user => res.json(user))
        // .catch(err=>{console.log(err);
        // res.json({err:"There is an error",message: err.message})});

        // data to be binded with authorization token
        const data = {
            user: {
                id: user.id
            }
        };

        // generating auth token
        const authToken = jwt.sign(data, JWT_SECRET);
        
        // returning json
        res.json({service: "User creation",user: user.first_name+" "+user.last_name,authToken: authToken});

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal Server error"});
    }

});

module.exports = router;