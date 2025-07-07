function getTodayToken() {
  const secret = "kunciku123"; // Ganti dengan rahasiamu
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const base = `${secret}-${year}${month}${day}`;
  return btoa(base).slice(0, 10); // 10 karakter pertama dari base64
}

function checkPassword() {
  const input = document.getElementById('password').value;
  const correct = getTodayToken();

  if (input === correct) {
    window.location.href = "daftar.html"; // Redirect ke sini
  } else {
    document.getElementById('error').textContent = "Password salah. Coba lagi.";
  }
}