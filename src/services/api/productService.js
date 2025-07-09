import productsData from "@/services/mockData/products.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAll() {
    await delay(300);
    return [...productsData];
  },

  async getById(id) {
    await delay(200);
    const product = productsData.find(p => p.Id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    return { ...product };
  },

  async getByCategory(category) {
    await delay(300);
    return productsData.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  },

  async search(query) {
    await delay(300);
    return productsData.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
  },

  async getFeatured() {
    await delay(300);
    return productsData.slice(0, 8);
  },

  async create(product) {
    await delay(400);
    const newProduct = {
      ...product,
      Id: Math.max(...productsData.map(p => p.Id)) + 1
    };
    productsData.push(newProduct);
    return { ...newProduct };
  },

  async update(id, updates) {
    await delay(300);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    productsData[index] = { ...productsData[index], ...updates };
    return { ...productsData[index] };
  },

  async delete(id) {
    await delay(300);
    const index = productsData.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    
    const deleted = productsData.splice(index, 1)[0];
    return { ...deleted };
  }
};