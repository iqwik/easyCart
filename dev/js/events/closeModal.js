export default function closeModal(event, modalClass){
    event.preventDefault();
    let modal = document.querySelector(`.${modalClass}`);
    modal.style.display = 'none';
    modal.innerHTML = '';
}