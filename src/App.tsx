import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectDetail from './pages/ProjectDetail';
import { projects } from './data/projects';
import type { ProjectCategory, ProjectStatus } from './types';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [categoryFilter, setCategoryFilter] = useState<'all' | ProjectCategory>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ProjectStatus>('all');

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        project =>
          (categoryFilter === 'all' || project.category === categoryFilter) &&
          (statusFilter === 'all' || project.status === statusFilter)
      ),
    [categoryFilter, statusFilter]
  );

  const chipBase =
    'relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer';
  const chipActive = 'text-white dark:text-black';
  const chipInactive = 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white';

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 font-sans selection:bg-gray-200 dark:selection:bg-gray-800">
      <Header currentTheme={theme} onThemeChange={setTheme} />

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-center gap-6 bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl px-6 py-4 shadow-sm max-w-4xl mx-auto mb-10">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Type
                    </span>
                    <div className="relative flex gap-1 bg-white dark:bg-black/40 rounded-full p-1">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'web', label: 'Web' },
                        { value: 'desktop', label: 'Desktop' },
                      ].map(option => {
                        const active = categoryFilter === option.value;
                        return (
                          <button
                            key={option.value}
                            className={`${chipBase} ${active ? chipActive : chipInactive}`}
                            onClick={() => setCategoryFilter(option.value as typeof categoryFilter)}
                          >
                            {active && (
                              <motion.span
                                layoutId="category-pill"
                                className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white shadow-sm"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="hidden md:block h-6 w-px bg-gray-200 dark:bg-neutral-800" />

                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Status
                    </span>
                    <div className="relative flex gap-1 bg-white dark:bg-black/40 rounded-full p-1">
                      {[
                        { value: 'all', label: 'All' },
                        { value: 'completed', label: 'Done' },
                        { value: 'in-progress', label: 'Ongoing' },
                        { value: 'can-improve', label: 'Improving' },
                      ].map(option => {
                        const active = statusFilter === option.value;
                        return (
                          <button
                            key={option.value}
                            className={`${chipBase} ${active ? chipActive : chipInactive}`}
                            onClick={() => setStatusFilter(option.value as typeof statusFilter)}
                          >
                            {active && (
                              <motion.span
                                layoutId="status-pill"
                                className="absolute inset-0 rounded-full bg-gray-900 dark:bg-white shadow-sm"
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10 border border-dashed border-gray-200 dark:border-neutral-800 rounded-2xl">
                      No projects match these filters yet.
                    </div>
                  )}
                </div>
              </div>
            }
          />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
