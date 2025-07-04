import { BrowserRouter, Routes, Route } from "react-router";
// import NavigationComponent from './components/navigation/navigation.component';
import IndexPage from './pages/index.page';
import MatadorPage from './pages/matador.page';
import NavigationComponent from './components/templates/navigation/navigation.component';
import "../src/styles/global/main.scss";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import TodosPage from "./pages/todos.page";

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <main>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavigationComponent />
          <div style={{ marginTop: '50px', position: 'relative' }}>
            <Routes>
              <Route index element={
                <IndexPage />
              } />
              <Route path="/matador" element={
                <MatadorPage />
              } />
              <Route path="/todos" element={
                <TodosPage />
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </QueryClientProvider>

      </main>
    </>
  )
}

export default App
