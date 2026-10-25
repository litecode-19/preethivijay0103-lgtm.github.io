import type { Diet, Size } from './data'
import type { DayMenu } from './data'

export type Slot = 'main' | 'protein' | 'sauce' | 'salad' | 'drink'
export const SLOTS: Slot[] = ['main', 'protein', 'sauce', 'salad', 'drink']
export const SLOT_LABEL: Record<Slot, string> = {
  main: 'Main + Side',
  protein: 'Protein',
  sauce: 'Sauce',
  salad: 'Salad',
  drink: 'Drink',
}

export interface AddonItem { name: string; price: number; protein: number }

type LevelMap = Record<Size, AddonItem>
type DayAddons = {
  main: LevelMap
  salad: LevelMap
  drink: LevelMap
  sauce: LevelMap
  protein: Record<Diet, LevelMap>
}

export const ADDONS: Record<DayMenu['id'], DayAddons> = {
  "mon": {
    "main": {
      "core": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      },
      "strong": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      },
      "elite": {
        "name": "Multigrain Dosa + Peanut Chutney",
        "price": 50,
        "protein": 8.3
      }
    },
    "salad": {
      "core": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 50,
        "protein": 4.9
      },
      "strong": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 60,
        "protein": 6.9
      },
      "elite": {
        "name": "Black Chickpea & Peanut Salad",
        "price": 70,
        "protein": 12.4
      }
    },
    "drink": {
      "core": {
        "name": "Beetroot Mint Buttermilk",
        "price": 30,
        "protein": 2.7
      },
      "strong": {
        "name": "Beetroot Mint Buttermilk",
        "price": 30,
        "protein": 2.7
      },
      "elite": {
        "name": "Beetroot Mint Buttermilk",
        "price": 30,
        "protein": 2.7
      }
    },
    "sauce": {
      "core": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "strong": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      },
      "elite": {
        "name": "Roasted Pepper Yogurt Dip",
        "price": 10,
        "protein": 0.5
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Spiced Soy Chunks",
          "price": 100,
          "protein": 14.5
        },
        "strong": {
          "name": "Spiced Soy Chunks",
          "price": 130,
          "protein": 21.7
        },
        "elite": {
          "name": "Spiced Soy Chunks",
          "price": 170,
          "protein": 26.2
        }
      },
      "nonveg": {
        "core": {
          "name": "Black Pepper Chicken",
          "price": 100,
          "protein": 14.0
        },
        "strong": {
          "name": "Black Pepper Chicken",
          "price": 140,
          "protein": 22.2
        },
        "elite": {
          "name": "Black Pepper Chicken",
          "price": 160,
          "protein": 26.9
        }
      }
    }
  },
  "tue": {
    "main": {
      "core": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      },
      "strong": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      },
      "elite": {
        "name": "Foxtail Millet Upma + Coconut Chutney",
        "price": 60,
        "protein": 7.4
      }
    },
    "salad": {
      "core": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 7.4
      },
      "strong": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 8.7
      },
      "elite": {
        "name": "Sprouts & Kidney Bean Salad",
        "price": 60,
        "protein": 8.7
      }
    },
    "drink": {
      "core": {
        "name": "Watermelon-Lime Hydration Cooler",
        "price": 40,
        "protein": 0.8
      },
      "strong": {
        "name": "Watermelon-Lime Hydration Cooler",
        "price": 40,
        "protein": 0.8
      },
      "elite": {
        "name": "Watermelon-Lime Hydration Cooler",
        "price": 40,
        "protein": 0.8
      }
    },
    "sauce": {
      "core": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "strong": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      },
      "elite": {
        "name": "Chickpea Sauce",
        "price": 10,
        "protein": 0.6
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Paneer Tikka + Whole Masoor Chaat",
          "price": 100,
          "protein": 14.0
        },
        "strong": {
          "name": "Paneer Tikka + Whole Masoor Chaat",
          "price": 130,
          "protein": 22.5
        },
        "elite": {
          "name": "Paneer Tikka + Whole Masoor Chaat",
          "price": 160,
          "protein": 32.5
        }
      },
      "nonveg": {
        "core": {
          "name": "Chicken Tikka",
          "price": 100,
          "protein": 14.3
        },
        "strong": {
          "name": "Chicken Tikka",
          "price": 130,
          "protein": 23.3
        },
        "elite": {
          "name": "Chicken Tikka",
          "price": 180,
          "protein": 33.4
        }
      }
    }
  },
  "wed": {
    "main": {
      "core": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.6
      },
      "strong": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.0
      },
      "elite": {
        "name": "Sweet Potato Pancakes with Thick Yogurt",
        "price": 70,
        "protein": 10.6
      }
    },
    "salad": {
      "core": {
        "name": "Moong Sprout Salad with Sweet Corn",
        "price": 70,
        "protein": 7.9
      },
      "strong": {
        "name": "Moong Sprout Salad with Sweet Corn",
        "price": 60,
        "protein": 5.8
      },
      "elite": {
        "name": "Moong Sprout Salad with Sweet Corn",
        "price": 70,
        "protein": 8.1
      }
    },
    "drink": {
      "core": {
        "name": "Spiced Buttermilk",
        "price": 30,
        "protein": 4.0
      },
      "strong": {
        "name": "Spiced Buttermilk",
        "price": 30,
        "protein": 4.0
      },
      "elite": {
        "name": "Spiced Buttermilk",
        "price": 30,
        "protein": 4.0
      }
    },
    "sauce": {
      "core": {
        "name": "Garlic & Cucumber Hung Curd Dip",
        "price": 10,
        "protein": 0.2
      },
      "strong": {
        "name": "Garlic & Cucumber Hung Curd Dip",
        "price": 10,
        "protein": 0.2
      },
      "elite": {
        "name": "Garlic & Cucumber Hung Curd Dip",
        "price": 10,
        "protein": 0.2
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Palak Paneer + Rajma",
          "price": 60,
          "protein": 9.1
        },
        "strong": {
          "name": "Palak Paneer + Rajma",
          "price": 80,
          "protein": 22.1
        },
        "elite": {
          "name": "Palak Paneer + Rajma",
          "price": 90,
          "protein": 27.3
        }
      },
      "nonveg": {
        "core": {
          "name": "Broccoli Omelette + Herb Yogurt Chicken",
          "price": 80,
          "protein": 7.4
        },
        "strong": {
          "name": "Broccoli Omelette + Herb Yogurt Chicken",
          "price": 140,
          "protein": 20.1
        },
        "elite": {
          "name": "Broccoli Omelette + Herb Yogurt Chicken",
          "price": 170,
          "protein": 27.3
        }
      }
    }
  },
  "thu": {
    "main": {
      "core": {
        "name": "Paddu + Chutney",
        "price": 60,
        "protein": 6.7
      },
      "strong": {
        "name": "Paddu + Chutney",
        "price": 60,
        "protein": 6.2
      },
      "elite": {
        "name": "Paddu + Chutney",
        "price": 60,
        "protein": 6.2
      }
    },
    "salad": {
      "core": {
        "name": "Golden Dry Bean & Beetroot Salad",
        "price": 50,
        "protein": 3.0
      },
      "strong": {
        "name": "Golden Dry Bean & Beetroot Salad",
        "price": 50,
        "protein": 4.9
      },
      "elite": {
        "name": "Golden Dry Bean & Beetroot Salad",
        "price": 60,
        "protein": 10.6
      }
    },
    "drink": {
      "core": {
        "name": "Ragi Kanji",
        "price": 30,
        "protein": 3.1
      },
      "strong": {
        "name": "Ragi Kanji",
        "price": 30,
        "protein": 3.1
      },
      "elite": {
        "name": "Ragi Kanji",
        "price": 30,
        "protein": 3.1
      }
    },
    "sauce": {
      "core": {
        "name": "Mint & Coriander Hung Curd Dip",
        "price": 10,
        "protein": 0.6
      },
      "strong": {
        "name": "Mint & Coriander Hung Curd Dip",
        "price": 10,
        "protein": 0.6
      },
      "elite": {
        "name": "Mint & Coriander Hung Curd Dip",
        "price": 10,
        "protein": 0.6
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Soya & Sweet Potato Cutlet",
          "price": 70,
          "protein": 16.7
        },
        "strong": {
          "name": "Soya & Sweet Potato Cutlet",
          "price": 90,
          "protein": 27.1
        },
        "elite": {
          "name": "Soya & Sweet Potato Cutlet",
          "price": 90,
          "protein": 29.7
        }
      },
      "nonveg": {
        "core": {
          "name": "Boiled Egg Salad + Chicken Cafreal",
          "price": 120,
          "protein": 16.7
        },
        "strong": {
          "name": "Boiled Egg Salad + Chicken Cafreal",
          "price": 160,
          "protein": 25.1
        },
        "elite": {
          "name": "Boiled Egg Salad + Chicken Cafreal",
          "price": 180,
          "protein": 29.5
        }
      }
    }
  },
  "fri": {
    "main": {
      "core": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      },
      "strong": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      },
      "elite": {
        "name": "Ragi Idiyappam + Coconut Milk",
        "price": 40,
        "protein": 3.5
      }
    },
    "salad": {
      "core": {
        "name": "Sprout Salad with Sweet Potato",
        "price": 50,
        "protein": 5.0
      },
      "strong": {
        "name": "Sprout Salad with Sweet Potato",
        "price": 50,
        "protein": 6.3
      },
      "elite": {
        "name": "Sprout Salad with Sweet Potato",
        "price": 50,
        "protein": 6.3
      }
    },
    "drink": {
      "core": {
        "name": "Lemon-Ginger Chia Water",
        "price": 40,
        "protein": 3.2
      },
      "strong": {
        "name": "Lemon-Ginger Chia Water",
        "price": 40,
        "protein": 3.2
      },
      "elite": {
        "name": "Lemon-Ginger Chia Water",
        "price": 40,
        "protein": 3.2
      }
    },
    "sauce": {
      "core": {
        "name": "Tandoori Hung Curd Dip",
        "price": 10,
        "protein": 0.5
      },
      "strong": {
        "name": "Tandoori Hung Curd Dip",
        "price": 10,
        "protein": 0.5
      },
      "elite": {
        "name": "Tandoori Hung Curd Dip",
        "price": 10,
        "protein": 0.5
      }
    },
    "protein": {
      "veg": {
        "core": {
          "name": "Soya Paneer Broccoli Protein Bowl",
          "price": 100,
          "protein": 19.1
        },
        "strong": {
          "name": "Soya Paneer Broccoli Protein Bowl",
          "price": 110,
          "protein": 26.9
        },
        "elite": {
          "name": "Soya Paneer Broccoli Protein Bowl",
          "price": 150,
          "protein": 36.6
        }
      },
      "nonveg": {
        "core": {
          "name": "Curry Leaf Crunch Chicken",
          "price": 110,
          "protein": 18.0
        },
        "strong": {
          "name": "Curry Leaf Crunch Chicken",
          "price": 160,
          "protein": 27.6
        },
        "elite": {
          "name": "Curry Leaf Crunch Chicken",
          "price": 210,
          "protein": 37.2
        }
      }
    }
  }
}

export function addonFor(dayId: DayMenu['id'], slot: Slot, size: Size, diet: Diet): AddonItem {
  const day = ADDONS[dayId]
  if (slot === 'protein') return day.protein[diet][size]
  return day[slot][size]
}

