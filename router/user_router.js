const express = require('express');
const router = new express.Router();


const UserController = require('../controller/user_controller');


// router.get("/signUp" , (req,res)=>{
//     res.send("Hello")
// })

router.post("/signUp" , UserController.signUp);

router.post("/signIn" , UserController.signIn);


module.exports = router

