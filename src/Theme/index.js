import { memo } from "react";

// import ThemeProvider from "react-bootstrap/ThemeProvider";
function Theme({ children }) {
  return <>{children}</>;
}

export default memo(Theme);
