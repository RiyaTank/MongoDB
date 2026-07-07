// write a node js using mongoose to perform the following operations on the courses collection:
// 1. insert multiple course documents
// [
//     { courseName: "MERN Stack Development", instructor: "Niharika Sen", duration: 6, fees: 18000, mode: "Offline", category: "Web Development", active: true },
//     { courseName: "Python Programming", instructor: "Rahul Shah", duration: 4, fees: 12000, mode: "Online", category: "Programming", active: true },
//     { courseName: "Data Science", instructor: "Priya Patel", duration: 8, fees: 25000, mode: "Offline", category: "Data Analytics", active: true },
//     { courseName: "Machine Learning", instructor: "Amit Joshi", duration: 7, fees: 22000, mode: "Online", category: "Artificial Intelligence", active: false },
//     { courseName: "Java Full Stack", instructor: "Neha Mehta", duration: 6, fees: 20000, mode: "Offline", category: "Web Development", active: true },
//     { courseName: "UI/UX Design", instructor: "Karan Desai", duration: 3, fees: 10000, mode: "Online", category: "Design", active: true },
//     { courseName: "Cloud Computing", instructor: "Riya Sharma", duration: 5, fees: 16000, mode: "Offline", category: "Cloud", active: false }
// ];

// 2. display the course having the highest fees
// 3. find the course named mern stack devlopment
// 4. update the fees 25000 and duration to 5 months for the course named mern stack devlopment using find by id and update
// 5. display all online courses having fees < 20000
// 6. display all active courses whose duration is >4 months but exclude courses that are online or belong the cloud category
// 7. delete the course named data science using it's id.
const mg = require("mongoose")
const validator = require("validator")

// Connect to database
mg.connect("mongodb://127.0.0.1:27017/valid")
    .then(() => { console.log("success") })
    .catch((err) => { console.log(err) })

mg.pluralize(null)

// Define Schema
const myschema = new mg.Schema({
    courseName: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: Number, required: true },
    fees: { type: Number, required: true },
    mode: { type: String, required: true },
    category: { type: String, required: true },
    active: { type: Boolean, required: true }
})

// Create Model (using 'person' as per your definition)
const person = mg.model("course", myschema)

const executeOperations = async () => {
    try {
        const courses = [
            { courseName: "MERN Stack Development", instructor: "Niharika Sen", duration: 6, fees: 18000, mode: "Offline", category: "Web Development", active: true },
            { courseName: "Python Programming", instructor: "Rahul Shah", duration: 4, fees: 12000, mode: "Online", category: "Programming", active: true },
            { courseName: "Data Science", instructor: "Priya Patel", duration: 8, fees: 25000, mode: "Offline", category: "Data Analytics", active: true },
            { courseName: "Machine Learning", instructor: "Amit Joshi", duration: 7, fees: 22000, mode: "Online", category: "Artificial Intelligence", active: false },
            { courseName: "Java Full Stack", instructor: "Neha Mehta", duration: 6, fees: 20000, mode: "Offline", category: "Web Development", active: true },
            { courseName: "UI/UX Design", instructor: "Karan Desai", duration: 3, fees: 10000, mode: "Online", category: "Design", active: true },
            { courseName: "Cloud Computing", instructor: "Riya Sharma", duration: 5, fees: 16000, mode: "Offline", category: "Cloud", active: false }
        ];

        // Clear old data first
        await person.deleteMany({});

        // 1. Insert multiple course documents
        await person.insertMany(courses);
        console.log("1. Inserted all courses successfully!");

        // 2. Display the course having the highest fees
        const highestFee = await person.findOne().sort({ fees: -1 });
        console.log("2. Highest Fee Course:", highestFee);

        // 3. Find the course named MERN Stack Development
        const mern = await person.findOne({ courseName: "MERN Stack Development" });
        console.log("3. Found MERN Course:", mern);

        // 4. Update the fees to 25000 and duration to 5 months using findByIdAndUpdate
        if (mern) {
            const updatedMern = await person.findByIdAndUpdate(
                mern._id,
                { fees: 25000, duration: 5 },
                { new: true }
            );
            console.log("4. Updated MERN Course:", updatedMern);
        }

        // 5. Display all online courses having fees < 20000
        const onlineCheap = await person.find({ mode: "Online", fees: { $lt: 20000 } });
        console.log("5. Online courses under 20000:", onlineCheap);

        // 6. Display active courses, duration > 4, but not Online, and not Cloud category
        const filtered = await person.find({
            active: true,
            duration: { $gt: 4 },
            mode: { $ne: "Online" },
            category: { $ne: "Cloud" }
        });
        console.log("6. Filtered active courses:", filtered);

        // 7. Delete the course named Data Science using its ID
        const dataScience = await person.findOne({ courseName: "Data Science" });
        if (dataScience) {
            await person.findByIdAndDelete(dataScience._id);
            console.log("7. Data Science course deleted successfully!");
        }

    } catch (error) {
        console.error("Error running queries:", error);
    } finally {
        // Safely disconnect after completing tasks
        await mg.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

// Call the outer function to run everything
executeOperations();
