const mongoose = require('mongoose')
const uri = "mongodb+srv://root:root@ecom.glef5.mongodb.net/?retryWrites=true&w=majority&appName=Ecom"

mongoose.connect(uri, {
        useNewUrlParser: true, useUnifiedTopology: true
    }
).then(() => {
    console.log("Connected to MongoDB")
})
    .catch(erro => {
        console.error("Error connecting to MongoDB",error)
    })

module.exports = mongoose
