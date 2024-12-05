const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const XLSX = require('xlsx');

const app = express();
const PORT = 3000;
const EXCEL_FILE_NAME = 'cha_data.xlsx';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve the `cha.html` file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cha.html');
});

// Function to save data to Excel
const saveToExcel = (data) => {
    let workbook;
    let worksheet;

    // Check if the Excel file exists
    if (fs.existsSync(EXCEL_FILE_NAME)) {
        workbook = XLSX.readFile(EXCEL_FILE_NAME);
        worksheet = workbook.Sheets['CHA_Data'];
        const existingData = XLSX.utils.sheet_to_json(worksheet);
        existingData.push(data);
        worksheet = XLSX.utils.json_to_sheet(existingData);
    } else {
        workbook = XLSX.utils.book_new();
        worksheet = XLSX.utils.json_to_sheet([data]);
    }

    XLSX.utils.book_append_sheet(workbook, worksheet, 'CHA_Data');
    XLSX.writeFile(workbook, EXCEL_FILE_NAME);
};

// API endpoint to handle form submissions
app.post('/submit-cha', (req, res) => {
    const { name, phone, email, city, address, services } = req.body;

    // Validate data
    if (!name || !phone || !email || !city || !address || !services) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const newData = {
        Name: name,
        Phone: phone,
        Email: email,
        City: city,
        Address: address,
        Services: services,
        Submitted_At: new Date().toISOString(),
    };

    try {
        saveToExcel(newData);
        res.status(200).json({ message: 'CHA information submitted successfully!' });
    } catch (error) {
        console.error('Error saving to Excel:', error);
        res.status(500).json({ error: 'Failed to save data. Please try again later.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
