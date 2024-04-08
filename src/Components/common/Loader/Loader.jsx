import React from "react";
import { Flex, Spin } from "antd";
// import this  from antdesign site
import "./common.scss";

function Loader() {
  return (
    <div className="loader">
      <p> Loading.please wait..</p>

      {/* import this also */}
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
      
    </div>
  );
}

export default Loader;
