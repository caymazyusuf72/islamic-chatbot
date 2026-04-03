import type {NextConfig} from 'next';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'recharts'],
  },
  // Suppress warnings for optional dependencies
  webpack: (config, { isServer }) => {
    // Ignore optional OpenTelemetry and Firebase dependencies
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push({
        '@opentelemetry/exporter-jaeger': 'commonjs @opentelemetry/exporter-jaeger',
        '@opentelemetry/exporter-zipkin': 'commonjs @opentelemetry/exporter-zipkin',
        '@opentelemetry/exporter-prometheus': 'commonjs @opentelemetry/exporter-prometheus',
        '@genkit-ai/firebase': 'commonjs @genkit-ai/firebase',
        'handlebars': 'commonjs handlebars',
      });
    }
    
    // Aggressively suppress all warnings
    config.ignoreWarnings = [
      // Module not found warnings
      { module: /node_modules\/@opentelemetry/ },
      { module: /node_modules\/@genkit-ai/ },
      { module: /node_modules\/handlebars/ },
      // Specific warning patterns
      /Can't resolve '@opentelemetry\/exporter-jaeger'/,
      /Can't resolve '@genkit-ai\/firebase'/,
      /require\.extensions/,
      /Critical dependency/,
      // Catch-all for any remaining warnings
      () => true,
    ];
    
    // Disable performance hints
    config.performance = {
      hints: false,
    };
    
    return config;
  },
  // Set output file tracing root to suppress lockfile warning
  outputFileTracingRoot: process.cwd(),
};

export default withBundleAnalyzer(nextConfig);
