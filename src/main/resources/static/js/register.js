function togglePasswordVisibility() {
    const passwordInput = document.getElementById("floatingPassword");
    const passwordIcon = document.getElementById("togglePasswordIcon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordIcon.classList.remove("fa-eye");
        passwordIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        passwordIcon.classList.remove("fa-eye-slash");
        passwordIcon.classList.add("fa-eye");
    }
}

function validateField(value, errorElementId, errorMessage) {
    const errorElement = document.getElementById(errorElementId);
    if (!value) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add("text-danger-element");
        errorElement.style.display = "block";
        return false;
    } else {
        errorElement.style.display = "none";
        return true;
    }
}

document.getElementById('clientForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('floatingName').value.trim();
    const username = document.getElementById('floatingUsername').value.trim();
    const password = document.getElementById('floatingPassword').value.trim();

    let isValid = true;
    isValid &= validateField(name, "nameError", "Name is required");
    isValid &= validateField(username, "usernameError", "Username is required");

    if (!isValid) {
        return;
    }

    const formData = {
        name,
        username,
        password
    };

    try {
        const response = await fetch('http://localhost:8080/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.status === 500) {
            throw new Error('Existing user');
        }
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Success:', data);
        Swal.fire('Success', 'Created user.', 'success');

        await sleep(2000);
        window.location.href = "http://localhost:8080/public/login";

    } catch (error) {
        if (error.message === 'Existing user') {
            Swal.fire('Error', 'Existing user.', 'error');
        } else {
            console.error('Error submitting the form:', error);
        }
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
