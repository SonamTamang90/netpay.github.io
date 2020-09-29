//PAYROLL CONTROLLER 
var payrollController = (function() {

    var Select = function(id, account, payrollDate, name, absent, status) {
        this.id = id;
        this.account = account;
        this.payrollDate = payrollDate;
        this.name = name;
        this.absent = absent;
        this.status = status;
    };

    var Optima = function(id, account, payrollDate, name, absent, status) {
        this.id = id;
        this.account = account;
        this.payrollDate = payrollDate;
        this.name = name;
        this.absent = absent;
        this.status = status;
    };

    var Payroll = function(base, ebp, travel, provident, tax, health) {
        this.base = base;
        this.ebp = ebp;
        this.travel = travel;
        this.provident = provident;
        this.tax = tax;
        this.health = health;
    };

    var data = {
        employees: {
            select: [],
            optima: []
        },

        payrolls: {
            select: [],
            optima: []
        }
    };

    return {
        addEmployee: function(acc, name, abs) {
            var ID, newEmp;

            if(data.employees[acc].length > 0) {
                ID = data.employees[acc][data.employees[acc].length - 1].id + 1;
            }else {
                ID = 0;
            }          

            if(acc === 'select') {
                newEmp = new Select(ID, 'Select Software', 'September 2020', name, abs, 'Full Time');
            }else if(acc === 'optima') {
                newEmp = new Optima (ID, 'Optima Management', 'September 2020', name, abs, 'Full Time');
            }
        
            data.employees[acc].push(newEmp);
            return newEmp;
        },

        //

        addPayroll: function(acc) {

            if(acc === 'select') {
                newPayroll = new Payroll(13500, 9500, 1000, 677, 0, 230);
            }else if(acc === 'optima') {
                newPayroll = new Payroll(14000, 9700, 1000, 677, 0, 230);
            };

            data.payrolls[acc].push(newPayroll);
          
            return newPayroll;
        },

        testing: function() {
            return data;
        }
    }

})();


// UI CONTROLLER
var UIController = (function() {

    var DOMstrings = {
        inputAccount: '.payroll__form-account',
        inputName: '.payroll__form-employeename',
        inputAbsent: '.payroll__form-absent',
        submitButton: 'payroll--submit',

        //Text Content replace for the Employee Details
        empName: '.payroll__employee-name',
        empDate: '.payroll__employee-date',
        empAccount: '.payroll__employee-account',
        empAbsent: '.payroll__employee-schedule',
        empStatus: '.payroll__employee-status',

        // Text Content replace for the Payroll Details
        payBase: '.payroll__base',
        payEPB: '.payroll__ebp',
        payTravel: '.payroll__travel',
        payProvident: '.payroll__provident',
        payTax: '.payroll__tax',
        payHealth: '.payroll__health'
    };

    return {
        getDOMstrings: function() {
            return DOMstrings;
        },

        getInput: function() {
            return {
                account: document.querySelector(DOMstrings.inputAccount).value,
                name: document.querySelector(DOMstrings.inputName).value,
                absent: document.querySelector(DOMstrings.inputAbsent).value
            }
        },

        addNewEmployee: function(empObj) {
            setTimeout(function() {
                document.querySelector(DOMstrings.empName).textContent = empObj.name;

                setTimeout(function() {
                    document.querySelector(DOMstrings.empDate).textContent = empObj.payrollDate;
                }, 2000);

                setTimeout(function() {
                    document.querySelector(DOMstrings.empAccount).textContent = empObj.account;
                }, 3000);

                setTimeout(function() {
                    document.querySelector(DOMstrings.empAbsent).textContent = empObj.absent + ' ' + 'Days';
                }, 4000);

                setTimeout(function() {
                    document.querySelector(DOMstrings.empStatus).textContent = empObj.status;
                }, 5000);
                   
            }, 1000);
        },

        addNewPayroll: function(payObj) {

            setTimeout(function(){
                document.querySelector(DOMstrings.payBase).textContent = 'Nu.' + ' ' + payObj.base;
                document.querySelector(DOMstrings.payEPB).textContent = 'Nu.' + ' ' + payObj.ebp;
                document.querySelector(DOMstrings.payTravel).textContent = 'Nu.' + ' ' + payObj.travel;
                document.querySelector(DOMstrings.payProvident).textContent = 'Nu.' + ' ' + payObj.provident;
                document.querySelector(DOMstrings.payTax).textContent = 'Nu.' + ' ' + payObj.tax;
                document.querySelector(DOMstrings.payProvident).textContent = 'Nu.' + ' ' + payObj.provident;
                document.querySelector(DOMstrings.payHealth).textContent = 'Nu.' + ' ' + payObj.health;
            }, 6000);
        },

        clearInputs: function() {
            var inputs = document.querySelectorAll(DOMstrings.inputName + ',' + DOMstrings.inputAbsent);

            var inputsArr = Array.prototype.slice.call(inputs);

            inputsArr.forEach(function(cur) {
                cur.value = "";
            });

            inputsArr[0].focus();
        }
    }

})();


// GLOBAL CONTROLLER 
var controller = (function(payrollCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();


    var updatePayroll = function() {
        //1. Calculate the payroll

        //2. Add to the data structure

        //3. Update the user interface
    };

 
    var ctrlAddEmployee = function() {
        //1. Get the input values
        var input = UICtrl.getInput();

        //2. Add to the payroll controller 
        var newEmployee = payrollCtrl.addEmployee(input.account, input.name, input.absent);

        //3. Display in the user interface.
        UICtrl.addNewEmployee(newEmployee);  
        
        //4. Clear Inputs fields
        UICtrl.clearInputs();

        //5. Calculate and Update the payroll
        var newPayroll = payrollCtrl.addPayroll(input.account);

        //6. Display the Payroll Details
        UICtrl.addNewPayroll(newPayroll);

    };

    var setEventListener = function() {
        document.getElementById(DOM.submitButton).addEventListener('click', function() {
            ctrlAddEmployee();
        });

        document.addEventListener('keypress', function(e) {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddEmployee();
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