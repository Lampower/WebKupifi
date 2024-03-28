import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function bootstrap() {
  let app: any;
  NestFactory.create(AppModule).then((appm: any) => {
    app = appm;
    app.listen(3000);
  });
}
bootstrap();
