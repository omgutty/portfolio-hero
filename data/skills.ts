export interface Skill {
  name: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Test Automation',
    skills: [
      { name: 'Playwright' },
      { name: 'Selenium' },
      { name: 'Cypress' },
      { name: 'Appium' },
    ],
  },
  {
    title: 'Languages & Frameworks',
    skills: [
      { name: 'TypeScript' },
      { name: 'JavaScript' },
      { name: 'Java' },
      { name: 'Python' },
    ],
  },
  {
    title: 'API & Integration Testing',
    skills: [
      { name: 'REST Assured' },
      { name: 'Postman' },
      { name: 'GraphQL' },
      { name: 'Contract Testing' },
    ],
  },
  {
    title: 'CI/CD & Cloud',
    skills: [
      { name: 'Jenkins' },
      { name: 'GitHub Actions' },
      { name: 'Docker' },
      { name: 'AWS' },
    ],
  },
  {
    title: 'AI & Quality Engineering',
    skills: [
      { name: 'AI-Assisted QA' },
      { name: 'AI Automation' },
      { name: 'Quality Engineering' },
      { name: 'Test Strategy' },
    ],
  },
]
