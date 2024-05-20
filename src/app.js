const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const { connect, getAllRoutes, getAllStretches, addRoute, deleteRoute, assignCapsule, updateInfrastructure, checkRouteStatus, getAllMalfunctions, getMalfunctionsByRoute, getRouteStations, getRouteCapsules } = require('./connect_database');

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

app.get('/malfunctions', (req, res) => {
    getAllMalfunctions((err, malfunctions) => {
        if (err) {
            console.error('Error fetching malfunctions:', err);
            res.status(500).json({ error: 'Error fetching malfunctions' });
        } else {
            res.json(malfunctions);
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

app.get('/malfunctioning-routes', (req, res) => {
    checkRouteStatus((err, malfunctioningRoutes) => {
        if (err) {
            console.error('Error fetching malfunctioning routes:', err);
            res.status(500).json({ error: 'Error fetching malfunctioning routes' });
        } else {
            res.json(malfunctioningRoutes);
        }
    });
});

app.get('/malfunctions-by-routes', (req, res) => {
    getMalfunctionsByRoute((err, malfunctioningRoutes) => {
        if (err) {
            console.error('Error fetching malfunctions by routes:', err);
            res.status(500).json({ error: 'Error fetching malfunctions by routes' });
        } else {
            res.json(malfunctioningRoutes);
        }
    });
});


app.post('/routes/assign', (req, res) => {
    const routeId = req.body.routeId;
    const capsuleId = req.body.capsuleId;

    assignCapsule(routeId, capsuleId, (err, result) => {
        if (err) {
            console.error('Error assigning capsule:', err);
            res.status(500).json({ error: 'Error assiging capsule' });
        } else {
            res.json({ message: 'capsule assigned successfully' });
        }
    })

    res.json({ success: true });
});

app.post('/update-infrastructure', (req, res) => {
    const { elementId, newState } = req.body;
    updateInfrastructure(elementId, newState, (err, result) => {
        if (err) {
            console.error('Error updating state:', err);
            res.status(500).json({ error: 'Error updating state' });
        } else {
            res.json({ message: 'state updated successfully' });
        }
    })
});

app.get('/route-stations/:routeId', (req, res) => {
    const routeId = req.params.routeId;

    getRouteStations(routeId, (err, route) => {
        if (err) {
            console.error('Error fetching route:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(route);
        }
    });
});

app.get('/route-capsules/:routeId', (req, res) => {
    const routeId = req.params.routeId;

    getRouteCapsules(routeId, (err, route) => {
        if (err) {
            console.error('Error fetching route:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(route);
        }
    });
});



const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
