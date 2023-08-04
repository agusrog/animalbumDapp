import { connector } from '@/config/web3';
import { IWeb3Connector } from '@/models/IHooks';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';

declare global {
  interface Window{
    ethereum?: any
  }
}

const useWeb3Connector = (): IWeb3Connector => {

const { activate, deactivate, account, library } = useWeb3React();
const [ balance, setBalance ] = useState(0);

const connect = (): void => {
  activate(connector);
  localStorage.setItem('previouslyConnected', 'true');
};

const disconnect = (): void => {
  deactivate();
  localStorage.removeItem('previouslyConnected');
};

const getBalance = async (): Promise<void> => {
    if (!library) return;
    const toSet = await library.eth.getBalance(account);
    setBalance(Number((toSet)) / 1e18);
  };

useEffect(() => {
  if (localStorage.getItem('previouslyConnected') === 'true') connect();
}, []);

useEffect(() => {
    getBalance();
  }, [library, account]);

  return {
    connect,
    disconnect,
    balance
  };
};

export default useWeb3Connector;