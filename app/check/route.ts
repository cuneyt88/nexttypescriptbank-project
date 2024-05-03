import React from 'react'

export async function GET() {
    const res = await fetch('mongodb+srv://aveiroman01:cuneyt7088@cluster0.w8rzxom.mongodb.net/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
   
    return Response.json({ data })
  }