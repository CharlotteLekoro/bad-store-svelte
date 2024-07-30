<script>
	import { onMount } from 'svelte';
  
	let cartCount = 0;
	let wishlistCount = 0;
  
	onMount(() => {
	  // Initialize cart and wishlist counts
	  cartCount = 0;
	  wishlistCount = 0;
	});
  
	function handleCartClick() {
	  // Update cart count
	  cartCount += 1;
	}
  
	function handleWishlistClick() {
	  // Update wishlist count
	  wishlistCount += 1;
	}
  </script>
  
  <nav class="navbar">
	<div class="navbar-left">
	  <img src="logo.png" alt="Logo" />
	</div>
	<div class="navbar-right">
	  <ul>
		<li>
		  <a href="#" on:click={handleCartClick}>
			<i class="fas fa-shopping-cart"></i>
			Cart ({cartCount})
		  </a>
		</li>
		<li>
		  <a href="#" on:click={handleWishlistClick}>
			<i class="fas fa-heart"></i>
			Wishlist ({wishlistCount})
		  </a>
		</li>
	  </ul>
	</div>
  </nav>
  
  <style>
	.navbar {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding: 1rem;
	  background-color: #333;
	  color: #fff;
	}
  
	.navbar-left {
	  display: flex;
	  align-items: center;
	}
  
	.navbar-left img {
	  width: 100px;
	  height: 100px;
	  margin-left: 20px;
	}
  
	.navbar-right {
	  display: flex;
	  justify-content: flex-end;
	}
  
	.navbar-right ul {
	  list-style: none;
	  margin: 0;
	  padding: 0;
	  display: flex;
	}
  
	.navbar-right li {
	  margin-right: 20px;
	}
  
	.navbar-right a {
	  color: #fff;
	  text-decoration: none;
	}
  </style>