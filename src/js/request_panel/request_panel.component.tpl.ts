export const template =
`<a href="" (click)="onClearCache()">Clear Cache</a>
<table>
	<tr>
		<th>Enabled</th>
		<th>Url</th>
		<th>Content</th>
	</tr>
	<tr *ngFor="let request of requests">
		<td><input [(ngModel)]="request.isEnabled"
				(change)="onChange(request)"
				type="checkbox"/></td>
		<td><a target="_blank" [href]="request.url">{{request.url}}</a></td>
		<td><a target="_blank" [href]="request.content">Data</a></td>
	</tr>
</table>`;