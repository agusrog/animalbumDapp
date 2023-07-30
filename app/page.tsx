"use client";
import Album from "@/components/Album";
import CustomButton from "@/components/CustomButton";
import useWeb3Connector from "@/hooks/useWeb3Connector";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { Input } from "@chakra-ui/react";

export default function Home() {
  const { active, error } = useWeb3React();
  const { connect } = useWeb3Connector();
  const [input, setInput] = useState("");
  const [validInput, setValidInput] = useState(true);

  const handleInputChange = (e: any) => setInput(e.target.value);

  const handleAccess = (value: string) => {
    if (localStorage.getItem('connectionCode') === process.env.NEXT_PUBLIC_PASS) {
      connect();
    } else if (value === process.env.NEXT_PUBLIC_PASS) {
      localStorage.setItem('connectionCode', process.env.NEXT_PUBLIC_PASS);
      setValidInput(true);
      connect();
    } else {
      setValidInput(false);
    }
  };

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
                { window.localStorage && window.localStorage.getItem('connectionCode') !== process.env.NEXT_PUBLIC_PASS && 
                  <Input
                    isInvalid={!validInput}
                    type="number"
                    variant="filled"
                    placeholder="Código de acceso"
                    onChange={(event: any) => handleInputChange(event)}
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
          <h4>Red no habilitada - Seleccionar Sepolia Testnet</h4>
        </div>
      )}
    </>
  );
}
