"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function Providers(props) {
  return React.createElement(SessionProvider, null, props.children);
}
