import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CarsGrid from './components/CarsGrid';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">CarHub</header>
        <CarsGrid />
      </div>
    </QueryClientProvider>
  );
}

export default App;
