import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input
} from '@chakra-ui/react';
import CustomButton from './CustomButton';
import styles from "@/styles/cardModal.module.css";
import { useState } from 'react';
import { ICardModalProps } from '@/models/ICardModalProps';

export function CardModal(props: ICardModalProps) {

  const [ input, setInput ] = useState('');

  const handleInputChange = (e: any) => setInput(e.target.value);
  
  const handleTransfer = (input: string) => {
    setInput('');
    props.transfer(input);
  };

  return (
    <>
      {props.token && props.token.totalSupply > 0 &&
        <Modal isOpen={props.isOpen} onClose={props.onClose} size='xl'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.token?.uri.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <img src={props.token.uri.image} />
              <div className={styles.description}><p>{props.token.uri.description}</p></div>
            </ModalBody>

            <ModalFooter>
              <Input variant='filled' placeholder='Cuenta de destino: 0x0987... ' onChange={(event) => handleInputChange(event)} />
              <CustomButton
                eventClick={() => handleTransfer(input)}
                customClass={null}
                variant="solid"
                text="Enviar"
                colorScheme="blue" />
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  )
}