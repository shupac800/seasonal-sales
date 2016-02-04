var categories = [];
var products = [];
var c;
var p;

var Seasonal = (function() {
  // var carnivores = [];  // private
  // var herbivores = [];  // private

  return {  // public functions
    loadCategories: function(callbackToInvoke) {
      var loader = new XMLHttpRequest();
      loader.addEventListener("load", function() {
        c = JSON.parse(loader.responseText);
        callbackToInvoke();
      });
      loader.open("GET", "categories.json");
      loader.send();
    },

    loadProducts: function(callbackToInvoke) {
      var loader = new XMLHttpRequest();
      loader.addEventListener("load", function() {
        p = JSON.parse(loader.responseText);
        callbackToInvoke();
      });
      loader.open("GET", "products.json");
      loader.send();
    }
  };
})();

function showCategories() {
  c.categories.forEach(function (x) {
    console.log(x);
  });
}

function showProducts() {
  p.products.forEach(function (x) {
    console.log(x);
  });
}

Seasonal.loadCategories(showCategories);
Seasonal.loadProducts(showProducts);


function main() {
  console.log("invoked main");
  console.log(categories); // how can we make sure program doesn't progress until variables are loaded?
}

// <table class="table table-striped">
//   ...
// </table>