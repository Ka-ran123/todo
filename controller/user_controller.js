const UserModel = require('../models/user_model');
const bcrypt = require("bcryptjs");
const genarateToken = require('../utils/genarateToken');
const nodemailer = require('nodemailer');

const UserController = {
    signUp:async function(req,res)
    {
        try
        {
                const data = req.body;
                const findUser = await UserModel.findOne({email:data.email});
                // console.log(findUser);
                if(findUser)
                {
                    const response = {success:false,message:"Email is already exist"};
                    return res.status(401).json(response);
                }

                const user=new UserModel(data)
                await user.save();

                const userData= user.getData()

                const userToken =  genarateToken.genarateToken(user._id);

                nodemailer.createTransport()
                const response={success:true,data:userData,message:"New User Created" , token:userToken};

                return res.json(response)
        }
        catch(e)
        {
            const response={success:false,message:e.message};
            return res.status(400).json(response)
        }
    },
    signIn: async function (req, res) {
        try {
            email = req.body.email;
            password = req.body.password;
            const findUser = await UserModel.findOne({ email: email }); //{email} aa bhi chlse

            // console.log(findUser);
            if (!findUser) {
                const response = { success: false, message: "User Not Exist" };
                return res.status(401).json(response);
            }

            const matchPass = await bcrypt.compare(password, findUser.password);
            if (!matchPass) {
                const response = { success: false, message: "Password is wrong" };
                return res.status(401).json(response);
            }

            const userData = findUser.getData();

            const userToken = genarateToken.genarateToken(findUser._id);
            const response = { success: true, data: userData, message: 'SignIn successfully', token: userToken };
            return res.json(response);
        }
        catch (e) {
            const response = { success: false, message: e.message };
            return res.status(400).json(response);
        }
    },
}


module.exports = UserController;