const productTableBody = document.querySelector(".table tbody");
const form = document.querySelector(".add-product-form");

const API_URL = "/api/products";

// Load products on page load
document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
  const res = await fetch(API_URL);
  const products = await res.json();

  productTableBody.innerHTML = "";

  products.forEach((p) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${p.name}</td>
      <td>₹${p.price}</td>
      <td>${p.quantity}</td>
      <td>${p.category}</td>
      <td>

<button class="btn small-btn" onclick="openEditModal(${p.id}, '${p.name}', ${p.price}, ${p.quantity}, '${p.category}')">
  Edit
</button>


        <button class="btn danger-btn small-btn" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    `;

    productTableBody.appendChild(row);
  });
}

// Add product
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("This function was called");

  const [name, price, quantity, category] = [
    ...form.querySelectorAll(".input"),
  ].map((i) => i.value);

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity, category }),
  });

  form.reset();
  loadProducts();
});

// Delete product
async function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadProducts();
}

async function updateProduct() {
  const id = document.getElementById("editId").value;

  const name = document.getElementById("editName").value;
  const price = document.getElementById("editPrice").value;
  const quantity = document.getElementById("editQuantity").value;
  const category = document.getElementById("editCategory").value;

  if (!name || !price || !quantity || !category) {
    alert("All fields required");
    return;
  }

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, quantity, category }),
  });

  closeModal();
  loadProducts();
}

function openEditModal(id, name, price, quantity, category) {
  document.getElementById("editModal").style.display = "flex";

  document.getElementById("editId").value = id;
  document.getElementById("editName").value = name;
  document.getElementById("editPrice").value = price;
  document.getElementById("editQuantity").value = quantity;
  document.getElementById("editCategory").value = category;
}

function closeModal() {
  document.getElementById("editModal").style.display = "none";
}
