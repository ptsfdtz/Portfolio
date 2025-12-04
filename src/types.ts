export type ThemeMode = 'light' | 'dark' | 'system';

export type ProjectCategory = 'web' | 'desktop';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string; // Legacy single preview (used as fallback)
  imageUrls?: string[]; // Optional multiple previews for desktop projects
  demoUrl?: string; // Used for iframe source
  repoUrl?: string;
  tags: string[];
}
