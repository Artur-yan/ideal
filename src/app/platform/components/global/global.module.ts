
/* Angular platform services */

import { NgModule }     from '@angular/core';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Angular platform services end */

/* Directives */

/* Directives end */

/* Components */

import { ModalComponent } from '@platform/components/global/modal/modal.component';
import { ConfirmModalComponent } from '@platform/components/global/confirm-modal/confirm-modal.component';
import { PaginationComponent } from '@platform/components/global/pagination/pagination.component';
import { DropdownComponent } from '@platform/components/global/dropdown/dropdown.component';
import { ContextMenuComponent } from '@platform/components/global/context-menu/context-menu.component';
import { ButtonComponent } from '@platform/components/global/button/button.component';

/* Components end */

/* Pipe */
import { TruncatePipe } from '@pipes/truncate.pipe';
import { LoaderModule } from '@platform/modules/loader/loader.module';
import { BgImageDirective } from '@platform/directives/bg-image.directive';
import { CheckboxDirective } from '@platform/directives/checkbox.directive';
import { RadioDirective } from '@platform/directives/radio.directive';
import { InfinityScrollDirective } from '@platform/directives/infinity-scroll.directive';
import { ClickOutsideDirective } from '@platform/directives/click-outside.directive';
import { MultiFileUploadComponent } from '@platform/components/global/multi-file-upload/multi-file-upload.component';
import { ToolbarComponent } from '@platform/components/global/toolbar/toolbar.component';
import { PricePipe } from '@platform/pipes/price.pipe';
import { TitleWrap } from './title-wrap';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MultiDropdownComponent } from './multi-dropdown/multi-dropdown.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { DebounceDirective } from '@platform/directives/debounce.directive';
import { CopyClipboardDirective } from '@platform/directives/copy-clipboard.directive';
import { ToggleBtnComponent } from './toggle-btn/toggle-btn.component';
import { TranslatePipe } from '@pipes/translate.pipe';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { GoogleAutocompleteComponent } from './google-autocomplete/google-autocomplete.component';
import { AutoValidationDirective } from '@platform/directives/auto-validation.directive';

/* Pipe end */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoaderModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ContextMenuComponent,
    BgImageDirective,
    CheckboxDirective,
    RadioDirective,
    InfinityScrollDirective,
    TruncatePipe,
    PricePipe,
    TranslatePipe,
    ClickOutsideDirective,
    DebounceDirective,
    CopyClipboardDirective,
    AutoValidationDirective,

    TitleWrap,
    MultiFileUploadComponent,
    ModalComponent,
    ConfirmModalComponent,
    PaginationComponent,
    DropdownComponent,
    ButtonComponent,
    ToolbarComponent,
    FileUploadComponent,
    MultiDropdownComponent,
    AutocompleteComponent,
    ToggleBtnComponent,
    UploadAvatarComponent,
    GoogleAutocompleteComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    BgImageDirective,
    CheckboxDirective,
    RadioDirective,
    InfinityScrollDirective,
    ClickOutsideDirective,
    DebounceDirective,
    CopyClipboardDirective,
    AutoValidationDirective,
    PricePipe,
    TruncatePipe,
    TranslatePipe,

    TitleWrap,
    MultiFileUploadComponent,
    ModalComponent,
    ConfirmModalComponent,
    PaginationComponent,
    DropdownComponent,
    ContextMenuComponent,
    ButtonComponent,
    ToolbarComponent,
    FileUploadComponent,
    MultiDropdownComponent,
    AutocompleteComponent,
    ToggleBtnComponent,
    UploadAvatarComponent,
    GoogleAutocompleteComponent,
  ],
  providers: [ CurrencyPipe ],
})

export class GlobalModule {}
