import React from "react";

import { useState } from "react";
import { Button, Stack, Box, chakra } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Field from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaLock, FaUserAlt } from "react-icons/fa";

const Login = () => {
  const UserIcon = chakra(FaUserAlt);
  const LockIcon = chakra(FaLock);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <form>
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        <Field
          type="email"
          placeholder="Email"
          icon={<UserIcon color="gray.300" />}
        />
        <Password
          type="password"
          placeholder="Password"
          forgot={true}
          icon={<LockIcon color="gray.300" />}
        />

        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
        >
          Login
        </Button>
      </Stack>
      <Box>
        Not registered?{" "}
        <ChakraLink as={ReactRouterLink} to="/register" color="teal.500">
          Register
        </ChakraLink>
      </Box>
    </form>
  );
};

export default Login;
