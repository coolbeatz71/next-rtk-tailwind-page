export default {
    "*.{jsx,js,json,css,scss,md,tsx,ts}": "biome check --write",
    "*.{ts,tsx}": [() => "tsc --skipLibCheck --noEmit"]
};
