import totalAmount from './totalAmount';

export function updateTotalCount(cartTotal, currentProductCount){
    cartTotal += +currentProductCount;
    return cartTotal;
}
export function updateTotalCountOnChange(ids, items){
    let total = 0;
    ids.forEach(id => {
        total += items[id].count;
    });
    return total;
}
export function updateTotalAmountAndCount(modalClass, modalClasses, cart){
    let modalAmount = document.querySelector(`.${modalClass} .${modalClasses.totalAmount}`);
    let modalCount = document.querySelector(`.${modalClass} .${modalClasses.totalCount}`);
    modalAmount.innerHTML = `Общая стоимость: ${totalAmount(cart)}`;
    modalCount.innerHTML = `Общее кол-во: ${cart.total}`;
}