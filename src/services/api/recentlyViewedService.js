import { productService } from './productService';

const STORAGE_KEY = 'recentlyViewed';
const MAX_ITEMS = 10;

const getStoredIds = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading recently viewed from localStorage:', error);
    return [];
  }
};

const saveIds = (ids) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving recently viewed to localStorage:', error);
  }
};

const add = (productId) => {
  const ids = getStoredIds();
  const filteredIds = ids.filter(item => item.id !== productId);
  const newIds = [{ id: productId, timestamp: Date.now() }, ...filteredIds];
  
  saveIds(newIds.slice(0, MAX_ITEMS));
};

const getAll = async () => {
  try {
    const ids = getStoredIds();
    if (ids.length === 0) return [];
    
    const allProducts = await productService.getAll();
    const recentProducts = ids
      .map(item => allProducts.find(product => product.Id === item.id))
      .filter(Boolean);
    
    return recentProducts;
  } catch (error) {
    console.error('Error loading recently viewed products:', error);
    return [];
  }
};

const clear = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing recently viewed from localStorage:', error);
  }
};

export const recentlyViewedService = {
  add,
  getAll,
  clear
};