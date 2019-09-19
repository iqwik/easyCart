import renderProducts from './renderProducts';

export default function renderModal(modalClasses, cart){
    let html = `
            <div class="${modalClasses.overlay}"></div>
            <div class="${modalClasses.popup}">
                <a href="#" class="${modalClasses.modalClose}">&times;</a>
                <div class="${modalClasses.modalContent}">
                    <div class="${modalClasses.modalHeader}">Ваша Корзина</div>
                    <div class="${modalClasses.modalBody}">${renderProducts(cart, modalClasses)}</div>
                </div>
            </a>
        `;
    return html;
}