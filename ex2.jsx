// dbname:details,collection:student,documents:use insertmany add 3 documents

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/details")
    .then(() => { console.log("suceess") })
    .catch((err) => { console.log(err) })
mongoose.pluralize(null)

const myschema = new mongoose.Schema({
    name: String, enroll: Number, marks: Number
})

const student = mongoose.model("student", myschema)
// const createDoc = async () => {
//     try {
//         const studentdata = [
//             { name: "Riya", enroll: 123, marks: 80 },
//             { name: "Riya", enroll: 123, marks: 80 },
//             { name: "Riya", enroll: 123, marks: 80 }
//         ]
//         const result = await student.insertMany(studentdata)
//         console.log(result)
//     } catch (err) {
//         console.log(err)
//     }
// }

// createDoc()

const createDoc = async () => {
    try {
        const p1 = new student({ name: "Riya", enroll: 123, marks: 80 })
        const p2 = new student({ name: "Riya", enroll: 123, marks: 80 })
        const p3 = new student({ name: "Riya", enroll: 123, marks: 80 })
        const result = await student.insertMany([p1, p2, p3])
        console.log(result)
    } catch (err) {
        console.log(err)
        if (err.code == 11000) {
            console.log("Duplicate")
        }
    }
}
createDoc()