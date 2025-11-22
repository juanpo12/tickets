import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const c = await cookies()
  const access = c.get('sb-access-token') || c.get('sb:token') || c.get('sb.access-token')
  if (!access) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}