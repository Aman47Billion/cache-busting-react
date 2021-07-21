import "./App.css";
import CacheBusting from "./Components/CacheBusting";
import packageJson from "../package.json";
import { useEffect, useState } from "react";

const App = () => {
  return (
    <div className="App">
      <h4>Welcome To React Cache Busting....</h4>
      <h4>47 Billion v-{packageJson.version}</h4>
      <CacheBusting />
    </div>
  );
};

export default App;
