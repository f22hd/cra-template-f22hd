import { hasAdminAccess } from "../../core/helpers/example.helper";
import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

type ComponentProps = {
  children: JSX.Element;
};
export default function Admin({ children }: ComponentProps): JSX.Element {
  const { initialized, keycloak } = useKeycloak();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      setLoading(false);
      setAdmin(hasAdminAccess(keycloak?.tokenParsed?.realm_access?.roles));
    } else {
      keycloak.login();
    }
  }, [initialized, keycloak, loading]);

  if (!loading && !isAdmin) {
    return (
      <h4 className="text-center mt-5">you don't have permission to access</h4>
    );
  }
  return !loading ? <div>{children}</div> : <></>;
}
