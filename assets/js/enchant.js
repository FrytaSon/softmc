/* ==========================================
   SoftMC.eu
   Enchant Manager
========================================== */

class EnchantManager {

    constructor() {

        this.enchants = [];
        this.filtered = [];

        this.elements = {};

    }

    /* ======================================
       INIT
    ====================================== */

    async init() {

        this.cacheElements();

        await this.loadData();

        this.renderCards();

        this.bindEvents();

    }

    /* ======================================
       CACHE
    ====================================== */

    cacheElements() {

        this.elements = {

            grid: document.getElementById("enchants"),

            search: document.getElementById("search"),

            modal: document.getElementById("enchantModal"),

            close: document.getElementById("closeModal"),

            modalName: document.getElementById("modal-name"),

            modalRarity: document.getElementById("modal-rarity"),

            modalDescription: document.getElementById("modal-description"),

            modalLevel: document.getElementById("modal-level"),

            modalItems: document.getElementById("modal-items"),

            modalConflicts: document.getElementById("modal-conflicts")

        };

    }

    /* ======================================
       LOAD JSON
    ====================================== */

    async loadData() {

        try {

            const response = await fetch("../assets/data/enchants.json");

            if (!response.ok) {

                throw new Error("Nie udało się pobrać enchants.json");

            }

            this.enchants = await response.json();

            this.filtered = [...this.enchants];

        }

        catch (error) {

            console.error(error);

            this.showError();

        }

    }

    /* ======================================
       ERROR
    ====================================== */

    showError() {

        this.elements.grid.innerHTML = `

            <div class="no-results">

                <h2>Błąd</h2>

                <p>

                    Nie udało się wczytać listy enchantów.

                </p>

            </div>

        `;

    }

    /* ======================================
       HELPERS
    ====================================== */

    rarityClass(rarity) {

        switch (rarity.toLowerCase()) {

            case "simple":
                return "rarity-common";

            case "unique":
                return "rarity-rare";

            case "elite":
                return "rarity-epic";

            case "ultimate":
                return "rarity-legendary";

            case "legendary":
                return "rarity-legendary";

            case "fabled":
                return "rarity-mythic";

            default:
                return "rarity-common";

        }

    }

    /* ======================================
       ROMAN NUMBERS
    ====================================== */

    roman(level) {

        const values = {

            1: "I",
            2: "II",
            3: "III",
            4: "IV",
            5: "V",
            6: "VI",
            7: "VII",
            8: "VIII",
            9: "IX",
            10: "X"

        };

        return values[level] ?? level;

    }

    /* ======================================
       CLEAR
    ====================================== */

    clearGrid() {

        this.elements.grid.innerHTML = "";

    }

    /* ======================================
       NO RESULTS
    ====================================== */

    noResults() {

        this.elements.grid.innerHTML = `

            <div class="no-results">

                <h2>

                    Brak wyników

                </h2>

                <p>

                    Nie znaleziono żadnego enchantu.

                </p>

            </div>

        `;

    }
    /* ======================================
       RENDER CARDS
    ====================================== */

    renderCards() {

        this.clearGrid();

        if (!this.filtered.length) {

            this.noResults();

            return;

        }

        this.filtered.forEach((enchant, index) => {

            const card = this.createCard(enchant);

            card.style.animationDelay = `${index * 40}ms`;

            this.elements.grid.appendChild(card);

        });

    }

    /* ======================================
       CREATE CARD
    ====================================== */

    createCard(enchant) {

        const card = document.createElement("article");

        card.className = "enchant-card";

        card.dataset.id = enchant.id;

        const items = enchant.items
            .map(item => this.createItemTag(item))
            .join("");

        card.innerHTML = `

            <div class="enchant-card-top">

                <h2 class="enchant-name">

                    ${enchant.name}

                </h2>

                <span class="enchant-rarity ${this.rarityClass(enchant.rarity)}">

                    ${enchant.rarity}

                </span>

            </div>

            <p class="enchant-description">

                ${enchant.description}

            </p>

            <div class="enchant-items">

                ${items}

            </div>

            <div class="enchant-footer">

                <span class="enchant-level">

                    Poziom ${this.roman(enchant.maxLevel)}

                </span>

                <span class="enchant-open">

                    Kliknij aby zobaczyć →

                </span>

            </div>

        `;

        card.addEventListener("click", () => {

            this.openModal(enchant);

        });

        return card;

    }

    /* ======================================
       ITEM TAG
    ====================================== */

    createItemTag(item) {

        const icons = {

            "Weapon": "⚔️",

            "Sword": "🗡️",

            "Axe": "🪓",

            "Bow": "🏹",

            "Crossbow": "🎯",

            "Trident": "🔱",

            "Helmet": "⛑️",

            "Chestplate": "🛡️",

            "Leggings": "👖",

            "Boots": "🥾",

            "Armor": "🛡️",

            "Tool": "⛏️",

            "Pickaxe": "⛏️",

            "Shovel": "🪣",

            "Hoe": "🌾",

            "Fishing Rod": "🎣",

            "Elytra": "🪽"

        };

        const icon = icons[item] || "📦";

        return `

            <span class="item-tag">

                ${icon} ${item}

            </span>

        `;

    }

    /* ======================================
       REFRESH
    ====================================== */

    refresh() {

        this.renderCards();

    }
        /* ======================================
       EVENTS
    ====================================== */

    bindEvents() {

        /* Wyszukiwarka */

        if (this.elements.search) {

            this.elements.search.addEventListener("input", (event) => {

                this.search(event.target.value);

            });

        }

        /* ESC */

        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {

                this.closeModal();

            }

        });

    }

    /* ======================================
       SEARCH
    ====================================== */

    search(query) {

        const text = query
            .toLowerCase()
            .trim();

        if (!text.length) {

            this.filtered = [...this.enchants];

            this.renderCards();

            return;

        }

        this.filtered = this.enchants.filter(enchant => {

            const name = enchant.name.toLowerCase();

            const description = enchant.description.toLowerCase();

            const rarity = enchant.rarity.toLowerCase();

            const level = String(enchant.maxLevel);

            const items = enchant.items
                .join(" ")
                .toLowerCase();

            return (

                name.includes(text)

                ||

                description.includes(text)

                ||

                rarity.includes(text)

                ||

                level.includes(text)

                ||

                items.includes(text)

            );

        });

        this.renderCards();

    }

    /* ======================================
       SORT
    ====================================== */

    sortByName() {

        this.filtered.sort((a, b) =>

            a.name.localeCompare(

                b.name,

                "pl"

            )

        );

        this.renderCards();

    }

    sortByLevel() {

        this.filtered.sort((a, b) =>

            b.maxLevel - a.maxLevel

        );

        this.renderCards();

    }

    sortByRarity() {

        const order = {

            "Simple": 1,

            "Unique": 2,

            "Elite": 3,

            "Ultimate": 4,

            "Legendary": 5,

            "Fabled": 6

        };

        this.filtered.sort((a, b) =>

            order[b.rarity] - order[a.rarity]

        );

        this.renderCards();

    }

    /* ======================================
       RESET
    ====================================== */

    resetSearch() {

        if (this.elements.search) {

            this.elements.search.value = "";

        }

        this.filtered = [...this.enchants];

        this.renderCards();

    }

    /* ======================================
       FIND
    ====================================== */

    findById(id) {

        return this.enchants.find(

            enchant => enchant.id === id

        );

    }
        /* ======================================
       MODAL
    ====================================== */

    openModal(enchant) {

        if (!this.elements.modal) return;

        this.elements.modalName.textContent = enchant.name;

        this.elements.modalDescription.textContent =
            enchant.description;

        this.elements.modalLevel.textContent =
            this.roman(enchant.maxLevel);

        this.elements.modalRarity.textContent =
            enchant.rarity;

        this.elements.modalRarity.className =
            `modal-rarity ${this.rarityClass(enchant.rarity)}`;

        this.renderModalTags(
            this.elements.modalItems,
            enchant.items
        );

        this.renderModalTags(
            this.elements.modalConflicts,
            enchant.conflicts || []
        );

        this.elements.modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

    /* ======================================
       CLOSE MODAL
    ====================================== */

    closeModal() {

        if (!this.elements.modal) return;

        this.elements.modal.classList.remove("show");

        document.body.style.overflow = "";

    }

    /* ======================================
       MODAL TAGS
    ====================================== */

    renderModalTags(container, data) {

        if (!container) return;

        container.innerHTML = "";

        if (!data.length) {

            container.innerHTML =

                `<span class="modal-tag">Brak</span>`;

            return;

        }

        data.forEach(item => {

            const tag = document.createElement("span");

            tag.className = "modal-tag";

            tag.textContent = item;

            container.appendChild(tag);

        });

    }

    /* ======================================
       MODAL EVENTS
    ====================================== */

    bindModalEvents() {

        if (!this.elements.modal) return;

        if (this.elements.close) {

            this.elements.close.addEventListener("click", () => {

                this.closeModal();

            });

        }

        this.elements.modal.addEventListener("click", (event) => {

            if (event.target === this.elements.modal) {

                this.closeModal();

            }

        });

    }

    /* ======================================
       START
    ====================================== */

    start() {

    this.bindModalEvents();

}

}
/* ==========================================
   START APPLICATION
========================================== */

document.addEventListener("DOMContentLoaded", async () => {

    const app = new EnchantManager();

    await app.init();

    app.start();

});