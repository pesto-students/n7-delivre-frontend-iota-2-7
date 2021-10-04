import React from "react";

import { LoginHeader, LogoutHeader } from "../shared/components/Header";

export default {
  title: "Components/Header",
};

export const LoggedOut = (args) => <LogoutHeader {...args} />;

export const LoggedIn = (args) => <LoginHeader {...args} />;
