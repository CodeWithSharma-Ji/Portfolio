try {
  const savedTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', savedTheme || systemTheme);
} catch (error) {
  document.documentElement.setAttribute('data-theme', 'light');
}
