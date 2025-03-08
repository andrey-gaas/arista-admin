import { Navigate } from "react-router-dom";
import authStore from "../../store/authStore";
import { observer } from "mobx-react-lite";
import { TRole } from "../../types/users";

type TPrivateRouteProps = {
  children: React.ReactNode;
  allowedRoles: TRole[];
};

function PrivateRoute(props: TPrivateRouteProps) {
  const { children, allowedRoles } = props;
  if (authStore.loading.profile) {
    return <p>Загрузка</p>;
  }

  if (authStore.user) {
    if (allowedRoles.includes(authStore.user.role)) {
      return children;
    } else {
      return <Navigate to="/orders" />;
    }
  } else {
    return <Navigate to="/login" />
  }
}

const ObservedPrivateRoute = observer(PrivateRoute);

export default ObservedPrivateRoute;
