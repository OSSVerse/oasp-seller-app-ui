export const api = {
  marketplace: {
    search: "products",
  },
  placeorder: {
    select: "client/v2/get_quote",
    init: "client/v2/initialize_order",
    confirm: "client/v2/confirm",
  },
  auth: {
    login: "auth/login",
    logout: "auth/logout",
    updatePassword: "auth/updatePassword",
    forgetPassword: "auth/forgotPassword",
    resetPassword: "auth/reset_password",
  },
  oasp: {
    products: "products",
  },
};
