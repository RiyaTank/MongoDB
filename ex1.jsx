const mg = require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/LJKU")

    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })
mg.pluralize(null)

const myschema = new mg.Schema({
    name: { type: String, required: true }, surname: String, age: Number, active: Boolean,
    date: {
        type: Date,
        default: new Date().toLocaleDateString()
    }
})

const person = mg.model("person", myschema)

const createDoc = async () => {
    try {
        const persondata = new person({
            name: "Riya",
            surname: "Tank",
            age: 20,
            active: true
        })
        const result = await persondata.save()
        console.log(result)
    } catch (err) {
        console.log(err)
    }
}
createDoc()
