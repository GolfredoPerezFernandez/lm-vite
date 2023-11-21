import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'lm.vite',
  appName: 'lm-vite',
  webDir: 'build',
  server: {
    url: "https://lm-vite-sparkling-meadow-807.fly.dev/",
    cleartext: true  }
};

export default config;
