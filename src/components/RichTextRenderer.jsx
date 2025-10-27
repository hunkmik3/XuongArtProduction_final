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
    
    return content;
  }, [content]);

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RichTextRenderer;
