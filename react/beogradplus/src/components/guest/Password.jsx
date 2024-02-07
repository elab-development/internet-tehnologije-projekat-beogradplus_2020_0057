import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
} from "@chakra-ui/react";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { Link as ReactRouterLink } from "react-router-dom";

export default function Password(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  return (
    <FormControl>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          children={props.icon}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
            {showPassword ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      {props.forgot && (
        <FormHelperText textAlign="right">
          <ChakraLink as={ReactRouterLink}>forgot password?</ChakraLink>
        </FormHelperText>
      )}
    </FormControl>
  );
}
