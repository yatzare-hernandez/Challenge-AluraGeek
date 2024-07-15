const productList = () => {
    return fetch ("http://localhost:3000/products")
           .then((res) => res.json ())
           .catch((err) => console.log (err));  
};

const createProducts = (name, price, image) => {
   return  fetch ("http://localhost:3000/products", {
    method: "Post",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        name,
        price,
        image,
    }) 

   }).then((res) => res.json()).catch((err) => console.log(err))
}

const deleteProduct = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    }).then((res) => res.json()).catch((err) => console.log(err));
};

window.servicesProducts = {
    productList,
    createProducts,
    deleteProduct,
};

