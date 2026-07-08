// create html file which contains a form having username and password, insert entered data by user
// in collection named data1,db name is login


var expr = require("express")
var app = expr()

const mg = require("mongoose")
mg.connect("mongodb://127.0.0.1:27017/login")
    .then(() => {
        console.log("success")
    })
    .catch((err) => {
        console.log(err)
    })
mg.pluralize(null)

const myschema = new mg.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

const person = mg.model("data1", myschema)

app.use(expr.static(__dirname, { index: "form.html" }))
app.get("/process_get", async (req, res) => {
    try {
        const persondata = new person({
            username: req.query.username,
            password: req.query.password
        })
        const result = await persondata.save()
        res.send(result)
    }
    catch (err) {
        res.send(err)
    }
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

// npm install express