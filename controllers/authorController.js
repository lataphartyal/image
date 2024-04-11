const authorModel = require('../models/authorModel');
const validator = require('validator');
const createAuthor = async function (req,res){
    try {
    const data = req.body;
     if (!data.fname) {
        return res.status(400).send({ status: false, msg: "fname is required" });
          }
    if (!data.lname) {
        return res.status(400).send({ status: false, msg: "lname is required" });
          }
    if (!data.phone) {
            return res.status(400).send({ status: false, msg: "phone is required" });
          }
    if (data.phone.length < 10 || data.phone.length > 10) {
            return res.status(400).send({ status: false, msg: "phone no must be 10 digit" });
          }
    
    const duplicatePhone = await authorModel.findOne({ phone: data.phone });
      
    if (duplicatePhone) {
            return res
              .status(400)
              .send({ status: false, msg: "Phone already exists" });
          }
    if (!data.UserName) {
            return res.status(400).send({ status: false, msg: "UserName is required" });
              }
    const duplicateUserName = await authorModel.findOne({ UserName: data.UserName});
      
    if (duplicateUserName) {
            return res
              .status(400)
                        .send({ status: false, msg: "UserName already exists" });
                    }        
    if (!data.businessName) {
             return res.status(400).send({ status: false, msg: "businessName is required" });
              }                    
          
    if (!data.email) {
        return res.status(400).send({ status: false, msg: "email is required" });
          }
    

    const validEmail = validator.isEmail(data.email)
    if (!validEmail) {
        return res.status(400).send({status:false,msg:"email is not valid"})
      }

    const duplicateEmail = await authorModel.findOne({ email: data.email });
    if (duplicateEmail) {
            return res
              .status(400)
              .send({ status: false, msg: "email already exists" });
          }
      
    if (!data.password) {
            return res
              .status(400)
              .send({ status: false, msg: "password is required" });
          }
      
    if (!(data.password.length > 8 && data.password.length < 15)) {
            return res
              .status(400)
              .send({
                status: false,
                msg: "password length should be between 8 to 16 characters",
              });
          }
      
    const createAuthor = await authorModel.create(data);
          res
            .status(201)
            .send({
              status: true,
              message: "author created successfully",
              data: createAuthor,
            });
        } catch (error) {
          return res.status(500).send({ msg: error.message });
        }
      };
      

      const login = async function (req, res) {
        try {
          const data = req.body;
          if (!data.email) {
            return res
              .status(400)
              .send({ status: false, msg: "email is required field" });
          }
          if (!data.UserName) {
            return res
              .status(400)
              .send({ status: false, msg: "UserName is required field" });
          }
          if (!data.password) {
            return res
              .status(400)
              .send({ status: false, msg: "password is required field" });
          }
          const authorMatch = await authorModel.findOne({
            email: data.email,
            UserName: data.UserName,
            password: data.password,
          });
          if (!authorMatch) {
            
            return res
              .status(400)
              .send({ status: false, msg: "email, password or UserName is incorrect" });
          }
          const token = jwt.sign({ authorId: authorMatch._id }, "lata12", {
            expiresIn: "70h",
          });
          return res
            .status(200)
            .send({ status: true, msg: "Logged in successfully", token });
        } catch (error) {
          res.status(500).send({ status: false, error: error.msg });
        }
      };
      
      module.exports.login = login;
      module.exports.createAuthor = createAuthor;
      


