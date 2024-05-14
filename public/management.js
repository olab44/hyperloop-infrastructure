function addRoute() {
    const routeId = document.getElementById('route-id').value;
    const routeName = document.getElementById('route-name').value;
    const startStationId = document.getElementById('start-station-id').value;
    const endStationId = document.getElementById('end-station-id').value;

    fetch('/routes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routeId, name: routeName, startStationId, endStationId})
    })
    .then(response => response.json())
    .then(data => {
        alert('Route added successfully');
        fetchAndDisplayRoutes();
    })
    .catch(error => {
        console.error('Error adding route:', error);
    });
}

function deleteRoute() {
    const routeId = document.getElementById('delete-route-id').value;

    fetch(`/routes/${routeId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Route deleted successfully');
        fetchAndDisplayRoutes();
    })
    .catch(error => {
        console.error('Error deleting route:', error);
    });
}

function assignCapsuleToRoute() {
    const routeId = document.getElementById('assign-route-id').value;
    const capsuleId = document.getElementById('capsule-id').value;

    fetch('/routes/assign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ routeId, capsuleId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Capsule assigned to route successfully');
    })
    .catch(error => {
        console.error('Error assigning capsule to route:', error);
    });
}

function updateInfrastructureState(elementId, newState) {
    fetch('/update-infrastructure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elementId, newState })
    })
    .then(response => response.json())
    .then(data => {
        alert('Infrastructure state updated successfully');
    })
    .catch(error => {
        console.error('Error updating infrastructure state:', error);
    });
}

function updateInfrastructureState() {
    const elementId = document.getElementById('element-id').value;
    const newState = document.getElementById('new-state').value;

    fetch('/update-infrastructure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elementId, newState })
    })
    .then(response => response.json())
    .then(data => {
        alert('Infrastructure state updated successfully');
        fetchAndDisplayInfrastructureElements();
    })
    .catch(error => {
        console.error('Error updating infrastructure state:', error);
    });
}


document.getElementById('update-state-form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateInfrastructureState();
});


document.getElementById('add-route-form').addEventListener('submit', function(e) {
    e.preventDefault();
    addRoute();
});

document.getElementById('delete-route-form').addEventListener('submit', function(e) {
    e.preventDefault();
    deleteRoute();
});

document.getElementById('assign-capsule-form').addEventListener('submit', function(e) {
    e.preventDefault();
    assignCapsuleToRoute();
});
