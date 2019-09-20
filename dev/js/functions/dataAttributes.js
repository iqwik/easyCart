export function dataAttributesNames(attributesNames, parentElement){
    if(typeof parentElement.dataset.id !== 'undefined'){
        if(attributesNames.indexOf('id') === -1){
            attributesNames.push('id');
        }
    }
    let childs = parentElement.childNodes;
    childs.forEach(elem => {
        if(elem.childNodes.length > 0){
            dataAttributesNames(attributesNames, elem);
        }
        for (let prop in elem.dataset) {
            if(attributesNames.indexOf(prop) === -1){
                attributesNames.push(prop);
            }
        }
    });
}

export function dataAttributesValues(dataAttrNames, currentProduct, parentElem, dataAttribute){
    dataAttrNames.map(dataAttribute => {
        if(dataAttribute === 'id'){
            currentProduct['id'] = +parentElem.dataset[dataAttribute];
        } else {
            let item = parentElem.querySelector(`[data-${dataAttribute}]`);
            if (dataAttribute === 'count'){
                currentProduct['count'] = item.dataset[dataAttribute] !== false ? +item.value : 1;
            } else {
                currentProduct[dataAttribute] = item.dataset[dataAttribute];
            }
        }
    });
}