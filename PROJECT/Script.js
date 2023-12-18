const createElement = (ele) => {
  return document.createElement(ele);
};
const append = (first, second) => {
  return first.appendChild(second);
};
const find = (id) => {
  return document.getElementById(id);
};
const set = (name, selectorName) => {
  return name.setAttribute("class", selectorName);
};

const root = find("root");
const rootMain = find("root-Main");
const headerMain = find("header");

//Header

const headerRow = createElement("div");
set(headerRow, "row ");
append(headerMain, headerRow);

const headerCol = createElement("div");
set(headerCol, "col-sm-12 p-3");
append(headerRow, headerCol);

const headerDiv = createElement("div");
append(headerCol, headerDiv);

const headerTitle = createElement("h2");
set(headerTitle, "text-center text-white");
headerTitle.innerText = "ICE AND FIRE";
append(headerDiv, headerTitle);

//Root Function
root.setAttribute("class", "container w-75 mt-3 container-section");

let row = createElement("div");
set(row, "row");
append(root, row);

let col = createElement("div");
set(col, "col-sm-12");
append(row, col);

let divButton = createElement("div");
set(divButton, "d-flex justify-content-center align-items-center gap-3");
append(col, divButton);

let inputField = createElement("input");
inputField.setAttribute("placeholder", "Enter The Movie Name");
set(inputField, "form-control border-5 w-100 shadow-lg");
inputField.setAttribute("id", "btn");
append(divButton, inputField);

let buttonField = createElement("button");
buttonField.innerText = "SEARCH";
buttonField.setAttribute("id", "button-value");
set(buttonField, "btn btn-info mt-1");
append(divButton, buttonField);

let createUl = createElement("ul");
createUl.setAttribute("id", "list-style");
append(col, createUl);

//search Recomendation
const inputValue = document.getElementById("btn");
const unOrderedList = document.getElementById("list-style");
const ul = createElement("li");
//Fetch The Data from Api For Search
fetch(`https://www.anapioficeandfire.com/api/books`)
  .then((data) => {
    //Convertin The Object To The Json
    return data.json();
  })
  .then((response) => {
    inputValue.addEventListener("keyup", (e) => {
      let inputValue = e.target.value;
      const returnData = response.filter((data) => {
        return data.name.toLowerCase().includes(inputValue.toLowerCase());
      });
      if (inputValue) {
        returnData.map((dataOne) => {
          ul.innerText = dataOne.name;
          ul.setAttribute("class", "display_avoid w-75");
          unOrderedList.setAttribute("class", "display_avoid w-75");
          unOrderedList.appendChild(ul);
          append(unOrderedList, ul);
        });
      } else {
        ul.innerText = "";
        ul.setAttribute("class", "add-One");
        unOrderedList.setAttribute("class", "add-One");
      }
    });
  });

//Show Movies

const containerShow = createElement("div");
set(containerShow, "container");
append(rootMain, containerShow);

const rowShow = createElement("div");
set(rowShow, "row");
append(containerShow, rowShow);

const colShow = createElement("div");
set(colShow, "col-sm-12");
append(rowShow, colShow);

const divShow = createElement("div");
//   set(divShow, "");
append(colShow, divShow);

const ulShow = createElement("ul");
ulShow.setAttribute("id", "findUl");
set(ulShow, "list-style-group bg-black");
append(divShow, ulShow);

const getValue = document.getElementById("btn");
const getButton = document.getElementById("button-value");
const getUl = document.getElementById("findUl");
getUl.setAttribute("class", "list-group list-group-flush bg-white");
getUl.setAttribute("class", "p-5 d-flex flex-column align-items-center");
getButton.addEventListener("click", async function handleSearch() {
  try {
    const getValueData = getValue.value;
    if (getValueData) {
      const url = `https://www.anapioficeandfire.com/api/books?name=${getValueData}`;
      const data = await fetch(url);
      const response = await data.json();
      let FinalData = response;
      FinalData.map((mapThrough, index) => {
        const ul = createElement("li");
        set(ul, "text-white");
        ul.innerText = `Name: ${mapThrough.name}`;
        append(getUl, ul);

        const ulOne = createElement("li");
        ulOne.innerText = `Author: ${mapThrough.authors[0]}`;
        set(ulOne, "text-white");
        append(getUl, ulOne);

        const ulTwo = createElement("li");
        ulTwo.innerText = `ISBN: ${mapThrough.isbn}`;
        set(ulTwo, "text-white");
        append(getUl, ulTwo);

        const ulThree = createElement("li");
        ulThree.innerText = `Publisher Name: ${mapThrough.publisher}`;
        set(ulThree, "text-white");
        append(getUl, ulThree);

        const ulFour = createElement("li");
        ulFour.innerText = `DATE: ${mapThrough.released}`;
        set(ulFour, "text-white");
        append(getUl, ulFour);

        ul.innerText = "";
        ul.setAttribute("class", "add-One");
        unOrderedList.setAttribute("class", "add-One");
      });
      getValue.value = "";
    }
  } catch (error) {
    console.log(error);
  }
});
