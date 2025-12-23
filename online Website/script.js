let selectedProduct = {};

function selectProduct(name, brand, price) {
    selectedProduct = { name, brand, price };
    console.log("Selected Product:", selectedProduct);
}

// Checkout Form
document.getElementById("checkoutForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
        product: selectedProduct,
        name: name.value,
        address: address.value,
        phone: phone.value,
        email: email.value,
        payment: payment.value,
        quantity: quantity.value
    };

    console.log("Checkout Data:", data);
    alert(`Thank you for Shopping, ${data.name}!`);
    this.reset();
});

// Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (message.value.length < 10) {
        alert("Message must be at least 10 characters");
        return;
    }

    console.log({
        name: cname.value,
        email: cemail.value,
        message: message.value
    });

    alert(`Thank you for contacting us, ${cname.value}!`);
    this.reset();
});
