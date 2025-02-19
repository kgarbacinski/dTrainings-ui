import React from 'react';
import './App.css';
import {WagmiProvider} from "wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {QueryClientProvider} from "@tanstack/react-query";
import {config, queryClient} from './config';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import GlobalStyle from "./GlobalStyle";
import TrainingsManager from "./components/TrainingsManager/TrainingsManager";

function App() {
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
              <GlobalStyle />

              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trainings-manager" element={<TrainingsManager />} />
              </Routes>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
}

export default App;
