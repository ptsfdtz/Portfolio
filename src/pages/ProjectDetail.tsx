import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { FaWindows, FaApple, FaLinux, FaDownload, FaAndroid } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import Dropdown from '../components/Dropdown';

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
  const [releaseAssets, setReleaseAssets] = useState<{ name: string; url: string }[]>([]);
  const [releaseError, setReleaseError] = useState<string | null>(null);
  const [, setReleaseLoading] = useState(false);
  const [userOS, setUserOS] = useState<string>('unknown');
  const [, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('win')) setUserOS('windows');
    else if (ua.includes('mac')) setUserOS('mac');
    else if (ua.includes('linux')) setUserOS('linux');
    else if (ua.includes('android')) setUserOS('android');
  }, []);

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
    setReleaseAssets([]);
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

        const assets = Array.isArray(data.assets)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.assets.map((item: any) => ({
              name: item.name,
              url: item.browser_download_url,
            }))
          : [];

        if (assets.length > 0) {
          setReleaseAssets(assets);
        } else if (data.html_url) {
          setReleaseAssets([{ name: 'Latest Release', url: data.html_url }]);
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

  const getAssetIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.endsWith('.exe') || lower.endsWith('.msi')) return <FaWindows className="w-5 h-5" />;
    if (
      lower.endsWith('.dmg') ||
      lower.endsWith('.pkg') ||
      lower.includes('mac') ||
      lower.includes('darwin')
    )
      return <FaApple className="w-5 h-5" />;
    if (
      lower.endsWith('.deb') ||
      lower.endsWith('.rpm') ||
      lower.endsWith('.appimage') ||
      lower.includes('linux')
    )
      return <FaLinux className="w-5 h-5" />;
    if (lower.endsWith('.apk')) return <FaAndroid className="w-5 h-5" />;
    return <FaDownload className="w-5 h-5" />;
  };

  const isCompatible = (name: string) => {
    const lower = name.toLowerCase();
    if (userOS === 'windows' && (lower.endsWith('.exe') || lower.endsWith('.msi'))) return true;
    if (
      userOS === 'mac' &&
      (lower.endsWith('.dmg') || lower.endsWith('.pkg') || lower.includes('mac'))
    )
      return true;
    if (
      userOS === 'linux' &&
      (lower.endsWith('.deb') || lower.endsWith('.rpm') || lower.endsWith('.appimage'))
    )
      return true;
    if (userOS === 'android' && lower.endsWith('.apk')) return true;
    return false;
  };

  const recommendedAsset = releaseAssets.find(asset => isCompatible(asset.name));

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
    <div className="max-w-7xl mx-auto text-gray-800 dark:text-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex h-12 font-bold items-center gap-2 text-xl text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <span
                className={`text-xs uppercase tracking-wide font-semibold px-2.5 py-1 rounded-full border 
                  ${
                    project.category === 'web'
                      ? 'text-blue-600 border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                      : 'text-emerald-600 border-emerald-100 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                  }`}
              >
                {categoryLabel}
              </span>
              <span className="text-base text-gray-400 dark:text-gray-500">ID: {project.id}</span>
            </div>
            <span
              className={`text-xs tracking-wide font-semibold px-2.5 py-1 rounded-full border ${statusStyles[project.status]}`}
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
            <div className="grid gap-3 p-3 md:p-4 md:grid-cols-3 auto-rows-[250px]">
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
            <Dropdown
              assets={releaseAssets}
              recommendedAsset={recommendedAsset}
              getAssetIcon={getAssetIcon}
              isCompatible={isCompatible}
            />
          )}
        </div>

        {releaseError && project.category === 'desktop' && !releaseAssets.length && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{releaseError}</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;
