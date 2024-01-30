"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubstatusOzon = exports.OrderFbsOzonStatus = exports.OrderStatusEnum = void 0;
// eslint-disable-next-line no-shadow
var OrderStatusEnum;
(function (OrderStatusEnum) {
    OrderStatusEnum["awaiting_packaging"] = "awaiting_packaging";
    OrderStatusEnum["awaiting_deliver"] = "awaiting_deliver";
    OrderStatusEnum["delivering"] = "delivering";
    OrderStatusEnum["delivered"] = "delivered";
    OrderStatusEnum["cancelled"] = "cancelled";
    OrderStatusEnum["returned"] = "returned";
})(OrderStatusEnum || (exports.OrderStatusEnum = OrderStatusEnum = {}));
// eslint-disable-next-line no-shadow
var OrderFbsOzonStatus;
(function (OrderFbsOzonStatus) {
    OrderFbsOzonStatus["delivered"] = "delivered";
    OrderFbsOzonStatus["acceptance_in_progress"] = "acceptance_in_progress";
    OrderFbsOzonStatus["arbitration"] = "arbitration";
    OrderFbsOzonStatus["awaiting_approve"] = "awaiting_approve";
    OrderFbsOzonStatus["awaiting_deliver"] = "awaiting_deliver";
    OrderFbsOzonStatus["awaiting_packaging"] = "awaiting_packaging";
    OrderFbsOzonStatus["awaiting_registration"] = "awaiting_registration";
    OrderFbsOzonStatus["awaiting_verification"] = "awaiting_verification";
    OrderFbsOzonStatus["cancelled"] = "cancelled";
    OrderFbsOzonStatus["cancelled_from_split_pending"] = "cancelled_from_split_pending";
    OrderFbsOzonStatus["client_arbitration"] = "client_arbitration";
    OrderFbsOzonStatus["delivering"] = "delivering";
    OrderFbsOzonStatus["driver_pickup"] = "driver_pickup";
    OrderFbsOzonStatus["not_accepted"] = "not_accepted";
    OrderFbsOzonStatus["sent_by_seller"] = "sent_by_seller";
    OrderFbsOzonStatus["returned"] = "returned";
})(OrderFbsOzonStatus || (exports.OrderFbsOzonStatus = OrderFbsOzonStatus = {}));
// eslint-disable-next-line no-shadow
var SubstatusOzon;
(function (SubstatusOzon) {
    SubstatusOzon["posting_acceptance_in_progress"] = "posting_acceptance_in_progress";
    SubstatusOzon["posting_in_arbitration"] = "posting_in_arbitration";
    SubstatusOzon["posting_created"] = "posting_created";
    SubstatusOzon["posting_in_carriage"] = "posting_in_carriage";
    SubstatusOzon["posting_not_in_carriage"] = "posting_not_in_carriage";
    SubstatusOzon["posting_registered"] = "posting_registered";
    SubstatusOzon["posting_transferring_to_delivery"] = "posting_transferring_to_delivery";
    SubstatusOzon["posting_awaiting_passport_data"] = "posting_awaiting_passport_data";
    SubstatusOzon["posting_awaiting_registration"] = "posting_awaiting_registration";
    SubstatusOzon["posting_registration_error"] = "posting_registration_error";
    SubstatusOzon["posting_split_pending"] = "posting_split_pending";
    SubstatusOzon["posting_canceled"] = "posting_canceled";
    SubstatusOzon["posting_in_client_arbitration"] = "posting_in_client_arbitration";
    SubstatusOzon["posting_delivered"] = "posting_delivered";
    SubstatusOzon["posting_received"] = "posting_received";
    SubstatusOzon["posting_conditionally_delivered"] = "posting_conditionally_delivered";
    SubstatusOzon["posting_in_courier_service"] = "posting_in_courier_service";
    SubstatusOzon["posting_in_pickup_point"] = "posting_in_pickup_point";
    SubstatusOzon["posting_on_way_to_city"] = "posting_on_way_to_city";
    SubstatusOzon["posting_on_way_to_pickup_point"] = "posting_on_way_to_pickup_point";
    SubstatusOzon["posting_returned_to_warehouse"] = "posting_returned_to_warehouse";
    SubstatusOzon["posting_transferred_to_courier_service"] = "posting_transferred_to_courier_service";
    SubstatusOzon["posting_driver_pick_up"] = "posting_driver_pick_up";
    SubstatusOzon["posting_not_in_sort_center"] = "posting_not_in_sort_center";
    SubstatusOzon["sent_by_seller"] = "sent_by_seller";
})(SubstatusOzon || (exports.SubstatusOzon = SubstatusOzon = {}));
