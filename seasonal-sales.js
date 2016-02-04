var cObj;
var pObj;

loadCategories();  // start chain of callbacks

function loadCategories() { // first function in chain
  var loader = new XMLHttpRequest();
  loader.addEventListener("load", function() {
    cArr = JSON.parse(loader.responseText).categories; // array corresp to key "categories"
    loadProducts();  // first callback
  });
  loader.open("GET", "categories.json");
  loader.send();
}

function loadProducts() { // second function in chain
  var loader = new XMLHttpRequest();
  loader.addEventListener("load", function() {
    pArr = JSON.parse(loader.responseText).products; // array corresp to key "products"
    main();         // second callback
  });
  loader.open("GET", "products.json");
  loader.send();
}

function main() {
  var dropdownRef = document.getElementById('seasonDropdown');
  var currSeason = "";
  updateDisplay(currSeason);

  dropdownRef.addEventListener("change",function(event) {
    currSeason = event.target.value;
    updateDisplay(currSeason);
  });
}

function updateDisplay(currSeason) {
  var outputRef = document.getElementById('outputField');
  var outputStr = "";

  outputStr += "<table class='table table-striped'>";
  outputStr += "<tr><th>ProdID</th><th>Name</th><th>Price</th><th>Category</th></tr>";
  for (var i = 0; i < pArr.length; i++) {
    outputStr += `<tr><td>${pArr[i].id}</td><td>${pArr[i].name}</td>`;
    if (currSeason == cArr[pArr[i].category_id - 1].season_discount) {
      outputStr += `<td class='price discounted'>${(pArr[i].price * (1 - (cArr[pArr[i].category_id - 1].discount))).toFixed(2)}`;
    } else {
      outputStr += `<td class='price'>${pArr[i].price}</td>`;
    }
    outputStr += `<td>${cArr[pArr[i].category_id - 1].name}</td></tr>`;
  }
  outputStr += "</table>";

  outputField.innerHTML = outputStr;
}