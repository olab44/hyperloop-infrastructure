let chosen_stretches = [];

function displayStretches(stretches) {
    const available_stretches_list = document.getElementById("available-stretches-list");
    available_stretches_list.innerHTML = '';

    stretches.forEach(stretch => {
        const stretchElement = document.createElement('li');
        stretchElement.classList.add('stretch');
        stretchElement.innerHTML = `${stretch.STRETCH_ID} | ${stretch.START_STATION} --> ${stretch.END_STATION}`;

        stretchElement.addEventListener('click', function() { displayStretchInfo(stretch); });

        const lastChosen = chosen_stretches[chosen_stretches.length - 1];
        if (!(lastChosen && stretch.START_STATION !== lastChosen.END_STATION)) {
            stretchElement.addEventListener('dblclick', function() {
                chosen_stretches.push(stretch);
                const chosen_stretches_list = document.getElementById("chosen-stretches-list");
                chosen_stretches_list.appendChild(stretchElement.cloneNode(true));
                displayStretches(stretches);
            });
        }
        if (lastChosen && stretch.START_STATION !== lastChosen.END_STATION) {
            stretchElement.classList.add('disabled');
        }

        available_stretches_list.appendChild(stretchElement);
    });
}

function displayStretchIE(stretch_ie) {
    document.querySelectorAll("#stretch-ie-panel ul").forEach(function(list) { list.innerHTML = '' });
    stretch_ie.forEach(ie => {
        const ieElement = document.createElement('li');
        ieElement.classList.add('ie');
        const ieStatus = ie.STATUS == 'A' ? 'Functional' : 'Out-Of-Order';
        ieElement.innerHTML =  `
            <span>${ie.ELEMENT_ID} | ${ie.NAME}</span>
            <span class="${ieStatus}">${ieStatus}</span>
        `;
        document.getElementById(`${ie.SELECTOR}`).appendChild(ieElement);
    });
}

function displayStretchInfo(stretch) {
    const stretchInfoPanel = document.getElementById('stretch-info');
    stretchInfoPanel.innerHTML = `
        <h3>Stretch Details</h3>
        <p>ID: ${stretch.STRETCH_ID}</p>
        <p>Start Station: ${stretch.START_STATION}</p>
        <p>End Station: ${stretch.END_STATION}</p>
        <p>Length: ${stretch.LENGTH} km</p>
        <p>Max Speed: ${stretch.MAX_SPEED} km/h</p>
    `;

    const stretchID = stretch.STRETCH_ID;
    fetch('/stretch-ie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stretchID })
    })
    .then(response => response.json())
    .then(stretch_ie => { displayStretchIE(stretch_ie); })
    .catch(error => { console.error('Error fetching/displaying infrastructure elements', error); });
}


function fetchAndDisplayStretches() {
    fetch('/stretches')
        .then(response => response.json())
        .then(data => {
            displayStretches(data);
        })
        .catch(error => {
            console.error('Error fetching routes:', error);
        });
}

function resetAddForm() {
    chosen_stretches = [];
    document.getElementById("chosen-stretches-list").innerHTML = "";
    document.getElementById('route-name').value = "";
}

function addRoute() {
    const routeName = document.getElementById('route-name').value;
    let stretch_ids = chosen_stretches.map(stretch => stretch.STRETCH_ID);
    stretch_ids = stretch_ids.join(",")
    fetch('/routes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeName, stretch_ids })
    })
    .then(response => response.json())
    .then(data => { alert('Route added successfully'); })
    .catch(error => {console.error('Error adding route:', error);});

    resetAddForm();
    fetchAndDisplayStretches();
}

function deleteRoute() {
    const routeId = document.getElementById('delete-route-id').value;

    fetch(`/routes/${routeId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => { alert('Route deleted successfully'); })
    .catch(error => { console.error('Error deleting route:', error); });
}

function assignCapsuleToRoute() {
    const routeId = document.getElementById('assign-route-id').value;
    const capsuleId = document.getElementById('capsule-id').value;

    fetch('/routes/assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId, capsuleId })
    })
    .then(response => response.json())
    .then(data => { alert('Capsule assigned to route successfully'); })
    .catch(error => { console.error('Error assigning capsule to route:', error); });
}

function updateInfrastructureState() {
    const elementId = document.getElementById('element-id').value;
    const newState = document.getElementById('new-state').value.toUpperCase();

    fetch('/update-infrastructure', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ elementId, newState })
    })
    .then(response => response.json())
    .then(data => { alert('Infrastructure state updated successfully'); })
    .catch(error => { console.error('Error updating infrastructure state:', error); });
}

document.getElementById('update-state-form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateInfrastructureState();
});


document.getElementById('add-route-form').addEventListener('submit', function(e) {
    e.preventDefault();
    if (chosen_stretches.length > 0) { addRoute(); }
});
document.getElementById('add-route-form').addEventListener('reset', function(e) {
    e.preventDefault();
    resetAddForm();
});

document.getElementById('delete-route-form').addEventListener('submit', function(e) {
    e.preventDefault();
    deleteRoute();
});

document.getElementById('assign-capsule-form').addEventListener('submit', function(e) {
    e.preventDefault();
    assignCapsuleToRoute();
});

document.getElementById('update-state-form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateInfrastructureState();
});

fetchAndDisplayStretches();