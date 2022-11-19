/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["cdn.discordapp.com"],
	},
	compiler: {
		styledComponents: true,
	},
};

module.exports = nextConfig;
