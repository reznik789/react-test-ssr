import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";

const app = express();

app.use(
  "/api",
  proxy("http://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    }
  })
);
app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore(req);
  console.log("BEFORE", store.getState());
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return !!route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises)
    .then(() => {
      console.log("AFTER", store.getState());
      try{
        res.send(renderer(req, store));
      } catch (e) {
        console.log(e);
        throw e;
      }
    })
    .catch(() => {});
});

app.listen(3000, () => {
  console.log("Listening port 3000");
});
