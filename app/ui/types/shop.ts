import { SessionData } from "../../session/util"

export type Item = {
  id: string,
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
	item: Item,
  session: SessionData
}

export type PaginationButtonProps = {
	pagination: Pagination,
	onPageChange: (page: number) => void
}

export type CartItem = {
  quantity: number;
  item: Item;
}
