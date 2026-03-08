// api/lookup.js
export default function handler(req, res) {
  const prefixes = {
    "0703":"MTN","0704":"MTN","0706":"MTN","0803":"MTN","0806":"MTN",
    "0810":"MTN","0813":"MTN","0814":"MTN","0816":"MTN","0903":"MTN",
    "0906":"MTN","0913":"MTN","0916":"MTN",

    "0701":"Airtel","0708":"Airtel","0802":"Airtel","0808":"Airtel",
    "0812":"Airtel","0901":"Airtel","0902":"Airtel","0904":"Airtel",
    "0907":"Airtel","0912":"Airtel",

    "0705":"Globacom","0805":"Globacom","0807":"Globacom","0811":"Globacom",
    "0815":"Globacom","0905":"Globacom","0915":"Globacom",

    "0809":"9mobile","0817":"9mobile","0818":"9mobile","0908":"9mobile",
    "0909":"9mobile"
  };

  // Get phone number from query
  let { number } = req.query;
  if (!number) {
    res.status(400).json({ error: "Missing number parameter" });
    return;
  }

  // Normalize +234 → 0
  number = number.replace("+234", "0");

  // Extract prefix
  const prefix = number.substring(0,4);
  const carrier = prefixes[prefix] || "Unknown";

  // Return JSON
  res.status(200).json({
    country: "Nigeria",
    prefix: prefix,
    carrier: carrier,
    line_type: "Mobile"
  });
}
