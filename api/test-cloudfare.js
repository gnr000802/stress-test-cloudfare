export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let dni;
  try {
    dni = req.body?.dni || JSON.parse(req.body)?.dni;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (!dni) {
    return res.status(400).json({ error: "DNI is required" });
  }

  try {
    const response = await fetch("https://buenclub-checkout-backend.prod.sportclub.com.ar/order/banco-nacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: "AUDIT TEST",
        dni: dni.toString(),
        email: `audit-${dni}@fake.local`,
        celular: "0000000000",
        plan: "banco-nacion"
      })
    });

    const contentType = response.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text(); // captura HTML de error si falla
    }

    res.status(200).json({ dni, result: data });

  } catch (err) {
    res.status(500).json({ dni, error: err.message });
  }
}
