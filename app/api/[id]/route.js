import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
 const id = params.id
 const result = await fetch(`https://dummyjson.com/products/${id}`, {
  headers: {
   'Content-type': 'application/json',
  },
 })
 const product = await result.json()
 return NextResponse.json({ data: product })
}
