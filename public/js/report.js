const API_URL = "/api/reports/summary";

document.addEventListener("DOMContentLoaded", loadReport);

async function loadReport() {
  const res = await fetch(API_URL);
  const data = await res.json();

  document.querySelectorAll(".report-value")[0].innerText = data.totalProducts;
  document.querySelectorAll(".report-value")[1].innerText = data.totalQuantity;
  document.querySelectorAll(".report-value")[2].innerText =
    `₹${data.totalValue}`;
  document.querySelectorAll(".report-value")[3].innerText = data.outOfStock;
}
