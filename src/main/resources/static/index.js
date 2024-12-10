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
                    onclick="editProduct(${product.id})">Edit</button>
                <button class="btn btn-danger" style="background-color: #F7C8E0; border: none;"
                    onclick="deleteProduct(${product.id})">Delete</button>
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

async function searchProductsByName() {
    const name = document.getElementById('nameSelect').value;

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
            showMessage(`Error fetching products by name.`);
        }
  
    } else {
        fetchProducts();
        hideMessage();
    }
}

async function searchProductsByCategory() {
    const category = document.getElementById('categorySelect').value;

    if (category) {
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

const nameSelect = document.getElementById('nameSelect');
const categorySelect = document.getElementById('categorySelect');

nameSelect.addEventListener('input', () => {
    categorySelect.value = '';
    searchProductsByName();
});

categorySelect.addEventListener('input', () => {
    nameSelect.value = '';
    searchProductsByCategory();
});


function deleteProduct(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to recover this product!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/products/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    fetchProducts();
                    Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                } else {
                    throw new Error('Error deleting product.');
                }
            })
            .catch(error => {
                console.error('Error deleting veterinary:', error);
                Swal.fire('Error', error.message, 'error');
            });
        }
    });
}

function editProduct(id) {
    localStorage.setItem('productIdToEdit', id);
    window.location.href = 'http://localhost:8080/edit';
}