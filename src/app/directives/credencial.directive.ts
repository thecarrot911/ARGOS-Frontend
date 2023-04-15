import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { Credencial } from '../empleados';

@Directive({
    selector: '[appCredencial]'
})
export class CredencialDirective implements OnChanges{

    @Input() appCredencial! : Credencial[];

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef
    )
    {
        this.viewContainerRef.createEmbeddedView(templateRef);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appCredencial']){
            this.viewContainerRef.clear();
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
    }
}
