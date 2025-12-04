import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const previewImage = project.imageUrls?.[0] ?? project.imageUrl;

  // Spotlight effect refs
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse move for spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  // Handle hover delay for iframe loading
  useEffect(() => {
    if (isHovered && project.category === 'web' && project.demoUrl) {
      timeoutRef.current = window.setTimeout(() => {
        setShouldLoadIframe(true);
      }, 300);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldLoadIframe(false);
      setIframeLoaded(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovered, project.category, project.demoUrl]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative group w-full aspect-4/3 rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800/50 transition-all duration-300 hover:scale-[1.01]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/projects/${project.id}`)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/projects/${project.id}`);
        }
      }}
    >
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full w-full">
        {/* Default State: Minimal Text Info */}
        <div
          className={`absolute inset-0 p-6 flex flex-col justify-between transition-opacity duration-300 z-10 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        >
          <div>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                {project.title}
              </h3>
              <span
                className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full border 
                ${
                  project.category === 'web'
                    ? 'text-blue-600 border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                    : 'text-emerald-600 border-emerald-100 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                }`}
              >
                {project.category}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs text-gray-400 dark:text-neutral-500 font-mono bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hover State: Visual Preview */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 z-20 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Web Project: Iframe */}
          {project.category === 'web' && project.demoUrl ? (
            <div className="w-full h-full bg-white dark:bg-neutral-800 relative">
              {shouldLoadIframe ? (
                <>
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <Loader2 className="w-6 h-6 animate-spin" />
                    </div>
                  )}
                  <iframe
                    src={project.demoUrl}
                    title={project.title}
                    className={`w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIframeLoaded(true)}
                    style={{ pointerEvents: 'none' }}
                    tabIndex={-1}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-neutral-800 animate-pulse" />
              )}
            </div>
          ) : (
            // Desktop Project or No Demo: Image
            <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
          )}

          {/* Action Bar overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/80 via-black/40 to-transparent flex justify-end gap-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors pointer-events-auto"
                title="Visit Site"
                onClick={e => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-black/50 text-white backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors pointer-events-auto"
                title="View Code"
                onClick={e => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
