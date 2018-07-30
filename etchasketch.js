
  const container = document.querySelector(".container");
  let boxes = Array.from(document.getElementsByClassName('column'));

  function createGrid(holder, size) {
    let boxHeight = 800/size;
    for (i=0; i<size; i++) {
      let row = document.createElement('div');
      let boxSize = "";
      for (s=0; s<size; s++) {
        boxSize = boxSize.concat("auto ");
      }
      row.classList.add('row');
      row.setAttribute('style', `grid-template-columns: ${boxSize}`);
      row.style.height = `${800/size}px`;
      holder.appendChild(row);
      for (n=0; n<size; n++) {
        let column = document.createElement('div');
        column.classList.add('column');
        row.appendChild(column);
      }
    }
    addEvents();
  }

  let addEvents = function() {
    boxes = Array.from(document.getElementsByClassName('column'));
   // Defined in function createGrid
     boxes.forEach(box => box.addEventListener("mouseover", hoverBoxes));
     boxes.forEach(box => box.addEventListener("mouseout", hoverOffBoxes));
     boxes.forEach(box => box.addEventListener("click", clickBoxes));
     window.addEventListener("keydown", shiftCheck);
  };

  function hoverOffBoxes(e) {
    e.target.classList.remove('hover');
  }

  function hoverBoxes(e) {
    e.target.classList.add('hover');
  }

  function clickBoxes(e) {
    if (e.target.classList.contains('click')) {
      e.target.classList.remove('click');
    } else {
    e.target.classList.add('click');
    }
  }

  function shiftCheck(e) {
    if (e.keyCode == 16) {
      clearGrid();
    } else return;
  }

  function clearGrid() {
    const confirmDelete = confirm("Are you sure you want to clear the grid?");
    if (confirmDelete == true) {
      boxes.forEach(box => box.classList.remove('click'));
      yourBoxNumber();
    }  else return;
  }

  function yourBoxNumber () {
    const choice = prompt("How many boxes would you like in your grid?", 25);
    if (isNaN(choice)) {
      return "Invalid entry. Please enter a number."
    } else {
      removeChildren(container);
      createGrid(container, choice);
    }
  }

  function removeChildren(parent) {
    let childCount = parent.children.length;
    for (i=0; i<childCount; i++) {
      parent.removeChild(parent.lastChild);
      console.log(parent);
    }
  }

  createGrid(container, 30);
