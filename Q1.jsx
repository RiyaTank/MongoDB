// Que.: --
//     defind a mongoose schema for all user schema with the folllowing fields and validation requirements:
// 1.username: it is required and must between 4 to 20 characters must starts the letter and  wnds
// with digit sholuld be trim all leading and trailing spaces should be converted to uppercase before saving
// 2. email: it must be unique across the collection must follow the standard email format
// 3. age: must be a number between 18 to 65
// 4. roll: must be either user or admin if value is not provided set to default user

const mg = require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/valid")
    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })
mg.pluralize(null)

const myschema = new mg.Schema({
    username: {
        type: String, required: [true, "username is required"], minlength: [4, "username must be at least 4 characters"],
        maxlength: [20, "username must be at most 20 characters"], trim: true,
        match: [/^[a-zA-Z]+[0-9]/, "must match REGEX"], uppercase: true
    },
    email: {
        type: String, required: true, unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    age: { type: Number, min: 18, max: 65 },
    roll: { type: String, enum: ["user", "admin"], default: "user" }
})

const person = mg.model("person", myschema)

const createDoc = async () => {
    try {
        const persondata = new person({
            username: "Riya29",
            email: "t1@example.com",
            age: 20,

        })
        const result = await persondata.save()
        console.log(result)
    }
    catch (err) {
        console.log(err)
    }
}

createDoc()
// how to run this code
// node Q1.jsx


