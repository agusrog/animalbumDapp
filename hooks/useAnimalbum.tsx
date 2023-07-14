import { useEffect, useState } from "react";
import useAnimalbumContract from "./useAnimalbumContract";
import { IWeb3Context, useWeb3Context } from "@/context/Web3ContextProvider";

const useAnimalbum = () => {
  const totalTokenId = 10;
  const contract = useAnimalbumContract();
  const { state } = useWeb3Context() as IWeb3Context;
  const [uris, setUri] = useState<string[]>([]);

  const getUri = async () => {
    if (!contract) return;

    try {
      
      let newList: string[] = [];
      for (let index = 1; index <= totalTokenId; index++) {
        const response = await contract.uri(index);
        newList = [...newList, response];
      }
      setUri(newList);

    } catch { }
  };

  const claim = async () => {
    if (!contract || !state.signer) return;

    try {
      const reclamar = await contract.claim();

      await reclamar.wait();

    } catch { }
  };

  useEffect(() => {

    getUri();

  }, [contract]);

  return { uris, claim };
};

export default useAnimalbum;