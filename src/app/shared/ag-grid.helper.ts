import { AddTransactionRendererComponent } from './add-transaction-renderer.component';
import { DateRendererComponent } from './date-renderer.component';
import { DateEditorComponent } from './date-editor.component';
import { SelectEditorComponent } from './select-editor.component';
import { AutocompleteEditorComponent } from './autocomplete-editor.component';
import { StatusRendererComponent } from './status-renderer.component';
import { CurrencyRendererComponent } from './currency-renderer.component';
import { DELETE, BACKSPACE } from './constants';

export namespace AgGridHelper {
    export function getFrameworkComponents() {
        return {
              addTransaction : AddTransactionRendererComponent,
              dateRenderer: DateRendererComponent,
              dateEditor: DateEditorComponent,
              selectEditor: SelectEditorComponent,
              autocompleteEditor: AutocompleteEditorComponent,
              currencyRenderer: CurrencyRendererComponent,
              statusRenderer: StatusRendererComponent,
          };
    }

    export function suppressKeyboardEvent(params) {
        return params.event.keyCode === BACKSPACE ||
            params.event.keyCode === DELETE;
    }

    export function getColSpan(params: any): number {

        if (params.node.rowPinned === 'top') {
          console.log(params);
          return params.columnApi.columnController.columnDefs.length;
        }

        return 1;
    }
}
