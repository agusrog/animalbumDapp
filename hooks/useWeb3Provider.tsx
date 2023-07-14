import { BrowserProvider, ethers, JsonRpcSigner } from "ethers";
import { useCallback, useEffect, useState } from "react";

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
  balance: number;
}

declare global {
    interface Window{
      ethereum?: any
    }
  }

const useWeb3Provider = () => {

  const initialWeb3State = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
    balance: 0,
  };

  const [state, setState] = useState<IWeb3State>(initialWeb3State);

  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return;

    try {
      const { ethereum } = window;

      if (!ethereum) {
        return console.log('ethereum error')
      }
      const provider = new ethers.BrowserProvider(ethereum);

      const accounts: string[] = await provider.send("eth_requestAccounts", []);

      if (accounts.length > 0) {
        const signer = await provider.getSigner();
        const chain = Number(await (await provider.getNetwork()).chainId);
        const balance = Number(await provider.getBalance(accounts[0] as ethers.AddressLike));

        setState({
          ...state,
          address: accounts[0],
          signer,
          currentChain: chain,
          provider,
          isAuthenticated: true,
          balance
        });
        localStorage.setItem("isAuthenticated", "true");
      }
    } catch {}
  }, [state]);

  const disconnect = () => {
    setState(initialWeb3State);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    if (window == null) return;

    if (localStorage.hasOwnProperty("isAuthenticated")) {
      connectWallet();
    }

  }, [connectWallet, state.isAuthenticated]);
  
  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    window.ethereum.on("accountsChanged", async (accounts: string[]) => {
      const balance = Number(await state.provider?.getBalance(accounts[0] as ethers.AddressLike));
      setState({ ...state, address: accounts[0], balance });
    });

    window.ethereum.on("chainChanged", async (network: string) => {
      setState({ ...state, currentChain: Number(network) });
    });

    return () => {
      window.ethereum.removeAllListeners();
    };
    
  }, [state]);

  return {
    connectWallet,
    disconnect,
    state,
  };
};

export default useWeb3Provider;