import { apiService } from './api';

export const gameService = {
  getAllGames() {
    return apiService.get('/games/');
  },

  addToCart(gameId, quantity) {
    return apiService.post('/carts/items', { gameId, quantity });
  },

  removeFromCart(cartId, gameId) {
    return apiService.delete(`/carts/${cartId}/items`, { gameId });
  },
};