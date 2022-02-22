require("dotenv").config();
const TOKEN = process.env.MEPA_ACCESS_TOKEN;


// SDK de Mercado Pago
const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: 'PROD_ACCESS_TOKEN'
});

let preference = {
    items: [
      {
        title: 'Mi producto',
        unit_price: 100,
        quantity: 1,
      }
    ]
  };
  
  mercadopago.preferences.create(preference)
  .then(function(response){
  
    global.id = response.body.id;
  }).catch(function(error){
    console.log(error);
  });