import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SIZES } from '../features/catalog/data'
import type { Size } from '../features/catalog/data'

type Props = {
  size: Size
}

export function MenuWeekContextBar({ size }: Props) {
  const spec = SIZES[size]

  return (
    <div className="border-b border-black/5 bg-[#f7f5f1] px-4 py-2.5">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <Link
          to="/menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-leaf-900 shadow-sm ring-1 ring-black/8"
          aria-label="Change box"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </Link>

        <div className="min-w-0 flex-1">
          <p className="truncate text-lg leading-tight font-semibold text-stone-900">This week&apos;s menu</p>
          <p className="mt-0.5 truncate text-sm font-medium text-stone-500">{spec.label} box</p>
        </div>

        <Link
          to="/menu"
          className="inline-flex shrink-0 items-center rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-stone-700 shadow-sm ring-1 ring-black/8"
        >
          Change
        </Link>
      </div>
    </div>
  )
}
