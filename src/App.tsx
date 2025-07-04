import { BrowserRouter, Routes, Route } from "react-router";
import IndexPage from './pages/index.page';
import "../src/styles/global/main.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <main>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route index element={
                <IndexPage />
              } />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>

      </main>
    </>
  )
}

export default App
