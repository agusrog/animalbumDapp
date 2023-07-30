import { InjectedConnector } from '@web3-react/injected-connector';
import Web3 from 'web3';

const connector = new InjectedConnector({
  supportedChainIds: [
    // 5,
    1337,
    5777,
    11155111
  ],
});

const getLibrary = (provider: any): Web3 => {
    return new Web3(provider);
  }

export { connector, getLibrary };