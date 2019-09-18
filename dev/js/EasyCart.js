export default class EasyCart {
    constructor(source, productWrap = 'product__wrap', addToCartBtn = 'addtocart', wrapperCartID = 'counterCart', modalClass = 'modal', modalClasses = {}) {
        this.source = source;
        this.productWrap = productWrap;
        this.addToCartBtn = addToCartBtn;
        this.wrapperCartID = wrapperCartID;
        this.modalClass = modalClass;
        this.modalClasses = {
            overlay: 'modal--overlay',
            popup: 'modal--popup',
            modalClose: 'modal--close',
            modalContent: 'modal--content',
            modalHeader: 'modal-header',
            modalBody: 'modal-body',
            removeBtn: 'remove--product',
            acceptBtn: 'accept__order',
            totalAmount: 'total--amount',
            totalCount: 'total--count'
        }
        this.cart = {};
        this.dataAttributesNames = [];
        this.currentProduct = {};
        this._build();
    }
    _build(){
        // localStorage.clear();
        this._setCart();
        this._handleClickAddToCart();
        this._renderCartCounter();
        this._handleClickCartCounter();
    }
    _setCart(){
        if (typeof localStorage.cart !== 'undefined') {
            this.cart = JSON.parse(localStorage.cart);
        } else {
            this.cart['total'] = 0;
            this.cart['items'] = {};
            this.cart['ids'] = [];
        }
    }
    _renderCartCounter(){
        let wrapperCart = document.getElementById(this.wrapperCartID);
        wrapperCart.innerHTML = this.cart.total;
    }
    _handleClickAddToCart(){
        let allBtnsAddToCart = document.querySelectorAll(`.${this.addToCartBtn}`);
        allBtnsAddToCart.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                let parentElem = this._getParentElement(e.target, this.productWrap);
                if(typeof parentElem !== 'undefined') {
                    this._getDataAttributes(parentElem);
                    this._updateCart();
                }
            });
        });
    }
    _getParentElement(targetElem, parentSelector) {
        let parents = document.querySelectorAll(`.${parentSelector}`);
        for (let i = 0; i < parents.length; i++) {
            let parent = parents[i];
            if (parent.contains(targetElem)) {
                return parent;
            }
        }
        return 'undefined';
    }
    _getDataAttributes(parentElement){
        this._getDataAttributesNames(parentElement);
        this._getDataAttributesValues(parentElement);
    }
    _getDataAttributesNames(parentElement){
        if(typeof parentElement.dataset.id !== 'undefined'){
            if(this.dataAttributesNames.indexOf('id') === -1){
                this.dataAttributesNames.push('id');
            }
        }
        let childs = parentElement.childNodes;
        childs.forEach(elem => {
            if(elem.childNodes.length > 0){
                this._getDataAttributesNames(elem);
            }
            for (let prop in elem.dataset) {
                if(this.dataAttributesNames.indexOf(prop) === -1){
                    this.dataAttributesNames.push(prop);
                }
            }
        });
    }
    _getDataAttributesValues(parentElem, dataAttribute){
        this.dataAttributesNames.map(dataAttribute => {
            if(dataAttribute === 'id'){
                this.currentProduct['id'] = +parentElem.dataset[dataAttribute];
            } else {
                let item = parentElem.querySelector(`[data-${dataAttribute}]`);
                if (dataAttribute === 'count'){
                    this.currentProduct['count'] = item.dataset[dataAttribute] !== false ? +item.value : 1;
                } else {
                    this.currentProduct[dataAttribute] = item.dataset[dataAttribute];
                }
            }
        });
    }
    _updateCart(){
        let cart = this.cart;
        let currentProd = this.currentProduct;
        if(cart.ids.indexOf(currentProd.id) !== -1){
            cart.items[currentProd.id].count += currentProd.count;
        } else {
            this.cart.ids.push(currentProd.id);
            this.cart.items[currentProd.id] = currentProd;
        }
        this._updateTotalCount();
        this._updateStorage();
    }
    _updateStorage(){
        localStorage.cart = JSON.stringify(this.cart);
        this.currentProduct = {};
        this._renderCartCounter();
    }
    _updateTotalCount(){
        this.cart.total += +this.currentProduct.count;
    }
    _updateTotalCountWhenRemove(){
        let total = 0;
        this.cart.ids.forEach(id => {
            total += this.cart.items[id].count;
        });
        this.cart.total = total;
    }
    _handleClickCartCounter(){
        const wrapperCart = document.getElementById(this.wrapperCartID);
        wrapperCart.addEventListener('click', (e) => {
            let modal = document.querySelector(`.${this.modalClass}`);
            let html = this._renderModalContent();
            modal.innerHTML = html;
            modal.style.display = 'block';
            this._handleClickCloseModal();
            this._handleOnchangeCount();
            this._handleClickRemoveProduct();
            this._handleClickOnAcceptOrder();
        });
    }
    _renderModalContent(){
        let html = `
            <div class="${this.modalClasses.overlay}"></div>
            <div class="${this.modalClasses.popup}">
                <a href="#" class="${this.modalClasses.modalClose}">&times;</a>
                <div class="${this.modalClasses.modalContent}">
                    <div class="${this.modalClasses.modalHeader}">Ваша Корзина</div>
                    <div class="${this.modalClasses.modalBody}">${this._renderProducts()}</div>
                </div>
            </a>
        `;
        return html;
    }
    _handleClickCloseModal() {
        let closeBtn = document.querySelector(`.${this.modalClasses.modalClose}`);
        if(closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let modal = document.querySelector(`.${this.modalClass}`);
                modal.style.display = 'none';
                modal.innerHTML = '';
            });
        }
    }
    _handleOnchangeCount(){
        let inputCount = document.querySelectorAll(`.${this.modalClass} input[type="number"]`);
        inputCount.forEach(input => {
            input.addEventListener('input', (e) => {
                let id = +e.target.dataset.prod;
                this.cart.items[id].count = +e.target.value;
                this._updateTotalCountWhenRemove();
                this._updateStorage();
                this._updateTotalAmountAndCount();
            })
        });
    }
    _handleClickRemoveProduct(){
        let removeBtn = document.querySelectorAll(`.${this.modalClass} .${this.modalClasses.removeBtn}`);
        removeBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                let id = +e.target.dataset.id;
                this.cart.ids.splice(this.cart.ids.indexOf(id),1);
                delete this.cart.items[id];
                this._updateTotalCountWhenRemove();
                this._updateStorage();
                this._removeTR(e.target.parentElement);
                this._updateTotalAmountAndCount();
            });
        });
    }
    _handleClickOnAcceptOrder(){
        let btn = document.querySelector(`.${this.modalClass} .${this.modalClasses.acceptBtn}`);
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if(typeof this.source !== 'undefined'){
                fetch(this.source, {
                    method: "POST",
                    body: JSON.stringify(this.cart.items),
                    headers: {"Content-type":"application/json"}
                })
                    .then(response => {
                        if (response.status !== 200) {
                            return Promise.reject();
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                    });
            } else {
                console.log(this.cart.items);
            }
        });
    }
    _removeTR(item){
        item.parentElement.remove();
    }
    _renderProducts(){
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
        this.cart.ids.map(id => {
            res += this._renderSingleProduct(this.cart.items[id]);
        });
        res += '</tbody></table>';
        res += `<p class="${this.modalClasses.totalAmount}">Общая стоимость: ${this._totalAmount()}</p>`;
        res += `<p class="${this.modalClasses.totalCount}">Общее кол-во: ${this.cart.total}</p>`;
        res += `<button class="${this.modalClasses.acceptBtn}">Оформить заказ</button>`;
        return res;
    }
    _renderSingleProduct(product){
        return `
             <tr>
                <td><img src="${product.image}" width="80" alt=""/></td>
                <td><h4>${product.name}</h4></td>
                <td><input type="number" value="${product.count}" max="10" min="1" data-prod="${product.id}" onkeypress="return false"/></td>
                <td><p>${product.price} руб.</p></td>
                <td><a href="#" class="${this.modalClasses.removeBtn}" data-id="${product.id}">удалить</a></td>
            </tr>
        `;
    }
    _totalAmount(){
        let price = 0;
        this.cart.ids.forEach(id => {
            price += (+this.cart.items[id].price * this.cart.items[id].count);
        });
        return price;
    }
    _updateTotalAmountAndCount(){
        let modalAmount = document.querySelector(`.${this.modalClass} .${this.modalClasses.totalAmount}`);
        let modalCount = document.querySelector(`.${this.modalClass} .${this.modalClasses.totalCount}`);
        modalAmount.innerHTML = `Общая стоимость: ${this._totalAmount()}`;
        modalCount.innerHTML = `Общее кол-во: ${this.cart.total}`;
    }
}