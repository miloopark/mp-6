# MP6 OAuth Demo

A simple Next.js application demonstrating OAuth authentication with GitHub using raw `fetch()` calls—no Auth.js or helper packages. Includes extra credit for a two-fetch implementation.

## Features

- GitHub OAuth sign-in using a custom OAuth App
- Exactly two `fetch()` calls: one for token exchange and one for fetching user info
- App Router (no `pages/` folder or `getServerSideProps`)
- CSS Modules for component-scoped styling
- Environment variable configuration for dev and prod
- **Extra Credit:** No delegate packages (Auth.js/NextAuth) used

## Prerequisites

- Node.js v16 or later
- A GitHub account to register an OAuth App

## Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url> mp-6
   cd mp-6
