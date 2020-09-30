//PAYROLL CONTROLLER 
const payrollController = (() => {

    const Select = function(id, account, payrollDate, name, absent, status) {
        this.id = id;
        this.account = account;
        this.payrollDate = payrollDate;
        this.name = name;
        this.absent = absent;
        this.status = status;
    };

    const Optima = function(id, account, payrollDate, name, absent, status) {
        this.id = id;
        this.account = account;
        this.payrollDate = payrollDate;
        this.name = name;
        this.absent = absent;
        this.status = status;
    };

    const Payroll = function(base, ebp, travel, provident, tax, health) {
        this.base = base;
        this.ebp = ebp;
        this.travel = travel;
        this.provident = provident;
        this.tax = tax;
        this.health = health;
    };

    const data = {
        employees: {
            select: [],
            optima: []
        },

        payrolls: {
            select: [],
            optima: []
        },

        totalDeduction: 0,
        netpay: 0
    };

    return {
        addEmployee: (acc, name, abs) => {
            let ID, newEmp;

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

        addPayroll: acc => {

            if(acc === 'select') {
                newPayroll = new Payroll(13500, 9500, 1000, 677, 0, 230);
            }else if(acc === 'optima') {
                newPayroll = new Payroll(14000, 9700, 1000, 677, 0, 230);
            };

            data.payrolls[acc].push(newPayroll);
          
            return newPayroll;
        },

        calculateDeduction: (abs) => {
            let deduct = 525;

            if(abs > 0) {
                data.totalDeduction = abs * deduct;
            }else {
                data.totalDeduction = 0 + 'Hurray!';
            };
            return {
                totalDeduct: data.totalDeduction
            }
        },

        testing: () => {
            return data;
        }
    }

})();


// UI CONTROLLER
const UIController = (() => {

    const DOMstrings = {
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
        payHealth: '.payroll__health',
        payDeduct: '.payroll__deduct'
    };

    return {
        getDOMstrings: () => {
            return DOMstrings;
        },

        getInput: () => {
            return {
                account: document.querySelector(DOMstrings.inputAccount).value,
                name: document.querySelector(DOMstrings.inputName).value,
                absent: parseFloat(document.querySelector(DOMstrings.inputAbsent).value)
            }
        },

        addNewEmployee: empObj => {
            setTimeout(function() {
                document.querySelector(DOMstrings.empName).textContent = empObj.name;
                document.querySelector(DOMstrings.empDate).textContent = empObj.payrollDate;
                document.querySelector(DOMstrings.empAccount).textContent = empObj.account;
                document.querySelector(DOMstrings.empAbsent).textContent = empObj.absent + ' ' + 'Days';
                document.querySelector(DOMstrings.empStatus).textContent = empObj.status;                   
            }, 1000);
        },

        addNewPayroll: payObj => {

            setTimeout(() =>{
                document.querySelector(DOMstrings.payBase).textContent = 'Nu.' + ' ' + payObj.base;
                document.querySelector(DOMstrings.payEPB).textContent = 'Nu.' + ' ' + payObj.ebp;
                document.querySelector(DOMstrings.payTravel).textContent = 'Nu.' + ' ' + payObj.travel;
                document.querySelector(DOMstrings.payProvident).textContent = 'Nu.' + ' ' + payObj.provident;
                document.querySelector(DOMstrings.payTax).textContent = 'Nu.' + ' ' + payObj.tax;
                document.querySelector(DOMstrings.payProvident).textContent = 'Nu.' + ' ' + payObj.provident;
                document.querySelector(DOMstrings.payHealth).textContent = 'Nu.' + ' ' + payObj.health;
            }, 2000);
        },

        addDeduction: ded => {
            setTimeout(() => {
                document.querySelector(DOMstrings.payDeduct).textContent = 'Nu.' + ' ' + ded.totalDeduct;
            }, 2000);
            
        },

        clearInputs: () => {
            let inputs = document.querySelectorAll(DOMstrings.inputName + ',' + DOMstrings.inputAbsent);

            let inputsArr = Array.prototype.slice.call(inputs);

            inputsArr.forEach(cur => {
                cur.value = "";
            });

            inputsArr[0].focus();
        }
    }

})();


// GLOBAL CONTROLLER 
const controller = ((payrollCtrl, UICtrl) => {

    const DOM = UICtrl.getDOMstrings();


    var updatePayroll = function() {
        //1. Calculate the payroll

        //2. Add to the data structure

        //3. Update the user interface
    };

 
    let ctrlAddEmployee = () => {
        //1. Get the input values
        let input = UICtrl.getInput();

        //2. Add to the payroll controller 
        let newEmployee = payrollCtrl.addEmployee(input.account, input.name, input.absent);

        //3. Display in the user interface.
        UICtrl.addNewEmployee(newEmployee);  
        
        //4. Clear Inputs fields
        UICtrl.clearInputs();

        //5. Calculate and Update the payroll
        let newPayroll = payrollCtrl.addPayroll(input.account);

        //6. Display the Payroll Details
        UICtrl.addNewPayroll(newPayroll);

        //7. Getting total deduction
        let deduct = payrollCtrl.calculateDeduction(input.absent);

        //8. Display deduction in UI
        UICtrl.addDeduction(deduct);

    };

    const setEventListener = () => {
        document.getElementById(DOM.submitButton).addEventListener('click', () => {
            ctrlAddEmployee();
        });

        document.addEventListener('keypress', e => {
            if(e.keyCode === 13 || e.which === 13) {
                ctrlAddEmployee();
            }
        });
    };

    return {
        init: () => {
            setEventListener();
        }
    }

})(payrollController, UIController);

controller.init();