import "./MainIsland.css";
import React from "react";

function template() {
  return (
    <div ref={ref => (this.mount = ref)}></div>
  );
};

export default template;
