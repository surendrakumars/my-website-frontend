const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    week: { type: String, required: true },
    task: { type: String, required: true },
    status: { type: String, required: true },
    comments: { type: String, required: true }
});

module.exports = mongoose.model('Report', ReportSchema);
