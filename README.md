# Personal Website

This is my personal website built with Fresh, a next-gen web framework for Deno. The site includes sections for my about page, CV, contact information, blog posts, and personal statistics. The project is open source and built with modern web technologies.

## Features

- 📝 About Me
- 📄 CV
- 📬 Contact Information
- 📚 Blog
- 📊 Personal Statistics
- And more...

## Technology Stack

- [Fresh](https://fresh.deno.dev/) - The next-gen web framework for Deno
- [Deno](https://deno.land/) - A modern runtime for JavaScript and TypeScript
- [Deno Deploy](https://deno.com/deploy) - Global deployment platform for Deno applications
- [TypeScript](https://www.typescriptlang.org/) - For type-safe code
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Preact](https://preactjs.com/) - For UI components

## Development

### Prerequisites

Make sure to install Deno: https://deno.land/manual/getting_started/installation

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/hrvoje-pavlinovic/hrvoje-pavlinovic.git
cd hrvoje-pavlinovic
```

2. Start the development server:
```bash
deno task start
```

This will watch the project directory and restart as necessary.

## Project Structure

- `/routes` - Page routes and API endpoints
- `/components` - Reusable UI components
- `/islands` - Interactive components with client-side JavaScript
- `/static` - Static assets
- `/utils` - Utility functions and helpers

## Backlog

- [ ] webstats handling of snooping (wp-admin requests logged)
- [ ] crossposting blog stuff on substack etc. or scrapping data from there and showing it on blog
- [ ] extract all personal data to json and pull it out instead of having it hardcoded
- [ ] add all linktree links to contact page

## License

MIT License

Copyright (c) 2025 Hrvoje Pavlinovic

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
