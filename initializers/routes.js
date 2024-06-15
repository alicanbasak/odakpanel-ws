const router = require("express").Router();

const routes = [
  { path: "/api/v1/members", route: require("../routes/member.route") },
  { path: "/api/v1/auth", route: require("../routes/auth.route") },
  { path: "/api/v1/orderList", route: require("../routes/orderList.route") },
  { path: "/api/v1/factories", route: require("../routes/factories.route") },
  { path: "/api/v1/customers", route: require("../routes/customers.route") },
  {
    path: "/api/v1/shipmentTypes",
    route: require("../routes/shipmentTypes.route"),
  },
  { path: "/api/v1/ccl", route: require("../routes/ccl.route") },
  { path: "/api/v1/layers", route: require("../routes/layers.route") },
  { path: "/api/v1/status", route: require("../routes/status.route") },
  { path: "/api/v1/rfqs", route: require("../routes/rfq.route") },
  { path: "/api/v1/invoices", route: require("../routes/invoices.route") },
];

routes.forEach(({ path, route }) => router.use(path, route));

module.exports = router;
