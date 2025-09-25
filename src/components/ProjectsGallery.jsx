"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { MdPause, MdPlayArrow, MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { PROJECTS } from "@/constants/projects";

const projects = PROJECTS;

const DotNav = ({ sections, containerRef }) => {
  const { scrollYProgress } = useScroll({ container: containerRef });
  return (
    <div className="pointer-events-none fixed left-6 top-1/2 z-40 -translate-y-1/2">
      <div className="relative h-48 w-1 bg-neutral-700/40">
        <motion.div
          className="absolute left-0 top-0 h-0.5 w-1 bg-white"
          style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
        />
      </div>
      <ul className="mt-4 space-y-3">
        {sections.map((p, idx) => (
          <li key={p.id} className="pointer-events-auto">
            <a
              href={`#${p.id}`}
              className="block h-3 w-3 rounded-full border border-white/60 bg-white/10 hover:bg-[#D0232E]"
              aria-label={`Go to ${p.title}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProjectSection = ({ project, onOpen, isFirst = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  const isVid = /(mp4|webm|ogg)$/i.test(project.media);

  return (
    <section
      id={project.id}
      ref={ref}
      className={clsx(
        "relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden",
        isFirst ? "-mt-6 sm:-mt-8" : ""
      )}
    >
      {/* Background media */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: yBg }}>
        {isVid ? (
          <video
            src={project.media}
            muted
            loop
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <img
            src={project.media}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </motion.div>

      <motion.div
        className={clsx(
          "relative z-10 max-w-xl p-8 text-white",
          project.align === "left" ? "self-center mr-auto ml-16" : "self-center ml-auto mr-16 text-right"
        )}
        style={{ y: yText, opacity }}
        initial={{ opacity: 0, x: project.align === "left" ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-sm uppercase tracking-widest text-neutral-300">{project.client}</p>
        <h3 className="mt-2 font-display text-4xl font-semibold sm:text-6xl">{project.title}</h3>
        <p className="mt-4 text-lg text-neutral-200">{project.tagline}</p>
        <button
          onClick={() => onOpen(project)}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-[#D0232E]"
        >
          Xem nhanh
        </button>
      </motion.div>

    </section>
  );
};

const ProjectsGallery = () => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(null);
  return (
    <div ref={containerRef} className="relative bg-black">
      {projects.map((p, idx) => (
        <ProjectSection key={p.id} project={p} onOpen={setActive} isFirst={idx === 0} />
      ))}
      <div className="relative z-10 -mt-px bg-black py-16 text-center">
        <Link
          href="/portfolio"
          className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#D0232E] hover:text-white"
        >
          Xem tất cả dự án
        </Link>
      </div>

      {active && (
        <ProjectModal item={active} onClose={() => setActive(null)} />)
      }
    </div>
  );
};

const isVideoUrl = (url) => /(mp4|webm|ogg)$/i.test(url);
const isImageUrl = (url) => /(jpg|jpeg|png|webp|gif|svg)$/i.test(url);

const ProjectModal = ({ item, onClose }) => {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const [kind, setKind] = useState(isVideoUrl(item.media) ? "video" : "image");
  const [orientation, setOrientation] = useState("landscape");
  const [isPlaying, setIsPlaying] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);

  const handleVideoMeta = () => {
    const v = videoRef.current;
    if (!v) return;
    const ratio = v.videoWidth / v.videoHeight;
    setOrientation(ratio >= 1 ? "landscape" : "portrait");
    setDuration(v.duration || 0);
    v.volume = volume;
    v.muted = muted;
  };

  const handleImageLoad = () => {
    const i = imgRef.current;
    if (!i) return;
    const ratio = i.naturalWidth / i.naturalHeight;
    setOrientation(ratio >= 1 ? "landscape" : "portrait");
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className={clsx(
          "relative w-full max-w-[90vw] rounded-2xl bg-neutral-950 text-white shadow-2xl",
          kind === "video" && orientation === "portrait" ? "max-w-[80vw]" : "",
          kind === "image" ? "max-w-[70vw]" : ""
        )}
      >
        {kind === "video" ? (
          orientation === "portrait" ? (
            <div className="flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-start">
              <div className="relative mx-auto w-auto lg:mx-0">
                <video
                  ref={videoRef}
                  src={item.media}
                  onLoadedMetadata={handleVideoMeta}
                  className="mx-auto max-h-[90vh] rounded-xl bg-black"
                  autoPlay
                  loop
                  playsInline
                  onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                />
                <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white">
                  <button
                    onClick={() => {
                      const v = videoRef.current;
                      if (!v) return;
                      if (v.paused) {
                        v.play();
                        setIsPlaying(true);
                      } else {
                        v.pause();
                        setIsPlaying(false);
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    {isPlaying ? <MdPause /> : <MdPlayArrow />}
                  </button>
                  <button
                    onClick={() => {
                      const v = videoRef.current;
                      if (!v) return;
                      v.muted = !v.muted;
                      setMuted(v.muted);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    {muted ? <MdVolumeOff /> : <MdVolumeUp />}
                  </button>
                  <div
                    className="relative h-1 w-44 cursor-pointer rounded-full bg-white/20"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = (e.clientX - rect.left) / rect.width;
                      const v = videoRef.current;
                      if (!v || !duration) return;
                      v.currentTime = Math.max(0, Math.min(duration * pct, duration));
                      setCurrent(v.currentTime);
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-1 rounded-full bg-[#D0232E]"
                      style={{ width: duration ? `${(current / duration) * 100}%` : "0%" }}
                    />
                  </div>
                  
                  <div className="min-w-[64px] text-right text-xs tabular-nums">
                    {(() => {
                      const m1 = Math.floor(current / 60);
                      const s1 = String(Math.floor(current % 60)).padStart(2, "0");
                      const m2 = Math.floor(duration / 60);
                      const s2 = String(Math.floor(duration % 60)).padStart(2, "0");
                      return `${m1}:${s1} / ${m2}:${s2}`;
                    })()}
                  </div>
                </div>
              </div>
              <div className="lg:w-[420px] lg:py-2">
                <p className="text-xs uppercase tracking-widest text-neutral-400">{item.client}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-neutral-300">{item.tagline}</p>
                <div className="mt-6 flex gap-3">
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#D0232E] hover:text-white"
                  >
                    Xem chi tiết
                  </Link>
                  <button onClick={onClose} className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/40">Đóng</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="relative mx-auto w-full max-w-[64vw]" style={{ aspectRatio: "16/9" }}>
                <video
                  ref={videoRef}
                  src={item.media}
                  onLoadedMetadata={handleVideoMeta}
                  className="h-full w-full rounded-t-2xl object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                />
                <div className="pointer-events-auto absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white">
                  <button
                    onClick={() => {
                      const v = videoRef.current;
                      if (!v) return;
                      if (v.paused) {
                        v.play();
                        setIsPlaying(true);
                      } else {
                        v.pause();
                        setIsPlaying(false);
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    {isPlaying ? <MdPause /> : <MdPlayArrow />}
                  </button>
                  <button
                    onClick={() => {
                      const v = videoRef.current;
                      if (!v) return;
                      v.muted = !v.muted;
                      setMuted(v.muted);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                  >
                    {muted ? <MdVolumeOff /> : <MdVolumeUp />}
                  </button>
                  <div
                    className="relative h-1 w-full max-w-[60vw] cursor-pointer rounded-full bg-white/20"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = (e.clientX - rect.left) / rect.width;
                      const v = videoRef.current;
                      if (!v || !duration) return;
                      v.currentTime = Math.max(0, Math.min(duration * pct, duration));
                      setCurrent(v.currentTime);
                    }}
                  >
                    <div
                      className="absolute left-0 top-0 h-1 rounded-full bg-[#D0232E]"
                      style={{ width: duration ? `${(current / duration) * 100}%` : "0%" }}
                    />
                  </div>
                  
                  <div className="min-w-[72px] text-right text-xs tabular-nums">
                    {(() => {
                      const m1 = Math.floor(current / 60);
                      const s1 = String(Math.floor(current % 60)).padStart(2, "0");
                      const m2 = Math.floor(duration / 60);
                      const s2 = String(Math.floor(duration % 60)).padStart(2, "0");
                      return `${m1}:${s1} / ${m2}:${s2}`;
                    })()}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-neutral-400">{item.client}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-neutral-300">{item.tagline}</p>
                <div className="mt-6 flex gap-3">
                  <Link href="/portfolio" className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#D0232E] hover:text-white">Xem chi tiết</Link>
                  <button onClick={onClose} className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/40">Đóng</button>
                </div>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="relative mx-auto w-full max-w-[64vw]">
              <img
                ref={imgRef}
                src={item.media}
                onLoad={handleImageLoad}
                alt={item.title}
                className="h-auto w-full rounded-t-2xl object-contain"
              />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-neutral-400">{item.client}</p>
              <h3 className="mt-2 font-display text-3xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-neutral-300">{item.tagline}</p>
              <div className="mt-6 flex gap-3">
                <Link href="/portfolio" className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#D0232E] hover:text-white">Xem chi tiết</Link>
                <button onClick={onClose} className="rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:border-white/40">Đóng</button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProjectsGallery;


