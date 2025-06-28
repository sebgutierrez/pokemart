export type Item = {
  name: string,
  category: string,
  description: string,
  buyPrice: string,
  debutGeneration: string,
  cssClass: string
}

export type Pagination = {
  currentPage: number,
  perPage: number,
  totalCount: number
}

export type ItemContainerProps = {
  items: Item[],
  onSelectItem: (state: Item) => void,
  pagination: Pagination,
  setPagination: (state: Pagination) => void
}

export type ItemDisplayProps = {
	item: Item
}