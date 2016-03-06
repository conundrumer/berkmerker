var window = window || undefined
SystemJS.config({
  baseURL: (window && window.location.protocol === 'file:') ? '.' : '/',
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  }
});
