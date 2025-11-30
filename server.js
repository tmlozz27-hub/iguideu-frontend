const express = require("express");
const path = require("path");
const app = express();

const PORT = 5181;

// Carpeta del frontend
app.use(express.static(path.join(__dirname)));

// Reemplazo seguro de create-checkout dentro del HTML generado
app.get("/", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>I GUIDE U – Frontend</title>
  </head>
  <body>
    <h1>Frontend cargado desde server.js</h1>
    <button onclick="pay()">Test Pago Stripe</button>

    <script>
      async function pay() {
        try {
          const res = await fetch("https://iguideu-backend-1.onrender.com/api/payments/create-checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
          });

          const data = await res.json();

          if (data.url) {
            window.location.href = data.url;
          } else {
            alert("Error: backend no devolvió URL de Stripe");
          }
        } catch (err) {
          alert("Error al llamar a /api/payments/create-checkout: " + err.message);
        }
      }
    </script>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Frontend server corriendo en http://127.0.0.1:${PORT}`);
});
