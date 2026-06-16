import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.syngenta.tr.catalog',
  appName: 'Syngenta TR',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      backgroundColor: '#00004b',
      showSpinner: false,
      launchFadeOutDuration: 500,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
