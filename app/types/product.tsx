export interface Product {
 id: number
 title: string
 description: string
 price: number
 discountPercentage: number
 dimensions: { width: number; height: number; depth: number }
 minimumOrderQuantity: number
 returnPolicy: string
 rating: number
 stock: number
 brand: string
 category: string
 thumbnail: string
 images: string[]
}
