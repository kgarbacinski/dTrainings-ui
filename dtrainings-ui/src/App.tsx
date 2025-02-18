import React from 'react';
import logo from './logo.svg';
import './App.css';
import {WagmiProvider} from "wagmi";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {QueryClientProvider} from "@tanstack/react-query";
import {config, queryClient} from './config';
import Navbar from "./components/Navbar/Navbar";
import Account from "./components/Account/Account";

function App() {
  return (
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Navbar />
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
  );
}

export default App;
