import { Outlet, useRouteLoaderData } from "react-router-dom";
import { createContext } from "react";

export const FirmContext = createContext(null);

export const RootLayout = () => {
  const firm = useRouteLoaderData("root");
  console.log(firm)
  return (
    <FirmContext.Provider value={firm}>
      <Outlet />
    </FirmContext.Provider>
  );
};