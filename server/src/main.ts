import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const trap = (boostrap) => {
  const PORT = 3000;
  let app: any;
  NestFactory.create(AppModule).then((appm: any) => {
    app = appm;
    app.listen(PORT, () => {console.log(`mark loh and port: ${PORT}`)});
  });
}
trap`

`
