import "./App.css";
// import Click from "./components/Click";
// import ClickCount from "./components/ClickCount";
// import Greet from "./components/Greet";
import Navbar from "./components/Navbar";
// import Tasks from "./components/Tasks";
// import UseCallback from "./components/UseCallback";
// import { createContext, useContext, useState, useEffect } from "react";
// import Panel from "./ui/Panel";
// import UsersList from "./components/UsersList";
// import { ThemeContext } from "./hooks/useTheme";
import { MoviesProvider } from "./context/MoviesContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ProductsProvider } from "./context/ProductContext";
import AppRoutes from "./routes/AppRoutes";
// import JsonPH from "./components/JsonPH";
// import AxiosForm from "./components/AxiosForm";
// import FormikForm from "./components/FormikForm";
// const ThemeContext = createContext("light");

// function UseContext() {
//   const theme = useContext(ThemeContext);
//   return (
//     <div>
//       <h1>Current Theme: {theme}</h1>
//     </div>
//   );
// }

function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <MoviesProvider>
          <ProductsProvider>
            {/* <UseContext /> */}
            {/* <AxiosForm /> */}
            {/* <FormikForm /> */}
            <div className={`App`}>
              <Navbar />
              {/* <JsonPH /> */}
              <header className="App-header container">
                {/* <Greet name="Alice">
            <h2>I'm a Senior Software Engineer</h2>
          </Greet> */}
                {/* <Click /> */}
                {/* <Tasks /> */}
                {/* <ClickCount /> */}
                {/* <UseEffectExample /> */}
                {/* <UseCallback /> */}
                {/* <Panel theme={theme} toggleTheme={toggleTheme} /> */}
                {/* <UsersList /> */}

                <AppRoutes />
              </header>
            </div>
          </ProductsProvider>
        </MoviesProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
