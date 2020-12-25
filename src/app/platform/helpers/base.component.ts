import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class BaseComponent implements OnDestroy {
	private _subscriptions: Subscription[] = [];
	
	ngOnDestroy() {
		this._subscriptions.forEach((sub: Subscription) => {
			if (sub) {
				sub.unsubscribe();
			}
		});
	}
}
