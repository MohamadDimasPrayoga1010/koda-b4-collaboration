import { input } from "./lib/input.js";
import { showAsMenu } from "./lib/output.js";
import { selectProduct } from "./lib/products.js";
import { showCarts } from "./lib/carts.js";
import { history } from "./lib/history.js";

const listMenu = [
  {
    title: "Pilih product",
    func: selectProduct,
  },
  {
    title: "Keranjang",
    func: showCarts,
  },
  {
    title: "History",
    func: history,
  },
];

async function main() {
  let attach = true;
  while (attach) {
    showAsMenu(listMenu);
    console.log("\n\n0. Keluar");
    const select = await input("Pilih menu: ");
    if (select === -1) {
      attach = false;
      continue;
    }

    if (typeof listMenu[select]?.func === "function") {
      await listMenu[select].func();
    }
  }
}

main();
