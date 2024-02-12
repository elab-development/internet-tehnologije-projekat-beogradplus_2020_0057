import React, { useState } from "react";
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
import { Link as ReactRouterLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Password = React.forwardRef((props, ref) => {
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
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={props.placeholder}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShowClick}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {props.forgot && (
        <FormHelperText textAlign="right">
          <ChakraLink as={ReactRouterLink} to="/forgot-password">
            forgot password?
          </ChakraLink>
        </FormHelperText>
      )}
    </FormControl>
  );
});

export default Password;
