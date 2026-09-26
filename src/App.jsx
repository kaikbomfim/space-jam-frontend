import { ClipboardCheck, LayoutGrid, Shield, Users } from "lucide-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ToastProvider from "./components/ToastProvider";
import Game from "./routes/Game";
import Home from "./routes/Home";
import Participation from "./routes/Participation";
import Player from "./routes/Player";
import Team from "./routes/Team";

const routes = [
  {
    path: "/games",
    label: "Jogos",
    icon: LayoutGrid,
    element: <Game />,
  },
  {
    path: "/participations",
    label: "Participações",
    icon: ClipboardCheck,
    element: <Participation />,
  },
  {
    path: "/players",
    label: "Jogadores",
    icon: Users,
    element: <Player />,
  },
  {
    path: "/teams",
    label: "Times",
    icon: Shield,
    element: <Team />,
  },
];

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <div className="min-h-screen">
          <Navbar routes={routes} />
          <main className="px-4 pb-16 pt-12 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
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
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
