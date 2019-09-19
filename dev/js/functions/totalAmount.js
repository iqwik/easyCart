export default function totalAmount(cart){
    let price = 0;
    cart.ids.forEach(id => {
        price += (+cart.items[id].price * cart.items[id].count);
    });
    return price;
}