# Cloudflare Pages Deployment Guide

This guide covers deploying SageGUI to Cloudflare Pages at sage.ciris.ai.

## Prerequisites

1. Cloudflare account with Pages access
2. Wrangler CLI installed globally: `npm install -g wrangler`
3. Authenticated with Cloudflare: `wrangler login`

## Environment Configuration

### Production Environment Variables

The following environment variables are configured in `wrangler.toml` for production:

- `NEXT_PUBLIC_API_URL`: https://scoutapilb.ciris.ai
- `NEXTAUTH_URL`: https://sage.ciris.ai

### Secrets (Set via Cloudflare Dashboard or CLI)

Sensitive values should be set as secrets:

```bash
# Set via CLI
wrangler pages secret put CIRIS_API_KEY --project-name=sagegui
wrangler pages secret put NEXTAUTH_SECRET --project-name=sagegui
```

Or set them in the Cloudflare Dashboard:
1. Go to Workers & Pages > sagegui > Settings > Environment Variables
2. Add the production secrets

## Deployment Methods

### Method 1: Direct Deployment via Wrangler

```bash
# Install dependencies
npm install

# Build and deploy
npm run deploy
```

### Method 2: Connect GitHub Repository

1. Go to Cloudflare Dashboard > Workers & Pages
2. Create a new Pages project
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Root directory**: `/`
   - **Node version**: 18 or later

5. Set environment variables in the dashboard
6. Deploy

### Method 3: Manual Build and Deploy

```bash
# Build the application
npm run pages:build

# Deploy the built output
wrangler pages deploy .vercel/output/static --project-name=sagegui
```

## Local Development with Cloudflare

Test your application locally with Cloudflare Workers environment:

```bash
# Build the application
npm run pages:build

# Run local preview
npm run preview

# Or run directly with wrangler
npm run cf:dev
```

## Custom Domain Setup

The custom domain `sage.ciris.ai` is configured in `wrangler.toml`. To set it up:

1. Go to Cloudflare Dashboard > Workers & Pages > sagegui > Custom domains
2. Add `sage.ciris.ai`
3. Follow DNS configuration instructions
4. Wait for SSL certificate provisioning (usually a few minutes)

## Build Configuration

The application uses `@cloudflare/next-on-pages` to adapt Next.js for Cloudflare Pages:

- **Framework**: Next.js 14.2.8
- **Build adapter**: @cloudflare/next-on-pages
- **Output format**: Vercel build output (compatible with Cloudflare)
- **Compatibility flags**: nodejs_compat

## Troubleshooting

### Build Failures

If the build fails, check:
- Node.js version (must be 18+)
- All dependencies are installed
- No incompatible Next.js features (check @cloudflare/next-on-pages compatibility)

### Runtime Errors

- Check Cloudflare Pages logs in the dashboard
- Verify environment variables are set correctly
- Ensure API endpoint (scoutapilb.ciris.ai) is accessible

### Image Optimization

Cloudflare Pages doesn't support Next.js Image Optimization out of the box. The config has `images.unoptimized: true` set to handle this.

## Monitoring

Monitor your deployment:
- **Logs**: Cloudflare Dashboard > Workers & Pages > sagegui > Logs
- **Analytics**: Cloudflare Dashboard > Workers & Pages > sagegui > Analytics
- **Real-time logs**: `wrangler pages deployment tail`

## Rolling Back

To rollback to a previous deployment:

1. Go to Cloudflare Dashboard > Workers & Pages > sagegui > Deployments
2. Find the previous successful deployment
3. Click "Rollback to this deployment"

## CI/CD Integration

For automated deployments, add Cloudflare API token to your CI/CD:

```yaml
# Example GitHub Actions
- name: Deploy to Cloudflare Pages
  run: npm run deploy
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

## Support

For issues:
- Cloudflare Pages docs: https://developers.cloudflare.com/pages
- @cloudflare/next-on-pages: https://github.com/cloudflare/next-on-pages
- SageGUI issues: https://github.com/CIRISAI/SageGUI/issues
