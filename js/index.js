var siteName = document.getElementById("siteName");

var siteUrl = document.getElementById("siteUrl");

var addBtn = document.getElementById("addBtn");

var updateBtn = document.getElementById("updateBtn");

var tableBody = document.getElementById("tableBody");

var searchBook = document.getElementById("searchBook");

var alertName = document.getElementById("alertName");

var alertUrl = document.getElementById("alertUrl");

var alertExite = document.getElementById("alertExite");

var booksContainer = [];

if (localStorage.getItem("books") != null) {
  booksContainer = JSON.parse(localStorage.getItem("books"));
  displayBook();
}

// ==== Add Book ====

function addBook() {
  if ((validateName() == true) & (validateUrl() == true)) {
    var book = {
      name: siteName.value,
      url: siteUrl.value,
    };
    booksContainer.push(book);
    setLocal();
    displayBook();
    resetForm();
  }
}
addBtn.addEventListener("click", addBook);

// ==== Display Book ====

function displayBook() {
  var bookTask = ``;
  var term = searchBook.value.toLowerCase();
  for (var i = 0; i < booksContainer.length; i++) {
    if (booksContainer[i].name.toLowerCase().includes(term)) {
      bookTask += `
    <tr>
                     <td>${booksContainer[i].name
                       .toLowerCase()
                       .replaceAll(
                         term,
                         `<span class="bg-info">${term}</span>`
                       )}</td>
                     <td>
                        <p class="text-truncate mx-auto" style="max-width: 300px;">${
                          booksContainer[i].url
                        }</p>
                     </td>
                     <td>
                        <div class="hstack gap-3 justify-content-center">
                           <a class="btn btn-outline-dark" target='_blank' href="${
                             booksContainer[i].url
                           }"> <i class="fa-regular fa-eye"></i></a>
                           <button onclick='setBookInfo(${i})' class="btn btn-outline-warning"><i class="fa-regular fa-pen-to-square"></i></button>
                           <button onclick='deleteBook(${i})' class="btn btn-outline-danger"> <i class="fa-solid fa-trash"></i></button>
                        </div>
                     </td>
                  </tr>
    `;
    }
  }
  document.getElementById("tableBody").innerHTML = bookTask;
}

// ==== Set Local ====

function setLocal() {
  localStorage.setItem("books", JSON.stringify(booksContainer));
}

// ==== Reset Form ====

function resetForm() {
  siteName.value = "";
  siteUrl.value = "";
}

// ==== Delete Book ====

function deleteBook(index) {
  booksContainer.splice(index, 1);
  setLocal();
  displayBook();
}

// ==== Update Book ====

var globalIndex = 0;

function setBookInfo(index) {
  globalIndex = index;
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  siteName.value = booksContainer[index].name;
  siteUrl.value = booksContainer[index].url;
}

function updateBook() {
  var book = {
    name: siteName.value,
    url: siteUrl.value,
  };
  booksContainer.splice(globalIndex, 1, book);
  setLocal();
  displayBook();
  resetForm();
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
}

updateBtn.addEventListener("click", updateBook);

// ==== Search Book ====

function searchData() {
  displayBook();
}

searchBook.addEventListener("input", searchData);

function validateName() {
  if (siteName.value == "") {
    alertName.classList.remove("d-none");
    return false;
  } else {
    alertName.classList.add("d-none");
    return true;
  }
}

// ==== Validate URL ====

function validateUrl() {
  if (siteUrl.value == "") {
    alertUrl.classList.remove("d-none");
    return false;
  } else {
    var isExite = false;
    for (var i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].url == siteUrl.value) {
        isExite = true;
        break;
      }
    }
    if (isExite == true) {
      alertExite.classList.remove("d-none");
      return false;
    } else {
      alertExite.classList.add("d-none");
    }
    alertExite.classList.add("d-none");
    return true;
  }
}
