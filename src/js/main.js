import { getData } from "./servis.js"; // servis.js dan ma'lumot olish funktsiyasini import qilish

// Katalog itemlarini render qilish
const renderCatalogItems = (data) => {
  const detailsSection = document.getElementById("catalog-details");

  if (!data || data.length === 0) {
    detailsSection.innerHTML = "<p>No items available</p>";
    return;
  }

  detailsSection.innerHTML = "";

  data.forEach(item => {
    detailsSection.innerHTML += `
      <div class="catalog-card bg-white p-4 border border-gray-200 rounded-md shadow-lg">
        <img src="${item.img}" alt="${item.title}" class="w-full h-32 object-cover mb-2 rounded-md" />
        <h3 class="text-lg font-semibold mb-1">${item.title}</h3>
        <p class="text-gray-600 mb-2">${item.text}</p>
        <p class="font-bold text-green-500">$${item.price}</p>
      </div>`;
  });
};

// Kataloglarni yuklash va ularni render qilish
const loadCatalogItems = async (endpoint) => {
  const data = await getData(endpoint);
  renderCatalogItems(data);
};

// Catalog nomlarini bosish orqali ma'lumotni yuklash
const catalogItems = document.querySelector(".catalogs");
catalogItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("catalog-item")) {
    const endpointMap = {
      1: '/hotdishes',
      2: '/colddishes',
      3: '/soup',
      4: '/grill',
      5: '/dessert'
    };

    const catalogId = event.target.dataset.id;
    const endpoint = endpointMap[catalogId];

    if (endpoint) {
      loadCatalogItems(endpoint);
    } else {
      console.error("Noto'g'ri katalog ID:", catalogId);
    }
  }
});

// Kataloglarni dinamik tarzda yuklash
const initializeCatalogs = async () => {
  const data = await getData('/catalog');
  if (data) {
    const catalogsDiv = document.querySelector(".catalogs");
    catalogsDiv.innerHTML = data.map(item => `
      <div class="catalog-item p-4 bg-gray-200 border border-gray-300 rounded-md cursor-pointer" data-id="${item.id}">
        <h3 class="text-lg font-semibold">${item.name}</h3>
      </div>
    `).join('');
  }
};

// Sahifa yuklanganida kataloglarni yuklash
initializeCatalogs();

