import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function bootstrap() {
  let app;
  NestFactory.create(AppModule).then((appm) => {
    app = appm;
    app.listen(3000);
  });
}
bootstrap();
