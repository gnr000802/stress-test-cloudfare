export default async function handler(req, res) {
  const dni = req.body.dni;

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

    const data = await response.text();
    res.status(200).json({ dni, result: data });
  } catch (err) {
    res.status(500).json({ dni, error: err.message });
  }
}
