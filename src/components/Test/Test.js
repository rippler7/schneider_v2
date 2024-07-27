import React    from "react";
import template from "./Test.jsx";

class Test extends React.Component {
  render() {
    return template.call(this);
  }
}

export default Test;
