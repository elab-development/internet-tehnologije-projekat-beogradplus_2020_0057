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
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Field from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaEnvelope, FaLock, FaUserAlt } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { useQuery } from "../hooks/UseQuery";

const ResetPassword = () => {
  const UserIcon = chakra(FaUserAlt);
  const LockIcon = chakra(FaLock);
  const EnvelopeIcon = chakra(FaEnvelope);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  let query = useQuery();

  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: query.get("email"),
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
      token: query.get("token"),
    };

    axiosClient
      .post("/reset-password", payload)
      .then(({ data }) => {
        console.log(data);
        setError(null);
        setMessage(data.status);
      })
      .catch((error) => {
        const response = error.response;
        setError(response.data.error);
      });
  };

  return (
    <>
      <Avatar bg="teal.500" />
      <Heading color="teal.400">Reset Password</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
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

            {message && (
              <Alert status="success">
                <AlertIcon />
                {message}
              </Alert>
            )}

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
              Reset password
            </Button>
          </Stack>
        </form>
        <Box>
          <ChakraLink as={ReactRouterLink} to="/login" color="teal.500">
            Log In
          </ChakraLink>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
