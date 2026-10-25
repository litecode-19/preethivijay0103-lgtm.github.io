import { Eye, Info, MoveRight, Search } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'

import { BoxDiagram } from '../components/BoxDiagram'
import { HomeSizePicker } from '../components/SizePickCard'
import { MenuWeekContextBar } from '../components/MenuWeekContextBar'
import { CUSTOMIZATION_ENABLED } from '../config/customization'
import { SLOT_LABEL, SLOTS, addonFor, type Slot } from '../features/catalog/addons'
import { DIETS, SIZES, WEEK, compartmentsFor, formatRupees, photoFor, salePricePerDay } from '../features/catalog/data'
import type { DayMenu, Diet, Size } from '../features/catalog/data'
import { factsFor } from '../features/catalog/itemDetails'
import { isMenuWeekOpen, parseMenuDiet, parseMenuSize } from '../features/menu/weekParams'
import { customTotals, emptyPicks, togglePick, type CustomPicks } from '../features/order/custom'
import { saveMenuDraft } from '../features/order/storage'
import { ButtonLink, Section, Toggle } from '../ui'

type ViewMode = 'box' | 'custom'

function boxKcal(day: DayMenu, size: Size, diet: Diet): number {
  return Math.round(
    compartmentsFor(day, size, diet).reduce((sum, part) => sum + (factsFor(day, size, diet, part.label)?.kcal ?? 0), 0),
  )
}

function dayBlurb(day: DayMenu, diet: Diet): string {
  return `${day.main.name} · ${day.salad.name} · ${day.drink.name} · ${day.protein[diet].name}`
}

function dayMatchesQuery(day: DayMenu, diet: Diet, query: string): boolean {
  if (!query) return true
  const hay = [day.name, day.meal, day.short, day.main.name, day.salad.name, day.drink.name, day.protein[diet].name]
    .join(' ')
    .toLowerCase()
  return hay.includes(query)
}

function DietMark({ diet }: { diet: Diet }) {
  const veg = diet === 'veg'
  return (
    <span
      className={`grid h-5 w-5 place-items-center rounded-[3px] ring-1 ${
        veg ? 'ring-[#3d8c40]/70' : 'ring-[#b45309]/70'
      } bg-white`}
      title={DIETS[diet].label}
    >
      <span className={`h-2.5 w-2.5 rounded-[1px] ${veg ? 'bg-[#3d8c40]' : 'bg-[#b45309]'}`} />
    </span>
  )
}

function DayCustomPicks({
  day,
  size,
  diet,
  picks,
  onToggle,
}: {
  day: DayMenu
  size: Size
  diet: Diet
  picks: CustomPicks
  onToggle: (dayId: DayMenu['id'], slot: Slot) => void
}) {
  const selected = picks[day.id] ?? []
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {SLOTS.map((slot) => {
        const item = addonFor(day.id, slot, size, diet)
        const on = selected.includes(slot)
        return (
          <button
            key={slot}
            type="button"
            onClick={() => onToggle(day.id, slot)}
            className={`rounded-xl p-3 text-left text-sm ${
              on ? 'bg-[#c7ec16]/30 ring-2 ring-leaf-900' : 'bg-white ring-1 ring-[#eadfd9]'
            }`}
          >
            <p className="font-semibold text-leaf-900">{SLOT_LABEL[slot]}</p>
            <p className="text-leaf-900/60">{item.name}</p>
            <p className="mt-1 text-xs font-semibold text-leaf-900">
              {formatRupees(item.price)} · {item.protein} g protein
            </p>
          </button>
        )
      })}
    </div>
  )
}

function MenuChooseScreen() {
  return (
    <Section className="!px-0 !py-0 md:!py-8">
      <div className="bg-cream pb-24 md:mx-auto md:max-w-lg md:pb-8">
        <HomeSizePicker showDietToggle={false} className="rounded-none bg-transparent" />
      </div>
    </Section>
  )
}

function MenuWeekScreen() {
  const [searchParams, setSearchParams] = useSearchParams()
  const size = parseMenuSize(searchParams.get('size')) ?? 'strong'
  const diet = parseMenuDiet(searchParams.get('diet')) ?? 'nonveg'
  const [query, setQuery] = useState('')
  const [openDay, setOpenDay] = useState<DayMenu['id'] | null>(null)

  function setDiet(next: Diet) {
    setSearchParams(
      (current) => {
        const params = new URLSearchParams(current)
        params.set('diet', next)
        return params
      },
      { replace: true },
    )
  }

  const [view, setView] = useState<ViewMode>(() =>
    CUSTOMIZATION_ENABLED && searchParams.get('view') === 'custom' ? 'custom' : 'box',
  )
  const [picks, setPicks] = useState<CustomPicks>(emptyPicks)

  const { hash } = useLocation()
  const quote = useMemo(
    () => (CUSTOMIZATION_ENABLED ? customTotals(picks, size, diet) : { list: 0, protein: 0 }),
    [picks, size, diet],
  )
  const proteinTarget = SIZES[size].proteinGrams
  const q = query.trim().toLowerCase()
  const days = WEEK.filter((day) => dayMatchesQuery(day, diet, q))
  const heroDay = WEEK[0]
  const pricePerDay = salePricePerDay(size)

  useEffect(() => {
    const id = hash.slice(1)
    if (!WEEK.some((day) => day.id === id)) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpenDay(id as DayMenu['id'])
  }, [hash])

  function toggleSlot(dayId: DayMenu['id'], slot: Slot) {
    setPicks((current) => togglePick(current, dayId, slot))
  }

  function goToOrder() {
    if (CUSTOMIZATION_ENABLED) saveMenuDraft({ size, diet, picks })
  }

  function jumpToDay(id: DayMenu['id']) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setOpenDay(id)
  }

  return (
    <Section className="!px-0 !py-0">
      <div className="min-h-screen bg-[#f7f5f1] pb-[5.5rem] md:pb-16">
        <div className="sticky z-30" style={{ top: 'var(--site-header-offset)' }}>
          <MenuWeekContextBar size={size} />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6">
          <label className="relative block">
            <Search size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search this week's menu..."
              className="h-12 w-full rounded-full bg-white pr-4 pl-11 text-sm text-leaf-900 shadow-sm ring-1 ring-black/8 outline-none placeholder:text-stone-400 focus:ring-2 focus:ring-leaf-900/20"
            />
          </label>

          <div className="relative mt-4 overflow-hidden rounded-2xl">
            <img
              src={photoFor(heroDay, size, diet)}
              alt={`${heroDay.name} ${DIETS[diet].label} breakfast`}
              className="h-44 w-full object-cover sm:h-56"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-6 text-white sm:px-10">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/80 uppercase">This week</p>
              <h1 className="mt-1 font-display text-3xl leading-none font-black sm:text-4xl">Monday to Friday</h1>
              <p className="mt-2 max-w-sm text-sm text-white/85">
                Fresh, protein-forward breakfast, cooked every morning.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {(
              [
                { value: 'veg' as const, label: 'Veg' },
                { value: 'nonveg' as const, label: 'Non-veg' },
              ] as const
            ).map((option) => {
              const selected = diet === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDiet(option.value)}
                  className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 transition ${
                    selected
                      ? 'bg-[#1c1c1c] text-white ring-[#1c1c1c]'
                      : 'bg-white text-leaf-900 ring-black/10 hover:bg-white'
                  }`}
                >
                  <DietMark diet={option.value} />
                  {option.label}
                </button>
              )
            })}
            <span className="inline-flex h-10 items-center rounded-full bg-white px-4 text-sm font-semibold text-leaf-900 ring-1 ring-black/10">
              {SIZES[size].label} · {proteinTarget} g protein
            </span>
            {CUSTOMIZATION_ENABLED && (
              <Toggle
                label="View"
                tone="highlight"
                compact
                value={view}
                onChange={setView}
                options={[
                  { value: 'box', label: 'Full box' },
                  { value: 'custom', label: 'Custom' },
                ]}
              />
            )}
          </div>

          <div className="-mx-4 mt-6 flex gap-5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {WEEK.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => jumpToDay(day.id)}
                className="flex w-16 shrink-0 flex-col items-center gap-2"
              >
                <span
                  className={`h-16 w-16 overflow-hidden rounded-full ring-2 ${
                    openDay === day.id ? 'ring-[#3d8c40]' : 'ring-white'
                  } shadow-sm`}
                >
                  <img src={photoFor(day, size, diet)} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="text-center text-[11px] leading-tight font-semibold text-stone-600">{day.short}</span>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-stone-800">This week</h2>
            <p className="mt-0.5 text-sm text-stone-500">
              Breakfast box · {days.length} {days.length === 1 ? 'day' : 'days'}
            </p>
          </div>

          {days.length === 0 ? (
            <p className="mt-8 text-center text-sm text-stone-500">No days match that search.</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {days.map((day) => {
                const selected = picks[day.id] ?? []
                const dayProtein =
                  CUSTOMIZATION_ENABLED && view === 'custom'
                    ? Math.round(
                        selected.reduce((sum, slot) => sum + addonFor(day.id, slot, size, diet).protein, 0) * 10,
                      ) / 10
                    : proteinTarget
                const kcal = boxKcal(day, size, diet)
                const open = openDay === day.id
                return (
                  <article
                    key={day.id}
                    id={day.id}
                    className="scroll-mt-36 overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(28,28,28,0.06)] ring-1 ring-black/5"
                  >
                    <div className="relative">
                      <img
                        src={photoFor(day, size, diet)}
                        alt={`${day.meal}, ${day.name} ${DIETS[diet].label} breakfast`}
                        className="h-48 w-full object-cover"
                      />
                      {kcal > 0 && (
                        <span className="absolute top-2.5 left-2.5 rounded-md bg-[#1c1c1c]/80 px-2 py-0.5 text-[11px] font-semibold text-white">
                          {kcal} kcal
                        </span>
                      )}
                      <span className="absolute top-2.5 right-2.5">
                        <DietMark diet={diet} />
                      </span>
                    </div>
                    <div className="px-4 pt-3 pb-4">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-stone-400 uppercase">{day.name}</p>
                      <h3 className="truncate text-[15px] font-semibold text-stone-900">{day.meal}</h3>
                      <p className="mt-1 text-sm leading-5 text-stone-500">{dayBlurb(day, diet)}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-base font-bold text-[#5b6b2a]">{formatRupees(pricePerDay)}</p>
                          <p className="text-[11px] font-medium text-stone-400">{dayProtein} g protein</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenDay(open ? null : day.id)}
                          className="grid h-9 w-9 place-items-center rounded-full bg-[#1c1c1c] text-white"
                          aria-expanded={open}
                          aria-label={`${open ? 'Hide' : 'Show'} ${day.meal} box details`}
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                      {open && (
                        <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-black/5">
                          {CUSTOMIZATION_ENABLED && view === 'custom' ? (
                            <div className="p-3">
                              <DayCustomPicks day={day} size={size} diet={diet} picks={picks} onToggle={toggleSlot} />
                            </div>
                          ) : (
                            <BoxDiagram day={day} size={size} diet={diet} />
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="mt-6 flex gap-3 rounded-2xl bg-white p-4 text-sm leading-6 text-stone-600 ring-1 ring-black/5">
            <Info size={18} className="mt-0.5 shrink-0 text-leaf-900" />
            <p>
              {CUSTOMIZATION_ENABLED
                ? 'Tap the eye to pick only some items, like Monday protein. Add-on prices are full price. Core, Strong and Elite change portion size.'
                : 'Core, Strong and Elite change portion size. Every box includes that morning’s drink. Tap the eye for what is in the box.'}
            </p>
          </div>

          <div className="mt-8 hidden text-center md:block">
            {CUSTOMIZATION_ENABLED && view === 'custom' && (
              <p className="mb-3 text-sm font-semibold text-leaf-900">
                {formatRupees(quote.list)} · {quote.protein} g protein
              </p>
            )}
            <ButtonLink to="/register" className="px-8 py-3.5 text-base" onClick={goToOrder}>
              Register and order
            </ButtonLink>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-[#f7f5f1]/95 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
          {CUSTOMIZATION_ENABLED && view === 'custom' && (
            <p className="mb-1 text-center text-xs font-semibold text-leaf-900">
              {formatRupees(quote.list)} · {quote.protein} g protein · add-ons at full price
            </p>
          )}
          <Link
            to="/register"
            onClick={goToOrder}
            className="mx-auto flex min-h-12 w-full max-w-md items-center justify-center gap-2 rounded-full bg-leaf-900 text-sm font-bold text-spice-800 shadow-[0_8px_25px_rgba(85,16,77,0.18)] hover:bg-leaf-950"
          >
            Order now
            <MoveRight size={18} />
          </Link>
        </div>
      </div>
    </Section>
  )
}

export function Menu() {
  const [searchParams] = useSearchParams()
  if (!isMenuWeekOpen(searchParams)) return <MenuChooseScreen />
  return <MenuWeekScreen />
}
