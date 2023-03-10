import { MantineProvider } from "@mantine/core";
import Main from "./pages/Main";
import "./App.css"

const App = () => {
  return (
    <div className="app">
      <div className="wrapper">
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
        <div><span className="dot"></span></div>
      </div>
      <div style={{ height: "100vh", position: "relative" }}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "'Work Sans', sans-serif",
          components: {
            Container: {
              styles: {
                root: {
                  padding: 0
                }
              }
            }
          }
        }}
      >
        <Main />
      </MantineProvider>
      </div>
    </div>
  );
};

export default App;