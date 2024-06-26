"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        console.log('massage:', req.body);
        next();
    });
    await app.listen(3000);
    console.log("Server started");
}
bootstrap();
//# sourceMappingURL=main.js.map