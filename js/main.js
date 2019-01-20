'use strict';
const cartDOM = document.querySelector('.cart');
let products = [];



 let insertItemToDOM = (product) =>{
     const  product_id  =  JSON.stringify(product.product_id);
    cartDOM.insertAdjacentHTML('beforeend', `
    <div class="cart__item">
      <img class="cart__item__image" src="${product.product_meta.img}" alt="${product.product_meta.title}">
      <div style="display: flex;flex-direction: column">
      <h3 class="cart__item__name">${product.product_meta.title}</h3>
      <h3 class="cart__item__price">${product.pricing.amount}</h3>
      <h3  class="cart__item__delivery_charge">${'Delivery:'} ${(product.pricing.delivery_charge === 0 ? ' Free' : product.pricing.delivery_charge)}</h3>
      <div style="display: flex">
      <button class=" btn--primary btn--small" onclick='increaseItem(${product_id})' data-action="INCREASE_ITEM">&plus;</button>
      <h3 style="margin:0 7px;" class="cart__item__quantity">${product.quantity}</h3>
       <button class=" btn--primary btn--small$" onclick='decreaseItem(${product_id})'  data-action="DECREASE_ITEM">&minus;</button>
      </div>
      </div>
    </div>
  `);
}

let getProductsInfo = (recalculate)=> {
    const DATA_URL = `https://flipkart-mock-cart.now.sh`;
    if(!recalculate){
        fetch(DATA_URL)
            .then((res) => res.json())
            .then((data) => {
                products = JSON.parse([
                    {
                        product_id: "MOBFAJB4CWKAZGPZ",
                        product_meta: {
                            title: "Redmi Note 6 Pro (Black, 64 GB) (4 GB RAM)",
                            img: "https://rukminim1.flixcart.com/image/jog2nbk0/mobile/e/x/b/mi-redmi-e7t-na-original-imafazxdh2bd6hep.jpeg"
                        },
                        pricing: {
                            amount: 13999,
                            delivery_charge: 50
                        },
                        availability: {
                            unavailable_pincodes: [ ]
                        },
                        purchase_instructions: {
                            max_purchase_limit: 3
                        }
                    },
                    {
                        product_id: "MOBF9GAQ6ZQXPJG7",
                        product_meta: {
                            title: "Google Pixel 3 (Just Black, 64 GB) (4 GB RAM)",
                            img: "https://rukminim1.flixcart.com/image/jn0msnk0/mobile/j/g/7/google-pixel-3-na-original-imaf9sxrbewfygaj.jpeg"
                        },
                        pricing: {
                            amount: 66500,
                            delivery_charge: 0
                        },
                        availability: {
                            unavailable_pincodes: [
                                "560103"
                            ]
                        },
                        purchase_instructions: {
                            max_purchase_limit: 1
                        }
                    },
                    {
                        product_id: "MOBF7HXTQPVA5GGZ",
                        product_meta: {
                            title: "Samsung Galaxy Note 9 (Metallic Copper, 512 GB) (8 GB RAM)",
                            img: "https://rukminim1.flixcart.com/image/jnc2bgw0/mobile/g/g/z/samsung-galaxy-note-9-sm-n960fznhins-original-imafafzxzg85c6qb.jpeg"
                        },
                        pricing: {
                            amount: 84900,
                            delivery_charge: 200
                        },
                        availability: {
                            unavailable_pincodes: [
                                "560102"
                            ]
                        },
                        purchase_instructions: {
                            max_purchase_limit: 2
                        }
                    },
                    {
                        product_id: "MOBF944EKCGDWFTA",
                        product_meta: {
                            title: "Apple iPhone XS Max (Space Grey, 256 GB)",
                            img: "https://rukminim1.flixcart.com/image/jm9hfgw0/mobile/f/t/a/apple-iphone-xs-max-mt532hn-a-original-imaf97f6y3spd7yz.jpeg"
                        },
                        pricing: {
                            amount: 124900,
                            delivery_charge: 0
                        },
                        availability: {
                            unavailable_pincodes: [
                                "560102",
                                "560103"
                            ]
                        },
                        purchase_instructions: {
                            max_purchase_limit: 100
                        }
                    }
                ]);
                //products = data;
                products.forEach(product => {
                    product.quantity=0;
                    insertItemToDOM(product);
                })
                setTotalPricing();
            })
    }
    else{
        products.forEach(product => {
            insertItemToDOM(product);
        })
        setTotalPricing();
    }


};


getProductsInfo(false);

let setTotalPricing = ()=>{
    let totalPrice=0;
    let delivery_charges=0;
    products.forEach(product => {
        totalPrice  = product.pricing.amount*product.quantity + totalPrice;
        delivery_charges +=  ((product.quantity>0)?product.pricing.delivery_charge:0) + delivery_charges;
    })
    document.getElementById('total_price').innerHTML= totalPrice;
    document.getElementById('delivery_charges').innerHTML= delivery_charges;
    document.getElementById('amount_payable').innerHTML= totalPrice + delivery_charges;
}

function increaseItem (id){
    products.forEach((item,index)=>{
        if(item.product_id===id){
            if(item.purchase_instructions.max_purchase_limit==item.quantity){
                alert("Maximum purchase limit reached")
                return;
            }
           ++products[index].quantity
        }
    })
    cartDOM.innerHTML = '';
    getProductsInfo(true);

}

function decreaseItem (id){
    products.forEach((item,index)=>{
        if(item.product_id===id){
            if(item.quantity==0){
                alert("Can't decrease the limit")
                return;
            }
            --products[index].quantity
        }
    })
    cartDOM.innerHTML = '';
    getProductsInfo(true);
}