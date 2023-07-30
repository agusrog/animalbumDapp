import { connector } from "@/config/web3";
import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";

declare global {
  interface Window{
    ethereum?: any
  }
}

const useWeb3Connector = () => {

const { activate, deactivate } = useWeb3React();

const connect = (): void => {
  activate(connector);
  localStorage.setItem('previouslyConnected', 'true');
};

const disconnect = (): void => {
  deactivate();
  localStorage.removeItem('previouslyConnected');
};

useEffect(() => {
  if (localStorage.getItem('previouslyConnected') === 'true') connect();
}, []);

  return {
    connect,
    disconnect
  };
};

export default useWeb3Connector;