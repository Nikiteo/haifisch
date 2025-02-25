declare module 'ip6' {
	export function cidrSubnet(cidr: string): {
		contains(ip: string): boolean
	}
}
