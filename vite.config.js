import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh';

export default defineConfig({
  plugins: [reactRefresh()],
  base: '/Taskylo/', // Replace 'todo-app' with your repo name
});

