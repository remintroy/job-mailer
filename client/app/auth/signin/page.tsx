"use client";

import styles from "./signin.module.scss";
import React from "react";
import configs from "../../configs";
import { Input } from "@mantine/core";

const SignIn = () => {
  return (
    <div className={styles.signin}>
      <Input color="red" />

      <h1>Sign in to {configs.appName}</h1>
    </div>
  );
};

export default SignIn;
