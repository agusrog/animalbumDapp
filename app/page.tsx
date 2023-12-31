'use client';
import Album from '@/components/Album';
import CustomButton from '@/components/CustomButton';
import useWeb3Connector from '@/hooks/useWeb3Connector';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { Input } from '@chakra-ui/react';

export default function Home() {
  const { active, error } = useWeb3React();
  const { connect } = useWeb3Connector();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [validInput, setValidInput] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleAccess = (value: string) => {
    if (code === process.env.NEXT_PUBLIC_PASS) {
      connect();
    } else if (value === process.env.NEXT_PUBLIC_PASS) {
      localStorage.setItem('connectionCode', process.env.NEXT_PUBLIC_PASS);
      setValidInput(true);
      connect();
    } else {
      setValidInput(false);
    }
  };

  useEffect(() => {
    const connectionCode = JSON.parse(localStorage.getItem('connectionCode') as string);
    if (connectionCode) {
      setCode(String(connectionCode));
    }
  }, []);

  return (
    <>
      {!error ? (
        <>
          {active ? (
            <div className="customContainer">
              <Album />
            </div>
          ) : (
            <div className="customContainer">
              <div className="accessBox">
                {validInput || code !== process.env.NEXT_PUBLIC_PASS &&
                  <Input
                    isInvalid={!validInput}
                    type="number"
                    variant="filled"
                    placeholder="Código de acceso"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleInputChange(event)}
                  />
                }
                <CustomButton
                  eventClick={() => handleAccess(input)}
                  customClass=""
                  variant="solid"
                  text="Conectar"
                  colorScheme="blue"
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="customContainer">
          <h4>Red no habilitada - Asegurate de abrir Metamask y seleccionar Sepolia Testnet</h4>
        </div>
      )}
    </>
  );
}
