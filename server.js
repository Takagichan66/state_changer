const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get the current state of a specific user
app.get('/toggle-state/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const users = JSON.parse(jsonData);
        const user = users.find(u => u.id === userId);

        if (user) {
            res.json({ state: user.state });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

// Endpoint to toggle the state for a specific user
app.post('/toggle-state/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile(dataFilePath, 'utf8', (err, jsonData) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data file' });
        }

        const users = JSON.parse(jsonData);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex !== -1) {
            users[userIndex].state = users[userIndex].state === 'on' ? 'off' : 'on';

            fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to write data file' });
                }
                res.json({ state: users[userIndex].state });
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
