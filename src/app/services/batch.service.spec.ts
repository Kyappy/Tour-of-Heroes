import {inject, TestBed} from '@angular/core/testing';
import {BatchService} from './batch.service';

describe('BatchService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({providers: [BatchService]});
	});

	it('should be created', inject([BatchService], (service: BatchService<any, any>) => {
		expect(service).toBeTruthy();
	}));
});