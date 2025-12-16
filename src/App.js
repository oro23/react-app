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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ZuPosts from "./components/ZuPosts";
import RefDemo from "./components/RefDemo";
// import PureComp from "./components/PureComp";
// import { useState } from "react";

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
  const querClient = new QueryClient();
  // const [name, setName] = useState("John");

  // const handleClick = (val) => {
  //   setName(val);
  // };

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <QueryClientProvider client={querClient}>
          <MoviesProvider>
            <ProductsProvider>
              {/* <UseContext /> */}
              {/* <AxiosForm /> */}
              {/* <FormikForm /> */}
              <div className={`App`}>
                <Navbar />
                {/* <ZuPosts /> */}
                <RefDemo />
                {/* <PureComp name={name} />
                <button onClick={() => handleClick("Muqeeet")}>
                  Set Muqeet
                </button>
                <button onClick={() => handleClick("Jhon")}>Set Jhon</button>
                <button onClick={() => handleClick("Jhon")}>Set Jhon</button> */}
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
        </QueryClientProvider>
      </ThemeContextProvider>
    </Provider>
  );
}

export default App;
