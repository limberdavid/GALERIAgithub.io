const images = [
    {
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
        title: "Aurora Boreal",
        category: "naturaleza"
    },
    {
        url: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=1200",
        title: "Ciudad Futurista",
        category: "ciudad"
    },
    {
        url: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?w=1200",
        title: "Arte Abstracto",
        category: "arte"
    },
    {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200",
        title: "Circuitos AI",
        category: "tecnologia"
    },
    {
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200",
        title: "Montaña Nocturna",
        category: "naturaleza"
    }
];

let currentFilter = 'all';
let currentView = 'grid';
let filtered = images;
let index = 0;

const gallery = document.getElementById("gallery");
const imageCount = document.getElementById("imageCount");
const lightbox = document.getElementById("lightbox");

function renderGallery() {
    gallery.innerHTML = '';
    filtered.forEach((img, i) => {
        const div = document.createElement("div");
        div.className = "gallery-item";
        div.innerHTML = `
            <img src="${img.url}">
            <div class="gallery-info">
                <h3>${img.title}</h3>
                <span>${img.category}</span>
            </div>
        `;
        div.onclick = () => openLightbox(i);
        gallery.appendChild(div);
    });
    imageCount.textContent = filtered.length;
}

function applyFilter(cat) {
    currentFilter = cat;
    filtered = cat === 'all'
        ? images
        : images.filter(i => i.category === cat);
    renderGallery();
}

function openLightbox(i) {
    index = i;
    updateLightbox();
    lightbox.classList.add("active");
}

function updateLightbox() {
    document.getElementById("lightboxImg").src = filtered[index].url;
    document.getElementById("lightboxTitle").textContent = filtered[index].title;
    document.getElementById("lightboxCategory").textContent = filtered[index].category;
}

document.querySelector(".close").onclick = () => lightbox.classList.remove("active");
document.querySelector(".next").onclick = () => {
    index = (index + 1) % filtered.length;
    updateLightbox();
};
document.querySelector(".prev").onclick = () => {
    index = (index - 1 + filtered.length) % filtered.length;
    updateLightbox();
};

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilter(btn.dataset.filter);
    };
});

document.querySelectorAll(".view-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        gallery.classList.toggle("list-view", btn.dataset.view === "list");
    };
});

renderGallery();
