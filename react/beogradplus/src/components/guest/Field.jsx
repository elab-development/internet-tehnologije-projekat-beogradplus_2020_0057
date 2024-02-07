import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  chakra,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function Field(props) {
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={props.icon} />
        <Input type={props.type} placeholder={props.placeholder} />
      </InputGroup>
    </FormControl>
  );
}
