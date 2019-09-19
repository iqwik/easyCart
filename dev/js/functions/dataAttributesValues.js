export default function dataAttributesValues(dataAttributesNames, currentProduct, parentElem, dataAttribute){
    dataAttributesNames.map(dataAttribute => {
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