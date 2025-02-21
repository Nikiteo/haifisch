/** THIS FILE WAS GENERATED */

/* eslint-disable @typescript-eslint/array-type, @typescript-eslint/ban-types, max-lines, @typescript-eslint/no-namespace, @typescript-eslint/indent, @typescript-eslint/no-invalid-void-type */

export interface ErrorResponse {
    /** @example 16 */
    code?: number
    details?: {
        /** @example "string" */
        typeUrl?: string
        /** @example "string" */
        value?: string
    }[]
    /** @example "Client-Id and Api-Key headers are required" */
    message?: string
}

export interface GetCarriageAvailableListRequest {
    /** @example 0 */
    delivery_method_id?: number
    /**
     * @format date-time
     * @example "2019-08-24T14:15:22Z"
     */
    departure_date?: string
}

export interface GetCarriageAvailableListResponse {
    result?: {
        /** @example 0 */
        carriage_id?: number
        /** @example 0 */
        carriage_postings_count?: number
        /** @example "string" */
        carriage_status?: string
        /**
         * @format date-time
         * @example "2019-08-24T14:15:22Z"
         */
        cutoff_at?: string
        /** @example 0 */
        delivery_method_id?: number
        /** @example "string" */
        delivery_method_name?: string
        errors?: {
            /** @example "string" */
            code?: string
            /** @example "string" */
            status?: string
        }[]
        /** @example "string" */
        first_mile_type?: string
        /** @example true */
        has_entrusted_acceptance?: boolean
        /** @example 0 */
        mandatory_postings_count?: number
        /** @example 0 */
        mandatory_packaged_count?: number
        /** @example "string" */
        recommended_time_local?: string
        /** @example 0 */
        recommended_time_utc_offset_in_minutes?: number
        /** @example "string" */
        tpl_provider_icon_url?: string
        /** @example "string" */
        tpl_provider_name?: string
        /** @example "string" */
        warehouse_city?: string
        /** @example 0 */
        warehouse_id?: number
        /** @example "string" */
        warehouse_name?: string
        /** @example "string" */
        warehouse_timezone?: string
    }[]
}

export interface CreateActRequest {
    /** @example 1 */
    containers_count?: number
    /** @example 230039077005 */
    delivery_method_id?: number
    /**
     * @format date-time
     * @example "2022-06-10T11:42:06.444Z"
     */
    departure_date?: string
}

export interface CreateActResponse {
    result?: {
        /** @example 5819327210249 */
        id?: number
    }
}

export interface GetBarcodeRequest {
    /** @example "295662811" */
    id?: string
}

export interface GetBarcodeResponse {
    /** @example "image/png" */
    content_type?: string
    /** @example "20913984_barcode.png" */
    file_name?: string
    /**
     * @format byte
     * @example "iVBORw0KGgoAAAANSUhEUgAA..."
     */
    file_content?: string
}

export interface ProductAttributesRequest {
    filter?: {
        /** @example ["213761435"] */
        product_id?: string[]
        /** @example ["testtest5"] */
        offer_id?: string[]
        /** @example ["123495432"] */
        sku?: string[]
        /** @example "ALL" */
        visibility?: string
    }
    /** @example 100 */
    limit?: number
    /** @example "ASC" */
    sort_dir?: string
}

export interface ProductAttribute {
    /** @example 213761435 */
    id?: number
    /** @example "" */
    barcode?: string
    /** @example "Пленка защитная для Xiaomi Redmi Note 10 Pro 5G" */
    name?: string
    /** @example "21470" */
    offer_id?: string
    /** @example 124572394 */
    type_id?: number
    /** @example 10 */
    height?: number
    /** @example 210 */
    depth?: number
    /** @example 140 */
    width?: number
    /** @example "mm" */
    dimension_unit?: string
    /** @example 50 */
    weight?: number
    /** @example "g" */
    weight_unit?: string
    /** @example "https://cdn1.ozone.ru/s3/multimedia-4/6804736960.jpg" */
    primary_image?: string
    model_info?: {
        /** @example 43445453 */
        model_id?: number
        /** @example 4 */
        count?: number
    }
    images?: string[]
    pdf_list?: string[]
    attributes?: {
        /** @example 5219 */
        id?: number
        /** @example 0 */
        complex_id?: number
        values?: {
            /** @example 970718176 */
            dictionary_value_id?: number
            /** @example "универсальный" */
            value?: string
        }[]
    }[]
    complex_attributes?: {
        /** @example 0 */
        id?: number
        /** @example 0 */
        complex_id?: number
        values?: {
            /** @example 0 */
            dictionary_value_id?: number
            /** @example "string" */
            value?: string
        }[]
    }[]
    /** @example "" */
    color_image?: string
    /** @example 71107562 */
    description_category_id?: number
}

export interface ProductAttributesResponse {
    result?: ProductAttribute[]
    /** @example 1 */
    total?: number
    /** @example "onVsfA==" */
    last_id?: string
}

export interface ProductInfoRequest {
    /** @example ["offer123","offer456"] */
    offer_id?: string[]
    /** @example ["product123","product456"] */
    product_id?: string[]
    /** @example ["sku123","sku456"] */
    sku?: string[]
}

export interface ProductInfo {
    /** @example ["1234567890123"] */
    barcodes?: string[]
    /** @example ["https://example.com/image.jpg"] */
    color_image?: string[]
    commissions?: {
        /**
         * @format float
         * @example 10
         */
        delivery_amount?: number
        /**
         * @format float
         * @example 5
         */
        percent?: number
        /**
         * @format float
         * @example 2
         */
        return_amount?: number
        /** @example "string" */
        sale_schema?: string
        /**
         * @format float
         * @example 100
         */
        value?: number
    }[]
    /**
     * @format date-time
     * @example "2019-08-24T14:15:22Z"
     */
    created_at?: string
    /** @example "RUB" */
    currency_code?: string
    /** @example 123 */
    description_category_id?: number
    /** @example 0 */
    discounted_fbo_stocks?: number
    errors?: {
        /** @example 0 */
        attribute_id?: number
        /** @example "string" */
        code?: string
        /** @example "string" */
        field?: string
        /** @example "ERROR" */
        level?: string
        /** @example "string" */
        state?: string
        texts?: {
            /** @example "string" */
            attribute_name?: string
            /** @example "string" */
            description?: string
            /** @example "string" */
            hint_code?: string
            /** @example "string" */
            message?: string
            params?: {
                /** @example "string" */
                name?: string
                /** @example "string" */
                value?: string
            }[]
            /** @example "string" */
            short_description?: string
        }
    }[]
    /** @example true */
    has_discounted_fbo_item?: boolean
    /** @example 1 */
    id?: number
    /** @example ["https://example.com/image1.jpg","https://example.com/image2.jpg"] */
    images?: string[]
    /** @example ["https://example.com/image360.jpg"] */
    images360?: string[]
    /** @example false */
    is_archived?: boolean
    /** @example false */
    is_autoarchived?: boolean
    /** @example true */
    is_discounted?: boolean
    /** @example false */
    is_kgt?: boolean
    /** @example true */
    is_prepayment_allowed?: boolean
    /** @example true */
    is_super?: boolean
    /** @example "1500.00" */
    marketing_price?: string
    /** @example "1200.00" */
    min_price?: string
    model_info?: {
        /** @example 1 */
        count?: number
        /** @example 12345 */
        model_id?: number
    }
    /** @example "Продукт" */
    name?: string
    /** @example "offer123" */
    offer_id?: string
    /** @example "1600.00" */
    old_price?: string
    /** @example "1400.00" */
    price?: string
    price_indexes?: {
        /** @example "COLOR_INDEX_UNSPECIFIED" */
        color_index?: string
        external_index_data?: {
            /** @example "1300.00" */
            minimal_price?: string
            /** @example "RUB" */
            minimal_price_currency?: string
            /**
             * @format float
             * @example 1
             */
            price_index_value?: number
        }
        ozon_index_data?: {
            /** @example "1250.00" */
            minimal_price?: string
            /** @example "RUB" */
            minimal_price_currency?: string
            /**
             * @format float
             * @example 1
             */
            price_index_value?: number
        }
        self_marketplaces_index_data?: {
            /** @example "1350.00" */
            minimal_price?: string
            /** @example "RUB" */
            minimal_price_currency?: string
            /**
             * @format float
             * @example 1
             */
            price_index_value?: number
        }
    }
    /** @example ["https://example.com/primary_image.jpg"] */
    primary_image?: string[]
    sources?: {
        /**
         * @format date-time
         * @example "2019-08-24T14:15:22Z"
         */
        created_at?: string
        /** @example "string" */
        quant_code?: string
        /** @example "SHIPMENT_TYPE_UNSPECIFIED" */
        shipment_type?: string
        /** @example 123456 */
        sku?: number
        /** @example "string" */
        source?: string
    }[]
    statuses?: {
        /** @example true */
        is_created?: boolean
        /** @example "string" */
        moderate_status?: string
        /** @example "string" */
        status?: string
        /** @example "string" */
        status_description?: string
        /** @example "string" */
        status_failed?: string
        /** @example "string" */
        status_name?: string
        /** @example "string" */
        status_tooltip?: string
        /**
         * @format date-time
         * @example "2019-08-24T14:15:22Z"
         */
        status_updated_at?: string
        /** @example "string" */
        validation_status?: string
    }
    stocks?: {
        /** @example true */
        has_stock?: boolean
        stocks?: {
            /** @example 100 */
            present?: number
            /** @example 10 */
            reserved?: number
            /** @example 123456 */
            sku?: number
            /** @example "string" */
            source?: string
        }[]
    }
    /** @example 1 */
    type_id?: number
    /**
     * @format date-time
     * @example "2019-08-24T14:15:22Z"
     */
    updated_at?: string
    /** @example "20%" */
    vat?: string
    visibility_details?: {
        /** @example true */
        has_price?: boolean
        /** @example true */
        has_stock?: boolean
    }
    /**
     * @format float
     * @example 0.5
     */
    volume_weight?: number
}

export interface ProductInfoResponse {
    items?: ProductInfo[]
}

export interface ListPostingsFboRequest {
    /** @example "ASC" */
    dir?: ListPostingsFboRequestDirEnum
    filter?: {
        /**
         * @format date-time
         * @example "2021-09-01T00:00:00.000Z"
         */
        since?: string
        /** @example "" */
        status?: string
        /**
         * @format date-time
         * @example "2021-11-17T10:44:12.828Z"
         */
        to?: string
    }
    /** @example 5 */
    limit?: number
    /** @example 0 */
    offset?: number
    /** @example true */
    translit?: boolean
    with?: {
        /** @example true */
        analytics_data?: boolean
        /** @example true */
        financial_data?: boolean
    }
}

export interface PostingFbo {
    /** @example 354680487 */
    order_id?: number
    /** @example "16965409-0014" */
    order_number?: string
    /** @example "16965409-0014-1" */
    posting_number?: string
    /** @example "delivered" */
    status?: string
    /** @example 0 */
    cancel_reason_id?: number
    /**
     * @format date-time
     * @example "2021-09-01T00:23:45.607000Z"
     */
    created_at?: string
    /**
     * @format date-time
     * @example "2021-09-01T00:25:30.120000Z"
     */
    in_process_at?: string
    products?: {
        /** @example 160249683 */
        sku?: number
        /** @example "Так говорил Омар Хайям. Жизнеописание. Афоризмы и рубайят. Классика в словах и картинках" */
        name?: string
        /** @example 1 */
        quantity?: number
        /** @example "978-5-906864-56-7" */
        offer_id?: string
        /** @example "81.00" */
        price?: string
        digital_codes?: string[]
        /** @example "RUB" */
        currency_code?: string
    }[]
    analytics_data?: {
        /** @example "" */
        region?: string
        /** @example "" */
        city?: string
        /** @example "PVZ" */
        delivery_type?: string
        /** @example false */
        is_premium?: boolean
        /** @example "Карты оплаты" */
        payment_type_group_name?: string
        /** @example 17717042026000 */
        warehouse_id?: number
        /** @example "РОСТОВ-НА-ДОНУ_РФЦ" */
        warehouse_name?: string
        /** @example false */
        is_legal?: boolean
    }
    financial_data?: {
        products?: {
            /**
             * @format float
             * @example 12.15
             */
            commission_amount?: number
            /** @example 15 */
            commission_percent?: number
            /**
             * @format float
             * @example 68.85
             */
            payout?: number
            /** @example 160249683 */
            product_id?: number
            /** @example "RUB" */
            currency_code?: string
            /**
             * @format float
             * @example 115
             */
            old_price?: number
            /**
             * @format float
             * @example 81
             */
            price?: number
            /**
             * @format float
             * @example 34
             */
            total_discount_value?: number
            /**
             * @format float
             * @example 29.57
             */
            total_discount_percent?: number
            actions?: string[]
            picking?: string | null
            /** @example 0 */
            quantity?: number
            /** @example "" */
            client_price?: string
            item_services?: {
                /**
                 * @format float
                 * @example -31.5
                 */
                marketplace_service_item_fulfillment?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_pickup?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_pvz?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_sc?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_ff?: number
                /**
                 * @format float
                 * @example -5
                 */
                marketplace_service_item_direct_flow_trans?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_flow_trans?: number
                /**
                 * @format float
                 * @example -20
                 */
                marketplace_service_item_deliv_to_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_not_deliv_to_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_part_goods_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_after_deliv_to_customer?: number
            }
        }[]
    }
    posting_services?: {
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_fulfillment?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_pickup?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_dropoff_pvz?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_dropoff_sc?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_dropoff_ff?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_direct_flow_trans?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_return_flow_trans?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_deliv_to_customer?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_return_not_deliv_to_customer?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_return_part_goods_customer?: number
        /**
         * @format float
         * @example 0
         */
        marketplace_service_item_return_after_deliv_to_customer?: number
    }
    additional_data?: Record<string, unknown>[]
}

export interface ListPostingsFboResponse {
    result?: PostingFbo[]
}

export interface ListPostingsFbsRequest {
    /** @example "ASC" */
    dir?: ListPostingsFbsRequestDirEnum
    filter?: {
        /** @example ["string"] */
        delivery_method_id?: string[]
        /** @example false */
        is_quantum?: boolean
        last_changed_status_date?: {
            /**
             * @format date-time
             * @example "2023-11-03T11:47:39.878Z"
             */
            from?: string
            /**
             * @format date-time
             * @example "2023-11-03T11:47:39.878Z"
             */
            to?: string
        }
        /** @example 0 */
        order_id?: number
        /** @example ["string"] */
        provider_id?: string[]
        /**
         * @format date-time
         * @example "2023-11-03T11:47:39.878Z"
         */
        since?: string
        /** @example "awaiting_packaging" */
        status?: string
        /**
         * @format date-time
         * @example "2023-11-03T11:47:39.878Z"
         */
        to?: string
        /** @example ["string"] */
        warehouse_id?: string[]
    }
    /** @example 0 */
    limit?: number
    /** @example 0 */
    offset?: number
    with?: {
        /** @example true */
        analytics_data?: boolean
        /** @example true */
        barcodes?: boolean
        /** @example true */
        financial_data?: boolean
        /** @example true */
        translit?: boolean
    }
}

export interface PostingFbs {
    /** @example "05708065-0029-1" */
    posting_number?: string
    /** @example 680420041 */
    order_id?: number
    /** @example "05708065-0029" */
    order_number?: string
    /**
     * @format date-time
     * @example "2025-01-17T10:59:26.614Z"
     */
    pickup_code_verified_at?: string
    /** @example "awaiting_deliver" */
    status?: string
    /** @example "posting_awaiting_passport_data" */
    substatus?: string
    delivery_method?: {
        /** @example 21321684811000 */
        id?: number
        /** @example "Ozon Логистика самостоятельно, Красногорск" */
        name?: string
        /** @example 21321684811000 */
        warehouse_id?: number
        /** @example "Стим Тойс Нахабино" */
        warehouse?: string
        /** @example 24 */
        tpl_provider_id?: number
        /** @example "Ozon Логистика" */
        tpl_provider?: string
    }
    /** @example "" */
    tracking_number?: string
    /** @example "ozon" */
    tpl_integration_type?: string
    /**
     * @format date-time
     * @example "2022-05-13T07:07:32Z"
     */
    in_process_at?: string
    /**
     * @format date-time
     * @example "2022-05-13T10:00:00Z"
     */
    shipment_date?: string
    /** @format date-time */
    delivering_date?: string | null
    cancellation?: {
        /** @example 0 */
        cancel_reason_id?: number
        /** @example "" */
        cancel_reason?: string
        /** @example "" */
        cancellation_type?: string
        /** @example false */
        cancelled_after_ship?: boolean
        /** @example false */
        affect_cancellation_rating?: boolean
        /** @example "" */
        cancellation_initiator?: string
    }
    customer?: object | null
    products?: {
        /** @example "1390.000000" */
        price?: string
        /** @example "RUB" */
        currency_code?: string
        /** @example "205953" */
        offer_id?: string
        /** @example "Электронный конструктор PinLab Позитроник" */
        name?: string
        /** @example 358924380 */
        sku?: number
        /** @example 1 */
        quantity?: number
        /** @example [] */
        mandatory_mark?: string[]
    }[]
    addressee?: object | null
    barcodes?: string[] | null
    analytics_data?: {
        /** @example "" */
        region?: string
        /** @example "" */
        city?: string
        /** @example "PVZ" */
        delivery_type?: string
        /** @example false */
        is_premium?: boolean
        /** @example "Карты оплаты" */
        payment_type_group_name?: string
        /** @example 17717042026000 */
        warehouse_id?: number
        /** @example "РОСТОВ-НА-ДОНУ_РФЦ" */
        warehouse_name?: string
        /** @example false */
        is_legal?: boolean
    }
    financial_data?: {
        products?: {
            /**
             * @format float
             * @example 12.15
             */
            commission_amount?: number
            /** @example 15 */
            commission_percent?: number
            /**
             * @format float
             * @example 68.85
             */
            payout?: number
            /** @example 160249683 */
            product_id?: number
            /** @example "RUB" */
            currency_code?: string
            /**
             * @format float
             * @example 115
             */
            old_price?: number
            /**
             * @format float
             * @example 81
             */
            price?: number
            /**
             * @format float
             * @example 34
             */
            total_discount_value?: number
            /**
             * @format float
             * @example 29.57
             */
            total_discount_percent?: number
            actions?: string[]
            picking?: string | null
            /** @example 0 */
            quantity?: number
            /** @example "" */
            client_price?: string
            item_services?: {
                /**
                 * @format float
                 * @example -31.5
                 */
                marketplace_service_item_fulfillment?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_pickup?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_pvz?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_sc?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_dropoff_ff?: number
                /**
                 * @format float
                 * @example -5
                 */
                marketplace_service_item_direct_flow_trans?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_flow_trans?: number
                /**
                 * @format float
                 * @example -20
                 */
                marketplace_service_item_deliv_to_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_not_deliv_to_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_part_goods_customer?: number
                /**
                 * @format float
                 * @example 0
                 */
                marketplace_service_item_return_after_deliv_to_customer?: number
            }
        }[]
    }
    /** @example false */
    is_express?: boolean
    /** @example 0 */
    quantum_id?: number
    requirements?: {
        /** @example [] */
        products_requiring_gtd?: string[]
        /** @example [] */
        products_requiring_country?: string[]
        /** @example [] */
        products_requiring_mandatory_mark?: string[]
        /** @example [] */
        products_requiring_jwn?: string[]
    }
    tariffication?: {
        /** @example 0 */
        current_tariff_rate?: number
        /** @example "" */
        current_tariff_type?: string
        /** @example "" */
        current_tariff_charge?: string
        /** @example "" */
        current_tariff_charge_currency_code?: string
        /** @example 0 */
        next_tariff_rate?: number
        /** @example "" */
        next_tariff_type?: string
        /** @example "" */
        next_tariff_charge?: string
        /**
         * @format date-time
         * @example "2023-11-13T08:05:57.657Z"
         */
        next_tariff_starts_at?: string
        /** @example "" */
        next_tariff_charge_currency_code?: string
    }[]
    /** @example true */
    has_next?: boolean
}

export interface ListPostingsFbsResponse {
    result?: {
        postings?: PostingFbs[]
    }
}

export interface GetProductPricesRequest {
    /** @example "string" */
    cursor?: string
    filter?: {
        /** @example ["356792"] */
        offer_id?: string[]
        /** @example [243686911] */
        product_id?: number[]
        /** @example "ALL" */
        visibility?: GetProductPricesRequestVisibilityEnum
    }
    /** @example 100 */
    limit?: number
}

export interface GetProductPrice {
    /** @example 0 */
    acquiring?: number
    commissions?: {
        /** @example 14.75 */
        fbo_deliv_to_customer_amount?: number
        /** @example 46.5 */
        fbo_direct_flow_trans_max_amount?: number
        /** @example 31 */
        fbo_direct_flow_trans_min_amount?: number
        /** @example 50 */
        fbo_return_flow_amount?: number
        /** @example 60 */
        fbs_deliv_to_customer_amount?: number
        /** @example 61.5 */
        fbs_direct_flow_trans_max_amount?: number
        /** @example 41 */
        fbs_direct_flow_trans_min_amount?: number
        /** @example 25 */
        fbs_first_mile_max_amount?: number
        /** @example 0 */
        fbs_first_mile_min_amount?: number
        /** @example 40 */
        fbs_return_flow_amount?: number
        /** @example 15 */
        sales_percent_fbo?: number
        /** @example 0 */
        sales_percent_fbs?: number
    }
    marketing_actions?: {
        actions?: {
            /**
             * @format date-time
             * @example "2024-12-13T06:49:37.591Z"
             */
            date_from?: string
            /**
             * @format date-time
             * @example "2024-12-13T06:49:37.591Z"
             */
            date_to?: string
            /** @example "string" */
            title?: string
            /** @example 0 */
            value?: number
        }[]
        /**
         * @format date-time
         * @example "2024-12-13T06:49:37.591Z"
         */
        current_period_from?: string
        /**
         * @format date-time
         * @example "2024-12-13T06:49:37.591Z"
         */
        current_period_to?: string
        /** @example true */
        ozon_actions_exist?: boolean
    }
    /** @example "356792" */
    offer_id?: string
    price?: {
        /** @example true */
        auto_action_enabled?: boolean
        /** @example "RUB" */
        currency_code?: string
        /** @example 0 */
        marketing_price?: number
        /** @example 0 */
        marketing_seller_price?: number
        /** @example 0 */
        min_price?: number
        /** @example 579 */
        old_price?: number
        /** @example 499 */
        price?: number
        /** @example 0 */
        retail_price?: number
        /** @example 0.2 */
        vat?: number
    }
    price_indexes?: {
        /** @example "WITHOUT_INDEX" */
        color_index?: string
        external_index_data?: {
            /** @example 0 */
            min_price?: number
            /** @example "string" */
            min_price_currency?: string
            /** @example 0 */
            price_index_value?: number
        }
        ozon_index_data?: {
            /** @example 0 */
            min_price?: number
            /** @example "string" */
            min_price_currency?: string
            /** @example 0 */
            price_index_value?: number
        }
        self_marketplaces_index_data?: {
            /** @example 0 */
            min_price?: number
            /** @example "string" */
            min_price_currency?: string
            /** @example 0 */
            price_index_value?: number
        }
    }
    /** @example 243686911 */
    product_id?: number
    /** @example 0 */
    volume_weight?: number
}

export interface GetProductPricesResponse {
    /** @example "string" */
    cursor?: string
    items?: GetProductPrice[]
    /** @example 0 */
    total?: number
}

export interface ImportProductPricesRequest {
    prices?: {
        /** @example "UNKNOWN" */
        auto_action_enabled?: ImportProductPricesRequestAutoActionEnabledEnum
        /** @example "RUB" */
        currency_code?: string
        /** @example "800" */
        min_price?: string
        /** @example true */
        min_price_for_auto_actions_enabled?: boolean
        /** @example "" */
        offer_id?: string
        /** @example "0" */
        old_price?: string
        /** @example "1448" */
        price?: string
        /** @example "UNKNOWN" */
        price_strategy_enabled?: ImportProductPricesRequestPriceStrategyEnabledEnum
        /** @example 1386 */
        product_id?: number
        /** @example 1 */
        quant_size?: number
        /** @example "0.1" */
        vat?: string
    }[]
}

export interface ImportProductPricesResponse {
    result?: {
        /** @example 1386 */
        product_id?: number
        /** @example "PH8865" */
        offer_id?: string
        /** @example true */
        updated?: boolean
        /** @example [] */
        errors?: {
            code?: string
            message?: string
        }[]
    }[]
}

export interface ListFinanceTransactionsRequest {
    filter?: {
        date?: {
            /**
             * @format date-time
             * @example "2021-11-01T00:00:00.000Z"
             */
            from?: string
            /**
             * @format date-time
             * @example "2021-11-02T00:00:00.000Z"
             */
            to?: string
        }
        /** @example [] */
        operation_type?: string[]
        /** @example "" */
        posting_number?: string
        /** @example "all" */
        transaction_type?: ListFinanceTransactionsRequestTransactionTypeEnum
    }
    /** @example 1 */
    page?: number
    /** @example 1000 */
    page_size?: number
}

export interface Operation {
    /** @example 11401182187840 */
    operation_id?: number
    /** @example "MarketplaceMarketingActionCostOperation" */
    operation_type?: string
    /**
     * @format date-time
     * @example "2021-11-01 00:00:00"
     */
    operation_date?: string
    /** @example "Услуги продвижения товаров" */
    operation_type_name?: string
    /** @example 0 */
    delivery_charge?: number
    /** @example 0 */
    return_delivery_charge?: number
    /** @example 0 */
    accruals_for_sale?: number
    /** @example 0 */
    sale_commission?: number
    /** @example -6.46 */
    amount?: number
    /** @example "services" */
    type?: string
    posting?: {
        /** @example "" */
        delivery_schema?: string
        /** @example "" */
        order_date?: string
        /** @example "" */
        posting_number?: string
        /** @example 0 */
        warehouse_id?: number
    }
    items?: object[]
    services?: {
        price?: string
    }[]
}

export interface ListFinanceTransactionsResponse {
    result?: {
        operations?: Operation[]
        /** @example 1 */
        page_count?: number
        /** @example 355 */
        row_count?: number
    }
}

export interface GetProductStocksRequest {
    /** @example "string" */
    cursor?: string
    filter?: {
        /** @example ["string"] */
        offer_id?: string[]
        /** @example ["string"] */
        product_id?: string[]
        /** @example "ALL" */
        visibility?: GetProductStocksRequestVisibilityEnum
        with_quant?: {
            /** @example true */
            created?: boolean
            /** @example true */
            exists?: boolean
        }
    }
    /** @example 0 */
    limit?: number
}

export interface GetProductStocksResponse {
    /** @example "string" */
    cursor?: string
    items?: {
        /** @example "string" */
        offer_id?: string
        /** @example 0 */
        product_id?: number
        stocks?: {
            /** @example 0 */
            present?: number
            /** @example 0 */
            reserved?: number
            /** @example "SHIPMENT_TYPE_GENERAL" */
            shipment_type?: string
            /** @example 0 */
            sku?: number
            /** @example "string" */
            type?: string
        }[]
    }[]
    /** @example 0 */
    total?: number
}

export interface UpdateProductStocksRequest {
    stocks?: {
        /** @example "PH11042" */
        offer_id?: string
        /** @example 313455276 */
        product_id?: number
        /** @example 1 */
        quant_size?: number
        /** @example 100 */
        stock?: number
        /** @example 22142605386000 */
        warehouse_id?: number
    }[]
}

export interface UpdateProductStocksResponse {
    result?: {
        /** @example 22142605386000 */
        warehouse_id?: number
        /** @example 118597312 */
        product_id?: number
        /** @example 1 */
        quant_size?: number
        /** @example "PH11042" */
        offer_id?: string
        /** @example true */
        updated?: boolean
        /** @example [] */
        errors?: string[]
    }[]
}

export interface ListReturnsRequest {
    filter?: {
        logistic_return_date?: {
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_from?: string
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_to?: string
        }
        storage_tariffication_start_date?: {
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_from?: string
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_to?: string
        }
        visual_status_change_moment?: {
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_from?: string
            /**
             * @format date-time
             * @example "2019-08-24T14:15:22Z"
             */
            time_to?: string
        }
        /** @example "0" */
        order_id?: string
        /** @example ["string"] */
        posting_numbers?: string[]
        /** @example "string" */
        product_name?: string
        /** @example "string" */
        offer_id?: string
        /** @example "string" */
        visual_status_name?: string
        /** @example "911" */
        warehouse_id?: string
        /** @example "string" */
        barcode?: string
        /** @example "FBO" */
        return_schema?: string
    }
    /** @example 500 */
    limit?: number
    /** @example 0 */
    last_id?: number
}

export interface ListReturnsResponse {
    returns?: {
        exemplars?: {
            /** @example "1019562967545956" */
            id?: string
        }[]
        /** @example "1000015552" */
        id?: string
        /** @example "3058" */
        compunknown_id?: string
        /** @example "Покупатель отказался при вручении: недоволен качеством товара" */
        return_reason_name?: string
        /** @example "FullReturn" */
        type?: string
        /** @example "Fbs" */
        schema?: string
        /** @example "24540784250" */
        order_id?: string
        /** @example "58544282-0057" */
        order_number?: string
        place?: {
            /** @example "23869688194000" */
            id?: string
            /** @example "СЦ_Львовский_Возвраты" */
            name?: string
            /** @example "Россия, обл. Московская, г. Подольск, промышленная зона Львовский, ул. Московская, д. 69, стр. 5" */
            address?: string
        }
        target_place?: {
            /** @example "23869688194000" */
            id?: string
            /** @example "СЦ_Львовский_Возвраты" */
            name?: string
            /** @example "Россия, обл. Московская, г. Подольск, промышленная зона Львовский, ул. Московская, д. 69, стр. 5" */
            address?: string
        }
        storage?: {
            sum?: {
                /** @example "RUB" */
                currency_code?: string
                /** @example "1231" */
                price?: string
            }
            /**
             * @format date-time
             * @example "2024-07-30T06:15:48.998146Z"
             */
            tariffication_first_date?: string
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            tariffication_start_date?: string
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            arrived_moment?: string
            /** @example "0" */
            days?: string
            utilization_sum?: {
                /** @example "RUB" */
                currency_code?: string
                /** @example "1231" */
                price?: string
            }
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            utilization_forecast_date?: string
        }
        product?: {
            /** @example "1100526203" */
            sku?: string
            /** @example "81451" */
            offer_id?: string
            /** @example "Кукла Дотти Плачущий младенец Cry Babies Dressy Dotty" */
            name?: string
            price?: {
                /** @example "RUB" */
                currency_code?: string
                /** @example "3318" */
                price?: string
            }
            price_without_commission?: {
                /** @example "RUB" */
                currency_code?: string
                /** @example "3318" */
                price?: string
            }
            /** @example "1.2" */
            commission_percent?: string
            commission?: {
                /** @example "RUB" */
                currency_code?: string
                /** @example "2312" */
                price?: string
            }
            /** @example 1 */
            quantity?: number
        }
        logistic?: {
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            technical_return_moment?: string
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            final_moment?: string
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            cancelled_with_compensation_moment?: string
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            return_date?: string
            /** @example "ii5275210303" */
            barcode?: string
        }
        visual?: {
            status?: {
                /** @example 3 */
                id?: number
                /** @example "В пункте выдачи" */
                display_name?: string
                /** @example "ArrivedAtReturnPlace" */
                sys_name?: string
            }
            /**
             * @format date-time
             * @example "2024-07-29T06:15:48.998146Z"
             */
            change_moment?: string
        }
        additional_info?: {
            /** @example true */
            is_opened?: boolean
            /** @example false */
            is_super_econom?: boolean
        }
        /** @example "90426223" */
        source_id?: string
        /** @example "58544282-0057-1" */
        posting_number?: string
        /** @example "21190893156000" */
        clearing_id?: string
        /** @example null */
        return_clearing_id?: string | null
    }[]
    /** @example false */
    has_next?: boolean
}

export interface GetGiveoutListRequest {
    /** @example 0 */
    last_id?: number
    /** @example 10 */
    limit?: number
}

export interface GetGiveoutListResponse {
    giveouts?: {
        /** @example 5 */
        approved_articles_count?: number
        /**
         * @format date-time
         * @example "2019-08-24T14:15:22Z"
         */
        created_at?: string
        /** @example 123456 */
        giveout_id?: number
        /** @example "approved" */
        giveout_status?: string
        /** @example 10 */
        total_articles_count?: number
        /** @example "123 Warehouse St, City, Country" */
        warehouse_address?: string
        /** @example 1 */
        warehouse_id?: number
        /** @example "Main Warehouse" */
        warehouse_name?: string
    }[]
}

export type ResetBarcodeRequest = object

export interface ResetBarcodeResponse {
    /** @example "base64_encoded_string_here" */
    png?: string
}

export interface GetActionsResponse {
    result?: {
        /** @example 71342 */
        id?: number
        /** @example "test voucher #2" */
        title?: string
        /**
         * @format date-time
         * @example "2021-11-22T09:46:38Z"
         */
        date_start?: string
        /**
         * @format date-time
         * @example "2021-11-30T20:59:59Z"
         */
        date_end?: string
        /** @example 0 */
        potential_products_count?: number
        /** @example true */
        is_participating?: boolean
        /** @example 5 */
        participating_products_count?: number
        /** @example "" */
        description?: string
        /** @example "DISCOUNT" */
        action_type?: string
        /** @example 0 */
        banned_products_count?: number
        /** @example false */
        with_targeting?: boolean
        /** @example "UNKNOWN" */
        discount_type?: string
        /** @example 0 */
        discount_value?: number
        /** @example 0 */
        order_amount?: number
        /** @example "" */
        freeze_date?: string
        /** @example true */
        is_voucher_action?: boolean
    }[]
}

export interface GetActionCandidatesRequest {
    /** @example 63337 */
    action_id?: number
    /** @example 10 */
    limit?: number
    /** @example 0 */
    offset?: number
}

export interface ActionCandidatesProduct {
    /** @example 226 */
    id?: number
    /** @example 250 */
    price?: number
    /** @example 0 */
    action_price?: number
    /** @example 175 */
    max_action_price?: number
    /** @example "NOT_SET" */
    add_mode?: string
    /** @example 0 */
    stock?: number
    /** @example 0 */
    min_stock?: number
}

export interface GetActionCandidatesResponse {
    result?: {
        products?: ActionCandidatesProduct[]
        /** @example 2 */
        total?: number
    }
}

export interface GetActionProductsRequest {
    /** @example 66011 */
    action_id?: number
    /** @example 10 */
    limit?: number
    /** @example 0 */
    offset?: number
}

export interface GetActionProductsResponse {
    result?: {
        products?: {
            /** @example 1383 */
            id?: number
            /** @example 5503 */
            price?: number
            /** @example 621 */
            action_price?: number
            /** @example 3712.1 */
            max_action_price?: number
            /** @example "MANUAL" */
            add_mode?: string
            /** @example 0 */
            stock?: number
            /** @example 0 */
            min_stock?: number
        }[]
        /** @example 1 */
        total?: number
    }
}

export interface ActivateActionProductsRequest {
    /** @example 60564 */
    action_id?: number
    products?: {
        /** @example 356 */
        action_price?: number
        /** @example 1389 */
        product_id?: number
        /** @example 10 */
        stock?: number
    }[]
}

export interface ActivateActionProductsResponse {
    result?: {
        product_ids?: number[]
        rejected?: {
            product_id?: string
        }[]
    }
}

export interface DeactivateActionProductsRequest {
    /** @example 66011 */
    action_id?: number
    product_ids?: number[]
}

export interface DeactivateActionProductsResponse {
    result?: {
        product_ids?: number[]
        rejected?: object[]
    }
}

/** @example "ASC" */
export enum ListPostingsFboRequestDirEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

/** @example "ASC" */
export enum ListPostingsFbsRequestDirEnum {
    ASC = 'ASC',
    DESC = 'DESC'
}

/** @example "ALL" */
export enum GetProductPricesRequestVisibilityEnum {
    ALL = 'ALL',
    VISIBLE = 'VISIBLE',
    HIDDEN = 'HIDDEN'
}

/** @example "UNKNOWN" */
export enum ImportProductPricesRequestAutoActionEnabledEnum {
    UNKNOWN = 'UNKNOWN',
    True = 'true',
    False = 'false'
}

/** @example "UNKNOWN" */
export enum ImportProductPricesRequestPriceStrategyEnabledEnum {
    UNKNOWN = 'UNKNOWN',
    True = 'true',
    False = 'false'
}

/** @example "all" */
export enum ListFinanceTransactionsRequestTransactionTypeEnum {
    All = 'all',
    Credit = 'credit',
    Debit = 'debit'
}

/** @example "ALL" */
export enum GetProductStocksRequestVisibilityEnum {
    ALL = 'ALL',
    VISIBLE = 'VISIBLE',
    HIDDEN = 'HIDDEN'
}
