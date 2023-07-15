// register class : represnts a registerform
class Register {
    constructor(studentname, address, email, phone) {
        this.studentname = studentname;
        this.address = address;
        this.email = email;
        this.phone = phone;
    }
}
// UI class : Handle UI tasks
class UI {
    static displayRegisters() {
        const registers = Store.getRegisters();
        registers.forEach((register)=> UI.addRegisterToList(register));
    }
    static addRegisterToList(registers) {
        const list = document.querySelector('#register-list');

        const row = document.createElement('tr');
        row.innerHTML = `
       <td>${registers.studentname}</td>
       <td>${registers.address}</td>
       <td>${registers.email}</td>
       <td>${registers.phone}</td>
       <td><a href='#' class="btn btn-danger btn=sm delete">x</a></td>
       `;
        list.appendChild(row);
    }
    //    showAlert
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#form-reg');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#studentname').value = '';
        document.querySelector('#address').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#phone').value = '';
    }
    static deleteRegister(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}
// store class : stores local storage
class Store {
    // get registered
    static getRegisters(){
        let registers;
        if (localStorage.getItem('registers') === null) {
            registers = [];
        } else {
            registers= JSON.parse(localStorage.getItem('registers'));
        }
        return registers;
    }


    // add Register
    static addRegister(register) {
        const registers = Store.getRegisters();
        registers.push(register);
        localStorage.setItem('registers', JSON.stringify(registers));
    }
    //    remove Register
    static removeRegister(phone) {
        const registers = Store.getRegisters();
        registers.forEach((register, index) => {
            if (register.Phone ===phone) {
                registers.splice(index, 1);
            }
        });
        localStorage.setItem('registers', JSON.stringify(registers));
    }
}

// event : display a register
document.addEventListener('DOMContentLoaded', UI.displayRegisters);

// event : add  register
document.getElementById('form-reg').addEventListener('submit', (e) => {
    e.preventDefault();
    // get the form values
    const studentname = document.querySelector('#studentname').value;
    const address = document.querySelector('#address').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    // validate
    if (studentname === '' || address === '' || email === '' || phone === '') {
        UI.showAlert('please fill all the fields', 'danger');
    } else {

        //   instatiate a register
        const register = new Register(studentname, address, email, phone);

        //    add  register to UI
        UI.addRegisterToList(register);

        // add register to store
        Store.addRegister(register);

        // show success message 
    UI.showAlert('registered', 'success');

        //  add fields  to UI
        UI.clearFields();
    }
});
// event : remove register
document.getElementById('register-list').addEventListener('click', (e) => {
    
    //   remove from UI
    UI.deleteRegister(e.target);
//   remove from store
    Store.removeRegister(e.target.parentElement.previousElementSibling.TextContent);

    // show removed message 
    UI.showAlert('registered removed', 'success');
});