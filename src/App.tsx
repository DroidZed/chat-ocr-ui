import NavBar from './components/custom/NavBar';
import { defaultQueryClient } from './core/network/queryClient';
import HomeScreen from './pages/HomeScreen';
import { QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  return (
    <QueryClientProvider client={defaultQueryClient}>
      <main className="flex flex-col h-full w-full">
        <NavBar />
        <HomeScreen />
      </main>
    </QueryClientProvider>
  );
}
