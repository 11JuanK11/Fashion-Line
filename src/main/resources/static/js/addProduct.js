document.getElementById('addNewProduct').addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm()) {
        addProduct();
    }
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


function addProduct() {
    const newProduct = {
        name: document.getElementById('productName').value.trim(),
        size: document.getElementById('productSize').value.trim(),
        price: parseInt(document.getElementById('productPrice').value.trim()),
        stock: parseInt(document.getElementById('productStock').value.trim()),
        category: document.getElementById('productCategory').value.trim(),
        description: document.getElementById('productDescription').value.trim()
    };

    fetch('/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (!response.ok) return response.json().then(error => { throw error; });
        Swal.fire({
            title: 'Success!',
            text: 'Product add successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = 'http://localhost:8080/';
        });
    })
    .catch(error => {
        Swal.fire({
            title: 'Error!',
            text: 'There was an error add the product.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error('Error add product:', error);
    });
}
