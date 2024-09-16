import { web } from "./src/app/web";
process.env.TZ = "Asia/Jakarta";
const port = process.env.PORT || 8000;

web.listen(port, () => {
  console.info("app start in port " + port);
});
