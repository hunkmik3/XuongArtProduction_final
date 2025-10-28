"use client";
import { useEffect, useMemo, useState, useRef } from "react";
import { getProjects, getStrapiImageUrl, getStrapiVideoUrl, extractTextFromRichText } from "@/lib/strapi";
import Container from "@/components/Container";
import AuthorAvatar from "@/components/AuthorAvatar";
import TimeAgo from "@/components/TimeAgo";
import RichTextRenderer from "@/components/RichTextRenderer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";

// Component cho từng project card với masonry layout
const MasonryCard = ({ item, onOpen, index = 0 }) => {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoAspectRatio, setVideoAspectRatio] = useState(16/9);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Detect if media is video
  const isVideo = item.video && /\.(mp4|webm|ogg|mov|avi)$/i.test(item.video);
  
  // Debug log for missing projects
  if ([4, 6, 7, 9].includes(item.id)) {
    console.log(`🔍 Debug Project ${item.id} (${item.title}):`, {
      isVideo,
      video: item.video,
      thumbnail: item.thumbnail,
      orientation: item.orientationField,
      order: item.order
    });
  }
  
  // Calculate orientation based on video dimensions or fallback to aspect ratio
  const orientation = useMemo(() => {
    // Ưu tiên sử dụng orientation field từ Strapi nếu có
    if (item.orientationField && item.orientationField !== 'square') {
      console.log(`Using orientationField for ${item.title}: ${item.orientationField}`);
      return item.orientationField;
    }
    
    // Detect từ video dimensions với ngưỡng chính xác hơn
    if (isVideo && item.width && item.height) {
      const ratio = item.width / item.height;
      console.log(`Video ${item.title}: ${item.width}x${item.height}, ratio: ${ratio.toFixed(2)}`);
      if (ratio >= 1.0) return 'landscape'; // Video có tỷ lệ >= 1.0 là landscape
      return 'portrait'; // Video có tỷ lệ < 1.0 là portrait
    }
    
    // Detect từ thumbnail dimensions với ngưỡng chính xác hơn
    if (item.thumbWidth && item.thumbHeight) {
      const ratio = item.thumbWidth / item.thumbHeight;
      console.log(`Thumbnail ${item.title}: ${item.thumbWidth}x${item.thumbHeight}, ratio: ${ratio.toFixed(2)}`);
      if (ratio >= 1.0) return 'landscape'; // Thumbnail có tỷ lệ >= 1.0 là landscape
      return 'portrait'; // Thumbnail có tỷ lệ < 1.0 là portrait
    }
    
    // Default fallback - ưu tiên portrait để tránh nhầm lẫn
    console.log(`Default orientation for ${item.title}: portrait`);
    return 'portrait';
  }, [isVideo, item.width, item.height, item.thumbWidth, item.thumbHeight, item.orientationField]);

  // Tính toán aspect ratio thực tế để quyết định kích thước
  // Kết hợp aspect ratio + index để tạo layout bất đối xứng tự nhiên
  const gridSpanClasses = useMemo(() => {
    // Lấy kích thước thực tế
    let aspectRatio = 1;
    let width, height;
    
    if (item.thumbWidth && item.thumbHeight) {
      width = item.thumbWidth;
      height = item.thumbHeight;
      aspectRatio = width / height;
    } else if (item.width && item.height) {
      width = item.width;
      height = item.height;
      aspectRatio = width / height;
    }
    
    // Thêm một chút biến thể dựa trên index để tạo sự đa dạng
    const variation = index % 4;
    
    console.log(`Item ${index} (${item.title}): ${width}x${height}, aspectRatio=${aspectRatio.toFixed(2)}, orientation=${orientation}, variation=${variation}`);
    
    // Portrait: chiều cao lớn hơn chiều rộng
    if (orientation === 'portrait') {
      // Portrait rất cao (tỷ lệ < 0.6)
      if (aspectRatio < 0.6) {
        // Đa dạng: row-span-2 hoặc row-span-3
        return variation % 2 === 0 ? 'col-span-1 row-span-1 sm:row-span-3' : 'col-span-1 row-span-1 sm:row-span-2';
      }
      // Portrait cao (0.6 - 0.8)
      else if (aspectRatio < 0.8) {
        return 'col-span-1 row-span-1 sm:row-span-3';
      }
      // Portrait vừa (0.8 - 1.0)
      else {
        // Thêm sự đa dạng
        return variation < 2 ? 'col-span-1 row-span-1 sm:row-span-2' : 'col-span-1 row-span-1 sm:row-span-3';
      }
    }
    // Landscape: chiều rộng lớn hơn chiều cao
    else {
      // Landscape rất rộng (tỷ lệ > 1.8)
      if (aspectRatio > 1.8) {
        return 'col-span-1 sm:col-span-2 row-span-1';
      }
      // Landscape rộng (1.4 - 1.8)
      else if (aspectRatio > 1.4) {
        // Thêm sự đa dạng cho landscape rộng
        return variation < 2 ? 'col-span-1 sm:col-span-2 row-span-1 sm:row-span-2' : 'col-span-1 sm:col-span-2 row-span-1';
      }
      // Landscape vừa (1.0 - 1.4)
      else if (aspectRatio > 1.0) {
        // Thêm sự đa dạng
        return variation < 2 ? 'col-span-1 row-span-1 sm:row-span-2' : 'col-span-1 sm:col-span-2 row-span-1';
      }
      // Gần vuông hoặc landscape nhỏ
      else {
        // Thêm sự đa dạng cho gần vuông
        return variation === 0 ? 'col-span-1 row-span-1 sm:row-span-2' : 'col-span-1 row-span-1';
      }
    }
  }, [item.thumbWidth, item.thumbHeight, item.width, item.height, orientation, index, item.title]);

  // Video metadata load handler (không cần auto-play nữa)
  useEffect(() => {
    if (!videoRef.current || !isVideo) return;
    
    const video = videoRef.current;
    
    const handleError = () => {
      setIsVideoPlaying(false);
    };

    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('error', handleError);
    };
  }, [isVideo]);

  // Handle video metadata load
  const handleVideoLoadedMetadata = (e) => {
    const video = e.currentTarget;
    const ratio = video.videoWidth / video.videoHeight;
    setVideoAspectRatio(ratio);
    console.log(`Video ${item.title} loaded: ${video.videoWidth}x${video.videoHeight}, ratio: ${ratio.toFixed(2)}`);
  };

  // Debug log for rendering
  if ([4, 6, 7, 9].includes(item.id)) {
    console.log(`🎨 Rendering Project ${item.id} (${item.title}) with classes: ${gridSpanClasses}`);
  }

  // Aspect ratio để hiển thị đúng theo orientation Strapi
  const aspectRatioValue = useMemo(() => {
    if (orientation === 'portrait') return 9/16;
    if (orientation === 'landscape') return 16/9;
    // Fallback theo kích thước thật nếu orientation không xác định
    if (item.thumbWidth && item.thumbHeight) return item.thumbWidth / item.thumbHeight;
    if (item.width && item.height) return item.width / item.height;
    return 16/9;
  }, [orientation, item.thumbWidth, item.thumbHeight, item.width, item.height]);

  // Style cho mobile vs desktop
  const cardStyle = useMemo(() => {
    // Cố định tỉ lệ hiển thị theo orientation cho cả mobile & desktop để không sai tỉ lệ
    return { aspectRatio: aspectRatioValue };
  }, [aspectRatioValue]);

  return (
    <motion.div
      layout
      className={`relative group overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg cursor-pointer ${gridSpanClasses}`}
      whileHover={{ scale: 1.02 }}
      onClick={() => onOpen && onOpen(item)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={cardStyle}
    >
      <div className="relative w-full h-full overflow-hidden bg-neutral-800">
        {isVideo ? (
          // Hiển thị thumbnail cho video thay vì autoplay
          <div className="relative h-full w-full group">
            {item.thumbnail ? (
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <div className="relative h-full w-full bg-neutral-700 flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={item.video}
                  className="h-full w-full object-contain"
                  muted
                  playsInline
                  controls={false}
                  preload="metadata"
                  poster=""
                  controlsList="nodownload nofullscreen noremoteplayback"
                  disablePictureInPicture
                  onContextMenu={(e) => e.preventDefault()}
                  onLoadedMetadata={handleVideoLoadedMetadata}
                  onError={(e) => {
                    console.error(`❌ Video playback error for Project ${item.id} (${item.title}):`, e);
                    console.error('Video URL:', item.video);
                    setIsVideoPlaying(false);
                  }}
                />
                {/* Fallback content if video fails to load */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white text-sm">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="text-xs text-neutral-400 mt-1">Video</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : item.media ? (
          <Image
            src={item.media}
            alt={item.title || "Project"}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800">
            <span className="text-neutral-400 text-sm">Không có media</span>
          </div>
        )}
      </div>
      
      {/* Overlay with project info */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Display multiple categories */}
          {item.categories && item.categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {item.categories.map((cat, index) => (
                <span key={index} className="text-xs uppercase tracking-widest text-neutral-300 bg-white/20 px-2 py-1 rounded">
                  {cat}
                </span>
              ))}
            </div>
          )}
          {!item.categories && item.category && (
            <div className="text-xs uppercase tracking-widest text-neutral-300 mb-2">{item.category}</div>
          )}
          <div className="mt-1 font-display text-xl font-semibold">{item.title}</div>
          {item.client && (
            <div className="mt-1 text-sm text-neutral-400">{item.client}</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [pageSize, setPageSize] = useState(20); // Default to desktop size

  // Detect screen size and adjust page size
  useEffect(() => {
    const updatePageSize = () => {
      // 640px is the sm breakpoint in Tailwind
      setPageSize(window.innerWidth < 640 ? 8 : 20);
    };

    // Set initial value
    updatePageSize();

    // Listen for resize events
    window.addEventListener('resize', updatePageSize);

    return () => {
      window.removeEventListener('resize', updatePageSize);
    };
  }, []);

  // Fetch projects from Strapi
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('🔍 Portfolio: Fetching projects...');
        const response = await getProjects();
        console.log('📊 Portfolio response:', response);
        console.log('📊 Portfolio data length:', response.data?.length || 0);
        if (response.data) {
          const formattedProjects = response.data.map(project => {
            const attrs = project.attributes || {};
            const mediaData = attrs.media?.data;
            const mediaList = Array.isArray(mediaData) ? mediaData : (mediaData ? [mediaData] : []);
            const thumbnailAttr = attrs.thumbnail?.data?.attributes || null;
            
            let thumbAttrs = thumbnailAttr;
            if (!thumbAttrs) {
              const firstImage = mediaList.find(m => m?.attributes?.mime?.startsWith("image/"));
              if (firstImage) thumbAttrs = firstImage.attributes;
            }
            const firstImageAttrs = mediaList.find(m => m?.attributes?.mime?.startsWith("image/"))?.attributes || {};
            const firstVideoAttrs = mediaList.find(m => m?.attributes?.mime?.startsWith("video/"))?.attributes || null;
            
            const thumbUrl = thumbAttrs?.formats?.medium?.url || thumbAttrs?.formats?.small?.url || thumbAttrs?.url || "";
            let thumbnail = thumbUrl ? (getStrapiImageUrl(thumbUrl) || thumbUrl) : "";
            const thumbWidth = (thumbAttrs?.formats?.medium?.width || thumbAttrs?.formats?.small?.width || thumbAttrs?.width) || undefined;
            const thumbHeight = (thumbAttrs?.formats?.medium?.height || thumbAttrs?.formats?.small?.height || thumbAttrs?.height) || undefined;
            
            // If no thumbnail but has video from Cloudinary, use previewUrl or generate thumbnail
            if (!thumbnail && firstVideoAttrs?.previewUrl) {
              thumbnail = firstVideoAttrs.previewUrl;
            }

            const width = firstImageAttrs.width || undefined;
            const height = firstImageAttrs.height || undefined;
            const video = firstVideoAttrs ? (getStrapiVideoUrl(firstVideoAttrs?.url) || getStrapiImageUrl(firstVideoAttrs?.url)) : "";

            return {
              id: project.id,
              title: attrs.title,
              client: attrs.client,
              tagline: attrs.tagline,
              category: attrs.category,
              categories: attrs.categories || (attrs.category ? [attrs.category] : []),
              featured: attrs.featured,
              slug: attrs.slug,
              media: getStrapiImageUrl(firstImageAttrs.url || "") || firstImageAttrs.url || "",
              width,
              height,
              mime: firstImageAttrs.mime,
              orientation: width && height ? (height > width ? "portrait" : "landscape") : undefined,
              thumbnail,
              thumbWidth,
              thumbHeight,
              video,
              description: attrs.description,
              fullDescription: attrs.fullDescription,
              duration: attrs.duration,
              order: attrs.order,
              orientationField: attrs.orientation,
              completionDate: attrs.completionDate,
            };
          });
          
          formattedProjects.sort((a, b) => {
            const ao = a.order || a.id;
            const bo = b.order || b.id;
            return ao - bo;
          });
          
          console.log('📊 Formatted projects count:', formattedProjects.length);
          console.log('📊 Target projects in formatted:', formattedProjects.filter(p => [4, 6, 7, 9].includes(p.id)).map(p => ({ id: p.id, title: p.title, video: p.video, thumbnail: p.thumbnail })));
          
          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error('Error fetching projects from Strapi:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openProject = (item) => {
    setSelected(item);
    setIsOpen(true);
  };

  const closeProject = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 200);
  };

  // Ensure details are expanded on desktop, collapsible on mobile
  useEffect(() => {
    const onResize = () => {
      if (typeof window === 'undefined') return;
      setShowInfo(window.innerWidth >= 640); // sm and up shows details by default
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeProject();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Lock body scroll when modal open (mobile + desktop), but allow scrolling inside modal
  useEffect(() => {
    if (!isOpen) return;
    const prev = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overscrollBehaviorY: document.body.style.overscrollBehaviorY,
    };
    const scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overscrollBehaviorY = 'contain';
    document.documentElement.classList.add('modal-open');
    return () => {
      document.body.style.overflow = prev.overflow;
      document.body.style.position = prev.position;
      document.body.style.top = prev.top;
      document.body.style.width = prev.width;
      document.body.style.overscrollBehaviorY = prev.overscrollBehaviorY;
      document.documentElement.classList.remove('modal-open');
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSuggestions && !event.target.closest('.search-container')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSuggestions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = projects.filter((p) =>
      [p.title, p.client, p.tagline].some((x) => (x || "").toLowerCase().includes(q))
    );
    if (category !== "Tất cả") {
      items = items.filter((p) => {
        // Check both single category and multiple categories
        const singleCategory = p.category === category;
        const multipleCategories = p.categories && p.categories.includes(category);
        return singleCategory || multipleCategories;
      });
    }
    return items;
  }, [query, category, projects]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => setPage(1), [query, category]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    console.log('📄 Page items count:', items.length);
    console.log('📄 Target projects in page items:', items.filter(p => [4, 6, 7, 9].includes(p.id)).map(p => ({ id: p.id, title: p.title })));
    return items;
  }, [filtered, page, pageSize]);

  // Get unique categories from projects
  const categories = useMemo(() => {
    const allCategories = new Set();
    
    projects.forEach(p => {
      // Add single category
      if (p.category) allCategories.add(p.category);
      
      // Add multiple categories
      if (p.categories && Array.isArray(p.categories)) {
        p.categories.forEach(cat => allCategories.add(cat));
      }
    });
    
    const cats = ["Tất cả", ...Array.from(allCategories).sort()];
    return cats;
  }, [projects]);

  // Handle category selection from suggestions
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowSuggestions(false);
    setIsSearchFocused(false);
  };

  return (
    <main className="bg-white text-black">
      <Container className="pt-12 sm:pt-16">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold sm:text-6xl">Portfolio</h1>
            <p className="mt-2 text-gray-600">Tất cả dự án của XUONGART</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="search-container relative">
              <div 
                className={`bg-white shadow-sm overflow-hidden transition-all duration-300 ease-out border-2 ${
                  showSuggestions ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'
                } ${
                  isSearchFocused 
                    ? 'border-gray-300 shadow-md' 
                    : 'border-transparent'
                } ${showSuggestions ? 'shadow-none border-b-transparent' : ''}`}
                style={{
                  width: isSearchFocused ? '600px' : '260px',
                  minWidth: '260px'
                }}
              >
                <div className="relative flex items-center px-3 py-1">
                  <div className={`w-full bg-gray-100 flex items-center ${
                    showSuggestions ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'
                  }`}>
                    <FiSearch className="absolute left-5 text-gray-500 text-lg pointer-events-none" />
                    <input
                      className={`w-full bg-transparent pl-12 pr-4 py-3 text-sm text-black placeholder:text-gray-500 focus:outline-none border-none ${
                        showSuggestions ? 'rounded-t-2xl rounded-b-none' : 'rounded-full'
                      }`}
                      placeholder="Tìm dự án, khách hàng..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => {
                        setIsSearchFocused(true);
                        setShowSuggestions(true);
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setIsSearchFocused(false);
                          setShowSuggestions(false);
                        }, 150);
                      }}
                      onClick={() => {
                        setIsSearchFocused(true);
                        setShowSuggestions(true);
                      }}
                    />
                  </div>
                </div>
              </div>
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scaleY: 0 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -10, scaleY: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.4, 0.0, 0.2, 1],
                      scaleY: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="absolute top-full left-0 bg-white rounded-t-none rounded-b-2xl shadow-lg z-50 max-h-60 overflow-y-auto border-t-0 border border-gray-200"
                    style={{ 
                      transformOrigin: "top",
                      width: isSearchFocused ? '600px' : '260px',
                      minWidth: '260px'
                    }}
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className="w-full text-left px-4 py-3 text-sm text-black hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 last:rounded-b-xl"
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900"></div>
              <p className="mt-4 text-gray-600">Đang tải dự án...</p>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div
              layout
              className="mt-10 grid gap-1 sm:gap-2 grid-cols-1 sm:grid-cols-3 lg:grid-cols-3"
              style={{
                gridAutoRows: 'minmax(240px, auto)',
                gridAutoFlow: 'dense',
                maxWidth: '1400px',
                margin: '0 auto',
                alignItems: 'stretch'
              }}
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {pageItems.map((item, i) => (
                <MasonryCard
                  key={item.id}
                  item={item}
                  onOpen={openProject}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-2 pb-16">
          {Array.from({ length: totalPages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`min-w-[2rem] rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-[95vw] max-w-8xl h-[85vh] lg:h-[80vh] bg-neutral-950 rounded-2xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile top bar (black) with close button */}
              <div className="sm:hidden sticky top-0 z-20 bg-black/90 text-white px-4 py-3 flex justify-end">
                <button
                  onClick={closeProject}
                  className="p-2 rounded-full hover:bg-white/10 focus:outline-none"
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>
              {/* Desktop floating close button */}
              <button
                onClick={closeProject}
                className="hidden sm:flex absolute top-3 right-3 z-10 h-10 w-10 items-center justify-center rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Đóng"
              >
                ✕
              </button>

              <div className="flex flex-col lg:flex-row h-full w-full">
                <div className="relative w-full lg:w-2/3 h-1/2 lg:h-full bg-black">
                  {selected.video ? (
                    <video
                      src={selected.video}
                      className="h-full w-full object-contain"
                      controls
                      controlsList="nodownload nofullscreen noremoteplayback"
                      disablePictureInPicture
                      onContextMenu={(e) => e.preventDefault()}
                      autoPlay
                      playsInline
                      onClick={(e) => {
                        // Toggle play/pause on desktop
                        try {
                          if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                            const v = e.currentTarget;
                            if (v.paused) {
                              v.play();
                            } else {
                              v.pause();
                            }
                          }
                        } catch {}
                      }}
                    />
                  ) : selected.media ? (
                    <Image
                      src={selected.media}
                      alt={selected.title || "Project"}
                      fill
                      className="object-contain"
                    />
                  ) : selected.thumbnail ? (
                    <Image
                      src={selected.thumbnail}
                      alt={selected.title || "Project"}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white">Không có media</div>
                  )}
                </div>
                <div className="w-full lg:w-1/3 h-1/2 lg:h-full overflow-y-auto p-4 lg:p-6 bg-neutral-900/40 border-t lg:border-t-0 lg:border-l border-white/10">
                  {/* Mobile toggle for details */}
                  <div className="sm:hidden mb-3">
                    <button
                      onClick={() => setShowInfo(v => !v)}
                      className="inline-flex items-center rounded-full bg-white/10 text-white px-4 py-2 text-sm border border-white/20"
                    >
                      {showInfo ? 'Ẩn thông tin' : 'Xem thông tin'}
                    </button>
                  </div>
                  {(showInfo || typeof window === 'undefined') && (
                    <>
                      {/* 1. Tên dự án */}
                      <div className="font-display text-xl lg:text-2xl font-bold text-white leading-tight pr-8 lg:pr-16">
                        {selected.title}
                      </div>

                  {/* 2. Thời gian hoàn thành và Thể loại cùng hàng */}
                  <div className="mt-3 lg:mt-4 flex items-center gap-2 lg:gap-4 flex-wrap">
                    {selected.completionDate && (
                      <TimeAgo completionDate={selected.completionDate} className="text-neutral-300" />
                    )}
                    {/* Display multiple categories */}
                    {selected.categories && selected.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selected.categories.map((cat, index) => (
                          <div key={index} className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                            {cat}
                          </div>
                        ))}
                      </div>
                    )}
                    {!selected.categories && selected.category && (
                      <div className="inline-block px-2 py-1 bg-white/10 rounded-full text-xs text-white border border-white/20">
                        {selected.category}
                      </div>
                    )}
                  </div>

                      {/* 4. Author (không có label "Tác giả") */}
                      <div className="mt-4 lg:mt-6">
                        <AuthorAvatar size="md" textColor="text-white" />
                      </div>

                      {/* 5. Mô tả chi tiết */}
                      <div className="mt-4 lg:mt-6 space-y-2 lg:space-y-3 text-xs lg:text-sm text-neutral-200">
                        {selected.description && (
                          <div>
                            <RichTextRenderer 
                              content={selected.description} 
                              className="text-neutral-200 leading-relaxed" 
                            />
                          </div>
                        )}
                        {selected.fullDescription && (
                          <div>
                            <RichTextRenderer 
                              content={selected.fullDescription} 
                              className="text-neutral-200 leading-relaxed" 
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}