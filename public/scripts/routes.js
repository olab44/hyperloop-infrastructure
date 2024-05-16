function displayRoutes(routes, malfunctioningRoutes) {
    const routeCatalogue = document.getElementById("route-catalogue");
    routeCatalogue.innerHTML = '';

    routes.forEach(route => {
        const routeElement = document.createElement('li');
        routeElement.classList.add('route');
        const isMalfunctioning = malfunctioningRoutes.some(malfunctioningRoute => malfunctioningRoute.ROUTE_ID === route.ROUTE_ID);
        const routeStatus = isMalfunctioning ? 'Deactivated' : 'Active';
        
        routeElement.innerHTML = `
            <div class="route-info">
                <span>${route.ROUTE_ID} | ${route.NAME}</span>
                <span>Length [km] | ${route.TOTAL_LENGTH}<br>Time [min] | ${route.TOTAL_TIME}</span>
                <span id="route-status-${route.ROUTE_ID}">${routeStatus}</span>
            </div>
        `;
        routeCatalogue.appendChild(routeElement);
    });
}

function fetchAndDisplayRoutes() {
    Promise.all([
        fetch('/routes').then(response => response.json()),
        fetch('/malfunctioning-routes').then(response => response.json())
    ]).then(([routes, malfunctioningRoutes]) => {
        displayRoutes(routes, malfunctioningRoutes);
    }).catch(error => {
        console.error('Error fetching/displaying routes:', error);
    });
}

fetchAndDisplayRoutes();
