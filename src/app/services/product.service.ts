import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Product } from '../models/product'
import { HTTPConfig } from '../services/config.service'

@Injectable({
	providedIn: 'root'
})

export class ProductService {

	constructor(private http: HttpClient, private httpconfig: HTTPConfig) { }

	private url = this.httpconfig.getURL()
  	private headers = this.httpconfig.getHeaders()

	// Get All Products
	getProducts(): Observable<Product[]> {
		return this.http.get<any>(this.url + "/product");
	}

	// Get Product by ID
	getProduct(id): Observable<Product> {
		return this.http.get<any>(
			this.url + "/product/" + id
		)
	}

	// Add New Product
	addProduct(product): Observable<any> {
		return this.http.post<any>(
			this.url + "/product",
			product,
			{ headers: this.headers }
		)
	}

	// Update Product
	updateProduct(product): Observable<any> {
		return this.http.put<any>(
			this.url + "/product/" + product._id,
			product,
			{ headers: this.headers }
		)
	}

	// Delete Product
	deleteProduct(id): Observable<Product> {
		return this.http.delete<Product>(
			this.url + "/product/" + id
		)
	}
}