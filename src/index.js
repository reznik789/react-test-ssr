import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";

const app = express();

app.use(express.static("public"));
app.get("*", (req, res) => {
  const store = createStore();
  console.log('BEFORE',store.getState());
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return !!route.loadData ? route.loadData(store) : null;
  });

  Promise.all(promises)
    .then(() => {
      console.log('AFTER',store.getState());
      res.send(renderer(req, store));
    })
    .catch(() => {});
});

app.listen(3000, () => {
  console.log("Listening port 3000");
});
