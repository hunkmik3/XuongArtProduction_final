"use client";
import { useEffect, useMemo, useState } from "react";
import { PROJECTS, PROJECT_TYPES } from "@/constants/projects";
import Container from "@/components/Container";
import { motion, AnimatePresence } from "framer-motion";

const PAGE_SIZE = 8;

const GlitchCard = ({ item }) => {
  const isVideo = /(mp4|webm|ogg)$/i.test(item.media);
  return (
    <motion.div
      layout
      className="relative group overflow-hidden rounded-2xl bg-neutral-900 text-white shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        {isVideo ? (
          <video src={item.media} autoPlay muted loop playsInline className="h-full w-full object-cover" />
        ) : (
          <img src={item.media} alt={item.title} className="h-full w-full object-cover" />
        )}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          <div className="absolute inset-0 mix-blend-screen glitch-lines" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="text-xs uppercase tracking-widest text-neutral-300">{item.type}</div>
            <div className="mt-1 font-display text-xl font-semibold">{item.title}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let items = PROJECTS.filter((p) =>
      [p.title, p.client, p.tagline].some((x) => (x || "").toLowerCase().includes(q))
    );
    if (category !== "Tất cả") items = items.filter((p) => p.type === category);
    return items;
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => setPage(1), [query, category]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  return (
    <main className="bg-black text-white">
      <Container className="pt-24 sm:pt-32">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-4xl font-semibold sm:text-6xl">Portfolio</h1>
            <p className="mt-2 text-neutral-400">Tất cả dự án của XưởngArt</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input
              className="w-full rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Tìm dự án, khách hàng..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="rounded-xl border border-white/10 bg-neutral-900 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:balance]"
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {pageItems.map((item, i) => (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                className={i % 5 === 0 ? "mb-6 break-inside-avoid md:mb-8 lg:mb-10" : "mb-6 break-inside-avoid"}
              >
                <GlitchCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

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
                  active ? "bg-white text-black" : "bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
