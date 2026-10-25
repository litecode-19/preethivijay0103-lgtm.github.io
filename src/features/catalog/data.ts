export type Size = 'core' | 'strong' | 'elite'
export type PhotoSize = 'lean' | 'build'
export type Diet = 'veg' | 'nonveg'

export interface DishCopy {
  name: string
  kitchen: string
  highlights: string
}

function dish(name: string, kitchen: string, highlights: string): DishCopy {
  return { name, kitchen, highlights }
}

export interface DayMenu {
  id: 'mon' | 'tue' | 'wed' | 'thu' | 'fri'
  short: string
  name: string
  meal: string
  images: Record<PhotoSize, Record<Diet, string>>
  main: DishCopy
  salad: DishCopy
  drink: DishCopy
  sauce: DishCopy
  protein: Record<Diet, DishCopy>
}

export const SIZES: Record<Size, { label: string; blurb: string; compartments: number; proteinGrams: number }> = {
  core: {
    label: 'Core',
    blurb: 'About 30 g protein. A lighter box for everyday mornings.',
    compartments: 4,
    proteinGrams: 30,
  },
  strong: {
    label: 'Strong',
    blurb: 'About 40 g protein. A balanced box for training days.',
    compartments: 4,
    proteinGrams: 40,
  },
  elite: {
    label: 'Elite',
    blurb: 'About 50 g protein. A fuller box when you need more.',
    compartments: 4,
    proteinGrams: 50,
  },
}

export const DIETS: Record<Diet, { label: string }> = {
  veg: { label: 'Veg' },
  nonveg: { label: 'Non-veg' },
}

export const PRICE_PER_DAY: Record<Size, number> = { core: 159, strong: 189, elite: 229 }

/** First-month launch: Core 25% off, Strong and Elite 30% off. Add-on items stay full price. */
export const LAUNCH_OFF_PERCENT: Record<Size, number> = { core: 25, strong: 30, elite: 30 }

export function salePricePerDay(size: Size): number {
  return Math.round((PRICE_PER_DAY[size] * (100 - LAUNCH_OFF_PERCENT[size])) / 100)
}

export type DrinkId = 'day' | 'buttermilk' | 'juice' | 'kanji' | 'shake' | 'smoothie'

export const DRINKS: Record<DrinkId, { label: string; note: string }> = {
  day: {
    label: "Follow the day's drink",
    note: 'Mon beetroot mint buttermilk, Tue watermelon-lime cooler, Wed spiced buttermilk, Thu ragi kanji, Fri lemon-ginger chia water.',
  },
  buttermilk: { label: 'Buttermilk', note: 'Every morning. Dairy.' },
  juice: { label: 'Fruit juice', note: 'Every morning.' },
  kanji: { label: 'Fermented millet porridge', note: 'Every morning. Millet drink.' },
  shake: { label: 'Peanut-almond shake', note: 'Every morning. Contains nuts.' },
  smoothie: { label: 'Fruit smoothie', note: 'Every morning. Usually dairy.' },
}

export function drinkLabel(drink: DrinkId): string {
  return drink === 'day' ? DRINKS.day.label : `${DRINKS[drink].label} every day`
}

export type PlanId = 'trial' | 'week' | 'custom'

export const PLANS: Record<PlanId, { label: string; days: number; note: string }> = {
  trial: { label: '3-day trial', days: 3, note: 'Try it for three mornings first.' },
  week: { label: '5-day week', days: 5, note: 'Monday to Friday, one full box each morning.' },
  custom: { label: 'Custom', days: 0, note: 'Pick days and items — Monday protein only, if you want.' },
}

export const WEEK: DayMenu[] = [
  {
    id: 'mon',
    short: 'Mon',
    name: 'Monday',
    meal: 'Six-Grain Sunrise',
    images: {
      lean: { veg: '/images/mon-lean-veg-4.jpg', nonveg: '/images/mon-lean-nonveg-4.jpg' },
      build: { veg: '/images/mon-build-veg-4.jpg', nonveg: '/images/mon-build-nonveg-4.jpg' },
    },
    main: dish(
      'Multigrain Dosa + Peanut Chutney',
      'Multigrain dosa + peanut chutney',
      'Black chickpeas · Green moong · Pearl millet · Toor & urad dal · Roasted peanut chutney',
    ),
    salad: dish(
      'Black Chickpea & Peanut Salad',
      'Kala chana & peanut salad',
      'Black chickpeas · Roasted peanuts · Cucumber · Carrot · Tomato · Lime · Pomegranate · Pumpkin, flax & chia seeds',
    ),
    drink: dish(
      'Beetroot Mint Buttermilk',
      'Beetroot mint buttermilk',
      'Low-fat curd · Beetroot · Mint · Coriander · Roasted cumin · No sugar · STRONG and ELITE only',
    ),
    sauce: dish(
      'Roasted Pepper Yogurt Dip',
      'Hung curd sauce',
      'Hung curd · Roasted red bell pepper · Honey · Thyme',
    ),
    protein: {
      nonveg: dish(
        'Black Pepper Chicken',
        'Pepper chicken',
        'Chicken breast · Crushed black pepper · Curry leaves · Ginger-garlic · Lime · Toasted sesame · Boiled egg (STRONG, ELITE)',
      ),
      veg: dish(
        'Spiced Soy Chunks',
        'Soya chunks masala',
        'Soy chunks · Onion-tomato masala · Ginger-garlic · Lime',
      ),
    },
  },
  {
    id: 'tue',
    short: 'Tue',
    name: 'Tuesday',
    meal: 'Millet Morning',
    images: {
      lean: { veg: '/images/tue-lean-veg-4.jpg', nonveg: '/images/tue-lean-nonveg-4.jpg' },
      build: { veg: '/images/tue-build-veg-4.jpg', nonveg: '/images/tue-build-nonveg-4.jpg' },
    },
    main: dish(
      'Foxtail Millet Upma + Coconut Chutney',
      'Millet upma + coconut chutney',
      'Foxtail millet · Toor & moong dal · Green peas · Carrot · Fresh coconut chutney',
    ),
    salad: dish(
      'Sprouts & Kidney Bean Salad',
      'Sprout & rajma salad',
      '8-legume sprouts · Rajma · Cabbage · Capsicum · Lime · Pomegranate · Pumpkin, flax & chia seeds',
    ),
    drink: dish(
      'Watermelon-Lime Hydration Cooler',
      'Watermelon-lime cooler',
      'Watermelon · Lime · Mint · Urban Platter tender coconut water powder · No added sugar by us · STRONG and ELITE only',
    ),
    sauce: dish(
      'Chickpea Sauce',
      'Chickpea sauce (low fat)',
      'Chickpeas · Hung curd · Lemon · Roasted cumin · No oil',
    ),
    protein: {
      nonveg: dish(
        'Chicken Tikka',
        'Chicken tikka (hung-curd marinade)',
        'Chicken breast · Hung curd · Tikka spices · Kasuri methi · Onion & capsicum · Toasted sesame · Soya chunks (STRONG, ELITE)',
      ),
      veg: dish(
        'Paneer Tikka + Whole Masoor Chaat',
        'Paneer tikka + whole masoor chaat',
        'Paneer · Tikka spices · Whole masoor · Onion · Tomato · Lime · Toasted sesame',
      ),
    },
  },
  {
    id: 'wed',
    short: 'Wed',
    name: 'Wednesday',
    meal: 'Midweek Green',
    images: {
      lean: { veg: '/images/wed-lean-veg-4.jpg', nonveg: '/images/wed-lean-nonveg-4.jpg' },
      build: { veg: '/images/wed-build-veg-4.jpg', nonveg: '/images/wed-build-nonveg-4.jpg' },
    },
    main: dish(
      'Sweet Potato Pancakes with Thick Yogurt',
      'Sweet potato pancake + hung curd',
      'Sweet potato · Chickpea flour (besan) · Thick hung curd · Green chilli',
    ),
    salad: dish(
      'Moong Sprout Salad with Sweet Corn',
      'Moong sprout salad with sweet corn',
      'Sprouted green moong · Sweet corn · Capsicum · Tomato · Lime · Pomegranate · Pumpkin, flax & chia seeds',
    ),
    drink: dish(
      'Spiced Buttermilk',
      'Spiced buttermilk (neer mor)',
      'Low-fat curd · Ginger · Green chilli · Coriander · Curry leaves · STRONG and ELITE only',
    ),
    sauce: dish(
      'Garlic & Cucumber Hung Curd Dip',
      'Garlic & cucumber hung curd dip',
      'Hung curd · Cucumber · Garlic · Mint · Black pepper · No oil',
    ),
    protein: {
      nonveg: dish(
        'Broccoli Omelette + Herb Yogurt Chicken',
        'Broccoli omelette + herb yogurt chicken',
        'Whole egg · Broccoli · Chicken breast · Curd · Coriander · Mint · Roasted garlic · Whole spices · Toasted sesame',
      ),
      veg: dish(
        'Palak Paneer + Rajma',
        'Palak paneer + rajma',
        'Paneer · Spinach · Rajma · Garlic · Tomato · Toasted sesame',
      ),
    },
  },
  {
    id: 'thu',
    short: 'Thu',
    name: 'Thursday',
    meal: 'Morning Harvest',
    images: {
      lean: { veg: '/images/thu-lean-veg-4.jpg', nonveg: '/images/thu-lean-nonveg-4.jpg' },
      build: { veg: '/images/thu-build-veg-4.jpg', nonveg: '/images/thu-build-nonveg-4.jpg' },
    },
    main: dish(
      'Paddu + Chutney',
      'Paddu + chutney',
      'Idli rice & urad dal batter · Onion · Carrot · Curry leaves · Onion-tomato chutney',
    ),
    salad: dish(
      'Golden Dry Bean & Beetroot Salad',
      'Golden dry bean & beetroot salad',
      'Golden dry bean (soybean) · Beetroot · Carrot · Cucumber · Lime · Pomegranate · Pumpkin, flax & chia seeds',
    ),
    drink: dish(
      'Ragi Kanji',
      'Ragi kanji',
      'Ragi (finger millet) · Buttermilk · Shallots · STRONG and ELITE only',
    ),
    sauce: dish(
      'Mint & Coriander Hung Curd Dip',
      'Mint & coriander hung curd dip',
      'Hung curd · Fresh mint · Coriander · Roasted cumin · No oil',
    ),
    protein: {
      nonveg: dish(
        'Boiled Egg Salad + Chicken Cafreal',
        'Boiled egg salad + chicken cafreal',
        'Boiled egg · Potato · Carrot · Lemon · Chaat masala · Chicken breast · Coriander · Green chilli · Soy sauce · Toasted sesame',
      ),
      veg: dish(
        'Soya & Sweet Potato Cutlet',
        'Soya sweet potato cutlet',
        'Soy granules · Sweet potato · Chickpea flour · Ginger · Coriander',
      ),
    },
  },
  {
    id: 'fri',
    short: 'Fri',
    name: 'Friday',
    meal: 'Feel-Good Friday',
    images: {
      lean: { veg: '/images/fri-lean-veg-4.jpg', nonveg: '/images/fri-lean-nonveg-4.jpg' },
      build: { veg: '/images/fri-build-veg-4.jpg', nonveg: '/images/fri-build-nonveg-4.jpg' },
    },
    main: dish(
      'Ragi Idiyappam + Coconut Milk',
      'Ragi idiyappam + coconut milk',
      'Ragi (finger millet) · Steamed, not fried · Fresh coconut milk',
    ),
    salad: dish(
      'Sprout Salad with Sweet Potato',
      'Sprout salad with sweet potato',
      '8-legume sprouts · Sweet potato · Cucumber · Carrot · Lime · Pomegranate · Pumpkin, flax & chia seeds',
    ),
    drink: dish(
      'Lemon-Ginger Chia Water',
      'Lemon-ginger chia water',
      'Lemon · Ginger · Mint · Chia seeds · No sugar · STRONG and ELITE only',
    ),
    sauce: dish(
      'Tandoori Hung Curd Dip',
      'Tandoori hung curd dip',
      'Hung curd · Tandoori spices · Ginger-garlic · Lemon · No oil',
    ),
    protein: {
      nonveg: dish(
        'Curry Leaf Crunch Chicken',
        'Curry leaf crunch chicken',
        'Chicken breast · Curry leaves · Fennel · Mustard · Hung curd · Egg & cornflour coating · Toasted sesame · Boiled egg (STRONG, ELITE)',
      ),
      veg: dish(
        'Soya Paneer Broccoli Protein Bowl',
        'Soya paneer broccoli bowl',
        'Soya chunks · Paneer · Broccoli · Red/yellow capsicum · Corn · Carrot · Soy sauce · Lemon · Toasted sesame',
      ),
    },
  },
]

export interface Compartment {
  label: string
  items: string[]
  highlights: string
}

export function photoKey(size: Size): PhotoSize {
  return size === 'elite' ? 'build' : 'lean'
}

export function photoFor(day: DayMenu, size: Size, diet: Diet): string {
  return `${day.images[photoKey(size)][diet]}?v=15`
}

export function compartmentsFor(day: DayMenu, size: Size, diet: Diet): Compartment[] {
  void size
  return [
    { label: 'Main + Side', items: [day.main.name], highlights: day.main.highlights },
    { label: 'Protein', items: [day.protein[diet].name], highlights: day.protein[diet].highlights },
    { label: 'Sauce', items: [day.sauce.name], highlights: day.sauce.highlights },
    { label: 'Salad', items: [day.salad.name], highlights: day.salad.highlights },
    { label: 'Drink', items: [day.drink.name], highlights: day.drink.highlights },
  ]
}

export function planTotal(size: Size, plan: PlanId): number {
  if (plan === 'custom') return 0
  return salePricePerDay(size) * PLANS[plan].days
}

export function formatRupees(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
