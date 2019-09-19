export default function getParentElement(targetElem, parentSelector) {
    let parents = document.querySelectorAll(`.${parentSelector}`);
    for (let i = 0; i < parents.length; i++) {
        let parent = parents[i];
        if (parent.contains(targetElem)) {
            return parent;
        }
    }
    return 'undefined';
}