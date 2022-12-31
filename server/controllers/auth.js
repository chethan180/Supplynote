const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const staff = require("../models/staff.js")
const dotenv = require('dotenv')


dotenv.config();



export const signin = async (req, res) => {

    const { Email, Password } = req.body;
    // return res.json(process.env.SECRET_SALT_VALUE);
  
    jw
    try {
      const oldUser = await staff.findOne({ Email });
  
      if (!oldUser) return res.json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(Password, oldUser.Password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ Email: oldUser.Email, id: oldUser._id }, process.env.SECRET_SALT_VALUE, { expiresIn: "1h" });
  
      const Staff = {Emp_Id : oldUser.Emp_Id , name : oldUser.Staff_Name ,Email : oldUser.Email ,Type : oldUser.Type };
  
      res.status(200).json({ result: Staff, token });
    } catch (err) {
      res.status(500).json(error.message);
    }
  };