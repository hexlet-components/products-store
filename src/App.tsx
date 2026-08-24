import { MantineProvider } from "@mantine/core";
import Footer from "./components/Base/Footer";
import Header from "./components/Base/Header";
import AppRoutes from "./routes/Index";

// Провайдер живёт здесь, а не в точке входа: иначе тесты, рендерящие App,
// падают на первом же компоненте Mantine.
const App = () => (
  <MantineProvider>
    <div>
      <Header />

      <AppRoutes />

      <Footer />
    </div>
  </MantineProvider>
);

export default App;
