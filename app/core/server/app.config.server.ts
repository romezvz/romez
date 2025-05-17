import { ApplicationConfig, mergeApplicationConfig } from '@angular/core'
import { provideServerRendering } from '@angular/platform-server'
import { provideServerRouting } from '@angular/ssr'
import { serverRoutes } from '@app/core/server/app.routes.server'
import { appConfig } from '@core/configs/app.config'

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideServerRouting(serverRoutes)]
}

export const config = mergeApplicationConfig(appConfig, serverConfig)
