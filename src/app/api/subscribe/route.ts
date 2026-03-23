import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // TODO: Wire up Resend/ConvertKit here
    // For now, just log and return success
    console.log('New subscriber:', email)

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
