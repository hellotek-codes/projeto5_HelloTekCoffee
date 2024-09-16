import { categories } from "./dataBase/categoriesDatabase.js";
import { coldBeverages } from "./dataBase/coldBeveragesDataBase.js";
import { hotBeverages } from "./dataBase/hotDrinks.js";
import { food } from "./dataBase/foodDataBase.js";
import { merchandise } from "./dataBase/merchandiseDataBase.js";

const searchButton = document.querySelector("#search_button");
const categoryList = document.querySelector(".category_list");
const selectedCategoryItems = document.querySelector(".category_items");
const orderItemsList = document.querySelector("#order_items_list");

let shoppingCartArray = [];
let newList = [];

let count = 0;
let deliveryPrice = 10;
let countTotal = count + deliveryPrice;
let deliveryCost = document.querySelector("#delivery_cost");

function findItem(searchTerm) {
  const databases = [coldBeverages, hotBeverages, food, merchandise];
  const results = [];

  for (let database of databases) {
    for (let item of database) {
      if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(item);
      }
    }
  }
  selectedCategoryItems.innerHTML = "";
  createSelectedCategoryItemCard(results);
}

function searchItem() {
  const searchInput = document.querySelector("#search_input");

  let userSearchInput = searchInput.value;
  findItem(userSearchInput);
  searchInput.value = "";
}

searchButton.addEventListener("click", searchItem);

function createCategoryCard(categoriesListDb) {
  categoriesListDb.forEach((category) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    const image = document.createElement("img");

    image.src = category.img;

    button.appendChild(image);
    // button.classList.remove("selectedCategory");
   
    button.addEventListener("click", () => {
      document.querySelectorAll(".selectedCategory").forEach((btn) => {
        btn.classList.remove("selectedCategory");
      });

      button.classList.add("selectedCategory");  

      displayCategoryItems(category);
    });


    listItem.appendChild(button);
    listItem.setAttribute("title", category.name);

    categoryList.appendChild(listItem);

  });

}

function displayCategoryItems(category) {
  selectedCategoryItems.innerHTML = "";
  
  switch (category.id) {
    case 1:
      createSelectedCategoryItemCard(hotBeverages);
      break;
    case 2:
      createSelectedCategoryItemCard(coldBeverages);
      break;
    case 3:
      createSelectedCategoryItemCard(food);
      break;
    case 4:
      createSelectedCategoryItemCard(merchandise);
      break;
  }
}

function handleClick(event) {
  const clickedItem = event.target.closest("li");

  const id = Number(clickedItem.id);
  const title = clickedItem.querySelector("h3");
  const image = clickedItem.querySelector("img");
  const category = [...clickedItem.querySelectorAll("p")].map(
    (p) => p.textContent
  );
  const quantity = 0;

  const selectedItem = {
    id: id,
    title: title.innerText,
    image: image.src,
    category: category[0],
    price: category[1],
    quantity: quantity,
  };

  shoppingCartArray.unshift(selectedItem);
  createShoppingCartList(shoppingCartArray);

  return selectedItem;
}

function createSelectedCategoryItemCard(selectedCategoryDb) {
  selectedCategoryItems.removeEventListener("click", handleClick);

  selectedCategoryDb.forEach((list_item) => {
    const listItem = document.createElement("li");
    const image = document.createElement("img");
    const name = document.createElement("h3");
    const category = document.createElement("p");
    const price = document.createElement("p");

    listItem.id = list_item.id;
    image.src = list_item.img;
    name.textContent = list_item.name;
    category.textContent = list_item.category;
    price.innerText = `R$ ${list_item.price.toLocaleString("pt-BR", {
      styles: "currency",
      currency: "BRD",
      minimumFractionDigits: 2,
    })}`;

    listItem.append(image, name, category, price);
    selectedCategoryItems.appendChild(listItem);
  });

  selectedCategoryItems.addEventListener("click", handleClick);
}

deliveryCost.innerText = `R$ ${deliveryPrice.toLocaleString("pt-BR", {
  styles: "currency",
  currency: "BRD",
  minimumFractionDigits: 2,
})}`;

let subTotal = document.querySelector("#sub_total");
let total = document.querySelector("#total");

createCategoryCard(categories);
