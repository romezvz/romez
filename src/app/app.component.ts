import { CommonModule } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ThemeService } from '@core/services/theme.service'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ES_LANG } from '@shared/constants/global.constants'
import { ButtonModule } from 'primeng/button'

@Component({
  standalone: true,
  selector: 'rz-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, TranslateModule, ButtonModule],
  providers: [TranslateService, ThemeService]
})
export class AppComponent {
  isDarkTheme: string | null
  darkMode = signal<boolean>(false)

  // Dependency injection for services
  private readonly _translateService = inject(TranslateService)
  private readonly _themeService = inject(ThemeService)

  constructor() {
    this._translateService.setDefaultLang(ES_LANG)
    this._translateService.use(ES_LANG)
    this._themeService.initTheme()
    this.isDarkTheme = this._themeService.isDarkTheme()
  }

  /**
   * Toggles the application's theme between dark and light mode.
   */
  toggleTheme() {
    this._themeService.toggleTheme()
    this.isDarkTheme = this._themeService.isDarkTheme()
  }
}
