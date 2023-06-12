## Beatsheet Coding Exercise

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It uses the css library [tailwind.css](https://tailwindcss.com/).

The compiled front end code is available on [https://beatsheet.vercel.app/](https://beatsheet.vercel.app/). To run the backend services, follow the instructions on the following repository to get a Docker container running locally (the front end app points to the local endpoint): [beatsheet-exercise](https://github.com/fmatar/beatsheet-exercise)

Users can add acts, which serve as containers for beats (shots, scenes, lines, etc.). They can also add beats within each act container. They can delete acts (deleting beats within them) and delete beats. They can also edit beats.

Potential future improvements: allow users to drag and rearrange the beat cards within the acts and the acts themselves. Allow users to uploda a storyboard panel or other visual reference that can be revealed through "flipping" the cards.

Screenshot of initial load:



If you would rather run the code locally, follow the below instructions:

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
