import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      'API Documentation\
     \n NOTE: The API with (LOCK) symbol can be used only after providing Admin Login API response token in (Authorize)\
     \n -Parameter with * are required to execute related API',
    )
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', name: 'x-access-token', in: 'header' })
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'DEMO API',
    explorer: false,
  });
}
