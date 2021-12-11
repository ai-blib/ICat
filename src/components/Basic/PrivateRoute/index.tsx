import { Redirect, Route } from "react-router-dom";

interface Props {
  exact?: boolean;
  path: string;
  isAuth?: boolean;
  children: JSX.Element;
  redirectTo: string;
  legRegin?:boolean
}
const PrivateRoute = (props: Props) => {
  const { exact, path, isAuth, children, redirectTo,legRegin } = props;
  return (
    <Route
      exact={exact ? true : false}
      path={path}
      render={({ location }) =>
        isAuth||!legRegin ? (
          children
        ) : (
          <Redirect to={{ pathname: redirectTo, state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
