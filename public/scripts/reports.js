function displayMalfunctions(malfunctions){
    const malfunctionCatalogue = document.getElementById("malfunctions-by-month");
    malfunctionCatalogue.innerHTML = '';

    malfunctions.forEach(malfunction => {
        const malfunctionElement = document.createElement('li');
        malfunctionElement.classList.add('malfunction');
        const isMalfunctionOngoing = !(malfunction.rdate);
        const malfunctionStatus = isMalfunctionOngoing ? "Ongoing" : "Fixed";

        malfunctionElement.innerHTML = '<div class="czemuniedziala"></div>';

        if (isMalfunctionOngoing){
            malfunctionElement.innerHTML = `
                <div class="malfunction-info">
                    <span>${malfunction.mid} | On Infrastructure Element ${malfunction.eid} | On Stretch ${malfunction.sid}</span>
                    <span>Current Status : ${malfunctionStatus}</span><br>
                    <span>Date Detected : ${malfunction.mdate}</span>
                </div>
            `;
        }else{
            malfunctionElement.innerHTML = `
                <div class="malfunction-info">
                    <span>${malfunction.mid} | On Infrastructure Element ${malfunction.eid} | On Stretch ${malfunction.sid}</span>
                    <span>Current Status : ${malfunctionStatus}</span><br>
                    <span>Date Detected : ${malfunction.mdate}<br>Date Fixed : ${malfunction.rdate}</span>
                </div>
            `;
        }

        malfunctionCatalogue.appendChild(malfunctionElement);
    });
}

function displayRoutesWithMalfunctions(malfunctioningRoutes){
    const routeCatalogue = document.getElementById("malfunctions-by-route");
    routeCatalogue.innerHTML = '';

    malfunctioningRoutes.forEach(route => {
        const routeElement = document.createElement('li');
        routeElement.classList.add('route');
        routeElement.innerHTML = `
                <div class="route-info">
                    <span>${route.ROUTE_ID} | ${route.NAME}</span>
                    <span>Detected Malfunctions : ${route.countedErrors}</span>
                </div>
            `;
        routeCatalogue.appendChild(routeElement)
    });
}

function filterMalfunctionsByDate(malfunctions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return malfunctions.filter(malfunction => {
        const malfunctionDate = new Date(malfunction.mdate);
        return (!startDate || malfunctionDate >= start) && (!endDate || malfunctionDate <= end);
    });
}

function fetchAndDisplayMalfunctions(startDate, endDate) {
    Promise.all([
        fetch('/malfunctions').then(response => response.json()),
        fetch('/malfunctions-by-routes').then(response => response.json())
    ]).then(([malfunctions, malfunctioningRoutes]) => {
        const filteredMalfunctions = filterMalfunctionsByDate(malfunctions, startDate, endDate);
        displayMalfunctions(filteredMalfunctions)
        displayRoutesWithMalfunctions(malfunctioningRoutes);
    }).catch(error => {
        console.error('Error fetching/displaying malfunctions:', error);
    });
}

document.getElementById('filter-button').addEventListener('click', () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    fetchAndDisplayMalfunctions(startDate, endDate);
});

fetchAndDisplayMalfunctions();