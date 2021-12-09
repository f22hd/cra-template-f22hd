import Keycloak, {
	KeycloakTokenParsed,
	KeycloakConfig,
	KeycloakInstance,
} from "keycloak-js";

export const keycloakCfg: KeycloakConfig = {
	url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
	clientId: `${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}`,
	realm: `${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}`,
};
export const keycloakInitOptions = {
	onLoad: "check-sso",
	silentCheckSsoRedirectUri: "/sso.html",
};

export interface KeycloakParsedToken extends KeycloakTokenParsed {
	email?: string;
	preferred_username?: string;
	given_name?: string;
	family_name?: string;
	scope?: string;
	gender?: "Male" | "Female";
	name?: string;
}

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak: KeycloakInstance = Keycloak({
	realm: process.env.REACT_APP_KEYCLOAK_REALM as string,
	url: process.env.REACT_APP_KEYCLOAK_URL,
	clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID as string,
});

export default keycloak;

export const parsedToken: KeycloakParsedToken | undefined =
	keycloak?.tokenParsed;
