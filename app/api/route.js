import { NextResponse } from 'next/server'

export async function GET() {
 const result = await fetch('https://dummyjson.com/products?limit=0&skip=0', {
  headers: {
   'Content-type': 'application/json',
  },
 })

 const products = await result.json()
 return NextResponse.json({ data: products })
}

export async function POST(req) {
 const product = await req.json()
 console.log(product)
 const result = await fetch(process.env.API_URL, {
  method: 'POST',
  headers: {
   'Content-type': 'application/json',
  },
  body: JSON.stringify(product),
 })
 const newProduct = await result.json()
 return NextResponse.json({ data: newProduct })
}
