import { useEffect, useState } from "react";
import useContract from "./useContract";
import { useWeb3React } from "@web3-react/core";
import { IToken, IUri } from "@/models/IToken";
import { IAnimalbum } from "@/models/IHooks";
import useCustomToast from "./useCustomToast";

const useAnimalbum = (): IAnimalbum => {

  const totalTokenId = 10;
  const { account, library } = useWeb3React();
  const contract = useContract();
  const [ balance, setBalance ] = useState(0);
  const [ tokens, setTokens ] = useState<IToken[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isAlbumCompleted, setIsAlbumCompleted ] = useState<boolean>(false);
  const { successToast, completeToast, errorToast } = useCustomToast();

  const getBalance = async (): Promise<void> => {
    if (!library) return;
    const toSet = await library.eth.getBalance(account);
    setBalance(Number((toSet)) / 1e18);
  };

  const getTokens = async (): Promise<void> => {
    if (!contract) return;
    try {
      setIsLoading(true);
      let _tokens: IToken[] = [];
      setTokens(_tokens);
      for (let index = 1; index <= totalTokenId; index++) {
        const [ tokenSupply, tokenUri ] = await tokensRequest(index);
        if (Number(tokenSupply) === 0) {
          tokenUri.image = tokenUri.description = undefined;
        }
        const newToken = { id: index, totalSupply: Number(tokenSupply), uri: tokenUri } as IToken;
        _tokens = [..._tokens, newToken];
      }
      setTokens(_tokens);
      setIsLoading(false);

    } catch {
      errorToast();
     }
  };

  const getUri = async (index: number): Promise<IUri> => {
    const tokenUri = await contract.methods.uri(index).call();
    const uriResult = await fetch(tokenUri);
    const uriData = await uriResult.json();
    return uriData;
  }

  const tokensRequest = (tokenId: number): Promise<[number[], IUri]> => {
    return Promise.all([
      contract.methods.balanceOf(account, tokenId).call(),
      getUri(tokenId),
      // getConfirmationAlbumCompleted()
    ]);
  }

  const getConfirmationAlbumCompleted = async (): Promise<void> => {
    if (!contract) return;
    try {
      const isCompleted = await contract.methods.albumCompleted().call();
      console.log(isCompleted)
      setIsAlbumCompleted(isCompleted);
    } catch {
      errorToast();
     }
  };

  const claim = async (): Promise<void> => {
    if (!contract) return;

    try {
      contract.methods.claim().send({
        from: account,
      })
        .on("transactionHash", (txHash: any) => {
          successToast();
          getBalance();
        })
        .on("receipt", (ok: any) => {
          completeToast();
          getTokens();
        })
        .on("error", (error: any) => {
          errorToast();
        });

    } catch {
      errorToast();
     }
  };

  const sendToken = async (to: string, tokenId: number): Promise<void> => {
    if (!contract) return;

    try {
      contract.methods.safeTransferFrom(account, to, tokenId, 1, "0x").send({
        from: account,
      })
        .on("transactionHash", (txHash: any) => {
          successToast();
          getBalance();
        })
        .on("receipt", (ok: any) => {
          completeToast();
          getTokens();
        })
        .on("error", (error: any) => {
          errorToast();
        });

    } catch {
      errorToast();
     }
  };

  useEffect(() => {
    getTokens();
  }, [contract, account]);

  useEffect(() => {
    getBalance();
  }, [library, account]);

  return { balance, tokens, claim, sendToken, isLoading, isAlbumCompleted };
};

export default useAnimalbum;