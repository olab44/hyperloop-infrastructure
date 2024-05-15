const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const { getAllRoutes, addRoute, deleteRoute } = require('./connect_database');

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
    const { routeId, name, startStationId, endStationId} = req.body;

    addRoute(routeId, name, startStationId, endStationId, (err, result) => {
        if (err) {
            console.error('Error adding route:', err);
            res.status(500).json({ error: 'Error adding route' });
        } else {
            res.json({ message: 'Route added successfully' });
        }
    });
});

app.post('/update-infrastructure', (req, res) => {
    const { elementId, newState } = req.body;
    updateInfrastructureState(elementId, newState, (err, result) => {
        if (err) {
            console.error('Error updating infrastructure state:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Infrastructure state updated successfully' });
        }
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
