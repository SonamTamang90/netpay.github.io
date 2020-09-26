// PAYROLL CONTROLLER 
var payrollController = (function() {

    var SelectEmployee = function(id, name, account, schedule, status) {
        this.id =id;
        this.name = name;
        this.account = account;
        this.schedule = schedule;
        this.status = status;
    };

    var OptimaEmployee = function(id, name, account, schedule, status) {
        this.id = id;
        this.name = name;
        this.account = account;
        this.schedule = schedule;
        this.status = status;
    }

    // Data structures for application
    var data = {
        employeeDetails: {
            select: [],
            optima:[]
        },

        netpay: {
            optima: 0,
            select: 0
        }
    };

    return {
        addEmployee: function(empname, empaccount, empabsent) {
            var ID, newEmployee;

            if(data.employeeDetails[empaccount].length > 0) {
                ID = data.employeeDetails[empaccount][data.employeeDetails[empaccount].length - 1].id + 1;
            }else {
                ID = 0;
            };

            if(empaccount === 'select') {
                newEmployee = new SelectEmployee(ID, empname, empaccount, empabsent, 'Full Time');
            }else if(empaccount === 'optima') {
                newEmployee = new OptimaEmployee(ID, empname, empaccount, empabsent, 'Full Time');
            };

            data.employeeDetails[empaccount].push(newEmployee);

            return newEmployee;
        },

        testing: function() {
            return data;
        }
    }

})();


// UI CONTROLLER
var UIController = (function() {
    var DOMstrings = {
        inputEmployeeName: '.payroll__form-employeename',
        inputEmployeeAccount: '.payroll__form-account',
        inputEmployeeAbsent: '.payroll__form-absent',
        buttonSubmit: 'payroll--submit',
    
        //Employee details
        employeeName: '.payroll__employee-name',
        employeeAccount: '.payroll__employee-account',
        employeePeriod: '.payroll__employee-period',
        employeeSchedule: '.payroll__employee-schedule',
        employeeStatus: '.payroll__employee-status',
    
        //Payroll details
        payrollBaseSalary: '.payroll__salary',
        payrollEBP: '.payroll__bonus',
        payrollTravel: '.payroll__travel',
        payrollProvident: '.payroll__provident',
        payrollTax: '.payroll__tax',
        payrollHealth: '.payroll__health'
    };

    return {
        //Getting the values from input of user.
        getInput : function() {
            return {
                employee: document.querySelector(DOMstrings.inputEmployeeName).value,
                account: document.querySelector(DOMstrings.inputEmployeeAccount).value,
                absent: document.querySelector(DOMstrings.inputEmployeeAbsent).value 
            };
        },

        getDOM: function() {
            return DOMstrings;
        }
    }
})();


// GLOBAL APP CONTROLLER 
var controller = (function(payrollCtrl, UICtrl) {

    var ctrlAddItem = function() {
        //1. Get the input values
        var input = UICtrl.getInput();
        console.log(input);

        //2. Add to the payroll
        var newEmployee = payrollCtrl.addEmployee(input.employee, input.account, input.absent);
        

    };

    var DOM = UICtrl.getDOM();

    var setEventListener = function() {

         //1. Click Button
        document.getElementById(DOM.buttonSubmit).addEventListener('click', ctrlAddItem);

        //2. Enter Keyword
        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };


    return {
        init: function() {
            setEventListener();
        }
    }

})(payrollController, UIController);

controller.init();

















