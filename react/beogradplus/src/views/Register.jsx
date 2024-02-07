import React from "react";

import { useState } from "react";
import { Button, Stack, Box, chakra } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Email from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaEnvelope, FaKey, FaLock, FaUserAlt } from "react-icons/fa";
import Field from "../components/guest/Field";

const Register = () => {
  const UserIcon = chakra(FaUserAlt);
  const LockIcon = chakra(FaLock);
  const EnvelopeIcon = chakra(FaEnvelope);
  const KeyIcon = chakra(FaKey);
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
          type="name"
          placeholder="Name"
          icon={<UserIcon color="gray.300" />}
        />
        <Field
          type="username"
          placeholder="Username"
          icon={<KeyIcon color="gray.300" />}
        />
        <Field
          type="email"
          placeholder="Email"
          icon={<EnvelopeIcon color="gray.300" />}
        />
        <Password
          type="password"
          placeholder="Password"
          icon={<LockIcon color="gray.300" />}
        />
        <Password
          type="password"
          placeholder="Confirm Password"
          icon={<LockIcon color="gray.300" />}
        />

        <Button
          borderRadius={0}
          type="submit"
          variant="solid"
          colorScheme="teal"
          width="full"
        >
          Register
        </Button>
      </Stack>
      <Box>
        Already registered?{" "}
        <ChakraLink as={ReactRouterLink} to="/login" color="teal.500">
          Log In
        </ChakraLink>
      </Box>
    </form>
  );
};

export default Register;
