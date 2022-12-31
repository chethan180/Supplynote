const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const staff = require("./models/staff.js")
const dotenv = require('dotenv')
const cors = require('cors')
var bodyParser = require('body-parser')


dotenv.config();



const signin = async (req, res) => {

    const { Email , Password } = req.body;
    console.log(req.body)
    // return res.json(process.env.SECRET_SALT_VALUE);
  
    try {
      const result = await staff.findOne({ Email  });
  
      console.log(!result)
      if (!result) return res.json({ message: "User doesn't exist" });
  
      const isPasswordCorrect = await bcrypt.compare(Password, result.password);
  
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ Email  : result.Email , id: result._id }, process.env.SECRET_SALT_VALUE, { expiresIn: "1h" });
  
      res.status(200).json({ result, token });
  
    } catch (err) {
      console.log(err.message)
      res.status(500).json(err.message);
    }
  };

  const signup = async (req, res) => {
    const { Email, Password, firstName, lastName } = req.body;
    console.log("fwe",Email, Password, firstName, lastName )
    console.log(req.body)

    try {
      const oldUser = await staff.findOne({ Email : Email });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
      console.log("hi")

      const hashedPassword = await bcrypt.hash(Password, 12);
      console.log("hi")
      const result = await staff.create({ Email : Email, password: hashedPassword, name: `${firstName} ${lastName}` });
  
      const token = jwt.sign( { Email :  result.Email, id: result._id }, process.env.SECRET_SALT_VALUE, { expiresIn: "1h" } );
  
      res.status(201).json({ result, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };


let user = process.env.SECRET_MONGO_USER;
let pswrd = process.env.SECRET_MONGO_PSWD;

mongoose.connect(`mongodb+srv://${user}:${pswrd}@cluster0.p6xod.mongodb.net/Supply?retryWrites=true&w=majority`, {
  useNewUrlParser: true, useUnifiedTopology: true
})


app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.set('view engine', 'ejs')

app.post('/short', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  // console.log(shortUrls);
  res.send( shortUrls)
})

// app.get('/', async (req, res) => {
//   res.send("sfd");
// })

app.post('/shortUrls', async (req, res) => {
  const data = await ShortUrl.create({ full: req.body.fullUrl })

  res.send(data);
})

app.post('/signin', signin)
app.post('/signup', signup)

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);

// ShortUrl.create({
//   full: "https://angular.io/cli/run",
//   short : "12345",
//   clicks: 0
// });

// await plan.create({
//   Plan_id : "1",
//   Plan_Name: "15 Days",
//   Price : "4500",
//   Description : "If used more than 12 days amount will not be refunded",
// });