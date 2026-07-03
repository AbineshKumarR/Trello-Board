let selectedColumnId = null;
let editingCardId = null;

initializeBoard();
renderBoard();

const createBtn = document.getElementById("create-btn");
const cancelBtn = document.getElementById("cancel-btn");
const modal = document.getElementById("add-card-modal");

createBtn.addEventListener("click", () => {
    if (editingCardId) editCard(selectedColumnId, editingCardId);
    else addCard(selectedColumnId);
});

cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
})