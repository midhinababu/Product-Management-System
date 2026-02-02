const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = loginForm.children[0].value;
  const password = loginForm.children[1].value;

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful");
      window.location.href = "products.html";
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("Server error");
  }
});
