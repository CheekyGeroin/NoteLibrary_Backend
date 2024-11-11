import loginScheme from "./user.js";
import noteSchemes from "./notes.js";

const schemes = {
  loginScheme,
  ...noteSchemes,
};

export default schemes;
