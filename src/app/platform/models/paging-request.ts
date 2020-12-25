
export class PagingRequest {
	page: number = 0;
	count: number = 15;

	getModel() {
		return {
			page: this.page,
			count: this.count,
		};
	}

	getQuery() {
		return `page=${this.page}&count=${this.count}`;
	}

	getPath() {
	  return `/${this.page}/${this.count}`;
  }

	resetPaging() {
		this.page = 0;
	}

}
