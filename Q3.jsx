// write a node to schema having fields like: name,age,gender and email aplly following validation:
// 1. gender must accept values in uppercase only allowed values are capital MALE and FEMALE
// 2. age must accept value>0
// 3. perform email id validation on email field
// name field must starts with 'emp' minimum and maximum length should be 4 and 10 respectively and name should be store in lowercase.

const mongoose = require("mongoose")
const validator = require("validator")
mongoose.connect("mongodb://127.0.0.1:27017/valid")
    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })
mongoose.pluralize(null)

const myschema = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, minlength: 4, maxlength: 10, match: /^emp/ },
    age: { type: Number, required: true, min: 1 },
    gender: { type: String, required: true, enum: ["MALE", "FEMALE"] },
    email: { type: String, required: true, validate: [validator.isEmail, "invalid email"] }
})

const person = mongoose.model("form", myschema)

const createDoc = async () => {
    try {
        const persondata = new person({
            name: "empriya1",
            age: 20,
            gender: "MALE",
            email: "t1@example.com"
        })
        const result = await persondata.save()
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
createDoc()

