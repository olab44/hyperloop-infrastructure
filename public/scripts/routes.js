function displayRouteDetails(routeId) {
    Promise.all([
    fetch(`/route-stations/${routeId}`).then(response => response.json()),
    fetch(`/route-capsules/${routeId}`).then(response => response.json())
    ]).then(([stations, capsules]) => {
        const filtersMenu = document.querySelector('.filters-menu');
        filtersMenu.innerHTML = '';

        const stationsTitle = document.createElement('h3');
        stationsTitle.textContent = 'Stations in order';

        const stationsList = document.createElement('ul');
        stations.forEach(station => {
            const stationItem = document.createElement('li');
            console.log(station.STATION_ID);
            stationItem.textContent = `ID: ${station.STATION_ID}, Name: ${station.NAME}`;
            stationsList.appendChild(stationItem);
        });

        filtersMenu.appendChild(stationsTitle);
        filtersMenu.appendChild(stationsList);

        const capsulesTitle = document.createElement('h3');
        capsulesTitle.textContent = 'Capsules';

        const capsulesList = document.createElement('ul');
        capsules.forEach(capsule => {
            const capsuleItem = document.createElement('li');
            console.log(capsule.capsule_ID);
            capsuleItem.textContent = `ID: ${capsule.CAPSULE_ID}, Name: ${capsule.NAME}`;
            capsulesList.appendChild(capsuleItem);
        });

        filtersMenu.appendChild(capsulesTitle);
        filtersMenu.appendChild(capsulesList);

    })
    .catch(error => {
        console.error('Error fetching/displaying route details:', error);
    });

}

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
        routeElement.addEventListener('click', function() {
            document.querySelectorAll('.route').forEach(element => {
                element.style.color = '';
            });
            document.querySelector('.route.selected')?.classList.remove('selected');
            routeElement.classList.add('selected');
            displayRouteDetails(route.ROUTE_ID);
            routeElement.style.color = 'red';
        });
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
