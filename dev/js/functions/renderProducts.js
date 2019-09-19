import renderSingleProduct from './renderSingleProduct';
import totalAmount from './totalAmount';

export default function renderProducts(cart, modalClasses){
    let res = `
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
        `;
    cart.ids.map(id => {
        res += renderSingleProduct(cart.items[id], modalClasses.removeBtn);
    });
    res += '</tbody></table>';
    res += `<p class="${modalClasses.totalAmount}">Общая стоимость: ${totalAmount(cart)}</p>`;
    res += `<p class="${modalClasses.totalCount}">Общее кол-во: ${cart.total}</p>`;
    res += `<button class="${modalClasses.acceptBtn}">Оформить заказ</button>`;
    return res;
}