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

app.get("/api/delete/", (req, res) => {
    res.send("DELETED!");
})

app.get("/api/universities/", (req, res) => {
    const universities = JSON.parse(fs.readFileSync("./universities.json"));

    let results = universities;
    console.log(req.query);

    if (req.query.region) {
        results = results.filter(u => u.region === req.query.region);
    }

    if (req.query.yearFounded) {
        results = results.filter(u => u.yearFounded == req.query.yearFounded);
    }

    res.json( {message: "Data of uni's has been sent", results} );
});

app.get("/api/highSchools/", (req, res) => {
    const highSchools = JSON.parse(fs.readFileSync("./highSchools.json"));
    
    let results = highSchools;

    if (req.query.programs) {
        console.log(req.query.programs);
        results = results.filter(u => u.programs.includes(req.query.programs));
    }

    res.json( {message: "Data of high schools has been sent", results});
});

app.get("/api/schools/", (req, res) => {
    const schools = JSON.parse(fs.readFileSync("./schools.json"));

    res.json( {message: "Data of schools has been sent", schools});
});


app.listen(5000, () => console.log("Mock API on http://localhost:5000"));
