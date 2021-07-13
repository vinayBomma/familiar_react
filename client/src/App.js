import "./App.css";
import Groups from "./pages/Groups";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Settings from "./components/Settings";

function App() {
  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar>
            <Switch>
              <Route exact path="/">
                <Groups />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
            </Switch>
          </Navbar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
