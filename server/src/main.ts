import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function trap() {
  let app: any;
  NestFactory.create(AppModule).then((appm: any) => {
    app = appm;
    app.listen(3000);
  });
}
trap();
