let board = {
    columns: [
        {
            id: "todo",
            title: "Todo",
            cards: []
        },
        {
            id: "doing",
            title: "Doing",
            cards: []
        },
        {
            id: "done",
            title: "Done",
            cards: []
        }
    ]
};

function loadBoard() {
    const savedBoard = localStorage.getItem("board");
    if (savedBoard) board = JSON.parse(savedBoard);
}

function saveBoard() {
    localStorage.setItem("board", JSON.stringify(board));
}

function initializeBoard() {
    if (!localStorage.getItem("board")) saveBoard();
    else loadBoard();
}

function addCard(columnId) {
    const titleInput = document.getElementById("card-title");
    const descriptionInput = document.getElementById("card-description");
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (title === "") return;
    const column = board.columns.find(col => col.id === columnId);
    column.cards.push({
        id: crypto.randomUUID(),
        title,
        description
    });
    saveBoard();
    renderBoard();
    titleInput.value = "";
    descriptionInput.value = "";
    document.getElementById("add-card-modal").classList.add("hidden");
}

function deleteCard(cardId) {
    for (const column of board.columns) {
        const index = column.cards.findIndex(card => card.id === cardId);
        if (index !== -1) {
            column.cards.splice(index, 1);
            saveBoard();
            renderBoard();
            return;
        }
    }
}

function openEditModal(cardId) {
    for (const column of board.columns) {
        const card = column.cards.find(c => c.id === cardId);
        if (card) {
            selectedColumnId = column.id;
            editingCardId = card.id;
            document.getElementById("modal-heading").textContent = "Edit Card";
            document.getElementById("create-btn").textContent = "Save";
            document.getElementById("card-title").value = card.title;
            document.getElementById("card-description").value = card.description;
            document.getElementById("add-card-modal").classList.remove("hidden");
            return;
        }
    }
}

function editCard(columnId, cardId) {
    const title = document.getElementById("card-title").value.trim();
    const description = document.getElementById("card-description").value.trim();
    const column = board.columns.find(col => col.id === columnId);
    const card = column.cards.find(c => c.id === cardId);
    card.title = title;
    card.description = description;
    saveBoard();
    renderBoard();
    titleInput.value = "";
    descriptionInput.value = "";
    document.getElementById("add-card-modal").classList.add("hidden");
}

function moveCard(fromId, toId, cardId) {
    const fromColumn = board.columns.find(col => col.id === fromId);
    const toColumn = board.columns.find(col => col.id === toId);
    const index = fromColumn.cards.findIndex(card => card.id === cardId);
    const card = fromColumn.cards.splice(index, 1)[0];
    toColumn.cards.push(card);
    saveBoard();
    renderBoard();
}