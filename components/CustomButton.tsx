import { ICustomButton } from '@/models/ICustomButton';
import { Button } from '@chakra-ui/react';
import styles from '@/styles/customButton.module.css';

export default function CustomButton(props: ICustomButton) {
  return (
    <Button
      onClick={props.eventClick}
      className={props.customClass ?? styles.button}
      variant={props.variant}
      colorScheme={props.colorScheme}
    >
      {props.text}
    </Button>
  );
}
