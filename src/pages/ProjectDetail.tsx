import React from 'react';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const project = projects.find(item => item.id === id);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 text-gray-800 dark:text-gray-100">
        <div className="flex items-center gap-3">
          <ArrowLeft className="w-5 h-5 opacity-60" />
          <span className="text-lg font-semibold">未找到该项目</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
        >
          返回列表
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
        返回
      </button>

      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span
              className={`text-[11px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-full border 
                ${
                  project.category === 'web'
                    ? 'text-blue-600 border-blue-100 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300'
                    : 'text-emerald-600 border-emerald-100 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300'
                }`}
            >
              {project.category}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">ID: {project.id}</span>
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
              打开演示
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
              查看代码
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
