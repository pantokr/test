import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.lms",
  appName: "lms",
  webDir: "dist",
  server: {
    androidScheme: "http",
    allowNavigation: ["192.168.0.77:3000", "192.168.0.*", "localhost:*"],
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
