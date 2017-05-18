const toDoListApp = () => {

  const toDoList = [];

  const getDescription = () => {
    return document.getElementById('Description').value;
  };

  const getPriority = () => {
    return document.getElementById('Priority').value;
  };

  const getDeadline = () => {
    return document.getElementById('Deadline').value;
  };


  const addNewItem = (description, priority, deadline) => {
    toDoList.push({
      description,
      priority,
      deadline,
      status: 'incomplete'
    });
  };


  const deleteItem = (index) => {
    toDoList.splice(index, 1);
  }


  const getItemRow = (item, index) => {
    const row = '<tr>'
    + '<td><input class="delete-item-button" type="button" value="X" data-item="' + index + '"></td>'
    + '<td>' + item.description + '</td>'
    + '<td>' + item.priority + '</td>'
    + '<td>' + item.deadline + '</td>'
    + '<td><input class="statusButton" type="button" value = "+"></td>'
    + '</tr>';

    return row;
  };


  const renderTable = () => {
 		const table = document.getElementById('TableData');
    table.innerHTML = '<tr>'
      + '<th>Delete</th>'
      + '<th>Description</th>'
      + '<th width= "110">Priority <input id="PrioritySortButton" class="sortButton" value="'+getButtonValue('PrioritySortButton')+'" type="button"/></th>'
      + '<th width="110">Deadline <input id="DeadlineSortButton" class="sortButton" value="'+getButtonValue('DeadlineSortButton')+'" type="button"/></th>'
      + '<th>Status</th>'
    	+ '</tr>';

    toDoList.forEach((item, i) => {
    	table.innerHTML += getItemRow(item, i);
    });

    sortButtonsClickHandler();
    deleteItemButtonClickHandler();
  };


  const addItemButtonClickHandler = () => {
  	const addItemButton = document.getElementById('AddItemButton');
    addItemButton.addEventListener('click', () => {
      const description = getDescription();
      const priority = getPriority();
      const deadline = getDeadline();

			addNewItem(description, priority, deadline);
      renderTable();
    });
  };


  const deleteItemButtonClickHandler = () => {
    const deleteItemButtons = document.getElementsByClassName('delete-item-button');

    Array.from(deleteItemButtons).forEach((button) => {
      button.addEventListener('click', (e) => {
      	const index = e.target.getAttribute('data-item');

      	deleteItem(index);
     	 	renderTable();
      });
    });
  };


  const sortButtonsClickHandler = () => {
    const prioritySortButton = document.getElementById('PrioritySortButton');
    const deadlineSortButton = document.getElementById('DeadlineSortButton');

    prioritySortButton.addEventListener('click', () => {
      sortByPriority();
      renderTable();
    });

    deadlineSortButton.addEventListener('click', () => {
      sortByDeadline();
      renderTable();
    });
  };


  const sortByPriority = () => {
    let buttonValue = getButtonValue("PrioritySortButton");
    buttonValue = convertToUnicode(buttonValue);

    if(buttonValue=='&#9660'){
      toDoList.sort(function (a, b) {
        return a.priority - b.priority;
      });
      changeButtonValue('PrioritySortButton', '&#9650');
    }else{
      toDoList.sort(function (a, b) {
        return b.priority - a.priority;
      });
      changeButtonValue('PrioritySortButton', '&#9660');
    }
  };


  const sortByDeadline = () => {
    let buttonValue = getButtonValue("DeadlineSortButton");
    buttonValue = convertToUnicode(buttonValue);

    if(buttonValue=='&#9660'){
      toDoList.sort(function (a, b) {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
      changeButtonValue('DeadlineSortButton', '&#9650');
    }else{
      toDoList.sort(function (a, b) {
        return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
      });
      changeButtonValue("DeadlineSortButton",'&#9660');
    }
  };


  const getButtonValue = (buttonID) => {
    const button = document.getElementById(buttonID);
    return button.value;
  };


  const convertToUnicode = (char) => {
    char = '&#'+char.charCodeAt(0);
    return char;
  };


  const changeButtonValue = (buttonID, newValue) => {
    const button = document.getElementById(buttonID);
    button.value = newValue;
  };


  addItemButtonClickHandler();
  sortButtonsClickHandler();
};

toDoListApp();
