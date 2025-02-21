import { postRequest, getRequest } from './service'
import {
	type GetCarriageAvailableListResponse,
	type GetCarriageAvailableListRequest,
	type CreateActResponse,
	type CreateActRequest,
	type GetBarcodeRequest,
	type ProductAttributesRequest,
	type ProductAttributesResponse,
	type ProductInfoRequest,
	type ProductInfoResponse,
	type ListPostingsFbsRequest,
	type ListPostingsFbsResponse,
	type ListPostingsFboRequest,
	type ListPostingsFboResponse,
	type GetProductPricesResponse,
	type GetProductPricesRequest,
	type ImportProductPricesRequest,
	type ImportProductPricesResponse,
	type ListFinanceTransactionsRequest,
	type ListFinanceTransactionsResponse,
	type UpdateProductStocksRequest,
	type UpdateProductStocksResponse,
	type GetProductStocksRequest,
	type GetProductStocksResponse,
	type ResetBarcodeRequest,
	type GetGiveoutListRequest,
	type GetGiveoutListResponse,
	type ListReturnsRequest,
	type ListReturnsResponse,
	type ResetBarcodeResponse,
	type GetActionProductsRequest,
	type GetActionCandidatesRequest,
	type GetActionCandidatesResponse,
	type GetActionsResponse,
	type GetActionProductsResponse,
	type ActivateActionProductsRequest,
	type ActivateActionProductsResponse,
	type DeactivateActionProductsRequest,
	type DeactivateActionProductsResponse,
	type PostingFbo,
	type PostingFbs,
	type ProductInfo,
	type ProductAttribute,
	ActionCandidatesProduct,
	GetProductPrice,
} from '../../types/ozon/ozon-types'
import { logOzonError } from '../../utils/log-ozon-error'

export const getActs = async (
	props: GetCarriageAvailableListRequest
): Promise<GetCarriageAvailableListResponse['result'] | undefined> => {
	const response = await postRequest<
		GetCarriageAvailableListRequest,
		GetCarriageAvailableListResponse
	>('v1/posting/carriage-available/list')
	return response?.result
}

export const createAct = async (
	props: CreateActRequest
): Promise<CreateActResponse['result'] | undefined> => {
	const response = await postRequest<CreateActRequest, CreateActResponse>(
		'v2/posting/fbs/act/create',
		props
	)
	return response?.result
}

export const getQr = async (
	props: GetBarcodeRequest
): Promise<Buffer | undefined> => {
	const response = await postRequest<GetBarcodeRequest, string>(
		'v2/posting/fbs/act/get-barcode',
		props,
		'arraybuffer'
	)
	return response ? Buffer.from(response) : undefined
}

export const getOzonAttributes = async (
	props: ProductAttributesRequest
): Promise<ProductAttribute[] | undefined> => {
	const response = await postRequest<
		ProductAttributesRequest,
		ProductAttributesResponse
	>('v4/product/info/attributes', props)
	return response?.result
}

export const getOzonOffers = async (
	props: ProductInfoRequest
): Promise<ProductInfo[] | undefined> => {
	const response = await postRequest<ProductInfoRequest, ProductInfoResponse>(
		'v3/product/info/list',
		props
	)
	return response?.items
}

export const getOzonFboOrders = async ({
	...props
}: ListPostingsFboRequest): Promise<PostingFbo[] | undefined> => {
	const response = await postRequest<
		ListPostingsFboRequest,
		ListPostingsFboResponse
	>('v2/posting/fbo/list', { ...props })
	return response?.result
}

export const getOzonFbsOrders = async ({
	...props
}: ListPostingsFbsRequest): Promise<PostingFbs[] | undefined> => {
	const response = await postRequest<
		ListPostingsFbsRequest,
		ListPostingsFbsResponse
	>('v3/posting/fbs/list', { ...props })
	return response?.result?.postings
}

export const getProductPrices = async ({
	...props
}: GetProductPricesRequest): Promise<GetProductPrice[] | undefined> => {
	const response = await postRequest<
		GetProductPricesRequest,
		GetProductPricesResponse
	>('v5/product/info/prices', { ...props })
	return response?.items
}

export const sendPrices = async ({
	...props
}: ImportProductPricesRequest): Promise<
	ImportProductPricesResponse | undefined
> => {
	const response = await postRequest<
		ImportProductPricesRequest,
		ImportProductPricesResponse
	>('v1/product/import/prices', { ...props })
	return response
}

const getTransactionPage = async (
	props: ListFinanceTransactionsRequest,
	page: number
): Promise<ListFinanceTransactionsResponse['result'] | undefined> => {
	const response = await postRequest<
		ListFinanceTransactionsRequest,
		ListFinanceTransactionsResponse
	>('v3/finance/transaction/list', { ...props, page })
	return response?.result // Возвращаем result, который должен содержать operations и другие поля
}

export const getTransactions = async (
	props: ListFinanceTransactionsRequest
): Promise<ListFinanceTransactionsResponse['result'] | undefined> => {
	try {
		const getTransaction = async (
			page: number
		): Promise<ListFinanceTransactionsResponse['result'] | undefined> => {
			const response = await getTransactionPage(props, page)
			if (!response) return undefined

			const operations = response.operations || []
			const pageCount = response.page_count || 0

			if (page < pageCount) {
				const nextOperations = await getTransaction(page + 1)
				return {
					operations: operations.concat(
						nextOperations?.operations || []
					),
					page_count: pageCount,
					row_count: response.row_count,
				}
			} else {
				return response
			}
		}

		return await getTransaction(1)
	} catch (error: unknown) {
		logOzonError(error)
	}
}

export const getOzonStocks = async ({
	...props
}: GetProductStocksRequest): Promise<
	GetProductStocksResponse['items'] | undefined
> => {
	const response = await postRequest<
		GetProductStocksRequest,
		GetProductStocksResponse
	>('/v4/product/info/stocks', { ...props })
	return response?.items
}

export const sendOzonStocks = async ({
	...props
}: UpdateProductStocksRequest): Promise<
	UpdateProductStocksResponse['result'] | undefined
> => {
	const response = await postRequest<
		UpdateProductStocksRequest,
		UpdateProductStocksResponse
	>('v2/products/stocks', { ...props })
	return response?.result
}

export const getOzonReturns = async ({
	...props
}: ListReturnsRequest): Promise<ListReturnsResponse['returns'] | undefined> => {
	const response = await postRequest<ListReturnsRequest, ListReturnsResponse>(
		'v1/returns/list',
		{
			...props,
		}
	)
	return response?.returns
}

export const getGiveoutsOzon = async ({
	...props
}: GetGiveoutListRequest): Promise<
	GetGiveoutListResponse['giveouts'] | undefined
> => {
	const response = await postRequest<
		GetGiveoutListRequest,
		GetGiveoutListResponse
	>('v1/return/giveout/list', {
		...props,
	})
	return response?.giveouts
}

export const getReturnPng = async ({
	...props
}: ResetBarcodeRequest): Promise<ResetBarcodeResponse['png'] | undefined> => {
	const response = await postRequest<
		ResetBarcodeRequest,
		ResetBarcodeResponse
	>('v1/return/giveout/barcode-reset', {
		...props,
	})
	return response?.png
}

export const getPromos = async (): Promise<
	GetActionsResponse['result'] | undefined
> => {
	const response = await getRequest<GetActionsResponse>('v1/actions')
	return response?.result
}

export const getPromosOffers = async ({
	...props
}: GetActionCandidatesRequest): Promise<
	ActionCandidatesProduct[] | undefined
> => {
	const response = await postRequest<
		GetActionCandidatesRequest,
		GetActionCandidatesResponse
	>('v1/actions/candidates', {
		...props,
	})
	return response?.result?.products
}

export const getPromosProducts = async ({
	...props
}: GetActionProductsRequest): Promise<
	GetActionProductsResponse['result'] | undefined
> => {
	const response = await postRequest<
		GetActionProductsRequest,
		GetActionProductsResponse
	>('v1/actions/products', {
		...props,
	})
	return response?.result
}

export const sendPromosOffers = async ({
	...props
}: ActivateActionProductsRequest): Promise<
	ActivateActionProductsResponse['result'] | undefined
> => {
	const response = await postRequest<
		ActivateActionProductsRequest,
		ActivateActionProductsResponse
	>('/v1/actions/products/activate', {
		...props,
	})
	return response?.result
}

export const deletePromosOffers = async ({
	...props
}: DeactivateActionProductsRequest): Promise<
	DeactivateActionProductsResponse['result'] | undefined
> => {
	const response = await postRequest<
		DeactivateActionProductsRequest,
		DeactivateActionProductsResponse
	>('v1/actions/products/deactivate', {
		...props,
	})
	return response?.result
}
