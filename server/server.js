const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();
connectDB();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/departments', require('./routes/departments'));
app.use('/api/employees', require('./routes/employees'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
