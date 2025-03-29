/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		// This helps with PDF.js compatibility
		config.resolve.alias.canvas = false;
		config.resolve.alias.encoding = false;
		return config;
	},
};

export default nextConfig;
