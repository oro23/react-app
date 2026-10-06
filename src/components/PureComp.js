import React from "react";

// const PureComp = React.memo(({ name }) => {
//   console.log("Rendered");

//   return <div>{name}</div>;
// });

// export default PureComp;

const PureComp = ({ name }) => {
  console.log("Rendered");

  return <div>{name}</div>;
};

export default PureComp;
