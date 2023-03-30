const itembtn = document.getElementById("item-btn");

itembtn.addEventListener("click", async function () {
  const name = document.getElementById("itemList").value.trim();
  console.log(name);
  if (name) {
    const res = await fetch("/api/shoppingList", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
        // const newProduct = await res.json(); // parse the response JSON
        // const productTemplate = Handlebars.compile(
        //   document.querySelector("#product-template").innerHTML
        // );
        // const productHtml = productTemplate(newProduct); // render the new item using Handlebars
        // document
        //   .querySelector(".product-list")
        //   .insertAdjacentHTML("beforeend", productHtml); 
        // let listItem = document.createElement("li");
        // listItem.textContent = text;
        // listItem.className = "list-group-item";
        // let checkSymbol = document.createElement("span");
        // crossSymbol.innerHTML = "&#10006;";
        // crossSymbol.className = "cross-symbol";
        // crossSymbol.addEventListener("click", function () {
        //   listItem.remove();
        // });
        // checkSymbol.addEventListener("click", function () {
        //   this.setAttribute("checked", !this.getAttribute("checked"));
        // });
        // listItem.appendChild(checkSymbol);
        // listItem.appendChild(crossSymbol);
        // parent.appendChild(listItem);
        // recentSearches.forEach((element) => {
        //   makeListItem(element, ul);
        // });
      } else {
        alert("Something Went Wrong");
      }
    }
  }
);

itembtn.addEventListener("click", function () {});

//localStorage for dropdown
const dropdown = document.querySelector("#dropdown");
const itemList = document.querySelector("#itemList");
const addBtn = document.querySelector("#item-btn");
let dropdownSelect;

if (localStorage.dropdownSelect && localStorage.dropdownSelect != "") {
  dropdownSelect = JSON.parse(localStorage.dropdownSelect);
} else {
  dropdownSelect = [];
}

const makeDropdownItem = (text, parent) => {
  let listItem = document.createElement("li");
  listItem.textContent = text;
  listItem.className = "list-group-item";
  let checkSymbol = document.createElement("span");
  checkSymbol.innerHTML = "&#10004;";
  checkSymbol.className = "check-symbol";
  let crossSymbol = document.createElement("span");
  crossSymbol.innerHTML = "&#10006;";
  crossSymbol.className = "cross-symbol";
  crossSymbol.addEventListener("click", function () {
    listItem.remove();
  });
  checkSymbol.addEventListener("click", function () {
    this.setAttribute("checked", !this.getAttribute("checked"));
  });
  listItem.appendChild(checkSymbol);
  listItem.appendChild(crossSymbol);
  parent.appendChild(listItem);
};

dropdownSelect.forEach((element) => {
  makeDropdownItem(element, ul);
});

dropdown.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    itemList.value == "" ||
    isDuplicateValue(dropdownSelect, itemList.value)
  ) {
    return;
  } else {
    dropdownSelect.push(itemList.value);
    makeDropdownItem(itemList.value, ul);
    localStorage.dropdownSelect = JSON.stringify(dropdownSelect);
    itemList.value = "";
  }
});

//event listener for search button
const btn = document.querySelector(".btn");
const box = document.querySelector(".box");
const history = document.querySelector(".history");

btn.addEventListener("click", function () {});

//localStorage
const form = document.querySelector("#form");
const searchBar = document.querySelector("#cityInput");
const submitButton = document.querySelector(".btn");
const deleteButton = document.querySelector("#delete");
const ul = document.querySelector("#ul");
let recentSearches;

if (localStorage.recentSearches && localStorage.recentSearches != "") {
  recentSearches = JSON.parse(localStorage.recentSearches);
} else {
  recentSearches = [];
}
//   const makeListItem = (text, parent) => {
//     let listItem = document.createElement("li");
//     listItem.textContent = text;
//     listItem.className = "list-group-item";
//     let checkSymbol = document.createElement("span");
//     checkSymbol.innerHTML = "&#10004;";
//     checkSymbol.className = "check-symbol";
//     let crossSymbol = document.createElement("span");
//     crossSymbol.innerHTML = "&#10006;";
//     crossSymbol.className = "cross-symbol";
//     crossSymbol.addEventListener("click", function() {
//       // Perform desired action when cross symbol is clicked
//       listItem.remove(); // Remove the list item when cross symbol is clicked
//     });
//     listItem.appendChild(checkSymbol);
//     listItem.appendChild(crossSymbol);
//     parent.appendChild(listItem);
//   };

const makeListItem = (text, parent) => {
  let listItem = document.createElement("li");
  listItem.textContent = text;
  listItem.className = "list-group-item";
  let checkSymbol = document.createElement("span");
  checkSymbol.innerHTML = "&#10004;";
  checkSymbol.className = "check-symbol";
  let crossSymbol = document.createElement("span");
  crossSymbol.innerHTML = "&#10006;";
  crossSymbol.className = "cross-symbol";
  crossSymbol.addEventListener("click", function () {
    listItem.remove();
  });
  checkSymbol.addEventListener("click", function () {
    this.setAttribute("checked", !this.getAttribute("checked"));
  });
  listItem.appendChild(checkSymbol);
  listItem.appendChild(crossSymbol);
  parent.appendChild(listItem);
};

recentSearches.forEach((element) => {
  makeListItem(element, ul);
});

const isDuplicateValue = (arr, text) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == text) {
      return true;
    }
  }

  return false;
};

form.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    searchBar.value == "" ||
    isDuplicateValue(recentSearches, searchBar.value)
  ) {
    return;
  } else {
    recentSearches.push(searchBar.value);
    makeListItem(searchBar.value, ul);
    localStorage.recentSearches = JSON.stringify(recentSearches);
    searchBar.value = "";
  }
});

deleteButton.addEventListener("click", () => {
  localStorage.clear();
  recentSearches = [];
  searchBar.value = "";

  let arr = document.querySelectorAll("li");
  for (let i = 0; i < arr.length; i++) {
    arr[i].remove();
  }
});

//add event listener to search history item
ul.addEventListener("click", function (event) {
  event.preventDefault();
  cityInput.style.display.inline;
});

document.getElementById("delete").addEventListener("click", restore, false);
function restore() {
  document.getElementById("delete").value = localStorage.getItem("delete");
}
