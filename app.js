
var submit = document.getElementById('payroll--submit');

submit.addEventListener('click', function() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/SonamTamang90/JSON-data/master/employee-details.json');

    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        //getEmployee(ourData);
        console.log(ourData);
    };
    ourRequest.send();
});   


