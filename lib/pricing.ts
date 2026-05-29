export type ServiceType = 'residential' | 'deep_clean' | 'post_event' | 'move_in_out' | 'office' | 'monthly_retainer'
export type PropertySize = 'studio' | '1bed' | '2bed' | '3bed' | 'larger'

const flatPrices: Record<ServiceType, number> = {
  residential: 300,
  deep_clean: 550,
  post_event: 500,
  move_in_out: 450,
  office: 1200,
  monthly_retainer: 1000,
}

const monthlyServices: ServiceType[] = ['office', 'monthly_retainer']

export function getEstimatedPrice(service: ServiceType, _size: PropertySize): number | null {
  return flatPrices[service] ?? null
}

export function formatPrice(price: number | null, _size: PropertySize, service?: ServiceType): string {
  if (price === null) return 'Custom quote — we will contact you'
  const suffix = service && monthlyServices.includes(service) ? '/month' : '/session'
  return `P${price}${suffix}`
}
