<script>
  let currentPage = 'products';
  let products = [];
  let categories = [];
  let cart = [];
  let wishlist = [];
  let showProductModal = false;
  let showWishlist = false;
  let selectedProduct = null;
  let selectedCategory = '';
  let sortOrder = '';
  let loading = true;

  async function init() {
    await fetchProducts();
    await fetchCategories();
    loadCart();
    loadWishlist();
  }

  async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    loading = false;
  }

  async function fetchCategories() {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    categories = await response.json();
  }

  function resetFilters() {
    selectedCategory = '';
    sortOrder = '';
  }

  function openProductModal(product) {
    loading = true;
    selectedProduct = product;
    showProductModal = true;
    setTimeout(() => {
      loading = false;
    }, 1000);
  }

  function closeProductModal() {
    showProductModal = false;
  }

  function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
  }

  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function loadWishlist() {
    const savedWishlist = localStorage.getItem('wishlist');
    wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  }

  function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }

  function addToCart(product) {
    let existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
  }

  function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      cart.splice(index, 1);
      saveCart();
    }
  }

  function increaseQuantity(item) {
    item.quantity++;
    saveCart();
  }

  function decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      removeFromCart(item);
    }
    saveCart();
  }

  function toggleWishlist(product) {
    const index = wishlist.findIndex(item => item.id === product.id);
    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(product);
    }
    saveWishlist();
  }

  function isInWishlist(product) {
    return wishlist.some(item => item.id === product.id);
  }

  function toggleWishlistSidebar() {
    showWishlist = !showWishlist;
  }

  function calculateSubtotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function calculateTax() {
    return calculateSubtotal() * 0.1;
  }

  function calculateTotal() {
    return calculateSubtotal() + calculateTax();
  }

  $: filteredAndSortedProducts = () => {
    let filtered = selectedCategory
      ? products.filter(p => p.category === selectedCategory)
      : products;

    if (sortOrder === 'lowToHigh') {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  init();
</script>

<style>
  /* Add your styles here */
</style>

<header>
  <div>
    <button on:click={() => currentPage = 'products'}>Products</button>
    <button on:click={() => currentPage = 'cart'}>Cart</button>
    <button on:click={toggleWishlistSidebar}>Wishlist</button>
  </div>
  {#if showWishlist}
    <div>
      <h2>Wishlist</h2>
      {#each wishlist as item}
        <div>{item.title}</div>
      {/each}
    </div>
  {/if}
</header>

<main>
  {#if currentPage === 'products'}
    <div>
      <div>
        <select bind:value={selectedCategory}>
          <option value="">All Categories</option>
          {#each categories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
        <select bind:value={sortOrder}>
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
        <button on:click={resetFilters}>Reset Filters</button>
      </div>
      {#if loading}
        <p>Loading...</p>
      {:else}
        <div>
          {#each filteredAndSortedProducts() as product}
            <div>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button on:click={() => openProductModal(product)}>View</button>
              <button on:click={() => addToCart(product)}>Add to Cart</button>
              <button on:click={() => toggleWishlist(product)}>
                {isInWishlist(product) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {:else if currentPage === 'cart'}
    <div>
      {#each cart as item}
        <div>
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button on:click={() => increaseQuantity(item)}>Increase</button>
          <button on:click={() => decreaseQuantity(item)}>Decrease</button>
          <button on:click={() => removeFromCart(item)}>Remove</button>
        </div>
      {/each}
      <div>
        <p>Subtotal: ${calculateSubtotal()}</p>
        <p>Tax: ${calculateTax()}</p>
        <p>Total: ${calculateTotal()}</p>
      </div>
    </div>
  {/if}

  {#if showProductModal}
    <div>
      <button on:click={closeProductModal}>Close</button>
      {#if selectedProduct}
        <div>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <h3>{selectedProduct.title}</h3>
          <p>${selectedProduct.price}</p>
          <p>{selectedProduct.description}</p>
          <button on:click={() => addToCart(selectedProduct)}>Add to Cart</button>
          <button on:click={() => toggleWishlist(selectedProduct)}>
            {isInWishlist(selectedProduct) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      {/if}
    </div>
  {/if}
</main>
