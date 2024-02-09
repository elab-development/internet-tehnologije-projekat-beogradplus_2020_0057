import React from "react";

import { useState } from "react";
import { Button, Stack, Box, chakra, Alert, AlertIcon } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

import Field from "../components/guest/Field";
import Password from "../components/guest/Password";
import { FaLock, FaUserAlt } from "react-icons/fa";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
  const UserIcon = chakra(FaUserAlt);
  const LockIcon = chakra(FaLock);

  const [error, setError] = useState(null);
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        //console.log(data);
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
          ref={emailRef}
          type="email"
          placeholder="Email"
          icon={<UserIcon color="gray.300" />}
        />
        <Password
          ref={passwordRef}
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
