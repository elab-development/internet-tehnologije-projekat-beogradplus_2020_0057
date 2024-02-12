import React from "react";

import { useState } from "react";
import {
  Button,
  Stack,
  Box,
  chakra,
  Alert,
  AlertIcon,
  Avatar,
  Heading,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Field from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const ForgotPassword = () => {
  const UserIcon = chakra(FaUserAlt);

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
    };

    axiosClient
      .post("/forgot-password", payload)
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
      <Heading color="teal.400">Account recovery</Heading>
      <Box minW={{ base: "90%", md: "468px" }}>
        {" "}
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

            <Field
              ref={emailRef}
              type="email"
              placeholder="Email"
              icon={<UserIcon color="gray.300" />}
            />

            <Button
              borderRadius={0}
              type="submit"
              variant="solid"
              colorScheme="teal"
              width="full"
            >
              Send reset link
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default ForgotPassword;
