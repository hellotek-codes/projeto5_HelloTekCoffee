import { categories } from "./dataBase/categoriesDatabase.js";
import { beverages } from "./dataBase/beveragesDataBase.js";
import { food } from "./dataBase/foodDataBase.js";
import { merchandise } from "./dataBase/merchandiseDataBase.js";

const categoryList = document.querySelector(".category_list");
const selectedCategoryItems = document.querySelector(".category_items");

function createCategoryCard(categories_list_db){
    categories_list_db.forEach((category) => {
        const listItem = document.createElement("li");
        const button = document.createElement("button");
        const image = document.createElement("img");

        image.src = category.img;

        button.appendChild(image);
        listItem.appendChild(button);

        categoryList.appendChild(listItem);
    })
};

createCategoryCard(categories);

function createSelectedCategoryItemCard(selected_category_db){
    selected_category_db.forEach((list_item) => {
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

// createSelectedCategoryItemCard(beverages);
// createSelectedCategoryItemCard(food);
createSelectedCategoryItemCard(merchandise);

