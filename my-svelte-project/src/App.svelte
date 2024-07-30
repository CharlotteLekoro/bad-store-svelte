<script>
	import { Router, Link, Route } from 'svelte-routing';
	import ProductList from './components/ProductList.svelte';
	import ProductDetail from './components/ProductDetail.svelte';
	import Header from './components/Header.svelte';
	
	export let url = '';
  </script>
  
  <Header />
  
  <Router {url}>
	<nav>
	  
	</nav>
  
	<Route path="/" component={ProductList} />
	<Route path="/product/:id" component={ProductDetail} />
  </Router>
  