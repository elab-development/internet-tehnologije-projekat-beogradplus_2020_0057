import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React from "react";

const Field = React.forwardRef((props, ref) => (
  <FormControl>
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={props.icon} />
      <Input ref={ref} type={props.type} placeholder={props.placeholder} />
    </InputGroup>
  </FormControl>
));

export default Field;

// export default function Field(props) {
//   return (
//     <FormControl>
//       <InputGroup>
//         <InputLeftElement pointerEvents="none" children={props.icon} />
//         <Input ref={props.ref} type={props.type} placeholder={props.placeholder} />
//       </InputGroup>
//     </FormControl>
//   );
// }
