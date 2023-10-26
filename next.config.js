/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer, nextRuntime, webpack }) => {
    // Avoid AWS SDK Node.js require issue
    if (isServer && nextRuntime === "nodejs") {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    }

    config.externals.push({
      '@aws-sdk/signature-v4-multi-region': 'commonjs @aws-sdk/signature-v4-multi-region',
    })

    return config;
  },
};

module.exports = nextConfig;
