import express from "express";

const app = express();

app.use(express.json());

// Test method
app.get("/helth",(_req, res)=>{
    res.status(200).json({status: "ok"});
});

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} http://localhost:${3000}`);
})