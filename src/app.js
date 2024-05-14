

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const { getAllRoutes } = require('./connect_database');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/menu.html"));
});

app.get("/routes", (req, res) => {
    getAllRoutes((err, routes) => {
        if (err) {
            console.error('Error getting routes:', err);
            res.status(500).json({ error: 'Failed to fetch routes' });
        } else {
            res.json(routes);
        }
    });
});

const PORT = 4000;
server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
