import { express_app } from './api/express-app';
import { http_server } from './api/http-server';

let app = express_app;
let router_setting = require('./routes');
router_setting(app);
console.log('end router setting');
console.log('start http server');
http_server.start(app);
