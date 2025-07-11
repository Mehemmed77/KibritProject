const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/login/", (req, res) => {
    const { username, password } = req.body;

    const dbUsers = JSON.parse(fs.readFileSync('./users.json'));

    let found = dbUsers.some(user => user.username === username && user.password === password);

    if (!found) {
        dbUsers.push({ username, password });
        fs.writeFileSync('./users.json', JSON.stringify(dbUsers, null, 2));
        console.log('Updated users.json!');
    }

    res.json({ message: "Successfully Logged In.", user: { username } });
}); 

app.get("/api/universities/", (req, res) => {
    const universities = JSON.parse(fs.readFileSync("./universities.json"));

    res.json( {message: "Data of uni's has been sent", universities} );
});

app.get("/api/schools/", (req, res) => {
    const schools = JSON.parse(fs.readFileSync("./schools.json"));

    res.json( {message: "Data of schools has been sent", schools});
});

app.get("/api/highSchools/", (req, res) => {
    const highSchools = JSON.parse(fs.readFileSync("./highSchools.json"));
    
    res.json( {message: "Data of high schools has been sent", highSchools});
});

app.listen(5000, () => console.log("Mock API on http://localhost:5000"));
