import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http'
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection
} from '@angular/core'
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'
import { routes } from '@app/core/routes/app.routes'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { THEME_DARK, THEME_PRESET } from '@shared/constants/global.constants'
import { providePrimeNG } from 'primeng/config'

/**
 * The main configuration for the Angular application.
 * This configuration combines the necessary providers and setups required for
 * application initialization, including routing, localization, HTTP client, animations, and themes.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Provides zone change detection with event coalescing for efficient change detection.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configures the Angular router with the application's defined routes.
     */
    provideRouter(routes),

    /**
     * Provides client-side hydration with event replay, enabling faster rendering after initial load.
     */
    provideClientHydration(withEventReplay()),

    /**
     * Configures the HTTP client with the fetch strategy for handling HTTP requests.
     */
    provideHttpClient(withFetch()),

    /**
     * Imports and sets up translation modules for internationalization (i18n).
     * It uses a factory method to load translation files from the specified location.
     */
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    /**
     * Provides asynchronous animations support for the application.
     */
    provideAnimationsAsync(),

    /**
     * Configures PrimeNG with the specified theme preset and options, such as dark mode selector.
     */
    providePrimeNG({
      theme: {
        preset: THEME_PRESET,
        options: {
          darkModeSelector: '.' + THEME_DARK
        }
      }
    })
  ]
}

/**
 * Factory function to load translation files from the 'assets/i18n' folder with '.json' extension.
 * @param http The HttpClient instance used to make HTTP requests.
 * @returns A new instance of TranslateHttpLoader to load translation files.
 */
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}
