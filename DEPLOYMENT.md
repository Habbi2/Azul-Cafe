# Vercel Deployment

This file contains step-by-step instructions for deploying the Azul Café app to Vercel.

## Prerequisites

1. Node.js (version 14 or higher)
2. Git (for version control)
3. Vercel CLI (can be installed globally with `npm i -g vercel`)
4. Vercel account (sign up at [vercel.com](https://vercel.com))

## Deployment Steps

1. **Login to Vercel**

   Open your terminal and run:

   ```
   vercel login
   ```

   Follow the prompts to log in to your Vercel account.

2. **Deploy the Application**

   Navigate to your project directory and run:

   ```
   cd "c:\Users\javie\Desktop\Azul Café"
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? `y`
   - Which scope? (Select your account)
   - Link to existing project? `n`
   - Project name: `azul-cafe` (or your preferred name)
   - Directory to deploy: `.` (current directory)
   - Override settings? `n`

3. **Deploy to Production**

   After testing the preview deployment, deploy to production:

   ```
   vercel --prod
   ```

4. **Add Environment Variables (Required for Menu Persistence)**

   For menu updates to persist between sessions, you must set up environment variables:
   
   - Go to your project in the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add the following variables:
     - `API_KEY` with your chosen admin API key (e.g., `azulcafe-admin-123`)
     - `ADMIN_PASSWORD` with your chosen admin password
   - Apply to Production, Preview, and Development environments
   
   **Note**: The initial menu data is stored in these variables when you save changes from the admin panel.

5. **Testing Your Deployment**

   Visit the deployed URL to verify that your application works correctly:
   
   - Main menu page: `https://your-project-name.vercel.app`
   - Admin panel: `https://your-project-name.vercel.app/admin.html`
   - API health check: `https://your-project-name.vercel.app/api/health`
   
   Log in to the admin panel, make some changes to menu prices, save the changes, then refresh the main page 
   to verify that the changes persist.

## Troubleshooting

- If your API endpoints return 404 errors, check that your `vercel.json` file is configured correctly
- If you see CORS errors, verify that your API endpoints are properly handling CORS headers
- For authentication issues, check that your API key is correctly set in both the client and server code
- If menu updates don't persist:
  - Verify you've set up the environment variables correctly
  - Check the function logs in the Vercel dashboard for any errors
  - Try a fresh deployment with `vercel --prod` after setting variables

## Advanced: Setting Up Persistent Storage

For a more robust, production-ready solution, consider using one of Vercel's integrated database options:

1. **Vercel KV (Redis-based storage)**
   - Sign up for Vercel KV in your project dashboard
   - Update the `db.js` file to use the Vercel KV SDK
   - Example setup: `npm install @vercel/kv`

2. **MongoDB Atlas**
   - Create a free MongoDB Atlas account
   - Set up a cluster and get the connection string
   - Add the connection string as a `MONGODB_URI` environment variable
   - Update `db.js` to use MongoDB: `npm install mongodb`

3. **Supabase or PostgreSQL**
   - Set up a Supabase project
   - Get your API URL and key
   - Add as environment variables
   - Update `db.js` to use Supabase: `npm install @supabase/supabase-js`

## Updating Your Deployment

After making changes to your code, simply run:

```
vercel
```

Or for immediate production deployment:

```
vercel --prod
```
