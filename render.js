const boardElement = document.getElementById("board");

function renderCard(card, cardContainer, columnId) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.draggable = true;
    cardElement.addEventListener("dragstart", () => {
        draggedCardId = card.id;
        sourceColumnId = columnId;
    })
    cardElement.dataset.cardId = card.id;
    cardElement.innerHTML = `<h3>${card.title}</h3>
                    <p>${card.description}</p>
                    <div class="card-actions">
                        <button class="edit-btn">✏️</button>
                        <button class="delete-btn">🗑️</button>
                    </div>`;
    cardContainer.appendChild(cardElement);
    const editBtn = cardElement.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        openEditModal(card.id);
    })
    const deleteBtn = cardElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        deleteCard(card.id);
    })
}

function renderColumn(column) {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    columnElement.dataset.columnId = column.id;
    columnElement.innerHTML = `<div class="column-header">
                <h2>${column.title}</h2>
            </div>
            <div class="card-container"></div>
            <button class="add-card-btn">+ Add Card</button>`;
    boardElement.appendChild(columnElement);

    const cardContainer = columnElement.querySelector(".card-container");
    cardContainer.addEventListener("dragover", e => {
        e.preventDefault();
    });
    cardContainer.addEventListener("drop", () => {
        moveCard(sourceColumnId, column.id, draggedCardId);
    })
    column.cards.forEach(card => {
        renderCard(card, cardContainer, column.id);
    });

    const addCardBtn = columnElement.querySelector(".add-card-btn");
    addCardBtn.addEventListener("click", () => {
        selectedColumnId = column.id;
        document.getElementById("modal-heading").textContent = "Add Card";
        document.getElementById("create-btn").textContent = "Create";
        document.getElementById("add-card-modal").classList.remove("hidden");
    })
}

function renderBoard() {
    boardElement.innerHTML = "";
    board.columns.forEach(column => {
        renderColumn(column);
    });
}

