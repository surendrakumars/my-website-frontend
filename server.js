const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const Report = require('./models/Report');
const Intern = require('./models/Intern');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://surendrakumars7401_db_user:yEPlYYQkzZEeM7S8@internprogress.9foiaub.mongodb.net/internProgressDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname));



// Get Intern Details by internId
app.get('/api/intern/:internId', async (req, res) => {
    try {
        const intern = await Intern.findOne({ internId: req.params.internId });
        res.json(intern);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get All Interns
app.get('/api/interns', async (req, res) => {
    try {
        const interns = await Intern.find();
        res.json(interns);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get Reports by internId
app.get('/api/reports/:internId', async (req, res) => {
    try {
        const reports = await Report.find({ internId: req.params.internId });
        res.json(reports);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add Report
app.post('/api/reports', async (req, res) => {
    try {
        const { internId, week, task, status, comments } = req.body;
        const newReport = new Report({ internId, week, task, status, comments });
        await newReport.save();
        res.json(newReport);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/api/intern/:internId", async (req, res) => {
    const { internId } = req.params;
    try {
        const intern = await User.findOne({ internId });
        if (intern) {
            res.json(intern);
        } else {
            res.status(404).json({ message: "Intern not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "login.html"));
});
app.use(express.static(path.join(__dirname, "public")));
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
