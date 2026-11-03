# AqshaiDev Portfolio

A premium experimental, responsive personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS v4, React Three Fiber, Framer Motion, GSAP-ready architecture, and Lenis.

## Included

- Home, About, Projects, Skills, Contact, and interactive Terminal pages
- Uploaded portrait integrated as the About-page and homepage image
- Interactive 3D AQSHAIDEV wordmark (anchored, hover/click squash response)
- Dark/light theme toggle
- Ctrl/Cmd + K command palette
- Custom pointer cursor on fine-pointer devices
- Smooth scrolling with reduced-motion support
- GSAP ScrollTrigger reveal on the engineering principles section
- Responsive navigation and layouts
- GitHub links for public projects
- Contact via `mailto:someone17082@gmail.com`
- SEO metadata and Vercel-friendly configuration

## Requirements

- Node.js 20.9 or newer (Node 22 LTS recommended)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Create a GitHub repository and push this project.
2. Import the repository in Vercel.
3. Keep the framework preset as Next.js.
4. Deploy. No environment variables are required for the current version.

## Customize

- Project content: `src/lib/projects.ts`
- Skills: `src/lib/skills.ts`
- Portrait: `public/images/aqshai-portrait.png`
- Main homepage sections: `src/components/sections.tsx`
- Global design tokens and styling: `src/app/globals.css`

## Notes

- The contact CTA opens the visitor's email client; it does not send messages through a backend.
- Project descriptions are conservative summaries based on the supplied public project information. Review and adjust them to match the current state of each repository.
- The portfolio does not include the private Unite project.
- Skill progress bars are visual indicators for self-assessed labels, not measured proficiency scores.
- The 3D wordmark is rendered client-side; the static text fallback remains available before the 3D canvas loads.
- This is a source project. Run `npm install` and `npm run build` locally to verify dependency resolution and production compilation in your environment.
