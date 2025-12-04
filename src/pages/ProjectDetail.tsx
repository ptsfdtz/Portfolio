import React, { useEffect, useState } from 'react';
import { ArrowLeft, Download, ExternalLink, Github } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find(item => item.id === id);
  const categoryLabel = project?.category === 'web' ? 'Web' : 'Desktop';
  const statusStyles = {
    completed:
      'text-emerald-600 border-emerald-100 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300',
    'in-progress':
      'text-amber-600 border-amber-100 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300',
    'can-improve':
      'text-purple-600 border-purple-100 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800 dark:text-purple-300',
  } as const;
  const statusLabel = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    'can-improve': 'Can Improve',
  } as const;
  const [releaseUrl, setReleaseUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [releaseLabel, setReleaseLabel] = useState<string>('Latest Release');
  const [releaseError, setReleaseError] = useState<string | null>(null);
  const [releaseLoading, setReleaseLoading] = useState(false);

  const getRepoSlug = (url?: string | null) => {
    if (!url) return null;
    try {
      const parsed = new URL(url);
      const parts = parsed.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
      return null;
    } catch (error) {
      console.error('Invalid URL:', error);
    }
  };

  useEffect(() => {
    setReleaseUrl(null);
    setReleaseLabel('Latest Release');
    setReleaseError(null);
    setReleaseLoading(false);

    if (!project || project.category !== 'desktop' || !project.repoUrl) return;
    const slug = getRepoSlug(project.repoUrl);
    if (!slug) return;

    const controller = new AbortController();
    const loadRelease = async () => {
      try {
        setReleaseLoading(true);
        const response = await fetch(`https://api.github.com/repos/${slug}/releases/latest`, {
          headers: { Accept: 'application/vnd.github+json' },
          signal: controller.signal,
        });
        if (!response.ok) throw new Error(String(response.status));
        const data = await response.json();
        const asset = Array.isArray(data.assets)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.assets.find((item: any) => item.browser_download_url)
          : null;
        const url = asset?.browser_download_url ?? data.html_url;
        if (url) {
          setReleaseUrl(url);
          setReleaseLabel(asset?.name || data.name || 'Latest Release');
        } else {
          setReleaseError('No downloadable assets found.');
        }
      } catch (error) {
        if ((error as Error).name === 'AbortError') return;
        setReleaseError('Unable to fetch latest release.');
      } finally {
        setReleaseLoading(false);
      }
    };

    loadRelease();
    return () => controller.abort();
  }, [project]);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 opacity-60" />
          <span className="text-lg font-semibold">Project not found</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
        >
          Back to list
        </button>
      </div>
    );
  }

  const previewImage = project.imageUrls?.[0] ?? project.imageUrl;

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-gray-800 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span
                className={`text-[11px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border 
                  ${
                    project.category === 'web'
                      ? 'text-blue-600 border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                      : 'text-emerald-600 border-emerald-100 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                  }`}
              >
                {categoryLabel}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">ID: {project.id}</span>
            </div>
            <span
              className={`text-[11px] tracking-wide font-semibold px-2 py-0.5 rounded-full border ${statusStyles[project.status]}`}
            >
              {statusLabel[project.status]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs text-gray-500 dark:text-neutral-400 font-mono bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shadow-sm">
          {project.category === 'web' && project.demoUrl ? (
            <iframe
              src={project.demoUrl}
              title={project.title}
              className="w-full aspect-video border-0"
              allowFullScreen
            />
          ) : project.imageUrls && project.imageUrls.length > 1 ? (
            <div className="grid gap-3 p-3 md:p-4 md:grid-cols-3 auto-rows-[180px]">
              {project.imageUrls.map((image, index) => (
                <div
                  key={`${project.id}-image-${index}`}
                  className={`overflow-hidden rounded-xl border border-gray-100 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/70 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2 md:min-h-[360px]' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${project.title}-${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <img src={previewImage} alt={project.title} className="w-full object-cover" />
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Open Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
          {project.category === 'desktop' && (
            <a
              href={releaseUrl || '#'}
              target={releaseUrl ? '_blank' : undefined}
              rel={releaseUrl ? 'noreferrer' : undefined}
              onClick={e => {
                if (!releaseUrl) e.preventDefault();
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${
                releaseUrl
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500 border-indigo-700 dark:border-indigo-500'
                  : 'border-gray-200 dark:border-neutral-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
            >
              <Download className="w-4 h-4" />
              {releaseLoading
                ? 'Checking...'
                : releaseUrl
                  ? 'Download Latest'
                  : releaseError || 'No release available'}
            </a>
          )}
        </div>
        {releaseError && project.category === 'desktop' && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{releaseError}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
