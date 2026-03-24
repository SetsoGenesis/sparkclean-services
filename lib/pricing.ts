export type ServiceType = 'residential' | 'deep_clean' | 'airbnb' | 'office'
export type PropertySize = 'studio' | '1bed' | '2bed' | '3bed' | 'larger'

const pricingMatrix: Record<ServiceType, Record<PropertySize, number | null>> = {
  residential: {
    studio: 200,
    '1bed': 250,
    '2bed': 350,
    '3bed': 450,
    larger: 600,
  },
  deep_clean: {
    studio: 400,
    '1bed': 500,
    '2bed': 650,
    '3bed': 800,
    larger: 1000,
  },
  airbnb: {
    studio: 250,
    '1bed': 300,
    '2bed': 400,
    '3bed': 500,
    larger: 700,
  },
  office: {
    studio: null,
    '1bed': null,
    '2bed': null,
    '3bed': null,
    larger: null,
  },
}

export function getEstimatedPrice(service: ServiceType, size: PropertySize): number | null {
  return pricingMatrix[service]?.[size] ?? null
}

export function formatPrice(price: number | null, size: PropertySize): string {
  if (price === null) return 'Custom quote — we will contact you'
  if (size === 'larger') return `P${price}+`
  return `P${price}`
}
