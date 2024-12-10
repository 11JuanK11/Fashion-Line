document.addEventListener('DOMContentLoaded', () => {
    let productId = localStorage.getItem('productIdToEdit');
    productId = 1733856492347
    if (productId) {
        loadProductData(productId);
    }

    document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            updateProduct(productId);
        }
    });
});

function validateForm() {
    const productName = document.getElementById('productName').value.trim();
    const productSize = document.getElementById('productSize').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productStock = document.getElementById('productStock').value.trim();
    const productCategory = document.getElementById('productCategory').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();

    if (!productName || !productSize || !productPrice || !productStock || !productCategory || !productDescription) {
        Swal.fire({
            title: 'Warning!',
            text: 'All fields are required!',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return false;
    }

    return true;
}

function loadProductData(id) {
    fetch(`/products/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Error loading product data');
            return response.json();
        })
        .then(product => {
            console.log(product)
            document.getElementById('productName').value = product.name;
            document.getElementById('productSize').value = product.size;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productStock').value = product.stock;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productDescription').value = product.description;
        })
        .catch(error => console.error('Error loading product data:', error));
}

function updateProduct(id) {
    const updatedProduct = {
        name: document.getElementById('productName').value.trim(),
        size: document.getElementById('productSize').value.trim(),
        price: parseFloat(document.getElementById('productPrice').value.trim()),
        stock: parseInt(document.getElementById('productStock').value.trim(), 10),
        category: document.getElementById('productCategory').value.trim(),
        description: document.getElementById('productDescription').value.trim()
    };

    fetch(`/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
        .then(response => {
            if (!response.ok) return response.json().then(error => { throw error; });
            Swal.fire({
                title: 'Success!',
                text: 'Product updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                localStorage.removeItem('productIdToEdit');
                window.location.href = 'http://localhost:8080/';
            });
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                text: 'There was an error updating the product.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error updating product:', error);
        });
}
