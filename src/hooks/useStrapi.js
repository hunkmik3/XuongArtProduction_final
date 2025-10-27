import { useState, useEffect } from 'react';
import strapi from '@/lib/strapi';

// Custom hook for fetching Strapi data
export function useStrapi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const result = await strapi.fetch(endpoint, options);
        setData(result);
      } catch (err) {
        setError(err);
        console.error('useStrapi error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  return { data, loading, error };
}

// Custom hook for projects
export function useProjects() {
  return useStrapi('/projects?populate=*');
}

// Custom hook for services
export function useServices() {
  return useStrapi('/services?populate=*');
}

// Custom hook for homepage
export function useHomepage() {
  return useStrapi('/homepage?populate=*');
}

// Custom hook for about page
export function useAbout() {
  return useStrapi('/about?populate=*');
}

// Custom hook for contact
export function useContact() {
  return useStrapi('/contact?populate=*');
}

// Custom hook for testimonials
export function useTestimonials() {
  return useStrapi('/testimonials?populate=*');
}

// Custom hook for team members
export function useTeam() {
  return useStrapi('/team-members?populate=*');
}

// Custom hook for blog posts
export function useBlogPosts() {
  return useStrapi('/blog-posts?populate=*&sort=createdAt:desc');
}

// Custom hook for clients
export function useClients() {
  return useStrapi('/clients?populate=*');
}

// Custom hook for settings
export function useSettings() {
  return useStrapi('/settings?populate=*');
}

export default useStrapi;
