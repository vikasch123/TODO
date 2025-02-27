# Todo List Application with CI/CD Pipeline

This project is a React-based Todo List application with a complete CI/CD pipeline implemented using GitHub Actions.

## Features

- Add, edit, and delete tasks
- Categorize tasks (Work, Personal, Urgent, Other)
- Set due dates for tasks
- Filter and sort tasks
- Persistent storage using Supabase (or localStorage for development)

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline that automates the following processes:

1. **Continuous Integration**:
   - Automated code linting
   - Building the application
   - (Future enhancement: Automated testing)

2. **Continuous Deployment**:
   - Automatic deployment to Netlify when changes are pushed to the main branch
   - Separate workflow for Supabase database migrations

## Pipeline Architecture

![CI/CD Pipeline Architecture](https://www.plantuml.com/plantuml/png/TP31QiCm38RlUGgVk_W1QHfAQgf0GHURsqfLaaf9iRt9lFRqzzy-EEwR5XvdptxVhsRmHBa2Xh2aGTi9CJDeIEYAOmGI5G1lOLSKJHWQH2Ik7Xn3_mHDnOUj5-vJvSgNfXJZQKMZOULbIL9Kj5_u0_u1VmC-0000)

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- GitHub account
- Netlify account
- Supabase account (for production database)

### Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Setting Up CI/CD Pipeline

1. **GitHub Repository Setup**:
   - Push your code to a GitHub repository
   - Ensure the repository has the `.github/workflows` directory with the workflow files

2. **Netlify Setup**:
   - Create a new site on Netlify
   - Get your Netlify Site ID and Auth Token
   - Add these as secrets in your GitHub repository:
     - `NETLIFY_SITE_ID`
     - `NETLIFY_AUTH_TOKEN`

3. **Supabase Setup** (for production):
   - Create a Supabase project
   - Get your Supabase Project ID and Access Token
   - Add these as secrets in your GitHub repository:
     - `SUPABASE_PROJECT_ID`
     - `SUPABASE_ACCESS_TOKEN`

## Workflow Details

### CI/CD Workflow (`ci-cd.yml`)

This workflow runs on every push to the main branch and on pull requests:

1. Checks out the code
2. Sets up Node.js
3. Installs dependencies
4. Lints the code
5. Builds the application
6. Deploys to Netlify (only on pushes to main)

### Supabase Migration Workflow (`supabase-migration.yml`)

This workflow runs when changes are made to migration files:

1. Checks out the code
2. Sets up the Supabase CLI
3. Applies migrations to your Supabase project

## Future Enhancements

- Add automated testing to the CI pipeline
- Implement staging environments
- Add performance monitoring
- Set up automated database backups

## License

MIT