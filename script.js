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
    editingCardId = null;
});

cancelBtn.addEventListener("click", () => {
    editingCardId = null;
    modal.classList.add("hidden");
})

const addColumnBtn = document.getElementById("add-column-btn");
const addColumnModal = document.getElementById("add-column-modal");
addColumnBtn.addEventListener("click", () => {
    addColumnModal.classList.remove("hidden");
});

document.getElementById("cancel-column-btn").addEventListener("click", () => {
    addColumnModal.classList.add("hidden");
});

document.getElementById("create-column-btn").addEventListener("click", () => {
    const title = document.getElementById("column-title");
    addColumn(title.value);
    addColumnModal.classList.add("hidden");
    title.value = "";
})