import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  slug: string;
  name: string;
}

const useFetchCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        
        const categoryData: Category[] = response.data.map((category: { slug: string; name: string }) => ({
          slug: category.slug,
          name: category.name,
        }));

        setCategories(categoryData);
      } catch (error) {
        console.error('Ошибка при получении категорий:', error);
      }
    };

    fetchCategories();
  }, []);

  return categories;
};

export default useFetchCategories;
