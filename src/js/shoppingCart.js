import { hotBeverages } from "./dataBase/hotDrinks.js";

const selectedCategoryItems = document.querySelector(".category_items");
const orderItemsList = document.querySelector("#order_items_list");

let shoppingCartArray = [];
let newList = [];

const orderID = document.querySelector("#order_id");
let randomID = generateRandomID(4);
orderID.innerText = `#${randomID}`;

let isDelivery = 1;
let count = 0;
let deliveryPrice = 10;
let countTotal = count + deliveryPrice;
let deliveryCost = document.querySelector("#delivery_cost");

function currencySet(fieldTo, fieldFrom) {
  fieldTo.innerText = `R$ ${fieldFrom.toLocaleString("pt-BR", {
    styles: "currency",
    currency: "BRD",
    minimumFractionDigits: 2,
  })}`;
}

currencySet(deliveryCost, deliveryPrice);
// deliveryCost.innerText = `R$ ${deliveryPrice.toLocaleString("pt-BR", {
//   styles: "currency",
//   currency: "BRD",
//   minimumFractionDigits: 2,
// })}`;

let subTotal = document.querySelector("#sub_total");
let total = document.querySelector("#total");
const submitButton = document.querySelector("#submit_order");

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

    currencySet(price, list_item.price);
    // price.innerText = `R$ ${list_item.price.toLocaleString("pt-BR", {
    //   styles: "currency",
    //   currency: "BRD",
    //   minimumFractionDigits: 2,
    // })}`;

    listItem.append(image, name, category, price);
    selectedCategoryItems.appendChild(listItem);
  });

  selectedCategoryItems.addEventListener("click", handleClick);
}

function generateRandomID(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function orderType() {
  const orderTypeButton = document.querySelectorAll(".order_type_button");
  orderTypeButton.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.innerText !== "Entrega") {
        isDelivery = 0;
        deliveryPrice = 0;
        deliveryCost.innerText = "";
        countTotal = count - deliveryPrice;
        currencySet(total, countTotal);

        // total.innerText = `R$ ${countTotal.toLocaleString("pt-BR", {
        //   styles: "currency",
        //   currency: "BRD",
        //   minimumFractionDigits: 2,
        // })}`;
      } else {
        isDelivery = 1;
        deliveryPrice = 10;


        currencySet(deliveryCost, deliveryPrice);
        // deliveryCost.innerText = `R$ ${deliveryPrice.toLocaleString("pt-BR", {
        //   styles: "currency",
        //   currency: "BRD",
        //   minimumFractionDigits: 2,
        // })}`;

        countTotal = count + deliveryPrice;

        currencySet(total, countTotal)
        // total.innerText = `R$ ${countTotal.toLocaleString("pt-BR", {
        //   styles: "currency",
        //   currency: "BRD",
        //   minimumFractionDigits: 2,
        // })}`;
      }

      orderTypeButton.forEach((btn) => {
        btn.parentNode.classList.remove("selected");
      });
      button.parentNode.classList.add("selected");
    });
  });

  return isDelivery;
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

    itemDeleteButton.setAttribute("title", "Remover");
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

    let addValue = parseFloat(price.match(/\d+(,\d+)?/)[0].replace(",", "."));
    count += addValue * product.quantity;
  });

  currencySet(subTotal, count);
  // subTotal.innerText = `R$ ${count.toLocaleString("pt-BR", {
  //   styles: "currency",
  //   currency: "BRD",
  //   minimumFractionDigits: 2,
  // })}`;

  countTotal = count + deliveryPrice;
  currencySet(total, countTotal)
  // total.innerText = `R$ ${countTotal.toLocaleString("pt-BR", {
  //   styles: "currency",
  //   currency: "BRD",
  //   minimumFractionDigits: 2,
  // })}`;

  orderItemsList.innerHTML = "";
  createCardforTheShoppingCartItem(newList);

  return newList;
}

function deleteItem(list, product) {
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

  let count = 0;
  newList.forEach((product) => {
    let price = product.price;

    let addValue = parseFloat(price.match(/\d+(,\d+)?/)[0].replace(",", "."));
    count -= addValue * product.quantity;
  });

  currencySet(subTotal, count);
  // subTotal.innerText = `R$ ${count.toLocaleString("pt-BR", {
  //   styles: "currency",
  //   currency: "BRD",
  //   minimumFractionDigits: 2,
  // })}`;

  orderItemsList.innerHTML = "";
  createShoppingCartList(newList);
}

function submitOrder(orderId, totalOrderAmmount) {
  const confirmedOrderList = document.querySelector(
    "#confirmed_orders_container"
  );

  submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    let isDelivery = orderType();

    if (newList.length === 0) {
      alert("Por favor adicione um item para submeter sua ordem!");
    } else {
      if (isDelivery === 1) {
        const confirmedOrderContainer = document.createElement("li");
        const confirmedOrderId = document.createElement("p");
        const address = document.createElement("p");
        address.classList.add("address");
        const total = document.createElement("p");

        confirmedOrderId.innerText = `Pedido ID: ${orderId.innerText}`;

        address.innerText = `End: Av. Paulista, 1234, Curitiba`;
        total.innerText = `${totalOrderAmmount.innerText}`;

        confirmedOrderContainer.append(confirmedOrderId, address, total);
        confirmedOrderList.appendChild(confirmedOrderContainer);
      }

      orderItemsList.innerHTML = "";
      shoppingCartArray = [];
      newList = [];
      subTotal.innerText = "";
      total.innerText = "";
      count = 0;

      let newOrderID = generateRandomID(4);
      orderID.innerText = `#${newOrderID}`;
    }
  });
}

submitOrder(orderID, total);
orderType();
createSelectedCategoryItemCard(hotBeverages);
