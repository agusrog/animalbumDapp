import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { ABI } from "../abis/animalbum.js";
import { IWeb3Context, useWeb3Context } from "@/context/Web3ContextProvider";

const address = "0x88fdD5B0e05EfAB21233CBA1EFa7346570DE11d1";

const useAnimalbumContract = () => {
  const { state } = useWeb3Context() as IWeb3Context;

  const [contract, setContract] = useState<Contract>();

  const deployContract = async () => {
    if (state.provider) {
      const contract = await new Contract(address, ABI, state.provider);
      setContract(contract);
    }
  };

  useEffect(() => {

    deployContract();
    
  }, [state.provider]);

  return contract;
};

export default useAnimalbumContract;