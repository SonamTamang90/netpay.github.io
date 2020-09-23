// PAYROLL CONTROLLER 
var payrollController = (function() {

})();


// UI CONTROLLER 
var UIController = (function() {

    var DOMstrings = {
        inputEmployeeID: '.payroll__form-employeeid',
        inputMonth: '.payroll__form-months'
    };

    return {
        getInput: function() {
            return {
                employeeid: document.querySelector(DOMstrings.inputEmployeeID).value,
                paymonth: document.querySelector(DOMstrings.inputMonth).value
            }
        }
    }

})();


// GLOBAL APP CONTROLLER 
var controller = (function(payrollCtrl, UICtrl) {

    var ctrlAddEmployee = function() {
        //1. Get the employeeid and pay month values
        var employee = UICtrl.getInput();
        console.log(employee);
    };

    //set event listener 
    var setEventListener = function() {
        document.getElementById('payroll--submit').addEventListener('click', ctrlAddEmployee);

        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13) {
                ctrlAddEmployee();
            };
        });
    };

    return {
        init: function() {
            setEventListener();
        }
    }

})(payrollController, UIController);

controller.init();






















































// OLD VERSION APP FUNCTIONALITY
// //1. SELECTIONG THE HTML CLASSES
// var monthlyIncome = document.querySelector('.netpay__value');

// //2. FUNCTION FOR THE FORMAT NUMBER 
// // EXAMPLE: + 23,000.00
// function formatNumber(num, type) {
//     var splitNum, int, dec, type;

//     num = Math.abs(num);
//     num = num.toFixed(2);

//     splitNum = num.split('.');

//     int = splitNum[0];

//     if(int.length > 3) {
//         int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
//     }

//     dec = splitNum[1];

//     return (type === 'inc' ? '+' : '-') + ' ' + int  + '.' + dec;
// };


// //3. CALCULATE PERCENTAGE BASED ON YEARLY INCOME
// function calculateYearlyIncome(monthlyInc) {
//    var yearly;
//    yearly = Math.round(monthlyInc * 12);

//    return formatNumber(yearly, 'inc');
// };

// // CALCULATING A HEALTH CONTRIBUTION FROM MONTHLY INCOME
// // In Bhutan 5% will be deducted.
// function calculateHealthPerc(health, monthlyInc) {
//     var health = Math.round((health / 100) * monthlyInc);

//     return formatNumber(health, 'exp');
// };

// // CALCULATING A PERSONAL INCOME TAX FROM MONTHLY INCOME
// // In Bhutan 15% will be deducted.
// function calculatePF(pf, monthlyInc) {
//     var PIT = Math.round((pf / 100) * monthlyInc);
//     return formatNumber(PIT, 'exp');
// };

// // CALCULAT TOTAL PROVIDENT FUND 
// function calculateTotalPF() {
//     var totalPF;
//     totalPF = (920 * 2) * 12;

//     return formatNumber(totalPF, 'inc');
// };

// console.log(calculateTotalPF());


// //4. UPDATE AND CALCULATING AN ITEM
// function calculateFinancial() {

//     //1.Getting the values from inputs
//     var monthly = monthlyIncome.value;

//     //2. Display in the UI
//     document.querySelector('.netpay__monthly-income').textContent = 'Monthly Income:' + ' ' +  ' Nu.' + ' ' + formatNumber(monthly, 'inc');

//     //3. Calculate the percentage
//     document.querySelector('.netpay__yearly-income').textContent = 'Yearly Income: ' + ' ' +  'Nu.' +  calculateYearlyIncome(monthly);

//     //4. Calculate the Health Contribution
//     document.querySelector('.netpay__health-deduction').textContent = 'Health Contribution: ' + ' ' +  'Nu.' + calculateHealthPerc(2, monthly);

//      //4. Calculate the Personal Income Tax
//      document.querySelector('.netpay__pit').textContent = 'Nu.' + calculatePF(4, monthly) + ' ' + 'Provident Fund';

//      //4. Calculate the Total Personal Income Tax
//      document.querySelector('.netpay__yearly-pf').textContent = 'Nu.' + calculateTotalPF() + ' ' + 'Provident Fund';

//     //4. Clear the fields
//     monthlyIncome.value = " ";
// };

// //5. CLEARING THE INPUT FIELDS
// function clearField () {
//     var list;
//     list = document.querySelector('.netpay__value');
//     list.value = " ";
    
// };

// //6. ADD EVENT LISTENER 
// document.querySelector('.btn--calculate').addEventListener('click', function() {
//     calculateFinancial();
// });


// // KEYPRESS EVENT
// document.addEventListener('keypress', function(event) {
//     if(event.keyCode === 13 || event.which === 13) {
//         calculateFinancial();
//     }
// });



