import { categories } from "./dataBase/categoriesDatabase.js";
import { coldBeverages } from "./dataBase/coldBeveragesDataBase.js";
import { hotBeverages } from "./dataBase/hotBeveragesDataBase.js";
import { food } from "./dataBase/foodDataBase.js";
import { merchandise } from "./dataBase/merchandiseDataBase.js";

const categoryList = document.querySelector(".category_list");
const selectedCategoryItems = document.querySelector(".category_items");
const orderItemsList = document.querySelector("#order_items_list");
let shoppingCartArray = [];
let newList = [];

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

function orderType() {
  const orderTypeButton = document.querySelectorAll(".order_type_button");

  orderTypeButton.forEach((button) => {
    button.addEventListener("click", () => {
      orderTypeButton.forEach((btn) => {
        btn.parentNode.classList.remove("selected");
      });
      button.parentNode.classList.add("selected");
    });
  });
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

  orderItemsList.innerHTML = "";
  createCardforTheShoppingCartItem(newList);
}

function deleteItem(list, product) {
  console.log(product);
  const productId = Number(product.id);
  const items = {};

  newList.forEach((item) => {
    const itemKey = item.id + "-" + item.category;
    const productKey = product.id + "-" + product.category;

    if (itemKey !== productKey) {
      items[itemKey] = { ...item };
    }
  });

  newList = Object.values(items);
  shoppingCartArray = newList;

  console.log(shoppingCartArray);
  console.log(newList);
  orderItemsList.innerHTML = "";
  createShoppingCartList(newList);
}

createCategoryCard(categories);
orderType();
createSelectedCategoryItemCard(hotBeverages);
