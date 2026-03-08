/// <reference types="vite/client" />

declare module "*.webp" {
  const src: string | { src: string };
  export default src;
}
