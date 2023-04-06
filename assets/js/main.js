const buttonSendMessage = document.querySelector('.header__form-send-message');
const textareaMessage = document.querySelector('.header__form-textarea');
const main = document.querySelector('.main');

// ADD
buttonSendMessage.addEventListener('click', vereficationMessage);

function addMessage(message) {
    main.innerHTML += `<div class="message">
                            <section class="message__left-section">
                                <label>
                                    <input class="checkbox__real" type="checkbox" name="ready">
                                    <span class="checkbox__custom"></span> 
                                </label>
                            </section>
                            <section class="message__center-section">
                                ${message}
                            </section>
                            <section class="message__right-section">
                                <button class="message__remove">
                                    <img src="assets/img/basket.svg" alt="remove">
                                </button>
                            </section>
                        </div>`

    removeButtonsAddListener();
    checkboxesAddListener();
    changeActiveCheckbox();
}

function vereficationMessage() {
    let message = textareaMessage.value.trim();

    if (lengthMessage(message)) {
        addMessage(message);
        clearTextarea(textareaMessage);
    }
}

function lengthMessage(message) {
    if (message.length >= 10 && message.length <= 3000 && message !== undefined) {
        return true;
    } else {
        addAlert(`Длина сообщения <span>от 10 до 3000</span> символов. <br> Длина сообщения: <span>${message.length}</span>`, 'error')

        return false;
    }
}

function clearTextarea(textarea) {
    return textarea = textarea.value = ''
}

// REMOVE
removeButtonsAddListener();
function removeButtonsAddListener() {
    const removeButtons = document.querySelectorAll('.message__remove');

    removeButtons.forEach(element => {
        element.addEventListener('click', removeMessage);
    })
}

function removeMessage(event) {
    let e = event.target;
    let eParent = e.closest('.message');
    let eParentTextMessage = eParent.querySelector('.message__center-section').innerHTML;

    main.removeChild(eParent);

    addAlert(`Задание: <span>${eParentTextMessage}</span> <br> Удалено`, 'right') 
}

// REMOVE ALL
const buttonRemoveAll = document.querySelector('.remove__all');
buttonRemoveAll.addEventListener('click', clearAllMessage);

function clearAllMessage() {
    main.innerHTML = '';

    addAlert(`Все задния очищены :)`, 'right')
}

// ===========CHECKBOX============ //
checkboxesAddListener();
function checkboxesAddListener() {
    const checkboxes = document.querySelectorAll('.checkbox__real');

    checkboxes.forEach(element => {
        element.addEventListener('click', changeCheckbox);
    })
}

function changeCheckbox(event) {
    let e = event.target;
    let messageText = whichCheckbox(e);

    if (e.checked) {
        messageText.classList.add('ready');
    } else {
        messageText.classList.remove('ready');
    }
}

function whichCheckbox(element) {
    let eParent = element.closest('.message');
    let eParentChild = eParent.querySelector('.message__center-section');

    return eParentChild;
}

// ===========ФИКС БАГОВ С CHECKBOX============ //
// Определяем где пасивный а где активный чекбокс
function changeActiveCheckbox() {
    const messagesText = document.querySelectorAll('.message__center-section');

    messagesText.forEach(element => {
        if (element.classList.contains('ready')) {
            let e = element;
            whichCheckboxAddActive(e);
        } else {
            let e = element;
            whichCheckboxRemoveActive(e);
        }
    })
}

// Добавляем checked активным чекбоксам
function whichCheckboxAddActive(element) {
    let eParent = element.closest('.message');
    let eParentChild = eParent.querySelector('.checkbox__real');

    eParentChild.checked = true;
}

// Удаляем checked пасивным чекбоксам
function whichCheckboxRemoveActive(element) {
    let eParent = element.closest('.message');
    let eParentChild = eParent.querySelector('.checkbox__real');

    eParentChild.checked = false;
}

// ===========ALERT============ //
const alertWraper = document.querySelector('.wraper__alert');

function addAlert(text, type = 'error') {
    let typeAlert = vereficationType(type);

    if (typeAlert) {
        let alerts = alertWraper.querySelectorAll('.alert');
        removeOverflowAlert(alerts);

        alertWraper.innerHTML +=`<div class="alert alert__${type}">
                                    <p class="alert__text">${text}</p>
                                </div>`;
                        
        alerts = alertWraper.querySelectorAll('.alert');
        alertsAddListener(alerts);
    }
}

function removeOverflowAlert(alerts) {
    if (alerts.length >= 3) {
        alertWraper.removeChild(alerts[0]);
    }
}

function removeClickAlert(event) {
    let e = event.currentTarget;

    alertWraper.removeChild(e);
}

function alertsAddListener(alerts) {
    alerts.forEach(element => {
        element.addEventListener('click', removeClickAlert);
    })
}

function clearAlertWraper() {
    alertWraper.innerHTML = '';
}

function vereficationType(type) {
    if (type !== undefined) {
        return true;
    } else {
        return false;
    }
}