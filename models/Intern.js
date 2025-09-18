const mongoose = require('mongoose');

const InternSchema = new mongoose.Schema({
    name: { type: String, required: true },
    internId: { type: String, required: true },
    mentor: { type: String, required: true },
    department: { type: String, required: true }
});

module.exports = mongoose.model('Intern', InternSchema);
