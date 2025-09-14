import { input } from "./input.js";
import { showAsMenu } from "./output.js";

export const cartItems = [];
const calculateSubtotal = (items=[])=>{
  const results = [];
  items.forEach(item => {
    const found = results.findIndex(o=>o.id === item.id);
    if(found === -1){
      const obj = {
        ...item,
        amount: 1,
        subtotal: item.price
      };
      results.push(obj);
    }else{
      results[found].amount = results[found].amount + 1;
      results[found].subtotal = results[found].amount * results[found].price;
    }
  });
  return results;

};

export const showCarts = async()=>{
  let attach = true;
  while(attach){
    const withSubtotal = calculateSubtotal(cartItems);
    showAsMenu(withSubtotal);
    const total = withSubtotal.reduce((a,b)=>a+b.subtotal,0);
    console.log(`\nTotal: Rp${Number(total).toLocaleString("id")},-`);
    console.log("\n\n99. Checkout");
    console.log("0. Kembali");
    const select = await input("Masukkan opsi: ");
    if(select === -1 ){
      attach = false;
      continue;
    }
    if(select === 98){
      await input("Seluruh barang berhasil di-checkout!");
      attach = false;
      continue;
    }
  }
};