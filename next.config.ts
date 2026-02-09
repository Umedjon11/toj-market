import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Все запросы на /api-proxy/... уйдут на ваш сервер
        source: '/api-proxy/:path*',
        destination: 'http://34.55.198.124:8080*',
      },
    ];
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);