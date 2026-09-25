import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClipboardCheck, LayoutGrid, Shield, Users } from "lucide-react";
import Navbar from "./components/Navbar";
import PageContainer from "./components/PageContainer";
import EmptyState from "./components/EmptyState";
import Home from "./routes/Home";
import Game from "./routes/Game";
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
    element: (
      <PageContainer>
        <EmptyState
          icon={ClipboardCheck}
          title="Participações"
          message="Esta página está em construção."
        />
      </PageContainer>
    ),
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
    </BrowserRouter>
  );
};

export default App;
