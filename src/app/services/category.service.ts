import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Category } from '../models/category'
import { HTTPConfig } from '../services/config.service'

@Injectable({
	providedIn: 'root'
})

export class CategoryService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url = this.httpconfig.getURL()
  	private headers = this.httpconfig.getHeaders()


	// Get All Categories
	getCategories(): Observable<Category[]> {
		return this.http.get<any>(this.url + "/category");
	}

	// Get Category by ID
	getCategory(id): Observable<Category> {
		return this.http.get<any>(
			this.url + "/category/" + id
		)
	}

	// Add New Category
	addCategory(category): Observable<any> {
		return this.http.post<any>(
			this.url + "/category",
			category,
			{ headers: this.headers }
		)
	}

	// Update Category
	updateCategory(category): Observable<any> {
		return this.http.put<any>(
			this.url + "/category/" + category._id,
			category,
			{ headers: this.headers }
		)
	}

	// Delete Category
	deleteCategory(id): Observable<Category> {
		return this.http.delete<Category>(
			this.url + "/category/" + id
		)
	}
}