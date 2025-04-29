obj1 = {
    countries: countries,
    outCountries: function() {
        console.log(countries)
    }
}

function Changes() {
    this.countries = [...countries];
    
    this.changeCountries = function(data) {
        this.countries.forEach(item => {
            for(i=0; i<item.length; i++) {
                if(typeof item[i] === 'object' && item[i] !== null) {
                    if (!Array.isArray(item[i])) {
                        let newI = {};
                        for (let [year, event] of Object.entries(item[i])) {
                            const words = event.split(' ');
                            if (words.length >= 2) {
                                if (data === 0) {
                                    ev = event.toUpperCase();
                                    event = ev;
                                } else if (data === 1) {
                                    event.toLowerCase();
                                }
                            }
                            newI[year] = event;
                        }
                        item[i] = newI;
                    }
                }
            }
        });
    };
}

const obj2 = new Changes();

console.log("Вывод obj1:");
obj1.outCountries();

console.log("\nИзменение данных в obj2:");
obj2.changeCountries(0);
console.log(obj2.countries);


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

outputElement = document.getElementById("countriesd");

countriesTable.forEach(function(info) {
    outputElement.innerHTML += info + "<br><br>";
});
