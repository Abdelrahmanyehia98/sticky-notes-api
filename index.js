import 'dotenv/config'
import express from "express";
import userRouter from "./src/Modules/Users/user.controller.js";
import noteRouter from "./src/Modules/Notes/notes.controller.js";
import dbConnection from "./src/DB/db.connection.js";


const app = express();

// Parser middleware
app.use(express.json());

//database connection
dbConnection(); 

// Handle routes
app.use("/users", userRouter);
app.use("/notes", noteRouter);

// Error handling middleware
app.use((error, req, res, next) => {
    console.log(error.stack);
    res.status(error.cause||500).json({ message: "something broke!", error: error.message ,stack: error.stack });
});

//Not found middleware
app.use((req, res) => {
    res.status(404).send("Page Not found!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

