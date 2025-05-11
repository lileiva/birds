import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <Link
          to="/"
          activeProps={{
            style: {
              color: "red",
            },
          }}
        >
          Home
        </Link>
        <Link to="/birds">Birds</Link>
      </nav>
      <Outlet />
    </React.Fragment>
  );
}
