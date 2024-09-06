import { web } from "./src/app/web";

const port = process.env.PORT || 8000;

web.listen(port, () => {
  console.info("app start in port " + port);
});
