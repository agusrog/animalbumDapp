"use client";
import Album from "@/components/Album";
import CustomButton from "@/components/CustomButton";
import useWeb3Connector from "@/hooks/useWeb3Connector";
import { useWeb3React } from "@web3-react/core";

export default function Home() {

  const { active, error } = useWeb3React();
  const { connect } = useWeb3Connector();

  return (
    <>
      {!error ?
        <>
          {active
            ? <div className="customContainer">
                <Album />
              </div>
            : <div className="customContainer">
                <CustomButton 
                    eventClick={connect}
                    customClass=""
                    variant="solid"
                    text="Conectar"
                    colorScheme="blue"/>
              </div>
          }
        </>
        : <div className="customContainer"><h4>Red no habilitada - Seleccionar Sepolia Testnet</h4></div>
      }
    </>
  );
}
