import { cartItems } from "./carts.js";
import { input } from "./input.js";

let historyPayment = [];

export async function history() {
  let attach = true;

  if (cartItems.length > 0) {
    const order = {
      date: new Date().toLocaleDateString("id-ID"),
      time: new Date().toLocaleTimeString("id-ID"),
      data: cartItems.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
        subTotal: item.subTotal || item.price * (item.quantity || 1)
      })),
    };
    historyPayment.push(order);
  }

  while (attach) {
    console.clear();
    console.log("Histori Pembelian\n");

    if (historyPayment.length === 0) {
      console.log("Belum ada histori pembelian\n");
    } else {
      historyPayment.forEach((order) => {
        console.log(`${order.date} ${order.time}`);
        order.data.forEach((item, i) => {
          console.log(
            `  ${i + 1}. ${item.name} Rp${item.price.toLocaleString("id")} x ${
              item.quantity
            } = Rp${item.subTotal.toLocaleString("id")}`
          );
        });
        const total = order.data.reduce((sum, t) => sum + t.subTotal, 0);
        console.log(`Total: Rp${total.toLocaleString("id")},-\n`);
      });
    }

    console.log("0. Kembali");
    const select = await input("Masukkan opsi: ");
    if (select === -1) {
      attach = false;
    }
  }
}
