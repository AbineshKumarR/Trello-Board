const boardElement = document.getElementById("board");

function renderCard(card, cardContainer, columnId) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.draggable = true;
    cardElement.addEventListener("dragstart", () => {
        draggedCard = cardElement;
        draggedCardId = card.id;
        sourceColumnId = columnId;
        cardElement.classList.add("dragging")
    })
    cardElement.addEventListener("dragend", () => {
        cardElement.classList.remove("dragging");
        placeholder.remove();
        draggedCard = null;
        draggedCardId = null;
        sourceColumnId = null;
    })
    cardElement.dataset.cardId = card.id;
    cardElement.innerHTML = `<div class="card-content">
                        <h3>${card.title}</h3>
                        <p>${card.description}</p>
                    </div>
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
                <button class="delete-column-btn">🗑️</button>
            </div>
            <div class="card-container"></div>
            <button class="add-card-btn">+ Add Card</button>`;
    boardElement.appendChild(columnElement);

    const cardContainer = columnElement.querySelector(".card-container");
    cardContainer.addEventListener("dragover", e => {
        e.preventDefault();
        const cards = [...cardContainer.querySelectorAll(".card:not(.dragging)")];
        const afterCard = getDragAfterElement(cards, e.clientY);
        if (afterCard == null) cardContainer.appendChild(placeholder);
        else cardContainer.insertBefore(placeholder, afterCard);
    });
    cardContainer.addEventListener("drop", () => {
        const cards = [...cardContainer.children];
        const targetIndex = cards.indexOf(placeholder);
        moveCard(sourceColumnId, column.id, draggedCardId, targetIndex);
        placeholder.remove();
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

    const deleteColumnBtn = columnElement.querySelector(".delete-column-btn");
    deleteColumnBtn.addEventListener("click", () => {
        deleteColumn(column.id);
    })
}

function renderBoard() {
    boardElement.innerHTML = "";
    board.columns.forEach(column => {
        renderColumn(column);
    });
}

