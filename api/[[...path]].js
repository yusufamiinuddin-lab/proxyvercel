export default async function handler(req, res) {
  // GANTI DENGAN URL APS SCRIPT ASLIMU
  const TARGET_URL = "https://script.google.com/macros/s/AKfycbxSjrtcDPyNBvM2SvrsCCMDQTqtAK4UHYuSOGLH3leNfldf7YtSNC0qQ4HsA4yVdCGS/exec";
  
  // Set CORS agar bisa diakses dari mana saja
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Tangani preflight request (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  try {
    // Ambil query string dari request
    const queryString = new URLSearchParams(req.query).toString();
    const url = queryString ? `${TARGET_URL}?${queryString}` : TARGET_URL;
    
    // Teruskan request ke APS Script
    const response = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.text();
    res.status(response.status).send(data);
    
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Proxy gagal", detail: error.message });
  }
}
