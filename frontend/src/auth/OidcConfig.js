const base = import.meta.env.OIDC_AUTHORITY;

export const oidcSettings = {
  authority: base,
  client_id: import.meta.env.OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.OIDC_REDIRECT_URI,
  post_logout_redirect_uri: import.meta.env.OIDC_POST_LOGOUT_REDIRECT_URI,
  response_type: "code",
  scope: import.meta.env.OIDC_SCOPE || "openid profile",
  automaticSilentRenew: true,
  silent_redirect_uri: import.meta.env.OIDC_SILENT_REDIRECT_URI,
  loadUserInfo: true,
  filterProtocolClaims: true,
  revokeAccessTokenOnSignout: true,
  
  userStore: undefined
};
