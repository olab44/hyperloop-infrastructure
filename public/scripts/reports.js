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
                <div class="route-info">
                    <span>${malfunction.mid} | On Infrastructure Element ${malfunction.eid}<br>| On Stretch ${malfunction.sid}</span>
                    <span>Current Status : ${malfunctionStatus}</span>
                    <span>Date Detected : ${malfunction.mdate}</span>
                </div>
            `;
        }else{
            malfunctionElement.innerHTML = `
                <div class="route-info">
                    <span>${malfunction.mid} | On Infrastructure Element ${malfunction.eid}<br>| On Stretch ${malfunction.sid}</span>
                    <span>Current Status : ${malfunctionStatus}</span>
                    <span>Date Detected : ${malfunction.mdate}<br>Date Fixed : ${malfunction.rdate}</span>
                </div>
            `;
        }

        malfunctionCatalogue.appendChild(malfunctionElement);
    });
}


function fetchAndDisplayMalfunctions() {
    Promise.all([
        fetch('/malfunctions').then(response => response.json()),
        // fetch('/malfunctions-by-routes').then(response => response.json())
    ]).then(([malfunctions, malfunctioningRoutes]) => {
        console.log("displaying malfunctions: ", malfunctions)
        displayMalfunctions(malfunctions)
        // displayRoutesWithMalfunctions(malfunctioningRoutes);
    }).catch(error => {
        console.error('Error fetching/displaying malfunctions:', error);
    });
}

fetchAndDisplayMalfunctions();