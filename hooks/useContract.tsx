import { useMemo } from "react";
import Animalbum from "../artifacts/Animalbum";
import { useWeb3React } from "@web3-react/core";

const useContract = () => {
  
  const { active, chainId, library } = useWeb3React();

  const contract = useMemo(() => {
    if (active) if (active) return new library.eth.Contract(Animalbum.abi, Animalbum.address);
  }, [active, chainId, library?.eth?.Contract]);

  return contract;
};

export default useContract;