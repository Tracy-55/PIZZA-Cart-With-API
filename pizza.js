document.addEventListener("alpine:init", () => {
    Alpine.data('pizzaCart', () => {
        return {
            title: 'Pizza Cart API',
            pizzas: [],
            cart: [],
            fetchPizzas() {
                axios.get('https://pizza-api.projectcodex.net/api/pizzas')
                    .then(result => {
                        this.pizzas = result.data.pizzas;
                    })
                    .catch(error => {
                        console.error('Error fetching pizzas:', error);
                    });
            },
            addToCart(pizza) {
                const item = this.cart.find(c => c.id === pizza.id);
                if (item) {
                    item.quantity += 1;
                    item.total = item.quantity * item.price;
                } else {
                    this.cart.push({
                        id: pizza.id,
                        flavour: pizza.flavour,
                        size: pizza.size,
                        price: pizza.price,
                        quantity: 1,
                        total: pizza.price
                    });
                }
            },
            removeFromCart(index) {
                this.cart.splice(index, 1);
            },
            getTotal() {
                return this.cart.reduce((sum, item) => sum + item.total, 0).toFixed(2);
            },
            checkout() {
                if (this.cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                alert('Proceeding to checkout!');
            },
            payNow() {
                if (this.cart.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                alert('Payment successful! Thank you for your purchase.');
                this.cart = [];
            }
        }
    });
});
