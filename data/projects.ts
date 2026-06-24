export interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
}

export const projects: Project[] = [
  {
    title: 'Automation Framework Architecture',
    description:
      'Designed and implemented a scalable, cross-browser test automation framework using Playwright and TypeScript, achieving 95% test coverage across 10+ microservices.',
    tags: ['Playwright', 'TypeScript', 'Docker', 'Jenkins'],
    github: 'https://github.com/omgutty',
  },
  {
    title: 'CI/CD Pipeline Optimization',
    description:
      'Architected parallel test execution pipelines on GitHub Actions and Jenkins, reducing regression suite runtime from 4 hours to under 25 minutes.',
    tags: ['GitHub Actions', 'Jenkins', 'Docker', 'AWS'],
    github: 'https://github.com/omgutty',
  },
  {
    title: 'AI-Assisted Test Generation',
    description:
      'Leveraged AI/ML models to auto-generate test cases and edge-case scenarios from user stories and API contracts, improving defect detection by 40%.',
    tags: ['AI Automation', 'Python', 'REST Assured', 'QA Strategy'],
    github: 'https://github.com/omgutty',
  },
]
