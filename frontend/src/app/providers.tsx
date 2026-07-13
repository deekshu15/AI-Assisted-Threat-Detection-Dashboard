import React from "react";

import { AppProviders } from "../providers";

interface Props {
  children: React.ReactNode;
}

function Providers({ children }: Props) {
  return <AppProviders>{children}</AppProviders>;
}

export default Providers;