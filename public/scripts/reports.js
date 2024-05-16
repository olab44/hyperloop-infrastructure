function displayMalfunctions(malfunctions){
    const malfunctionCatalogue = document.getElementById("malfunctions-by-month");
    malfunctionCatalogue.innerHTML = '';

    malfunctions.forEach(malfunction => {
        const malfunctionElement = document.createElement('li');
        malfunctionElement.classList.add('route');
        const isMalfunctionOngoing = (malfunction.STATUS == 'B'); 
        const malfunctionStatus = isMalfunctionOngoing ? "Ongoing" : "Fixed";

        if (isMalfunctionOngoing){
            malfunctionElement.innerHTML = `
                <div class="route-info">
                    <span>${malfunction.MALFUNCTION_ID} | ${malfunction.ELEMENT_ID} | ${malfunction.STRETCH_ID}</span>
                    <span> Current Status : ${malfunctionStatus}</span>
                    <span> Date Detected : ${malfunction.MALFUNCTION_DATE} <span>
                </div>
            `;
        }else{
            malfunctionElement.innerHTML = `
                <div class="route-info">
                    <span>${malfunction.MALFUNCTION_ID} | ${malfunction.ELEMENT_ID} | ${malfunction.STRETCH_ID}</span>
                    <span>Current Status : ${malfunctionStatus}</span>
                    <span>Date Detected : ${malfunction.MALFUNCTION_DATE}<br>Date Fixed : ${malfunction.REPAIR_DATE}</span>
                </div>
            `;
        }
        malfunctionCatalogue.appendChild(routeElement);
    });
}


function fetchAndDisplayRoutes() {
    Promise.all([
        fetch('/malfunctions').then(response => response.json()),
        fetch('/malfunctions-by-routes').then(response => response.json())
    ]).then(([malfunctioningRoutes, malfunctions]) => {
        // displayRoutesWithMalfunctions(malfunctioningRoutes);
        displayMalfunctions(malfunctions)
    }).catch(error => {
        console.error('Error fetching/displaying malfunctions:', error);
    });
}

fetchAndDisplayMalfunctions();