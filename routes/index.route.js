const express = require("express");
const router = express.Router();

const routes = [
  { path: "/api/v1/members", route: require("./member.route") },
  { path: "/api/v1/auth", route: require("./auth.route") },
  { path: "/api/v1/orderList", route: require("./orderList.route") },
  { path: "/api/v1/factories", route: require("./factories.route") },
  { path: "/api/v1/customers", route: require("./customers.route") },
  { path: "/api/v1/shipmentTypes", route: require("./shipmentTypes.route") },
  { path: "/api/v1/ccl", route: require("./ccl.route") },
  { path: "/api/v1/layers", route: require("./layers.route") },
  { path: "/api/v1/status", route: require("./status.route") },
  { path: "/api/v1/rfqs", route: require("./rfq.route") },
];

routes.forEach(({ path, route }) => router.use(path, route));

module.exports = router;
