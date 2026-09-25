import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Team from "./routes/Team";

const routes = [
  {
    path: "/games",
    label: "Jogos",
    element: <div className="text-xl">Página de Jogos</div>,
  },
  {
    path: "/participations",
    label: "Participações",
    element: <div className="text-xl">Página de Participações</div>,
  },
  {
    path: "/players",
    label: "Jogadores",
    element: <div className="text-xl">Página de Jogadores</div>,
  },
  {
    path: "/teams",
    label: "Times",
    element: <Team />,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar routes={routes} />
        <main className="p-8">
          <Routes>
            <Route
              path="/"
              element={<div className="text-xl">Bem-vindo ao SpaceJam</div>}
            />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
