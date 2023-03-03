import dynamic from "next/dynamic";
import React from "react";

const CryptoDashboard = dynamic(
  () => import("views/crypto/CryptoDashboard/index"),
  {
    ssr: false,
  }
);

import useLayout from "utils/hooks/useLayout";
const Index = () => {
  const Layout = useLayout();
  return (
    <>
      <Layout>
        <CryptoDashboard />
      </Layout>
    </>
  );
};

export default Index;