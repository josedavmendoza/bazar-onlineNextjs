import { NextResponse } from 'next/server'

export async function GET() {
 const result = await fetch('https://dummyjson.com/products/categories', {
  headers: {
   'Content-type': 'application/json',
  },
 })

 const categories = await result.json()
 console.log(categories)
 return NextResponse.json({ data: categories })
}
