<script>
    // @ts-nocheck
    
    /**
     * @file Header.svelte
     * @description Header component for the e-commerce store.
     */
    
    import { cart, wishlist } from '../store';
    
    /**
     * @typedef {Object} Props
     * @property {string} currentPage - The current active page.
     */
    
    /** @type {Props} */
    export let currentPage;
    
    /**
     * Sets the current page.
     * @param {string} page - The page to set as current.
     */
    function setPage(page) {
        currentPage = page;
    }
    </script>
    
    <header>
        <div class="container">
          <div class="header-content">
            <div class="logo-container">
              <img src="store image.jpg" alt="Store Logo" class="logo">
            </div>
            <nav>
              <button 
                on:click={() => setPage('products')} 
                class:active={currentPage === 'products'}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Home
              </button>
              <button 
                on:click={() => setPage('cart')} 
                class:active={currentPage === 'cart'}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                Cart ({$cart.length})
              </button>
              <button 
                on:click={() => setPage('wishlist')} 
                class:active={currentPage === 'wishlist'}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                Wishlist ({$wishlist.length})
              </button>
            </nav>
          </div>
        </div>
    </header>
    
    <style>
      header {
        background: linear-gradient(to right, #7e5bef, #f06d8e, #fa6b5c);
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem 0;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .logo-container {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      .logo {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
      }
      h1 {
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 0.05em;
      }
      nav {
        display: flex;
        gap: 1.5rem;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: color 0.2s ease;
      }
      button:hover, button.active {
        color: #ffc107;
      }
      svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      
    </style>