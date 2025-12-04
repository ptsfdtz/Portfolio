import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Coin-search',
    description: '虚拟货币价格走势查询网站。',
    category: 'web',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    demoUrl: 'https://ptsfdtz.github.io/Coin-search/',
    tags: ['React', 'javascript', 'API'],
    repoUrl: 'https://github.com/ptsfdtz/Coin-search',
  },
  {
    id: '2',
    title: 'LiteMark',
    description: '基于tauri的跨平台Markdown编辑器。',
    category: 'desktop',
    imageUrl: 'https://raw.githubusercontent.com/ptsfdtz/LiteMark/main/assets/preview.png',
    imageUrls: [
      'https://raw.githubusercontent.com/ptsfdtz/LiteMark/main/assets/preview.png',
      'https://raw.githubusercontent.com/ptsfdtz/LiteMark/main/assets/preview-dark.png',
      'https://raw.githubusercontent.com/ptsfdtz/LiteMark/main/assets/preview-light.png',
    ],
    tags: ['tauri', 'React', 'TypeScript'],
    repoUrl: 'https://github.com/ptsfdtz/LiteMark',
  },
];
