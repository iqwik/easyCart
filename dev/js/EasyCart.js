import getParentElement from './functions/getParentElement';
import renderModal from './functions/renderModal';
import {dataAttributesNames, dataAttributesValues} from './functions/dataAttributes';
import {updateTotalCount, updateTotalCountOnChange, updateTotalAmountAndCount} from './functions/updateCount';
import closeModal from './events/closeModal';

export default class EasyCart {
    constructor(source, 
                productWrap = 'product__wrap', 
                addToCartBtn = 'addtocart',
                wrapperCartID = 'counterCart',
                modalClass = 'modal',
                modalClasses = {
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
                }) {
        this.source = source;
        this.productWrap = productWrap;
        this.addToCartBtn = addToCartBtn;
        this.wrapperCartID = wrapperCartID;
        this.modalClass = modalClass;
        this.modalClasses = modalClasses;
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
        this._handleClickOnCart();
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
                let parentElem = getParentElement(e.target, this.productWrap);
                if(typeof parentElem !== 'undefined') {
                    this._getDataAttributes(parentElem);
                    this._updateCart();
                }
            });
        });
    }
    _handleClickOnCart(){
        const wrapperCart = document.getElementById(this.wrapperCartID);
        wrapperCart.addEventListener('click', () => {
            let modal = document.querySelector(`.${this.modalClass}`);
            modal.innerHTML = renderModal(this.modalClasses, this.cart);
            modal.style.display = 'block';
            this._handleClickCloseModal();
            this._handleOnchangeCount();
            this._handleClickRemoveProduct();
            this._handleClickOnAcceptOrder();
        });
    }
    _handleClickCloseModal() {
        let closeBtn = document.querySelector(`.${this.modalClasses.modalClose}`);
        if(closeBtn) {
            closeBtn.addEventListener('click', (e) => closeModal(e, this.modalClass));
        }
    }
    _handleOnchangeCount(){
        let inputCount = document.querySelectorAll(`.${this.modalClass} input[type="number"]`);
        inputCount.forEach(input => {
            input.addEventListener('input', (e) => {
                let id = +e.target.dataset.prod;
                this.cart.items[id].count = +e.target.value;
                this.cart.total = updateTotalCountOnChange(this.cart.ids, this.cart.items);
                this._updateStorage();
                updateTotalAmountAndCount(this.modalClass, this.modalClasses, this.cart);
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
                this.cart.total = updateTotalCountOnChange(this.cart.ids, this.cart.items);
                this._updateStorage();
                e.target.parentElement.parentElement.remove();
                updateTotalAmountAndCount(this.modalClass, this.modalClasses, this.cart);
            });
        });
    }
    _handleClickOnAcceptOrder(){
        // console.log('ok');
        // let btn = document.querySelector(`.${this.modalClass} .${this.modalClasses.acceptBtn}`);
        // btn.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     if(typeof this.source !== 'undefined'){
        //         fetch(this.source, {
        //             method: "POST",
        //             body: JSON.stringify(this.cart.items),
        //             headers: {"Content-type":"application/json"}
        //         })
        //             .then(response => {
        //                 if (response.status !== 200) {
        //                     return Promise.reject();
        //                 }
        //                 return response.json();
        //             })
        //             .then(data => {
        //                 console.log(data);
        //             });
        //     } else {
        //         console.log(this.cart.items);
        //     }
        // });
    }
    _getDataAttributes(parentElement){
        dataAttributesNames(this.dataAttributesNames, parentElement);
        dataAttributesValues(this.dataAttributesNames, this.currentProduct, parentElement);
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
        this.cart.total = updateTotalCount(this.cart.total, this.currentProduct.count);
        this._updateStorage();
    }
    _updateStorage(){
        localStorage.cart = JSON.stringify(this.cart);
        this.currentProduct = {};
        this._renderCartCounter();
    }
}
