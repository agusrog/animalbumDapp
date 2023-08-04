import useWeb3Connector from '@/hooks/useWeb3Connector';
import { useWeb3React } from '@web3-react/core';
import styles from '@/styles/navbar.module.css';
import CustomButton from './CustomButton';
import { Link } from '@chakra-ui/react';

export default function Navbar() {

  const { active, account, error } = useWeb3React();
  const { disconnect, balance } = useWeb3Connector();

  return (
    <div className={styles.customContainer}>
      {active && !error && (
        <>
          <CustomButton
            eventClick={disconnect}
            customClass={styles.connectionButton}
            variant="outline"
            text="Desconectar"
            colorScheme="whiteAlpha"
          />
          <div className={styles.accountInfo}>
            {account} -&nbsp;
            <Link href="https://sepoliafaucet.com/" isExternal color="purple.200">{balance?.toFixed(2)} ETH</Link>
          </div>
        </>
      )}
    </div>
  );
}
