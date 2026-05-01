 // SELECT ELEMENTS
const fileInput = document.getElementById("image-input");
const img = document.getElementById("preview-img");
const placeholder = document.getElementById("placeholder-text");

const resetBtn = document.querySelector(".reset");
const downloadBtn = document.querySelector(".download");

const sliders = document.querySelectorAll(".filter input");

// DEFAULT VALUES
let filters = {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
    hueRotate: 0
};


// ================= IMAGE UPLOAD =================
fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    img.src = url;
    img.style.display = "block";
    placeholder.style.display = "none";
});


// ================= APPLY FILTER =================
function applyFilters() {
    img.style.filter = `
        brightness(${filters.brightness}%)
        contrast(${filters.contrast}%)
        saturate(${filters.saturate}%)
        blur(${filters.blur}px)
        grayscale(${filters.grayscale}%)
        sepia(${filters.sepia}%)
        opacity(${filters.opacity}%)
        invert(${filters.invert}%)
        hue-rotate(${filters.hueRotate}deg)
    `;
}


// ================= SLIDERS =================
sliders.forEach(slider => {
    slider.addEventListener("input", () => {

        const label = slider.previousElementSibling.innerText.toLowerCase();

        if (label === "brightness") filters.brightness = slider.value;
        if (label === "contrast") filters.contrast = slider.value;
        if (label === "saturation") filters.saturate = slider.value;
        if (label === "blur") filters.blur = slider.value;
        if (label === "grayscale") filters.grayscale = slider.value;
        if (label === "sepia") filters.sepia = slider.value;
        if (label === "opacity") filters.opacity = slider.value;
        if (label === "invert") filters.invert = slider.value;
        if (label === "hue rotate") filters.hueRotate = slider.value;

        applyFilters();
    });
});


// ================= RESET =================
resetBtn.addEventListener("click", () => {

    filters = {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0,
        hueRotate: 0
    };

    sliders.forEach(slider => slider.value = 100);
    applyFilters();
});


// ================= DOWNLOAD =================
downloadBtn.addEventListener("click", () => {

    if (!img.src) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = img.src;

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        ctx.filter = img.style.filter;
        ctx.drawImage(image, 0, 0);

        const link = document.createElement("a");
        link.download = "edited-image.png";
        link.href = canvas.toDataURL();
        link.click();
    };
});