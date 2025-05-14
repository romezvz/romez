import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ES_LANG } from '@shared/constants/global.constants'

@Component({
  standalone: true,
  selector: 'rz-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, TranslateModule],
  providers: [TranslateService]
})
export class AppComponent {
  title = 'romez'

  // Dependency injection for services
  private readonly _translateService = inject(TranslateService)

  constructor() {
    this._translateService.setDefaultLang(ES_LANG)
    this._translateService.use(ES_LANG)
  }
}
