<script>
    import { cart, removeFromCart } from '../store';
  
    /**
     * Increase the quantity of an item in the cart.
     * @param {Object} item - The cart item to increase quantity for.
     */
    function increaseQuantity(item) {
        $cart = $cart.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
    }
  
    /**
     * Decrease the quantity of an item in the cart.
     * @param {Object} item - The cart item to decrease quantity for.
     */
    function decreaseQuantity(item) {
        $cart = $cart.map(i => i.id === item.id && i.quantity > 1 ? {...i, quantity: i.quantity - 1} : i);
    }
  
    $: subtotal = $cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $: tax = subtotal * 0.1;
    $: total = subtotal + tax;
  </script>
  
  <h1 class="text-3xl font-bold mb-6">Your Cart</h1>
  
  {#if $cart.length === 0}
      <div class="text-center py-8">
          <p class="text-xl text-gray-800">Your cart is empty</p>
          <button class="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-purple-500">Continue Shopping</button>
      </div>
  {:else}
      <div class="space-y-4">
          {#each $cart as item (item.id)}
              <div class="flex items-center justify-between border-b pb-4">
                  <div class="flex items-center space-x-4">
                      <img src={item.image} alt={item.title} class="w-16 h-16 object-contain">
                      <div>
                          <h3 class="font-semibold">{item.title}</h3>
                          <p class="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                  </div>
                  <div class="flex items-center space-x-2">
                      <button on:click={() => decreaseQuantity(item)} class="px-2 py-1 bg-gray-400 rounded">-</button>
                      <span>{item.quantity}</span>
                      <button on:click={() => increaseQuantity(item)} class="px-2 py-1 bg-gray-400 rounded">+</button>
                      <button on:click={() => removeFromCart(item)} class="ml-4 text-red-300 hover:text-red-300">Remove</button>
                  </div>
              </div>
          {/each}
      </div>
      <div class="mt-8">
          <div class="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
          </div>
          <div class="flex justify-between py-2">
              <span>Tax (10%):</span>
              <span>${tax.toFixed(2)}</span>
          </div>
          <div class="flex justify-between py-2 font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
          </div>
          <button class="mt-4 w-full bg-emerald-600 text-white px-6 py-3 rounded hover:bg-emerald-400">Proceed to Checkout</button>
      </div>
  {/if}
  
  <style>
    .product-detail {
      max-width: 600px;
      margin: 0 auto;
    }
    .product-detail img {
      max-width: 100%;
      height: 400px;
      object-fit: contain;
    }
    .product-detail button {
      background-color: #4f46e5;
      color: wheat;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      margin: 5px;
    }
    .product-detail button:hover {
      background-color: #818cf8;
    }
  </style>
  