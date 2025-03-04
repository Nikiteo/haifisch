import dayjs from 'dayjs'
import { OrderDeliveryDTO } from '../../types/yandex/api'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

export const createMoment = (delivery: OrderDeliveryDTO): string => {
	const shipmentDate = delivery.shipments?.[0]?.shipmentDate
	return shipmentDate
		? dayjs(dayjs(shipmentDate, 'DD-MM-YYYY'))
				.set('hour', 19)
				.set('minute', 0)
				.set('second', 0)
				.format('YYYY-MM-DD HH:mm:ss.SSS')
		: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS')
}
