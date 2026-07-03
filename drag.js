let draggedCard = null;
let draggedCardId = null;
let sourceColumnId = null;

const placeholder = document.createElement("div");
placeholder.classList.add("placeholder");

function getDragAfterElement(cards, mouseY) {
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY;
    cards.forEach(card => {
        const box = card.getBoundingClientRect();
        const offset = mouseY - box.top - box.height / 2;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestCard = card;
        }
    });
    return closestCard;
}