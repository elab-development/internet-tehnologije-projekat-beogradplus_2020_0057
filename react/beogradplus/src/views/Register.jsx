import React, { createRef } from "react";

import { useState } from "react";
import {
  Button,
  Stack,
  Box,
  chakra,
  Center,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Field from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Register = () => {
  const UserIcon = chakra(FaUserAlt);
  const LockIcon = chakra(FaLock);
  const EnvelopeIcon = chakra(FaEnvelope);

  const [error, setError] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };

    axiosClient
      .post("/register", payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        setToken(data.access_token);
        setError(null);
        navigate("/map");
      })
      .catch((error) => {
        const response = error.response;
        setError(response.data.error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack
        spacing={4}
        p="1rem"
        backgroundColor="whiteAlpha.900"
        boxShadow="md"
      >
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <Field
          ref={nameRef}
          type="name"
          placeholder="Name"
          icon={<UserIcon color="gray.300" />}
        />
        <Field
          ref={emailRef}
          type="email"
          placeholder="Email"
          icon={<EnvelopeIcon color="gray.300" />}
        />
        <Password
          ref={passwordRef}
          type="password"
          placeholder="Password"
          icon={<LockIcon color="gray.300" />}
        />
        <Password
          ref={passwordConfirmationRef}
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
