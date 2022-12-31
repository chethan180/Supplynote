const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
    name: { type: String, required:  true },
    Email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },    
});

// export default mongoose.model("staff", staffSchema );


module.exports = mongoose.model('staff', staffSchema)