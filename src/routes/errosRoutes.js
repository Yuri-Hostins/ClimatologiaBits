import React from "react";
import { Route } from "react-router-dom";

import NotFound from "../pages/NotFound";

const PaginasErrors = (
  <>
    <Route path="*" element={ <NotFound /> } />
  </>
);

export default PaginasErrors;