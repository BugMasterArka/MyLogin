const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');


router.post('/',[
    body('fname','Enter a valid first name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must have 5 or more characters').isLength({min: 5})
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    User.create({
        first_name: req.body.fname,
        last_name: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    .catch(err=>{console.log(err);
    res.json({err:"There is an error",message: err.message})});

});

module.exports = router;