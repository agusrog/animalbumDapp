import { useEffect, useState } from 'react';
import useContract from './useContract';
import { useWeb3React } from '@web3-react/core';
import { IToken, IUri } from '@/models/IToken';
import { IAnimalbum } from '@/models/IHooks';
import useCustomToast from './useCustomToast';

const useAnimalbum = (): IAnimalbum => {

  const totalTokenId = 10;
  const contract = useContract();
  const { account } = useWeb3React();
  const { successToast, completeToast, errorToast } = useCustomToast();
  const [ tokens, setTokens ] = useState<IToken[]>([]);
  const [ bonusToken, setBonusToken ] = useState<IToken>();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isAlbumCompleted, setIsAlbumCompleted ] = useState(false);

  const getTokens = async (): Promise<void> => {
    if (!contract) return;
    try {

      setIsLoading(true);
      let _tokens: IToken[] = [];
      let _isAlbumCompleted = true;
      setTokens(_tokens);

      const tokensReponse = await tokensRequest();
      tokensReponse.forEach(([ tokenSupply, tokenUri ]) => {
        if (Number(tokenSupply) === 0) {
          tokenUri.image = tokenUri.description = undefined;
          _isAlbumCompleted = false;
          setIsAlbumCompleted(false);
        }
        const newToken = { id: tokenUri.id, totalSupply: Number(tokenSupply), uri: tokenUri } as IToken;
        _tokens = [..._tokens, newToken];
      });      

      if (_isAlbumCompleted) {
        const [ tokenSupply, tokenUri ] = await bonusRequest();
        const _bonusToken = { id: tokenUri.id, totalSupply: Number(tokenSupply), uri: tokenUri }
        setIsAlbumCompleted(true);
        setBonusToken(_bonusToken);
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

  const tokensRequest = (): Promise<[number[], IUri][]> => {
    const requests: Promise<[any, IUri]>[] = [];
    for (let index = 1; index <= totalTokenId; index++) {
      requests.push(Promise.all([
      contract.methods.balanceOf(account, index).call(),
      getUri(index)
    ]));
    }
    return Promise.all(requests);
    
  }
  
  const bonusRequest = (): Promise<[number[], IUri]> => {
    return Promise.all([
      contract.methods.balanceOf(account, 11).call(),
      getUri(11)
    ])
  }

  const claim = async (): Promise<void> => {

    try {
      contract.methods.claim().send({
        from: account,
      })
        .on('transactionHash', (txHash: any) => {
          successToast();
        })
        .on('receipt', (ok: any) => {
          completeToast();
          getTokens();
        })
        .on('error', (error: any) => {
          errorToast();
        });

    } catch {
      errorToast();
     }
  };

  const claimBonus = async (): Promise<void> => {

    try {
      contract.methods.claimBonusToken().send({
        from: account,
      })
        .on('transactionHash', (txHash: any) => {
          successToast();
        })
        .on('receipt', (ok: any) => {
          completeToast();
          getTokens();
        })
        .on('error', (error: any) => {
          errorToast();
        });

    } catch {
      errorToast();
     }
  };

  const sendToken = async (to: string, tokenId: number): Promise<void> => {

    try {
      contract.methods.safeTransferFrom(account, to, tokenId, 1, '0x').send({
        from: account,
      })
        .on('transactionHash', (txHash: any) => {
          successToast();
        })
        .on('receipt', (ok: any) => {
          completeToast();
          getTokens();
        })
        .on('error', (error: any) => {
          errorToast();
        });

    } catch {
      errorToast();
     }
  };

  useEffect(() => {
    getTokens();
  }, [contract, account]);

  return { tokens, claim, sendToken, isLoading, isAlbumCompleted, claimBonus, bonusToken };
};

export default useAnimalbum;