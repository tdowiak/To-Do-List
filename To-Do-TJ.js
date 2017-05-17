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
      + '<th width= "110">Priority <input id="PrioritySortButton" class="sortButton" value="&#9660" type="button"/></th>'
      + '<th width="110">Deadline <input id="DeadlineSortButton" class="sortButton" value="&#9660" type="button"/></th>'
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

  let prioritySortButtonDirection = 'down';
  let deadlineSortButtonDirection = 'down';

  const sortButtonsClickHandler = () => {
    const prioritySortButton = document.getElementById('PrioritySortButton');
    const deadlineSortButton = document.getElementById('DeadlineSortButton');

    prioritySortButton.addEventListener('click', () => {
      sortByPriority();
      renderTable();
      console.log(prioritySortButtonDirection);
      prioritySortButtonDirection = applySortButtonDirection(prioritySortButton, prioritySortButtonDirection);
    });

    deadlineSortButton.addEventListener('click', () => {
      sortByDeadline();
      renderTable();
      deadlineSortButtonDirection = applySortButtonDirection(deadlineSortButton, deadlineSortButtonDirection);
    });
  };

  const applySortButtonDirection = (button, direction) => {
    console.log("change button");
    console.log(button);
    if (direction === 'up'){
      direction ='down';
      button.value.innerHTML = "&#9660";
    }else{
      button.value.innerHTML = "&#9650";
      direction = 'up';
    }
    return direction;
  };

  const sortByPriority = () => {
    toDoList.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };

  const sortByDeadline = () => {
    toDoList.sort(function (a, b) {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  };





  addItemButtonClickHandler();
  sortButtonsClickHandler();
};

toDoListApp();
