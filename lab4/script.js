function makeTableFromCountry(country) {
    tab="<table width=75% align='center'>";
    a_1=[] // string
    a_2=[] // number
    a_3=[] // array 
    a_4=[] // object 
    for(i=0; i<country.length; i++) {
        if(typeof country[i] === 'string') {
            a_1.push(country[i])
        }
        if(typeof country[i] === 'number') {
            a_2.push(country[i])
        }
        if(typeof country[i] === 'object' && country[i] !== null) {
            /*console.log(country[i])
            console.log(Array.isArray(country[i]))
            console.log(country[i][0])*/
            if (typeof country[i][0] !== 'object' && Array.isArray(country[i])) {
                a_3.push(country[i])
            } 
            if (!Array.isArray(country[i])) {
                a_4.push(country[i])
            }
        }
    }

    tab += "<th colspan='2' style = 'background-color: grey; font-size: 30px'>" + a_1[0] + " - " + a_1[1] + "</th>"

    for (let i = 2; i < 4; i++){
        
        tab+= "<tr ><td width='50%'>" + about[i]  + "</td><td>" + a_1[i] + "</td></tr>"
    }
    tab+= "<tr><td>" + about[4] + "</td><td>" + a_2[0] + "</td></tr>"
    tab+= "<tr><td valign='top'>" + about[6] + "</td><td>"
    for(i=0; i<a_3.length; i++) {

        for(j=0; j<a_3[i].length; j++) {
            console.log(a_3[i][j])
            if ( a_3[i][j] !== undefined ) {
                tab+=  a_3[i][j] + "<br>"
            }
        }
    }
    
    tab+=  "</td></tr>"
    tab += "<th colspan='2'>" + about[8] + "</th>"
    
    const entires = Object.entries(a_4);

    function arrayToTableString(array) {
        let tableString = '<table class = "table-container">';
        array.forEach(obj => {
            tableString += '<tr class = "table-row">';
            Object.entries(obj).forEach(([key, value]) => {
                tableString += `<td class = "table-cell"><strong>${key}</strong> - ${value}</td>`;
            });
            tableString += '</tr>';
        });

        tableString += '</table>';
        tableString +='<style> .table-container {display: table; width: 100%; border-collapse: collapse; } .table-row { display: table-row; } .table-cell { dispaly: table-cell;  padding: 8px; width: auto; border: 1px solid black; } </style>';
        return tableString;
    }
    
    const a_a=arrayToTableString(a_4)
    tab+= "<tr ><td colspan='2'>" + a_a + "</td></tr>"

    tab += "</table>";
    return tab;
}

countriesTable = countries.map(makeTableFromCountry);
console.log(countriesTable)

outputElement = document.getElementById("countriesd");

countriesTable.forEach(function(info) {
    outputElement.innerHTML += info + "<br><br>";
});

function getSchoolYearEnd() {
    // Установка даты конца учебного года (30 июня)
    const schoolYearEnd = new Date(new Date().getFullYear(), 5, 30); // Месяцы в JavaScript начинаются с 0 (0 - январь, 11 - декабрь)

    // Получение текущей даты
    const now = new Date();

    // Вычисление времени, оставшегося до конца учебного года
    const timeRemaining = schoolYearEnd - now;

    // Вычисление дней, часов, минут и секунд
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Возвращение времени в виде объекта
    return {
        days,
        hours,
        minutes,
        seconds
    };
}

function updateCountdown() {
    // Получение времени, оставшегося до конца учебного года
    const time = getSchoolYearEnd();

    // Отображение времени на странице
    document.getElementById('countdownInfo').innerHTML = `До конца 2025 учебного года`;
    
    const table = document.getElementById('countdownTable');
    table.innerHTML = `
        <tr>
        <td>${time.days}</td>
        <td>${time.hours}</td>
        <td>${time.minutes}</td>
        <td>${time.seconds}</td>
        </tr>
        <tr>
            <td>Дней</td>
            <td>Часов</td>
            <td>Минут</td>
            <td>Секунд</td>
        </tr>
        
    `;
}

    // Обновление отображения времени каждую секунду
setInterval(updateCountdown, 1000);

    // Обновление отображения времени сразу после загрузки страницы
updateCountdown();
