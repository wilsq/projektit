let buttonid = document.getElementById("buttonid");
let buttonClear = document.getElementById("buttonclear");
let shoppingForm = document.getElementById("shoppingForm");
let feedback = document.getElementById("feedback");
let itemCount = document.getElementById("itemCount");
let shoppingList = document.querySelector(".shoppingList");
let buttonClearChecked = document.getElementById("buttonclearchecked");

// ADD BUTTON FUNCTIONALITY
shoppingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  let productName = document.querySelector(".selector").value;
  let productCategory = document.getElementById("categorySelect").value;

  // ERROR MESSAGE
  if (productName === "" || productCategory === "") {
    document.getElementById("feedback").innerHTML = " *Fill both sections";
    document.querySelector(".selector").style.borderColor = "red";
    return;
  }
  // CREATE-LIST ELEMENT
  let list = document.createElement("li");

  // CREATE CHECKBOX ELEMENT
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // CREATE CHECKBOX FUNCTIONALITY
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      list.classList.add("checked");
    } else {
      list.classList.remove("checked");
    }
  });

  // CREATE SPAN FOR PRODUCT TEXT
  let productNameSpan = document.createElement("span");
  productNameSpan.textContent = `${productName}`;

  list.setAttribute("data-category", productCategory);

  // CHECKBOX UPDATE
  checkbox.addEventListener("change", updateCounter);

  // ADD CHECKBOX + PRODUCT TO THE HTML, ALSO REMOVE ERROR MESSAGES
  list.appendChild(checkbox);
  list.appendChild(productNameSpan);
  shoppingList.appendChild(list);
  feedback.innerHTML = "";
  document.querySelector(".selector").style.borderColor = "";

  // EMPTY FIELDS
  document.querySelector(".selector").value = "";
  updateCounter();

  saveLocalStorage();
});

// ITEM COUNTER FUNCTIONALITY
function updateCounter() {
  let uncheckedItems = document.querySelectorAll(
    ".shoppingList li input:not(:checked)"
  ).length;
  itemCount.textContent = uncheckedItems;
}

// CLEAR ALL BUTTON FUNCTIONALITY
buttonClear.addEventListener("click", function () {
  document.querySelector(".shoppingList").innerHTML = "";

  // CLEAR LOCALSTORAGE
  localStorage.removeItem("shoppingList");

  updateCounter();
});

// CLEAR CHECKED BUTTON FUNCTIONALITY
buttonClearChecked.addEventListener("click", function () {
  let checkedItems = document.querySelectorAll(
    ".shoppingList li input:checked"
  );

  checkedItems.forEach(function (checkbox) {
    let listItem = checkbox.closest("li");
    listItem.remove();
  });

  updateCounter();

  saveLocalStorage();
});

// SAVE TO LOCAL STORAGE
function saveLocalStorage() {
  let items = [];
  document.querySelectorAll(".shoppingList li").forEach((item) => {
    let text = item.querySelector("span").textContent;
    let category = item.getAttribute("data-category");
    items.push({ text, category });
  });
  localStorage.setItem("shoppingList", JSON.stringify(items));
}
