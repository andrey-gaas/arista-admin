import { Navigate } from "react-router-dom";
import authStore from "../../store/authStore";
import { observer } from "mobx-react-lite";

type TPrivateRouteProps = {
  children: React.ReactNode;
};

function PrivateRoute(props: TPrivateRouteProps) {
  const { children } = props;
  if (authStore.loading.profile) {
    return <p>Загрузка</p>;
  }

  return authStore.user ? children : <Navigate to="/login" />;
}

const ObservedPrivateRoute = observer(PrivateRoute);

export default ObservedPrivateRoute;
