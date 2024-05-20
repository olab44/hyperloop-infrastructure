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


function fetchAndDisplayMalfunctions() {
    Promise.all([
        fetch('/malfunctions').then(response => response.json()),
        fetch('/malfunctions-by-routes').then(response => response.json())
    ]).then(([malfunctions, malfunctioningRoutes]) => {
        displayMalfunctions(malfunctions)
        displayRoutesWithMalfunctions(malfunctioningRoutes);
    }).catch(error => {
        console.error('Error fetching/displaying malfunctions:', error);
    });
}

fetchAndDisplayMalfunctions();