export default function dataAttributesNames(attributesNames, parentElement){
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