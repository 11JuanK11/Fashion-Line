async function fetchProducts() {
    try {
        const response = await fetch('/products/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        populateTable(products);
        hideMessage();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function populateTable(products) {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.size}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            <td>
                <button class="btn btn-warning" style="background-color: #95BDFF; border: none;"
                    onclick="edit(${product.id})">Edit</button>
                <button class="btn btn-danger" style="background-color: #F7C8E0; border: none;"
                    onclick="delete(${product.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

}


function showMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.classList.remove('d-none');
}


function hideMessage() {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.add('d-none');
}


async function searchProducts() {
    const name = document.getElementById('nameSelect').value;
    const category = document.getElementById('categorySelect').value;
    

    if (name) {
        const response = await fetch(`/products/name/${name}`);
        if (response.ok) {
            const products = await response.json();
            if (products.length > 0) {
                populateTable(products);
                hideMessage();
            } else {
                populateTable([]);
                showMessage(`No products found with name: ${name}`);
            }
        } else {
            populateTable([]);
            showMessage(`Error fetching products by category.`);
        }
    } else if (category) {
        const response = await fetch(`/products/category/${category}`);
        if (response.ok) {
            const products = await response.json();
            if (products.length > 0) {
                populateTable(products);
                hideMessage();
            } else {
                populateTable([]);
                showMessage(`No products found with the category: ${category}`);
            }
        } else {
            populateTable([]);
            showMessage(`Error fetching products by category.`);
        }
    } else {
        fetchProducts();
        hideMessage();
    }
}


window.onload = fetchProducts;


document.getElementById('nameSelect').addEventListener('input', searchProducts);
document.getElementById('categorySelect').addEventListener('input', searchProducts);