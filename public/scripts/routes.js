function displayRoutes(routes) {
    const routeCatalogue = document.getElementById("route-catalogue");
    routeCatalogue.innerHTML = '';

    routes.forEach(route => {
        const routeElement = document.createElement('li');
        routeElement.classList.add('route');
        routeElement.innerHTML = `
            <div class="route-info">
                <span>${route.ROUTE_ID} | ${route.NAME}</span>
                <span>Length [km]  |  ${route.TOTAL_LENGTH}<br>Time    [min] |  ${route.TOTAL_TIME}</span>
                <span>Active (?)</span>
            </div>
        `;
        routeCatalogue.appendChild(routeElement);
    });
}

function fetchAndDisplayRoutes() {
    fetch('/routes')
        .then(response => response.json())
        .then(data => { displayRoutes(data); })
        .catch(error => { console.error('Error fetching routes:', error);});
}

fetchAndDisplayRoutes();
