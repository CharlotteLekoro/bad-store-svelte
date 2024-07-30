import { writable } from 'svelte/store';

export const products = writable([]);
export const cart = writable([]);
export const wishlist = writable([]);

export function addToCart(product) {
    cart.update(items => {
        const existingItem = items.find(item => item.id === product.id);
        if (existingItem) {
            return items.map(item => 
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }
        return [...items, { ...product, quantity: 1 }];
    });
}

export function removeFromCart(product) {
    cart.update(items => items.filter(item => item.id !== product.id));
}

export function toggleWishlist(product) {
    wishlist.update(items => {
        const index = items.findIndex(item => item.id === product.id);
        if (index === -1) {
            return [...items, product];
        }
        return items.filter((_, i) => i !== index);
    });
}
