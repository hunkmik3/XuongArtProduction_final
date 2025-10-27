// Strapi API configuration and helper functions
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const DEFAULT_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_STRAPI_TIMEOUT_MS || 7000);

export const strapi = {
  // Fetch data from Strapi API
  async fetch(endpoint, options = {}) {
    const url = `${STRAPI_API_URL}/api${endpoint}`;

    // Apply timeout via AbortController to avoid infinite loading when Strapi is down
    const timeoutMs = Number(options.timeoutMs || DEFAULT_TIMEOUT_MS);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), Math.max(1000, timeoutMs));

    const { timeoutMs: _omitTimeout, signal: callerSignal, ...restOptions } = options;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...restOptions.headers,
      },
      signal: callerSignal ?? controller.signal,
      ...restOptions,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Strapi fetch error:', error);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  },

  // Get projects with populated relations
  async getProjects() {
    try {
      const response = await this.fetch('/projects?populate=*');
      // Ensure response has data property
      if (!response || !response.data) {
        console.warn('No projects data received from Strapi');
        return { data: [] };
      }
      return response;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { data: [] };
    }
  },

  // Get single project by ID
  async getProject(id) {
    return this.fetch(`/projects/${id}?populate=*`);
  },

  // Get featured projects
  async getFeaturedProjects() {
    try {
      const response = await this.fetch('/projects?filters[featured][$eq]=true&populate=*&sort=order:asc');
      if (!response || !response.data) {
        console.warn('No featured projects data received from Strapi');
        return { data: [] };
      }
      return response;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return { data: [] };
    }
  },

  // Get general projects
  async getGeneralProjects() {
    try {
      const response = await this.fetch('/projects?filters[featured][$ne]=true&populate=*&sort=order:asc');
      if (!response || !response.data) {
        console.warn('No general projects data received from Strapi');
        return { data: [] };
      }
      return response;
    } catch (error) {
      console.error('Error fetching general projects:', error);
      return { data: [] };
    }
  }
};

// Helper function to get image URL from Strapi
export function getStrapiImageUrl(image, size = 'medium') {
  if (!image) return null;
  
  if (typeof image === 'string') {
    return image.startsWith('http') ? image : `${STRAPI_API_URL}${image}`;
  }
  
  if (image.data) {
    const url = image.data.attributes?.url;
    return url ? `${STRAPI_API_URL}${url}` : null;
  }
  
  return null;
}

// Helper function to get video URL from Strapi
export function getStrapiVideoUrl(video) {
  if (!video) return null;
  
  if (typeof video === 'string') {
    return video.startsWith('http') ? video : `${STRAPI_API_URL}${video}`;
  }
  
  if (video.data) {
    const url = video.data.attributes?.url;
    return url ? `${STRAPI_API_URL}${url}` : null;
  }
  
  return null;
}

// Helper function to format Strapi date
export function formatStrapiDate(dateString) {
  if (!dateString) return null;
  
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to extract text from Strapi rich text
export function extractTextFromRichText(richText) {
  if (!richText) return '';
  
  if (typeof richText === 'string') {
    return richText;
  }
  
  if (Array.isArray(richText)) {
    return richText.map(block => {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map(child => child.text || '').join('');
      }
      return '';
    }).join(' ');
  }
  
  return '';
}

// Helper function to convert Strapi rich text to HTML
export function richTextToHtml(richText) {
  if (!richText) return '';
  
  if (typeof richText === 'string') {
    return richText;
  }
  
  if (Array.isArray(richText)) {
    return richText.map(block => {
      if (block.type === 'paragraph' && block.children) {
        const paragraphHtml = block.children.map(child => {
          let text = child.text || '';
          
          // Apply formatting based on child properties
          if (child.bold) text = `<strong>${text}</strong>`;
          if (child.italic) text = `<em>${text}</em>`;
          if (child.underline) text = `<u>${text}</u>`;
          if (child.strikethrough) text = `<s>${text}</s>`;
          if (child.code) text = `<code>${text}</code>`;
          
          return text;
        }).join('');
        
        return `<p>${paragraphHtml}</p>`;
      }
      return '';
    }).join('');
  }
  
  return '';
}

// Export individual functions for easier import
export const getProjects = () => strapi.getProjects();
export const getProject = (id) => strapi.getProject(id);
export const getFeaturedProjects = () => strapi.getFeaturedProjects();
export const getGeneralProjects = () => strapi.getGeneralProjects();

export default strapi;
