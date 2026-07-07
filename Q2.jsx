// defind a mongoose schema productschema with following field:
// 1. email : the field is required and must be unique
// 2. It should be validator to ensure a valid email address if invalid display error msg
// 3. product : it is required should only allow alphanumeric value if invalid display error msg


const mg = require("mongoose")
const validator = require("validator")
mg.connect("mongodb://127.0.0.1:27017/valid")
    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })
mg.pluralize(null)

const myschema = new mg.Schema({
    email: {
        type: String, required: [true, "email is required"], unique: true,
        validate: [validator.isEmail, "invalid email"]
    },
    product: { type: String, required: true, validate: [validator.isAlphanumeric, "invalid product"] }
})

const person = mg.model("product", myschema)

const createDoc = async () => {
    try {
        const persondata = new person({
            email: "t1@example.com",
            product: "123456"
        })
        const result = await persondata.save()
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
createDoc()


