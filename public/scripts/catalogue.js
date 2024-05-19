function displayRouteDetails(routeID) {

}

function displayRoutes(routes) {
    const routeCatalogue = document.getElementById("route-catalogue");
    routeCatalogue.innerHTML = '';

    if (routes.length != 0) {
        routes.forEach(route => {
            const routeElement = document.createElement('li');
            routeElement.classList.add('route-info');
            const routeStatus = route.IS_FUNCTIONAL ? 'Functional' : 'Out-Of-Order';

            routeElement.innerHTML = `
                <span>${route.ROUTE_ID} | ${route.NAME}</span>
                <span>Length [km] | ${route.TOTAL_LENGTH}<br>Time   [min] | ${route.TOTAL_TIME}</span>
                <span id="route-status-${route.ROUTE_ID}" class="${routeStatus}">${routeStatus}</span>
            `;
            routeElement.addEventListener('click', function() { displayRouteDetails(route.ROUTE_ID) });

            routeCatalogue.appendChild(routeElement);
        })
    };
}

function fetchAndDisplayFilteredRoutes() {
    const minLength = document.getElementById("minLength").value;
    const maxLength = document.getElementById("maxLength").value;
    const minTime = document.getElementById("minTime").value;
    const maxTime = document.getElementById("maxTime").value;
    let ieSelectors = [];
    document.querySelectorAll("form input[type=checkbox]").forEach(function(checkbox) {
        if (checkbox.checked == true) {ieSelectors.push(checkbox.id)}
    })
    fetch('/routes-filtered', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ minLength, maxLength, minTime, maxTime, ieSelectors })
        })
    .then(response => response.json())
    .then(routes => { displayRoutes(routes); })
    .catch(error => { console.error('Error fetching/displaying routes:', error); });
}

function fetchAndDisplayRoutes() {
    fetch('/routes')
        .then(response => response.json())
        .then(routes => { displayRoutes(routes); })
        .catch(error => { console.error('Error fetching/displaying routes:', error); });
}

document.getElementById('filters-form').addEventListener('submit', function(e) {
    e.preventDefault();
    fetchAndDisplayFilteredRoutes();
});

document.getElementById('clear-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll("form input[type=number]").forEach(function(input) { input.value = "" });
    document.querySelectorAll("form input[type=checkbox]").forEach(function(checkbox) { checkbox.checked = false });
    fetchAndDisplayRoutes();
});

fetchAndDisplayRoutes();
