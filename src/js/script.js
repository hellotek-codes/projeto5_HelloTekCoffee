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
deliveryCost.innerText = `R$ ${deliveryPrice.toLocaleString("pt-BR", {
  styles: "currency",
  currency: "BRD",
  minimumFractionDigits: 2,
})}`;

let subTotal = document.querySelector("#sub_total");
let total = document.querySelector("#total");

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
    button.addEventListener("click", () => {
      displayCategoryItems(category);
    });

    listItem.appendChild(button);

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

function createCardforTheShoppingCartItem(itemsList) {
  itemsList.forEach((item) => {
    const orderItem = document.createElement("li");
    const image = document.createElement("img");
    const itemDetailsContainer = document.createElement("div");
    const itemName = document.createElement("h3");
    const itemCategory = document.createElement("p");
    const itemQuantity = document.createElement("p");
    const deleteIcon = document.createElement("i");
    const itemDeleteButton = document.createElement("button");

    orderItem.classList.add("order_item");
    orderItem.id = item.id;
    image.src = item.image;
    itemDetailsContainer.classList.add("item_description");
    itemName.innerText = item.title;
    itemCategory.innerText = item.category;
    itemQuantity.innerText = `Quantidade: ${item.quantity}`;
    deleteIcon.classList.add("fa", "fa-regular", "fa-trash-can", "fa-lg");

    itemDeleteButton.appendChild(deleteIcon);

    itemDeleteButton.addEventListener("click", (event) => {
      const item = {
        id: orderItem.id,
        category: itemCategory.innerText,
      };

      deleteItem(newList, item);
    });

    itemDetailsContainer.append(itemName, itemCategory, itemQuantity);
    orderItem.append(image, itemDetailsContainer, itemDeleteButton);

    orderItemsList.appendChild(orderItem);
  });
}

function createShoppingCartList(shoppingList) {
  const items = {};

  shoppingList.forEach((item) => {
    const key = item.id + "-" + item.category;

    if (items[key]) {
      items[key].quantity++;
    } else {
      items[key] = { ...item, quantity: 1 };
    }
  });

  newList = Object.values(items);

  count = 0;
  newList.forEach((product) => {
    let price = product.price;

    // Transformando o preço de string para número retirando o R$
    let addValue = parseFloat(price.match(/\d+(,\d+)?/)[0].replace(",", "."));
    count += addValue * product.quantity;
  });

  subTotal.innerText = `R$ ${count.toLocaleString("pt-BR", {
    styles: "currency",
    currency: "BRD",
    minimumFractionDigits: 2,
  })}`;

  countTotal = count + deliveryPrice;
  total.innerText = `R$ ${countTotal.toLocaleString("pt-BR", {
    styles: "currency",
    currency: "BRD",
    minimumFractionDigits: 2,
  })}`;

  orderItemsList.innerHTML = "";
  createCardforTheShoppingCartItem(newList);

  return newList;
}

createCategoryCard(categories);

