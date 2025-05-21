const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "erneste"
});

db.connect((err) => {
    if (err) {
        console.log("Failed to connect to the MySQL Database:", err);
        return
    }
    console.log("Connected to the MySQL Database");
})


app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.log("Failed to register a user:", err)
            return res.json({ message: "Failed to register a user" })
        }
        return res.json({ message: "User created successfully!" })
    })

})

app.post("/login", (req, res) => {
    const { email, password } = req.body;


    const query1 = "SELECT * FROM users WHERE email = ?";
    db.query(query1, [email], async (err, result) => {
        if (err) {
            console.log("Error:", err);
            return res.status(500).json({ message: "Failed to register a user" });
        }

        if (result.length === 0) {
            return res.status(409).json({ message: "Your email is not registered yet!" })
        }

        const user = result[0];
        
        const validPassword = await bcrypt.compare(password, user.password)
        if (validPassword === false) {
            return res.status(403).json({ message: "Invalid password" })
        }

        return res.json({ message: "Login successful" })

    })
})



app.listen(PORT, () =>{
    console.log("Express server is running on port:", PORT);
})