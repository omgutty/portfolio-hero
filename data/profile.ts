export interface Profile {
  name: string
  title: string
  tagline: string
  summary: string
  stats: Array<{ value: string; label: string }>
}

export const profile: Profile = {
  name: 'Om Gutty',
  title: 'Lead QA Engineer | SDET | Automation Architect',
  tagline: 'Quality engineered. Systems trusted.',
  summary:
    '13+ years of experience in Quality Engineering, Test Automation, Playwright, Selenium, API Testing, CI/CD, Cloud Testing and AI-assisted QA. Passionate about building resilient automation frameworks, driving test strategies, and shipping software with confidence.',
  stats: [
    { value: '13+', label: 'Years experience' },
    { value: '95%', label: 'Test coverage achieved' },
    { value: '50+', label: 'Projects automated' },
  ],
}
