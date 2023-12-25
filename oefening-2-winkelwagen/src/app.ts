/**
 * Represents a product.
 * @property {string} name - The name of the product.
 * @property {number} price - The price of the product.
 * @property {number} count - The count of products selected.
 */
type Product = { name: string, price: number, count: number };

/**
 * Represents a shopping cart, filled with items.
 * All the items that could be in the shopping cart are always present.
 * In order to change the contents of the shopping cart,
 * increase or decrease the count of the product.
 */
const shoppingCart: Product[] = [
  { name: 'pokemon', price: 59.99, count: 0 },
  { name: 'mario', price: 49.99, count: 0 },
  { name: 'monster', price: 39.99, count: 0 }
];

/** The Pokémon field on the receipt, holding the count */
let pokemonReceiptField: HTMLTableCellElement = null;

/** The Mario field on the receipt, holding the count */
let marioReceiptField: HTMLTableCellElement = null;

/** The Monster Hunter field on the receipt, holding the count */
let monsterReceiptField: HTMLTableCellElement = null;

/** The total field on the receipt, holding the price of all selected products */
let totalReceiptField: HTMLTableCellElement = null;

// Assign events and field variables
window.addEventListener('load', () => {
  const shoppingCartButtons: NodeListOf<Element> = document.querySelectorAll('#product-list button');
  shoppingCartButtons.forEach((button: Element) => {
    button.addEventListener('click', shoppingCartChange);
  });

  pokemonReceiptField = document.getElementById('pokemon-count') as HTMLTableCellElement;
  marioReceiptField = document.getElementById('mario-count') as HTMLTableCellElement;
  monsterReceiptField = document.getElementById('monster-count') as HTMLTableCellElement;
  totalReceiptField = document.getElementById('total-price') as HTMLTableCellElement;
});

/**
 * Retrieves the product with the given name.
 *
 * @param product - The name of the product.
 * @returns The product object found in the shopping cart.
 */
function getProduct(product: string): Product {
  return shoppingCart.find((item: Product) => item.name === product);
}

/**
 * Updates the shopping cart information based on the given event.
 *
 * @param event - The event triggered by the user action.
 */
function shoppingCartChange(event: Event): void {
  const target: HTMLButtonElement = event.target as HTMLButtonElement;
  const eventParameters: string[] = target.id.split('-');
  const product: Product | undefined = eventParameters.length == 2
    ? getProduct(eventParameters[1])
    : undefined;

  if (product) {
    switch (eventParameters[0]) {
      case 'increase': increaseProductCount(product); break;
      case 'decrease': decreaseProductCount(product); break;
    }
  }
}

/**
 * Increases the count of a product by 1 and updates the receipt.
 *
 * @param product - The product to be incremented.
 */
function increaseProductCount(product: Product): void {
  product.count = product.count + 1;
  updateReceipt();
}

/**
 * Decreases the count of a product by 1 and updates the receipt.
 *
 * @param product - The product to be decreased.
 */
function decreaseProductCount(product: Product): void {
  if (product.count > 0) {
    product.count = product.count - 1;
    updateReceipt();
  }
}

/**
 * Calculates the total price of a product.
 *
 * @param product - The product object containing the count and price.
 * @returns The total price of the product.
 */
function getPrice(product: Product): number {
  return product.count * product.price;
}

/**
 * Calculates the total price of the products in the shopping cart.
 *
 * @returns The total price of the shopping cart.
 */
function calculateTotalPrice(): number {
  return shoppingCart.reduce((total: number, product: Product) => total + getPrice(product), 0);
}

/**
 * Updates the receipt with the current shopping cart information.
 * Sets the count of each item in the receipt fields.
 * Calculates and sets the total price in the receipt field.
 */
function updateReceipt(): void {
  pokemonReceiptField.innerText = shoppingCart[0].count.toString();
  marioReceiptField.innerText = shoppingCart[1].count.toString();
  monsterReceiptField.innerText = shoppingCart[2].count.toString();
  totalReceiptField.innerText = calculateTotalPrice().toString();
}
