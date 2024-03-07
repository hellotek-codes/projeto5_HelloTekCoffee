import { categories } from "./dataBase/categoriesDatabase.js";
import { coldBeverages } from "./dataBase/coldBeveragesDataBase.js";
import { hotBeverages } from "./dataBase/hotBeveragesDataBase.js";
import { food } from "./dataBase/foodDataBase.js";
import { merchandise } from "./dataBase/merchandiseDataBase.js";

const categoryList = document.querySelector(".category_list");
const selectedCategoryItems = document.querySelector(".category_items");


function createCategoryCard(categoriesListDb){
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
    })
};

createCategoryCard(categories);

function displayCategoryItems(category) {
    selectedCategoryItems.innerHTML = "";

    switch(category.id) {
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
};


function createSelectedCategoryItemCard(selectedCategoryDb){
    selectedCategoryDb.forEach((list_item) => {
        const listItem = document.createElement("li");
        const image = document.createElement("img");
        const title = document.createElement("h3");
        const category = document.createElement("p");
        const price = document.createElement("p");

        image.src = list_item.img;
        title.textContent = list_item.name;
        category.textContent = list_item.category;
        price.innerText = `R$ ${list_item.price.toLocaleString('pt-BR', {
            styles: 'currency',
            currency: "BRD",
            minimumFractionDigits: 2
        })}`;

        listItem.append(image, title, category, price);

        selectedCategoryItems.appendChild(listItem);
    })
};

function orderType(){
    const orderTypeButton = document.querySelectorAll(".order_type_button");

    orderTypeButton.forEach(button => {
        button.addEventListener("click", () => {
            orderTypeButton.forEach(btn => {
                btn.parentNode.classList.remove('selected');
            });
            button.parentNode.classList.add('selected');
        })
    })
};

orderType();
createSelectedCategoryItemCard(hotBeverages);