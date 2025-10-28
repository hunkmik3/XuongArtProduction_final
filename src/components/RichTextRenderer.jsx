import { useMemo } from 'react';

const RichTextRenderer = ({ content, className = "" }) => {
  const htmlContent = useMemo(() => {
    if (!content) return '';
    
    // If content is already HTML string, return as is
    if (typeof content === 'string' && content.includes('<')) {
      return content;
    }
    
    // If content is rich text object, convert to HTML
    if (Array.isArray(content)) {
      return content.map(block => {
        // Handle different block types
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
        
        // Handle heading blocks
        if (block.type === 'heading' && block.children) {
          const level = block.level || 1;
          const headingHtml = block.children.map(child => {
            let text = child.text || '';
            
            if (child.bold) text = `<strong>${text}</strong>`;
            if (child.italic) text = `<em>${text}</em>`;
            
            return text;
          }).join('');
          
          return `<h${level}>${headingHtml}</h${level}>`;
        }
        
        // Handle list blocks
        if (block.type === 'list' && block.children) {
          const listType = block.format === 'ordered' ? 'ol' : 'ul';
          const items = block.children.map(item => {
            if (item.type === 'list-item' && item.children) {
              const itemHtml = item.children.map(child => {
                let text = child.text || '';
                if (child.type === 'link') {
                  return `<a href="${child.url || '#'}">${text}</a>`;
                }
                if (child.bold) text = `<strong>${text}</strong>`;
                if (child.italic) text = `<em>${text}</em>`;
                return text;
              }).join('');
              return `<li>${itemHtml}</li>`;
            }
            return '';
          }).join('');
          return `<${listType}>${items}</${listType}>`;
        }
        
        return '';
      }).join('');
    }
    
    return content;
  }, [content]);

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default RichTextRenderer;
