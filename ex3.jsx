const mg = require("mongoose")

mg.connect("mongodb://127.0.0.1:27017/data")
    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })

const employeeschema = new mg.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    active: { type: Boolean, required: true },
})
const employee = mg.model("employee", employeeschema)

// const createDoc = async () => {
//     try {
//         const p1 = new employee({ name: "Radha", age: 13, active: true })
//         const p2 = new employee({ name: "Shyam", age: 15, active: false })
//         const p3 = new employee({ name: "Ram", age: 19, active: false })
//         const result = await employee.insertMany([p1, p2, p3])
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//         if (err.code == 11000) {
//             console.log("Duplicate")
//         }
//     }
// }

// createDoc()

// update value of active to true  where name=shyam if document is nbot available then insert new document display updated result in console.


const result = await employee.updateOne({ name: "Shyam" }, { $set: { active: true } }, { upsert: true })
console.log(result)

