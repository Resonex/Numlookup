export default function handler(req, res) {

const prefixDB = {

/* MTN */

"0703":"MTN","0704":"MTN","0706":"MTN","07025":"MTN","07026":"MTN",
"0803":"MTN","0806":"MTN",
"0810":"MTN","0813":"MTN","0814":"MTN","0816":"MTN",
"0903":"MTN","0906":"MTN",
"0913":"MTN","0916":"MTN",

/* Airtel */

"0701":"Airtel","0708":"Airtel",
"0802":"Airtel","0808":"Airtel",
"0812":"Airtel",
"0901":"Airtel","0902":"Airtel","0904":"Airtel","0907":"Airtel",
"0912":"Airtel",

/* Globacom */

"0705":"Globacom",
"0805":"Globacom","0807":"Globacom",
"0811":"Globacom","0815":"Globacom",
"0905":"Globacom",
"0915":"Globacom",

/* 9mobile */

"0809":"9mobile",
"0817":"9mobile","0818":"9mobile",
"0908":"9mobile","0909":"9mobile"

};

/* GET NUMBER */

let number = req.query.number;

if (!number) {
return res.status(400).json({
error:"Missing number parameter"
});
}

/* CLEAN INPUT */

number = number.toString().trim();

/* REMOVE NON NUMERIC */

number = number.replace(/[^0-9]/g,"");

/* FORMAT NORMALIZATION */

let international = "";

if (number.startsWith("234")) {

international = "+" + number;
number = "0" + number.substring(3);

}

else if (number.startsWith("0")) {

international = "+234" + number.substring(1);

}

else {

return res.status(400).json({
error:"Invalid Nigerian number format"
});

}

/* VALIDATION */

if (number.length !== 11) {

return res.status(400).json({
error:"Invalid Nigerian phone length"
});

}

/* PREFIX DETECTION */

let prefix4 = number.substring(0,4);
let prefix5 = number.substring(0,5);

let carrier = "Unknown";

/* CHECK 5 DIGIT PREFIX FIRST */

if (prefixDB[prefix5]) {

carrier = prefixDB[prefix5];

}

else if (prefixDB[prefix4]) {

carrier = prefixDB[prefix4];

}

/* LINE TYPE */

let lineType = "Mobile";

if (carrier === "Unknown") {

lineType = "Unknown";

}

/* RESPONSE */

return res.status(200).json({

success:true,

country:"Nigeria",

national_number:number,

international_number:international,

prefix: prefixDB[prefix5] ? prefix5 : prefix4,

carrier:carrier,

line_type:lineType,

valid: carrier !== "Unknown"

});

}
