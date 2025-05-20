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

4. **Add Environment Variables (Optional)**

   For enhanced security, add your API key as an environment variable in the Vercel dashboard:
   
   - Go to your project in the Vercel dashboard
   - Navigate to Settings > Environment Variables
   - Add a variable named `API_KEY` with the value `azulcafe-admin-123`
   - Apply to Production, Preview, and Development environments

5. **Testing Your Deployment**

   Visit the deployed URL to verify that your application works correctly:
   
   - Main page: `https://your-project-name.vercel.app`
   - Admin panel: `https://your-project-name.vercel.app/admin.html`
   - API health check: `https://your-project-name.vercel.app/api/health`

## Troubleshooting

- If your API endpoints return 404 errors, check that your `vercel.json` file is configured correctly
- If you see CORS errors, verify that your API endpoints are properly handling CORS headers
- For authentication issues, check that your API key is correctly set in both the client and server code

## Updating Your Deployment

After making changes to your code, simply run:

```
vercel
```

Or for immediate production deployment:

```
vercel --prod
```
