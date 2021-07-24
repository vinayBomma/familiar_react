import Groups from "./pages/Groups";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import SignIn from "./pages/SignIn";
import Map from "./components/Map";

function App() {
  const theme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#00897B",
      },
    },
  });

  const PrivateRoute = ({children, ...rest}) => {
    return (
      <Route
        {...rest}
        render={() => {
          const user = JSON.parse(localStorage.getItem("profile"));
          return user ? children : <Redirect to="/signin" />;
        }}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar>
            <Switch>
              <PrivateRoute exact path="/">
                <Groups />
              </PrivateRoute>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/map">
                <Map />
              </Route>
            </Switch>
          </Navbar>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
