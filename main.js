const listOfMovies = [
  "Władca much (1990)",
  "Władca Pierścieni (1978)",
  "Milczenie owiec (1991)",
  "Moja dziewczyna (1991)",
  "Dziewczyna z tatuażem (2011)",
  "Jestem Bogiem (2011)",
  "Jestem legendą (2007)",
  "Matrix (1999)",
  "Zielona mila (1999)",
  "8 Mila (2002)",
  "Uciekająca panna młoda (1999)",
  "Gnijąca panna młoda (2005)",
  "Dzień świra (2002)",
  "Dzień Niepodległości (1996)",
  "Dzień świstaka (1993)",
  "Lista Schindlera (1993)",
  "Czarna lista Hollywood (1991)",
  "Lista klientów (2012)",
  "Teraz albo nigdy (2018)",
  "Niech będzie teraz (2012)",
  "Zabójcze maszyny (2018)",
  "Zabójcza broń (1987)",
  "Znaki (2002)",
  "Znaki na drodze (1969)",
  "Wodne znaki (2013)",
  "Znaki dymne (1998)",
  "Jeden dzień (2011)",
  "Dzień próby (2001)",
  "Dzień z życia blondynki (2014)",
  "Panna Nikt (1996)",
  "Panna Meadows (2014)",
  "Panna Nikt (2010)",
  "Panna Julia (1951)"
];
let sortedListOfMovies =
  JSON.parse(localStorage.getItem("sortedListOfMovies")) || listOfMovies.sort();
const ul = document.querySelector("ul");
const lis = [];
const yearsArr = [];
const select = document.querySelector("select");
let filteredList = [];
let tagsString = "";

function renderList(el) {
  const li = document.createElement("li");
  const movieNameHolder = document.createElement("p");
  const movieNameSpan = document.createElement("span");
  movieNameSpan.classList.add("name");
  const opt = document.createElement("option");
  const movieArray = el.split(" ");
  const movieYearArray = movieArray.pop();
  const movieYear = parseInt(movieYearArray.substr(1));
  const movieName = movieArray.join(" ");
  tagsString += movieName + " ";

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("removeBtn");
  removeBtn.innerHTML = `x`;

  movieNameSpan.textContent = movieName;
  opt.textContent = movieYear;
  movieNameHolder.classList.add("big");
  movieNameHolder.append(movieNameSpan, " (", movieYear, ")");
  li.classList.add("justifyLi");
  li.classList.add("listElement");
  li.dataset.year = movieYear;
  li.append(movieNameHolder, removeBtn);

  lis.push(li);
  ul.appendChild(li);

  // ADD INDEX TO EACH ARRAY AND LIST ELEMENT
  lis.forEach((li, idx) => (li.index = idx));
  ul.querySelectorAll("li").forEach((li, idx) => (li.dataset.index = idx));

  if (lis.length === sortedListOfMovies.length) createFormElement();
  updateQuantity();
  colorListItems();
  renderTagsList();

  if (!yearsArr.includes(movieYear)) {
    yearsArr.push(movieYear);
    yearsArr.sort();
    appendSelect();
  }
}

function appendSelect() {
  select.innerHTML = "";
  const optOne = document.createElement("option");
  optOne.setAttribute("disabled", true);
  optOne.setAttribute("selected", true);
  optOne.textContent = "Wybierz rok";
  select.add(optOne);

  yearsArr.forEach(year => {
    const opt = document.createElement("option");
    opt.textContent = year;
    select.add(opt);
  });
}

function filterItemsByYear() {
  ul.innerHTML = "";
  filteredList = [];
  let chosenYear;
  document.querySelectorAll("option").forEach(el => {
    if (el.selected) chosenYear = el.textContent;
  });

  lis.forEach(li => {
    if (li.dataset.year == chosenYear) {
      filteredList.push(li);
    }
  });

  renderFilteredList();
}

function filterItemsByTag() {
  ul.innerHTML = "";
  filteredList = [];
  const tagText = this.textContent;

  lis.forEach(li => {
    if (
      li
        .querySelector(".name")
        .textContent.toLowerCase()
        .includes(tagText)
    )
      filteredList.push(li);
  });

  renderFilteredList();
}

function renderFilteredList() {
  filteredList.map(li => ul.append(li));
  colorListItems();
  updateQuantity();
}

function colorListItems() {
  document.querySelectorAll("li").forEach((el, idx) => {
    el.classList.remove("evenLi");
    if (idx % 2 != 0) el.classList.add("evenLi");
  });
}

function updateQuantity() {
  document.querySelector(".nrOfAllMovies").textContent = lis.length;
  document.querySelector(
    ".nrOfFilteredMovies"
  ).textContent = filteredList.length ? filteredList.length : 0;
}

function renderTagsList() {
  const tagsList = document.querySelector(".tagsList");
  tagsList.innerHTML = "";
  let tagsArray = tagsString
    .trim()
    .toLowerCase()
    .split(" ");
  tagsArray = tagsArray.sort();

  tagsArray.forEach(tag => {
    if (!tagsList.textContent.includes(tag)) {
      const spanTag = document.createElement("span");
      let counter = 0;
      for (let i = 0; i < tagsArray.length; i++) {
        if (tag === tagsArray[i]) counter++;
      }
      spanTag.classList.add("filterTag");
      spanTag.textContent = tag;
      spanTag.style.fontSize = "12px";
      if (counter === 2) spanTag.style.fontSize = "16px";
      else if (counter === 3) spanTag.style.fontSize = "20px";
      else if (counter === 4) spanTag.style.fontSize = "24px";
      else if (counter >= 5) spanTag.style.fontSize = "28px";
      tagsList.append(spanTag, " ");
    }
  });

  tagsList
    .querySelectorAll("span")
    .forEach(span => span.addEventListener("click", filterItemsByTag));
}

function showAllItems() {
  ul.innerHTML = "";
  filteredList = [];
  lis.forEach(li => ul.append(li));

  updateQuantity();
  createFormElement();
  colorListItems();
}

function toggleNightMode() {
  const wrapper = document.querySelector(".site-wrapper");
  this.classList.toggle("activeNightModeBtn");
  wrapper.classList.toggle("activeNightModeSite");
}

function sortListAlphabetically() {
  ul.innerHTML = "";
  if (filteredList.length > 0) {
    filteredList.reverse().forEach(li => ul.append(li));
  } else {
    filteredList = [];
    lis.reverse().forEach(li => ul.append(li));
  }

  updateQuantity();
  colorListItems();
}

function sortListByYear() {
  ul.innerHTML = "";
  yearsArr.reverse();

  for (let i = 0; i < yearsArr.length; i++) {
    if (filteredList.length > 0) {
      for (let j = 0; j < filteredList.length; j++) {
        if (yearsArr[i] == filteredList[j].dataset.year)
          ul.append(filteredList[j]);
      }
    } else {
      for (let j = 0; j < lis.length; j++) {
        if (yearsArr[i] == lis[j].dataset.year) ul.append(lis[j]);
      }
    }
  }

  colorListItems();
  updateQuantity();
}

function createFormElement() {
  const addMovie = document.createElement("li");
  const addMovieForm = document.createElement("form");
  const addMovieDiv = document.createElement("div");
  const addMovieNameInput = document.createElement("input");
  const addMovieYearInput = document.createElement("input");
  const addMovieYearSubmit = document.createElement("button");

  addMovieNameInput.placeholder = "Tytuł filmu";
  addMovieNameInput.name = "name";
  addMovieYearInput.placeholder = "Rok produkcji";
  addMovieYearInput.name = "year";
  addMovieYearSubmit.textContent = "Dodaj";
  addMovieForm.append(addMovieNameInput, addMovieYearInput, addMovieYearSubmit);

  addMovieDiv.textContent = "+ DODAJ FILM";
  addMovie.append(addMovieDiv);
  addMovie.append(addMovieForm);

  addMovie.classList.add("justifyLi");
  addMovie.classList.add("big");
  addMovie.classList.add("addMovieLi");
  addMovie.id = "addMovieForm";
  ul.prepend(addMovie);

  document.getElementById("addMovieForm").addEventListener("click", handleForm);
  document.getElementById("addMovieForm").onsubmit = addMovieToList;
}

function handleForm() {
  this.classList.remove("addMovieLi");
  this.classList.add("activeFormLi");
  this.querySelector("div").style.display = "none";
  this.querySelector("form").style.display = "block";
}

function addMovieToList(e) {
  e.preventDefault();
  const nameInput = this.querySelector("input[name='name'").value.trim();
  const yearInput = this.querySelector("input[name='year'").value;

  if (!nameInput || !yearInput) return alert("Podaj tytuł i rok produkcji!");
  let rest = nameInput
    .split("")
    .splice(1)
    .join("");
  let a = nameInput.split("").splice(0, 1);
  a = a[0].toUpperCase();
  const nameInputCapitalized = `${a}${rest}`;

  if (
    nameInput.length >= 3 &&
    nameInput.length <= 30 &&
    yearInput >= 1900 &&
    yearInput <= 2021
  ) {
    const confirmed = confirm(
      `Czy na pewno chcesz dodać ${nameInputCapitalized}?`
    );
    if (!confirmed) return;
    const listElement = `${nameInputCapitalized} (${yearInput})`;
    ul.innerHTML = "";
    sortedListOfMovies.push(listElement);
    sortedListOfMovies = sortedListOfMovies.sort();
    localStorage.setItem(
      "sortedListOfMovies",
      JSON.stringify(sortedListOfMovies)
    );
    lis.length = 0;
    tagsString = "";
    sortedListOfMovies.forEach(el => renderList(el));
  } else if (nameInput.length < 3)
    alert("Tytuł musi mieć przynajmniej 3 znaki.");
  else if (nameInput.length > 30) alert("Tytuł może mieć maks. 30 znaków.");
  else alert("Niepoprawny rok produkcji.");
}

function removeListElement(el) {
  if (filteredList.length === 0) {
    lis.map(li => {
      if (li.index == el.parentNode.dataset.index) {
        const index = el.parentNode.dataset.index;
        sortedListOfMovies.splice(index, 1);
        lis.splice(index, 1);
      }
    });
  }

  if (filteredList.length > 0 && filteredList.includes(el.parentNode)) {
    const index = filteredList.indexOf(el.parentNode);
    const indexInLis = lis.indexOf(el.parentNode);
    filteredList.splice(index, 1);
    lis.splice(indexInLis, 1);
    sortedListOfMovies.splice(indexInLis, 1);
  }
  localStorage.setItem(
    "sortedListOfMovies",
    JSON.stringify(sortedListOfMovies)
  );

  el.parentNode.remove();
  // ADD INDEX TO EACH ARRAY AND LIST ELEMENT
  lis.forEach((li, idx) => (li.index = idx));
  if (filteredList.length === 0) {
    ul.querySelectorAll(".listElement").forEach(
      (li, idx) => (li.dataset.index = idx)
    );
  }

  updateQuantity();
  colorListItems();

  const removedTag = el.parentNode.querySelector(".name").textContent;
  tagsString = tagsString.replace(removedTag, "");
  renderTagsList();
}

sortedListOfMovies.forEach(el => renderList(el));

if (sortedListOfMovies.length === 0) createFormElement();

document
  .querySelector(".showAllItemsBtn")
  .addEventListener("click", showAllItems);

document
  .getElementById("nightModeBtn")
  .addEventListener("click", toggleNightMode);

document
  .getElementById("sortAlphabetically")
  .addEventListener("click", sortListAlphabetically);

document.getElementById("sortByYear").addEventListener("click", sortListByYear);

ul.addEventListener("click", function(e) {
  if (e.target.className === "removeBtn") removeListElement(e.target);
});
