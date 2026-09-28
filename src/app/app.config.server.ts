import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { BlogService } from './services/blog.service';
import { BlogServiceServidor } from './services/blog.service.server';

// Configuración que solo se usa durante el prerender (npm run build).
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: BlogService, useClass: BlogServiceServidor },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
