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
    const currentDisplayedList = getListByCurrentTableType();
    const length = toDoList.length;

    for (var i = 0; i<length; i++){
      if(currentDisplayedList[index]===toDoList[i]){
        toDoList.splice(i, 1);
        i=length;
      }
    }

  };


  const changeStatus = (index) => {
    const currentDisplayedList = getListByCurrentTableType();
    const item = currentDisplayedList[index];
    if (item.status === 'incomplete'){
      item.status = 'complete';
    }else{
      item.status = 'incomplete';
    }
  };


  const getItemRow = (item, index) => {
    const row = '<tr>'
    + '<td><input class="delete-item-button" type="button" value="X" data-item="' + index + '"></td>'
    + '<td>' + item.description + '</td>'
    + '<td>' + item.priority + '</td>'
    + '<td>' + item.deadline + '</td>'
    + '<td><input class="change-status-button" type="button" value = "&#10004" data-item="' + index + '" ></td>'
    + '</tr>';

    return row;
  };


  const renderTable = () => {
    const listToRender = getListByCurrentTableType();

 		const table = document.getElementById('TableData');
    table.innerHTML = '<tr>'
      + '<th>Delete</th>'
      + '<th>Description</th>'
      + '<th width= "110">Priority <input id="PrioritySortButton" class="sortButton" value="'+getButtonValue('PrioritySortButton')+'" type="button"/></th>'
      + '<th width="110">Deadline <input id="DeadlineSortButton" class="sortButton" value="'+getButtonValue('DeadlineSortButton')+'" type="button"/></th>'
      + '<th>Status</th>'
    	+ '</tr>';

    listToRender.forEach((item, i) => {
    	table.innerHTML += getItemRow(item, i);

      const statusButton= table.rows[i+1].cells[4].firstChild;
      statusButton.style.opacity = getStatusButtonOpacity(item);
      statusButton.style.color = getStatusButtonColor(item);
    });

    sortButtonsClickHandler();
    deleteItemButtonClickHandler();
    changeStatusButtonClickHandler();
  };


  const getListByCurrentTableType = () => {
    const tableTypeToggleButton = document.getElementById('TableTypeToggleButton');
    const currentTableType = tableTypeToggleButton.value;

    if (currentTableType === 'Completed'){
      return getCompletedTasks();
    }else if (currentTableType === 'Incomplete'){
      return getIncompleteTasks();
    }else{
      return toDoList;
    }
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

  const changeStatusButtonClickHandler = () => {
    const changeStatusButtons = document.getElementsByClassName('change-status-button');
    Array.from(changeStatusButtons).forEach((button) => {
      button.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-item');
        changeStatus(index);
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


  const getCompletedTasks = () => {
    const completedTasks = [];
    toDoList.forEach((item) => {
      if(item.status==='complete'){
        completedTasks.push(item);
      }
    });
    return completedTasks;
  };


  const getIncompleteTasks = () => {
    const incompleteTasks = [];
    toDoList.forEach((item) => {
      if(item.status==='incomplete'){
        incompleteTasks.push(item);
      }
    });
    return incompleteTasks;
  };


  const getStatusButtonOpacity = (item) => {
    if (item.status==='complete'){
      return 1;
    }else{
      return 0.5;
    }
  };


  const getStatusButtonColor = (item) => {
    if (item.status==='complete'){
      return '#000';
    }else{
      return '#ccc0c0';
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


  const toggleTableTypeClickHandler = () => {
    const tableTypeToggleButton = document.getElementById('TableTypeToggleButton');

    tableTypeToggleButton.addEventListener("click", () => {
      const currentTableType = tableTypeToggleButton.value;

      if (currentTableType === 'Incomplete'){
        tableTypeToggleButton.value = 'Completed';
      }else if(currentTableType === 'Completed'){
        tableTypeToggleButton.value = 'All';
      }else{
        tableTypeToggleButton.value = 'Incomplete';
      }
      renderTable();
    });
  };


  addItemButtonClickHandler();
  sortButtonsClickHandler();
  toggleTableTypeClickHandler();
};

toDoListApp();
