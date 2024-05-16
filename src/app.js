const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const { getAllRoutes, getAllStretches, addRoute, deleteRoute } = require('./connect_database');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/menu.html"));
});

app.get('/routes', (req, res) => {
    getAllRoutes((err, routes) => {
        if (err) {
            console.error('Error fetching routes:', err);
            res.status(500).json({ error: 'Error fetching routes' });
        } else {
            res.json(routes);
        }
    });
});

app.get('/stretches', (req, res) => {
    getAllStretches((err, routes) => {
        if (err) {
            console.error('Error fetching stretches:', err);
            res.status(500).json({ error: 'Error fetching stretches' });
        } else {
            res.json(routes);
        }
    });
});

app.delete('/routes/:routeId', (req, res) => {
    const routeId = req.params.routeId;
    deleteRoute(routeId, (err, result) => {
        if (err) {
            console.error('Error deleting route:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Route deleted successfully' });
        }
    });
});


app.post('/routes', (req, res) => {
    const { routeName, stretch_ids } = req.body;
    addRoute( routeName, stretch_ids, (err, result) => {
        if (err) {
            console.error('Error adding route:', err);
            res.status(500).json({ error: 'Error adding route' });
        } else {
            res.json({ message: 'Route added successfully' });
        }
    });
});


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
