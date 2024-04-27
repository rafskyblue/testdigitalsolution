import React from "react";
import ProductList from "./components/produklist";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome To XYZ Test Page</p>
        <ProductList />
      </header>
    </div>
  );
}

export default App;
