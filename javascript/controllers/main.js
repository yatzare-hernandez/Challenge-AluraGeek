const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]")

function createCard (name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card")

    card.innerHTML = ` 
<div class="img-container">
    <img src="${image}" alt="${name}">
</div>

<div class="card-container--info">
   <p>${name}</p>
   <div class="card-container--value">
       <p>$ ${price}</p>
       <button class="delete-button" data-id="${id}">
              <img src="assets/trash icon.png" alt="Eliminar";>
       </button>
   </div>
</div>
`;

const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => deleteProduct(id));
    
    return card;
}

async function deleteProduct(id) {
    try {
        await servicesProducts.deleteProduct(id);
        render(); 
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

const render = async () => {
    try {
        productContainer.innerHTML = ''; 
        const listProducts = await servicesProducts.productList();
        console.log("Productos obtenidos:", listProducts);
        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            );
        });
} catch (error) {
    console.error("Error al renderizar productos:", error);
}
};


form.addEventListener("submit", async (event) =>  {
      event.preventDefault();
      const name = document.querySelector("[data-name]").value;
      const price = document.querySelector("[data-price]").value;
      const image = document.querySelector("[data-image]").value;

try {
await servicesProducts.createProducts(name, price, image);
render();
form.reset();
} catch (error) {
    console.error("Error al crear el producto:", error);
}
});

document.addEventListener('DOMContentLoaded', render);