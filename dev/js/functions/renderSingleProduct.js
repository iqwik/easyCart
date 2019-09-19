export default function renderSingleProduct(product, removeBtn){
    return `
             <tr>
                <td><img src="${product.image}" width="80" alt=""/></td>
                <td><h4>${product.name}</h4></td>
                <td><input type="number" value="${product.count}" max="10" min="1" data-prod="${product.id}" onkeypress="return false"/></td>
                <td><p>${product.price} руб.</p></td>
                <td><a href="#" class="${removeBtn}" data-id="${product.id}">удалить</a></td>
            </tr>
        `;
}