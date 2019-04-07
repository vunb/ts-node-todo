import express, {Express} from "express";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import { routes } from "../routes";

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(expressValidator({
  customValidators: {
    isArray: function (value) {
      return Array.isArray(value);
    }
  }
}));

// so we can get the client's IP address
app.enable("trust proxy");

// định tuyến
routes(app);

export {app};
