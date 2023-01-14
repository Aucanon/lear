import app from "./http";
import render from "./render";
import createStore from "./createStore";
import routes from "../share/routes";
import { matchRoutes } from "react-router-config";

app.get('*', (req, res) => {
  const store = createStore()
  const promise = matchRoutes(routes, req.path).map(({ route }) => {
    if (route.loadData) return route.loadData(store)
  })

  Promise.all(promise).then(() => {
    res.send(render(req, store))
  })
})