async function fetchProducts() {
    try {
        const response = await fetch('/products/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const products = await response.json();
        checkLowStock(products); 
        populateTable(products);
        hideMessage();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


function checkLowStock(products) {
    const lowStockProducts = products.filter(product => product.stock <= 5);
    if (lowStockProducts.length > 0) {
        const productDetails = lowStockProducts
            .map(product => `${product.name}: ${product.stock} available`)
            .join('<br>'); 

        Swal.fire({
            title: 'Low Stock Alert!',
            html: `<div style="text-align: center;">${productDetails}</div>`, 
            icon: 'warning',
            confirmButtonText: 'Ok',
        });
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
                <button class="btn btn-danger" style="background-color: #e44040; border: none;"
                    onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        
        if (product.stock <= 5) {
            row.classList.add('table-danger');
        }
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

// Función para eliminar un producto con confirmación
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
                console.error('Error deleting product:', error);
                Swal.fire('Error', error.message, 'error');
            });
        }
    });
}

// Función para editar un producto
function editProduct(id) {
    localStorage.setItem('productIdToEdit', id);
    window.location.href = 'http://localhost:8080/edit';
}

// Redirigir para añadir un producto
document.getElementById('addProduct').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'http://localhost:8080/add';
});

// Inicializar carga de productos
window.onload = fetchProducts;
