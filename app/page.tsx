"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useAnimalbum from "@/hooks/useAnimalbum";
import { IWeb3Context, useWeb3Context } from "@/context/Web3ContextProvider";

const CHAIN_IDS_ALLOWED = {
  local: 5777,
  goerli: 5
}

export default function Home() {

  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, balance },
  } = useWeb3Context() as IWeb3Context;

  const { uris, claim } = useAnimalbum();

  return (
    <>
      {!isAuthenticated
        ?
        <button onClick={connectWallet}>Connect wallet</button>
        :
        <>
          {currentChain === CHAIN_IDS_ALLOWED.local || currentChain === CHAIN_IDS_ALLOWED.goerli
            ?
            <>
              {address} - {balance} - {uris}
              <button onClick={disconnect}>Disconnect</button>
              <button onClick={claim}>reclamar</button>
            </>
            : <div>Network not allowed</div>
          }
        </>
      }
    </>
  );
}
