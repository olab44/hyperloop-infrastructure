function displayRoutes(routes) {
    const routeCatalogue = document.getElementById("route-catalogue");
    routeCatalogue.innerHTML = '';

    routes.forEach(route => {
        const routeElement = document.createElement('div');
        routeElement.classList.add('route');
        routeElement.innerHTML = `
            <h3>${route.ROUTE_ID}</h3>
            <p>Name: ${route.NAME}</p>
        `;
        routeCatalogue.appendChild(routeElement);
    });
}

function fetchAndDisplayRoutes() {
    fetch('/routes')
        .then(response => response.json())
        .then(data => {
            displayRoutes(data);
        })
        .catch(error => {
            console.error('Error fetching routes:', error);
        });
}

fetchAndDisplayRoutes();
