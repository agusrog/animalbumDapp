import { useMemo } from "react";
import Animalbum from "../artifacts/Animalbum";
import { useWeb3React } from "@web3-react/core";

const useContract = () => {
  
  const { active, chainId, library } = useWeb3React();

  const contract = useMemo(() => {
    if (active) return new library.eth.Contract(Animalbum.abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  }, [active, chainId, library?.eth?.Contract]);

  return contract;
};

export default useContract;