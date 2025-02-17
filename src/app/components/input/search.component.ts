import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    signal, SimpleChanges
} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {City} from "../../interfaces/city";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {SearchOption} from "../../interfaces/search-option";
import {NgTemplateOutlet} from "@angular/common";

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgTemplateOutlet,
    ],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
    @Output() onInputEvent = new EventEmitter<string>();
    @Output() onClickEvent = new EventEmitter<SearchOption>();
    @Input() items: SearchOption[] = []
    @Input() loading = false;
    @Input() itemName = "";

    protected searchControl = new FormControl<string>(this.itemName, {nonNullable: true});

    protected isDropdownVisible = signal(false);

    private destroy = new Subject<void>();// DestroyRef

    ngOnDestroy(): void {
        this.destroy.next();
        this.destroy.complete();
    }

    ngOnInit() {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(500),
                takeUntil(this.destroy)
            )
            .subscribe(value => {
                this.onInputEvent.emit(value);
            });
    }

    // Заменить на effect or computed
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['itemName']) {
            this.searchControl.setValue(changes['itemName'].currentValue, {emitEvent: false});
        }
    }

    protected clickItem(item: SearchOption): void {
        this.onClickEvent.emit(item);
    }

    protected showDropdown(): void {
        this.isDropdownVisible.set(true)
    }

    protected hideDropdown(): void {
        this.isDropdownVisible.set(false);
    }
}
