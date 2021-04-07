const uri = 'api/Animals';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get wolfs.', error));
}

function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addSizeTextbox = document.getElementById('add-size');
    const addGenderTextbox = document.getElementById('add-gender');

    const item = {
        name: addNameTextbox.value.trim(),
        size: addSizeTextbox.value.trim(),
        gender: addGenderTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addNameTextbox.value = '';
            addSizeTextbox.value = '';
            addGenderTextbox.value = '';
        })
        .catch(error => console.error('Unable to add wolfs.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete wolf.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-size').value = item.size;
    document.getElementById('edit-gender').value = item.gender;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim(),
        size: document.getElementById('edit-size').value.trim(),
        gender: document.getElementById('edit-gender').value.trim()
        
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update wolf.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'wolf' : 'wolfs';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('wolfs');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add("btn-secondary");

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add("btn-dark");

    data.forEach(item => {
       

        let editButton = buttonEdit.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);
       

        let deleteButton = buttonDelete.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();
        

        let td2 = tr.insertCell(0);
        let textNodeN = document.createTextNode(item.name);
        td2.appendChild(textNodeN);

        let td3 = tr.insertCell(1);
        let textNodeS = document.createTextNode(item.size);
        td3.appendChild(textNodeS);

        let td4 = tr.insertCell(2);
        let textNodeG = document.createTextNode(item.gender);
        td4.appendChild(textNodeG);

        let td5 = tr.insertCell(3);
        td5.appendChild(editButton);

        let td6 = tr.insertCell(4);
        td6.appendChild(deleteButton);
    });

    todos = data;
}