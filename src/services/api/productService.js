export const productService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "sale_end_time" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "subcategory" } },
          { field: { Name: "in_stock" } }
        ]
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "sale_end_time" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "subcategory" } },
          { field: { Name: "in_stock" } }
        ]
      };

      const response = await apperClient.getRecordById('product', id, params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }
      
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching product with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async getByCategory(category) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "sale_end_time" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "subcategory" } },
          { field: { Name: "in_stock" } }
        ],
        where: [
          {
            FieldName: "category",
            Operator: "EqualTo",
            Values: [category]
          }
        ]
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching products by category:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async search(query) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "sale_end_time" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "subcategory" } },
          { field: { Name: "in_stock" } }
        ],
        whereGroups: [
          {
            operator: "OR",
            subGroups: [
              {
                conditions: [
                  {
                    fieldName: "Name",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "brand",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              },
              {
                conditions: [
                  {
                    fieldName: "category",
                    operator: "Contains",
                    values: [query]
                  }
                ]
              }
            ]
          }
        ]
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getFeatured() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "brand" } },
          { field: { Name: "price" } },
          { field: { Name: "discount_price" } },
          { field: { Name: "sale_end_time" } },
          { field: { Name: "images" } },
          { field: { Name: "sizes" } },
          { field: { Name: "colors" } },
          { field: { Name: "category" } },
          { field: { Name: "subcategory" } },
          { field: { Name: "in_stock" } }
        ],
        pagingInfo: {
          limit: 8,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching featured products:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async create(product) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const productData = {
        Name: product.Name,
        Tags: product.Tags,
        Owner: product.Owner,
        brand: product.brand,
        price: product.price,
        discount_price: product.discount_price,
        sale_end_time: product.sale_end_time,
        images: product.images,
        sizes: product.sizes,
        colors: product.colors,
        category: product.category,
        subcategory: product.subcategory,
        in_stock: product.in_stock
      };

      const params = {
        records: [productData]
      };

      const response = await apperClient.createRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields plus Id
      const updateData = {
        Id: id,
        ...(updates.Name !== undefined && { Name: updates.Name }),
        ...(updates.Tags !== undefined && { Tags: updates.Tags }),
        ...(updates.Owner !== undefined && { Owner: updates.Owner }),
        ...(updates.brand !== undefined && { brand: updates.brand }),
        ...(updates.price !== undefined && { price: updates.price }),
        ...(updates.discount_price !== undefined && { discount_price: updates.discount_price }),
        ...(updates.sale_end_time !== undefined && { sale_end_time: updates.sale_end_time }),
        ...(updates.images !== undefined && { images: updates.images }),
        ...(updates.sizes !== undefined && { sizes: updates.sizes }),
        ...(updates.colors !== undefined && { colors: updates.colors }),
        ...(updates.category !== undefined && { category: updates.category }),
        ...(updates.subcategory !== undefined && { subcategory: updates.subcategory }),
        ...(updates.in_stock !== undefined && { in_stock: updates.in_stock })
      };

      const params = {
        records: [updateData]
      };

      const response = await apperClient.updateRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null;
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('product', params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
        }
        
        return successfulDeletions.length > 0;
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting product:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return false;
    }
  }
};