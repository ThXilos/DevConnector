const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");

const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");

//@route    Get api/auth
//@desc     Test route
//@access   Public
//we add "auth" as a second parameter where ever we want to use it on the route
router.get("/",auth, async(req, res) => {
    try{
        //req.user can be accessed in any protected route
        const user = await User.findById(req.user.id)
        .select("-password");
        res.json(user);
    }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
    }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post("/",[
    check("email","Email required")
    .isEmail(),
    check("password","Password is required")
    .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name, email, password} = req.body;

    try{
        //Check if User exists
        let user = await User.findOne({email});
        
        if (!user){
         return   res
         .status(400)
         .json({errors:[{msg:"Invalid Credentials"}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res
            .status(400)
            .json({errors:[{msg:"Invalid Credentials"}]});
        }


        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,
            config.get("jwtSecret"),
            {expiresIn:360000},
            (err, token) => {
                if(err) throw err;
                res.json({ token });
                
            });

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;