import NavBar from "./components/custom/NavBar";
import HomeScreen from "./pages/HomeScreen";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col h-full w-full">
        <NavBar />
        <HomeScreen />
      </main>
    </QueryClientProvider>
  );
}
