import ragiPorridge from "@/assets/food/ragi-porridge.jpg";
import riceDal from "@/assets/food/rice-dal.jpg";
import mashedBanana from "@/assets/food/mashed-banana.jpg";
import idlySambar from "@/assets/food/idly-sambar.jpg";

/** Age bands used across the app. */
export const ageGroups = ["6-8 Months", "8-10 Months", "10-12 Months", "1-2 Years", "2-3 Years"] as const;
export type AgeGroup = (typeof ageGroups)[number];

export type MealSlot = "Breakfast" | "Lunch" | "Snacks" | "Dinner";

/**
 * Central recipe record. This module is the single source of truth for every
 * recipe surface in the app (search, feeding planner, replace-meal, AI
 * assistant, recommendation cards, recipe details).
 */
export type Recipe = {
  id: string;
  name: string;
  desc: string;
  slot: MealSlot;
  ageGroup: AgeGroup;
  ageSuitable: string;
  emoji: string;
  image?: string;
  prepMinutes: number;
  serving: string;
  texture: string;
  storage: string;
  benefits: string[];
  avoid: string;
  calories: number;
  protein: number;
  iron: number;
  calcium: number;
  ingredients: string[];
  steps: string[];
  tips: string;
  allergyWarning: string;
  vegetarian: boolean;
  season: "All" | "Summer" | "Winter" | "Monsoon";
  tags: string[];
};

export const recipes: Recipe[] = [
  // ---------------- 6-8 Months : smooth purées, thin porridges ----------------
  {
    id: "r-ragi-porridge", name: "Ragi Porridge with Banana", desc: "Warm ragi porridge blended with mashed banana.",
    slot: "Breakfast", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🥣", image: ragiPorridge,
    prepMinutes: 15, serving: "1 small bowl (150 ml)", texture: "Smooth, pouring consistency",
    storage: "Serve fresh. Refrigerate up to 8 hours in a covered steel bowl and reheat once.",
    benefits: ["Rich in calcium for bone growth", "Slow-release energy", "Gentle on a young gut"],
    avoid: "No sugar, honey or salt before 12 months.",
    calories: 180, protein: 5, iron: 3, calcium: 120,
    ingredients: ["2 tbsp ragi flour", "1 ripe banana", "1 cup water", "Pinch of cardamom"],
    steps: ["Mix ragi flour with a little water to make a smooth lump-free paste.", "Bring 1 cup of water to boil and whisk in the paste.", "Cook on low flame for 8-10 minutes until glossy.", "Cool to lukewarm, mash banana in and serve."],
    tips: "Introduce 2-3 spoons on the first try and increase as baby adapts.",
    allergyWarning: "Check for banana sensitivity on first introduction.",
    vegetarian: true, season: "All", tags: ["iron", "calcium", "energy", "porridge"],
  },
  {
    id: "r-rice-kanji", name: "Rice Kanji", desc: "Silky rice water porridge, the classic Tamil first food.",
    slot: "Breakfast", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🍚",
    prepMinutes: 20, serving: "1 small bowl (120 ml)", texture: "Thin and pouring",
    storage: "Best fresh; keep refrigerated up to 6 hours.",
    benefits: ["Easy first food", "Hydrating", "Quick energy for weaning babies"],
    avoid: "Do not add salt or sugar.",
    calories: 110, protein: 2, iron: 1, calcium: 15,
    ingredients: ["2 tbsp raw rice", "1.5 cups water", "1/2 tsp ghee"],
    steps: ["Wash rice and pressure cook with water for 4 whistles until very soft.", "Mash well and strain to a smooth kanji.", "Stir in ghee and cool to lukewarm before serving."],
    tips: "Adjust with warm boiled water if it thickens on standing.",
    allergyWarning: "Rarely allergenic; watch for tummy discomfort with ghee.",
    vegetarian: true, season: "All", tags: ["first food", "energy", "gentle"],
  },
  {
    id: "r-apple-puree", name: "Steamed Apple Purée", desc: "Steamed apple blended to a silky purée.",
    slot: "Snacks", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🍎",
    prepMinutes: 12, serving: "3-4 tbsp", texture: "Smooth purée",
    storage: "Refrigerate up to 24 hours in a glass jar; do not freeze more than a week.",
    benefits: ["Vitamin C aids iron absorption", "Soluble fibre eases constipation", "Naturally sweet"],
    avoid: "Never serve raw apple pieces - choking risk.",
    calories: 70, protein: 0, iron: 0, calcium: 8,
    ingredients: ["1 small apple, peeled and cubed", "2 tbsp water", "Pinch of cinnamon (optional)"],
    steps: ["Steam apple cubes for 6-8 minutes until fork-soft.", "Blend or mash to a smooth purée.", "Cool and serve; add a little boiled water to thin."],
    tips: "Pair with ragi or dal to boost iron absorption.",
    allergyWarning: "Apple allergy is uncommon; watch for mouth rash.",
    vegetarian: true, season: "All", tags: ["vitamin c", "fibre", "fruit", "puree"],
  },
  {
    id: "r-banana-mash", name: "Mashed Banana", desc: "Fresh mashed banana with a hint of cardamom.",
    slot: "Snacks", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🍌", image: mashedBanana,
    prepMinutes: 5, serving: "1/2 banana", texture: "Soft mash",
    storage: "Serve immediately - banana browns quickly.",
    benefits: ["Potassium for muscle function", "Instant energy", "Firms up loose stools"],
    avoid: "Avoid on days with constipation in some babies.",
    calories: 90, protein: 1, iron: 1, calcium: 15,
    ingredients: ["1/2 ripe banana", "Pinch of cardamom (optional)"],
    steps: ["Peel banana.", "Mash with a fork until smooth.", "Serve immediately."],
    tips: "Choose fully ripe fruit with brown flecks for easy digestion.",
    allergyWarning: "Rare, but monitor for rash on first try.",
    vegetarian: true, season: "All", tags: ["potassium", "quick", "fruit"],
  },
  {
    id: "r-carrot-puree", name: "Carrot Purée", desc: "Steamed carrot blended smooth with a drop of ghee.",
    slot: "Lunch", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🥕",
    prepMinutes: 15, serving: "3-4 tbsp", texture: "Smooth purée",
    storage: "Refrigerate up to 24 hours; reheat gently once.",
    benefits: ["Beta-carotene for eye and skin health", "Mild natural sweetness", "Supports immunity"],
    avoid: "No salt; avoid stored carrot purée beyond one day.",
    calories: 60, protein: 1, iron: 1, calcium: 25,
    ingredients: ["1 medium carrot, peeled and chopped", "1/4 cup water", "1/4 tsp ghee"],
    steps: ["Steam carrot pieces for 10 minutes until very soft.", "Blend with a little cooking water to a smooth purée.", "Stir in ghee and serve lukewarm."],
    tips: "Ghee helps absorb the fat-soluble vitamin A in carrots.",
    allergyWarning: "Very low allergy risk.",
    vegetarian: true, season: "All", tags: ["vitamin a", "veggies", "puree"],
  },
  {
    id: "r-pumpkin-mash", name: "Pumpkin Mash", desc: "Creamy steamed yellow pumpkin mash with cumin.",
    slot: "Lunch", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🎃",
    prepMinutes: 15, serving: "3-4 tbsp", texture: "Creamy mash",
    storage: "Refrigerate up to 24 hours in an airtight box.",
    benefits: ["Vitamin A and antioxidants", "Very easy to digest", "Naturally sweet, low allergen"],
    avoid: "Skip the seeds and hard skin entirely.",
    calories: 55, protein: 1, iron: 1, calcium: 20,
    ingredients: ["100 g yellow pumpkin, peeled and cubed", "1/4 cup water", "Pinch of cumin powder", "1/4 tsp ghee"],
    steps: ["Steam pumpkin cubes for 8-10 minutes.", "Mash smooth with the back of a spoon.", "Add cumin and ghee, mix and serve warm."],
    tips: "A great gentle food when baby is recovering from a tummy upset.",
    allergyWarning: "Very low allergy risk.",
    vegetarian: true, season: "All", tags: ["vitamin a", "gentle", "veggies"],
  },
  {
    id: "r-beetroot-puree", name: "Beetroot Purée", desc: "Vibrant steamed beetroot purée, iron-friendly.",
    slot: "Lunch", ageGroup: "6-8 Months", ageSuitable: "7+ months", emoji: "🟣",
    prepMinutes: 20, serving: "2-3 tbsp", texture: "Smooth purée",
    storage: "Refrigerate up to 24 hours; do not keep at room temperature.",
    benefits: ["Iron and folate", "Supports healthy blood", "Natural nitrates aid circulation"],
    avoid: "Give small quantities; large amounts can upset the tummy.",
    calories: 55, protein: 1, iron: 2, calcium: 20,
    ingredients: ["1 small beetroot, peeled and cubed", "1/4 cup water", "1 tsp apple purée (optional)"],
    steps: ["Pressure cook beetroot for 2 whistles until very soft.", "Blend to a fine purée with a little water.", "Mix with apple purée to soften the earthy taste."],
    tips: "Pink-coloured urine or stool after beetroot is harmless.",
    allergyWarning: "Introduce alone for 3 days before combining.",
    vegetarian: true, season: "All", tags: ["iron", "folate", "veggies", "puree"],
  },
  {
    id: "r-sweet-potato-mash", name: "Sweet Potato Mash", desc: "Steamed sweet potato mashed with a spoon of milk.",
    slot: "Snacks", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🍠",
    prepMinutes: 20, serving: "3-4 tbsp", texture: "Thick creamy mash",
    storage: "Refrigerate up to 24 hours; reheat with a splash of warm water.",
    benefits: ["Vitamin A for immunity", "Fibre for smooth digestion", "Filling weight-gain food"],
    avoid: "No added sugar - it is already sweet.",
    calories: 100, protein: 2, iron: 1, calcium: 30,
    ingredients: ["1 small sweet potato", "2 tbsp breast milk or formula", "Pinch of nutmeg (optional)"],
    steps: ["Steam or pressure cook sweet potato until soft, then peel.", "Mash thoroughly with a fork.", "Loosen with breast milk or formula and serve warm."],
    tips: "One of the best foods for babies who need to gain weight.",
    allergyWarning: "Low allergy risk.",
    vegetarian: true, season: "Winter", tags: ["vitamin a", "weight gain", "fibre"],
  },
  {
    id: "r-moong-dal-water", name: "Moong Dal Soup", desc: "Light yellow moong dal water with a pinch of turmeric.",
    slot: "Dinner", ageGroup: "6-8 Months", ageSuitable: "6+ months", emoji: "🥣",
    prepMinutes: 20, serving: "1 small bowl (120 ml)", texture: "Thin soup",
    storage: "Serve fresh; refrigerate up to 8 hours.",
    benefits: ["Plant protein for growth", "Easily digested pulse", "Hydrating during illness"],
    avoid: "Avoid chilli, garam masala and salt.",
    calories: 80, protein: 5, iron: 2, calcium: 25,
    ingredients: ["2 tbsp yellow moong dal", "1.5 cups water", "Pinch of turmeric", "1/4 tsp ghee"],
    steps: ["Rinse dal well and pressure cook with water and turmeric for 4 whistles.", "Mash and strain the clear dal water.", "Add ghee and serve lukewarm."],
    tips: "Excellent first protein and a good fluid during fever or diarrhoea.",
    allergyWarning: "Introduce lentils in small amounts; watch for gas.",
    vegetarian: true, season: "All", tags: ["protein", "gentle", "soup"],
  },
  {
    id: "r-rice-dal-puree", name: "Rice and Dal Purée", desc: "Soft rice cooked with moong dal and mashed smooth.",
    slot: "Lunch", ageGroup: "6-8 Months", ageSuitable: "7+ months", emoji: "🍲",
    prepMinutes: 25, serving: "1 small bowl (150 g)", texture: "Smooth thick purée",
    storage: "Refrigerate up to 12 hours; reheat thoroughly once.",
    benefits: ["Complete protein from rice plus dal", "Balanced energy", "Familiar Tamil household staple"],
    avoid: "No salt before 12 months; keep it spice free.",
    calories: 160, protein: 6, iron: 2, calcium: 30,
    ingredients: ["2 tbsp rice", "1 tbsp moong dal", "1 cup water", "Pinch of turmeric", "1/2 tsp ghee"],
    steps: ["Wash rice and dal together.", "Pressure cook with water and turmeric for 5 whistles.", "Mash very smooth, stir in ghee and serve warm."],
    tips: "The rice-dal combination gives all essential amino acids.",
    allergyWarning: "Contains lentils - introduce gradually.",
    vegetarian: true, season: "All", tags: ["protein", "staple", "energy"],
  },
  // ---------------- 8-10 Months : thicker mashes, soft lumps ----------------
  {
    id: "r-idli-mash", name: "Idli Mash with Ghee", desc: "Soft steamed idli mashed with warm milk and ghee.",
    slot: "Breakfast", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🍥",
    prepMinutes: 12, serving: "1 mini idli mashed", texture: "Soft lumpy mash",
    storage: "Steam fresh idlis daily; batter keeps refrigerated 2 days.",
    benefits: ["Fermented food supports gut bacteria", "Easy to digest", "Light and low fat"],
    avoid: "No chutney with chilli or raw onion at this age.",
    calories: 120, protein: 3, iron: 1, calcium: 40,
    ingredients: ["1 mini idli", "3 tbsp warm milk or dal water", "1/2 tsp ghee"],
    steps: ["Steam the idli until fluffy.", "Crumble it into a bowl while warm.", "Add warm milk or dal water and ghee, mash lightly and serve."],
    tips: "Fermentation increases B vitamins and makes iron easier to absorb.",
    allergyWarning: "Contains urad dal; introduce slowly if baby is gassy.",
    vegetarian: true, season: "All", tags: ["fermented", "gut-friendly", "breakfast"],
  },
  {
    id: "r-veg-khichdi", name: "Vegetable Khichdi", desc: "One-pot rice, dal and vegetables cooked till very soft.",
    slot: "Lunch", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🍲",
    prepMinutes: 25, serving: "1 bowl (180 g)", texture: "Soft mash with tiny lumps",
    storage: "Refrigerate up to 12 hours; reheat once with a splash of water.",
    benefits: ["Balanced carbs, protein and vegetables", "Iron plus vitamin C in one bowl", "Filling main meal"],
    avoid: "Skip chilli powder and store-bought masala.",
    calories: 210, protein: 7, iron: 3, calcium: 45,
    ingredients: ["2 tbsp rice", "1 tbsp moong dal", "2 tbsp chopped carrot and beans", "Pinch of turmeric", "1 tsp ghee", "1 cup water"],
    steps: ["Wash rice and dal, add chopped vegetables and turmeric.", "Pressure cook with water for 5 whistles.", "Mash to the texture baby handles, stir in ghee and serve warm."],
    tips: "Change the vegetable each day to widen baby's taste.",
    allergyWarning: "Contains lentils; introduce each new vegetable separately first.",
    vegetarian: true, season: "All", tags: ["protein", "veggies", "one-pot", "iron"],
  },
  {
    id: "r-rice-dal-carrot", name: "Rice + Dal + Carrot Poriyal", desc: "Soft rice with moong dal and lightly sautéed carrot.",
    slot: "Lunch", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🍛", image: riceDal,
    prepMinutes: 25, serving: "1 small bowl (180 g)", texture: "Soft mash with grated vegetable",
    storage: "Refrigerate up to 12 hours; do not reheat twice.",
    benefits: ["Protein plus vitamin A", "Introduces mild texture", "Everyday Tamil meal pattern"],
    avoid: "No mustard seeds whole - grind or strain them out.",
    calories: 220, protein: 8, iron: 4, calcium: 60,
    ingredients: ["2 tbsp rice", "1 tbsp moong dal", "1 small carrot", "Pinch of cumin", "1 tsp ghee"],
    steps: ["Pressure cook rice and dal together until very soft.", "Steam grated carrot for 5 minutes.", "Temper cumin in ghee, add carrot and toss.", "Mash rice and dal and serve with the carrot."],
    tips: "Add a spoon of ghee for absorption of fat-soluble vitamins.",
    allergyWarning: "Introduce dal in small amounts first.",
    vegetarian: true, season: "All", tags: ["protein", "veggies", "lunch"],
  },
  {
    id: "r-spinach-dal", name: "Spinach Dal (Keerai Paruppu)", desc: "Moong dal simmered with finely chopped palak.",
    slot: "Dinner", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🥬",
    prepMinutes: 22, serving: "1 small bowl (150 g)", texture: "Thick mash",
    storage: "Serve fresh - cooked greens should not be stored beyond 6 hours.",
    benefits: ["Plant iron and folate", "Protein for muscle growth", "Supports healthy haemoglobin"],
    avoid: "Never reheat cooked spinach more than once.",
    calories: 140, protein: 7, iron: 4, calcium: 70,
    ingredients: ["2 tbsp moong dal", "1/2 cup finely chopped spinach", "Pinch of turmeric", "1/2 tsp ghee", "1 tsp lemon juice (after 10 months)"],
    steps: ["Cook dal with turmeric until mushy.", "Add chopped spinach and simmer 5 minutes.", "Mash together, stir in ghee and serve warm."],
    tips: "Add a squeeze of lemon after 10 months to boost iron absorption.",
    allergyWarning: "Contains lentils; wash greens thoroughly.",
    vegetarian: true, season: "All", tags: ["iron", "greens", "protein"],
  },
  {
    id: "r-wheat-porridge", name: "Wheat Porridge (Godhumai Kanji)", desc: "Broken wheat cooked soft with milk and jaggery-free sweetness.",
    slot: "Breakfast", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🌾",
    prepMinutes: 20, serving: "1 small bowl (150 ml)", texture: "Thick smooth porridge",
    storage: "Serve fresh; refrigerate up to 8 hours.",
    benefits: ["B vitamins and fibre", "Sustained energy", "Helps regular bowel movement"],
    avoid: "Not for babies with diagnosed gluten intolerance.",
    calories: 170, protein: 5, iron: 2, calcium: 60,
    ingredients: ["2 tbsp broken wheat or wheat flour", "3/4 cup water", "1/4 cup milk", "1 tbsp mashed dates or banana"],
    steps: ["Roast the wheat lightly until aromatic.", "Cook with water on low flame for 10 minutes, whisking.", "Add milk and mashed fruit, simmer 3 minutes and cool."],
    tips: "Roasting first stops lumps and improves digestibility.",
    allergyWarning: "Contains gluten and dairy - introduce separately first.",
    vegetarian: true, season: "Winter", tags: ["energy", "fibre", "porridge"],
  },
  {
    id: "r-oats-porridge", name: "Oats Porridge with Apple", desc: "Soft cooked oats finished with steamed apple purée.",
    slot: "Breakfast", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🥄",
    prepMinutes: 12, serving: "1 small bowl (150 ml)", texture: "Creamy porridge",
    storage: "Serve fresh; oats thicken quickly on standing.",
    benefits: ["Beta-glucan fibre for digestion", "Iron and zinc", "Keeps baby full longer"],
    avoid: "Avoid instant flavoured oats sachets - they contain sugar and salt.",
    calories: 160, protein: 5, iron: 3, calcium: 80,
    ingredients: ["3 tbsp rolled oats, powdered", "3/4 cup water or milk", "2 tbsp apple purée", "Pinch of cinnamon"],
    steps: ["Powder the oats coarsely.", "Cook in water or milk for 5-7 minutes, stirring.", "Fold in apple purée and cinnamon, cool and serve."],
    tips: "Powder the oats for younger babies and keep them whole after 12 months.",
    allergyWarning: "May contain traces of gluten; watch if dairy is used.",
    vegetarian: true, season: "All", tags: ["fibre", "iron", "breakfast", "porridge"],
  },
  {
    id: "r-idly-sambar", name: "Idly with Mild Sambar", desc: "Two soft mini idlis with a chilli-free sambar.",
    slot: "Dinner", ageGroup: "8-10 Months", ageSuitable: "9+ months", emoji: "🍚", image: idlySambar,
    prepMinutes: 20, serving: "2 mini idlis + 3 tbsp sambar", texture: "Soft pieces in gravy",
    storage: "Make sambar fresh daily; refrigerate leftovers up to 12 hours.",
    benefits: ["Fermented grains for gut health", "Dal protein", "Introduces family food flavours"],
    avoid: "No chilli powder, no asafoetida excess, no salt-heavy sambar powder.",
    calories: 200, protein: 6, iron: 3, calcium: 80,
    ingredients: ["2 mini idlis", "3 tbsp mild sambar without chilli", "1 tsp ghee"],
    steps: ["Steam mini idlis until fluffy.", "Prepare a mild sambar with dal, turmeric and vegetables only.", "Break idli into small pieces and mix with sambar.", "Serve warm with a drizzle of ghee."],
    tips: "Ensure sambar is not spicy - use only turmeric and a pinch of hing.",
    allergyWarning: "Contains lentils. Watch for gas or discomfort.",
    vegetarian: true, season: "All", tags: ["fermented", "gut-friendly", "dinner"],
  },
  {
    id: "r-millet-porridge", name: "Mixed Millet Porridge", desc: "Roasted multi-millet mix cooked into a nourishing porridge.",
    slot: "Breakfast", ageGroup: "8-10 Months", ageSuitable: "8+ months", emoji: "🌾",
    prepMinutes: 18, serving: "1 small bowl (150 ml)", texture: "Smooth thick porridge",
    storage: "Dry millet mix keeps 1 month in an airtight jar; cooked porridge serve fresh.",
    benefits: ["Iron, calcium and magnesium", "Gluten-free grain option", "Sustained energy for active babies"],
    avoid: "Do not add sugar; sweeten with fruit only.",
    calories: 175, protein: 5, iron: 3, calcium: 110,
    ingredients: ["2 tbsp home-made millet mix (ragi, kambu, thinai, samai)", "1 cup water", "2 tbsp milk", "1 tbsp mashed banana"],
    steps: ["Whisk the millet mix into cold water to avoid lumps.", "Cook on low flame 8-10 minutes until glossy.", "Add milk, simmer 2 minutes and fold in mashed banana."],
    tips: "Dry roast and grind the millets at home for a fresher, cheaper mix.",
    allergyWarning: "Introduce one millet at a time before using a mix.",
    vegetarian: true, season: "All", tags: ["iron", "calcium", "millet", "energy"],
  },
  {
    id: "r-curd-rice", name: "Soft Curd Rice", desc: "Mashed rice mixed with fresh homemade curd.",
    slot: "Lunch", ageGroup: "8-10 Months", ageSuitable: "9+ months", emoji: "🍚",
    prepMinutes: 10, serving: "1 small bowl (150 g)", texture: "Soft creamy mash",
    storage: "Serve fresh; never leave curd rice at room temperature over 2 hours.",
    benefits: ["Probiotics restore gut flora", "Calcium for bones", "Cooling in hot weather"],
    avoid: "Avoid sour or shop-bought curd; no tempering with mustard for young babies.",
    calories: 150, protein: 5, iron: 1, calcium: 130,
    ingredients: ["3 tbsp cooked soft rice", "3 tbsp fresh homemade curd", "1 tsp grated carrot (optional)"],
    steps: ["Mash the warm rice well and let it cool to room temperature.", "Fold in fresh curd until creamy.", "Add grated steamed carrot if desired and serve."],
    tips: "Especially useful after a course of antibiotics or a bout of diarrhoea.",
    allergyWarning: "Contains dairy - watch for cow milk protein sensitivity.",
    vegetarian: true, season: "Summer", tags: ["probiotic", "calcium", "cooling"],
  },
  // ---------------- 10-12 Months : finger foods and family textures ----------------
  {
    id: "r-egg-mash", name: "Egg Yolk Mash", desc: "Well-boiled egg yolk mashed with a little ghee.",
    slot: "Breakfast", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🥚",
    prepMinutes: 15, serving: "1 yolk", texture: "Soft crumbly mash",
    storage: "Cook fresh each time; boiled eggs keep refrigerated 24 hours in shell.",
    benefits: ["Choline for brain development", "High quality protein", "Iron and vitamin D"],
    avoid: "Never serve runny or half-boiled egg to a baby.",
    calories: 90, protein: 6, iron: 1, calcium: 30,
    ingredients: ["1 egg", "1/4 tsp ghee", "Pinch of pepper powder"],
    steps: ["Hard boil the egg for 10 minutes.", "Separate the yolk and mash it with ghee.", "Add a pinch of pepper and serve warm."],
    tips: "Start with yolk only; add the white after 12 months if there is no reaction.",
    allergyWarning: "Egg is a common allergen - introduce alone and watch 3 days.",
    vegetarian: false, season: "All", tags: ["protein", "brain", "non-veg"],
  },
  {
    id: "r-veg-upma", name: "Vegetable Rava Upma", desc: "Soft rava upma with finely chopped vegetables.",
    slot: "Breakfast", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🥣",
    prepMinutes: 20, serving: "1 small bowl (150 g)", texture: "Soft, slightly grainy",
    storage: "Serve fresh; refrigerate up to 12 hours.",
    benefits: ["Energy from semolina", "Vegetables add vitamins", "Trains chewing"],
    avoid: "Skip green chilli and reduce mustard for babies under 1 year.",
    calories: 190, protein: 5, iron: 2, calcium: 40,
    ingredients: ["3 tbsp roasted rava", "2 tbsp finely chopped carrot and peas", "1 cup water", "1 tsp ghee", "Pinch of cumin"],
    steps: ["Temper cumin in ghee, add vegetables and sauté 2 minutes.", "Pour water and bring to a boil.", "Whisk in rava slowly, cook covered 5 minutes until soft and fluffy."],
    tips: "Make it slightly wetter than adult upma so it is easy to swallow.",
    allergyWarning: "Contains gluten (wheat semolina).",
    vegetarian: true, season: "All", tags: ["veggies", "energy", "breakfast"],
  },
  {
    id: "r-veg-rice", name: "Vegetable Rice", desc: "Soft rice tossed with steamed mixed vegetables and ghee.",
    slot: "Lunch", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🍚",
    prepMinutes: 22, serving: "1 bowl (180 g)", texture: "Soft grains with tender vegetable pieces",
    storage: "Refrigerate up to 12 hours; reheat thoroughly.",
    benefits: ["Wide vegetable variety", "Fibre and vitamins", "Introduces self-feeding"],
    avoid: "Avoid hard peas or corn kernels whole - mash them.",
    calories: 200, protein: 5, iron: 2, calcium: 45,
    ingredients: ["3 tbsp cooked rice", "3 tbsp steamed carrot, beans, pumpkin", "1 tsp ghee", "Pinch of cumin powder"],
    steps: ["Steam the vegetables until fork-soft and chop small.", "Toss with warm cooked rice.", "Add ghee and cumin, mix and serve warm."],
    tips: "Let baby pick up soft pieces to practise the pincer grip.",
    allergyWarning: "Low risk; introduce any new vegetable alone.",
    vegetarian: true, season: "All", tags: ["veggies", "self-feeding", "lunch"],
  },
  {
    id: "r-ragi-adai", name: "Ragi Soft Adai", desc: "Thin soft ragi pancake, perfect as a finger food.",
    slot: "Snacks", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🥞",
    prepMinutes: 18, serving: "1 small adai", texture: "Soft, easy to tear",
    storage: "Serve fresh and warm; batter keeps refrigerated 12 hours.",
    benefits: ["Calcium-dense finger food", "Builds chewing skills", "Iron from ragi"],
    avoid: "Do not fry crisp - hard edges are a choking risk.",
    calories: 140, protein: 4, iron: 3, calcium: 150,
    ingredients: ["3 tbsp ragi flour", "1 tbsp grated carrot", "1/4 cup water", "1 tsp ghee", "Pinch of cumin"],
    steps: ["Mix ragi flour, carrot, cumin and water into a pourable batter.", "Pour on a warm tawa and spread thin.", "Cook both sides on low with ghee until soft, not crisp.", "Cut into strips and serve warm."],
    tips: "Cut into finger-length strips so baby can hold them easily.",
    allergyWarning: "Low allergy risk; watch new vegetables added to the batter.",
    vegetarian: true, season: "All", tags: ["calcium", "finger food", "iron", "snack"],
  },
  {
    id: "r-paneer-cubes", name: "Soft Paneer Cubes", desc: "Fresh homemade paneer cut into soft baby-safe cubes.",
    slot: "Snacks", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🧀",
    prepMinutes: 25, serving: "4-5 small cubes", texture: "Soft crumbly cubes",
    storage: "Refrigerate homemade paneer up to 2 days in water.",
    benefits: ["Calcium and protein for bones", "Healthy fats for brain growth", "Great finger food"],
    avoid: "Avoid salted or packaged processed cheese.",
    calories: 130, protein: 8, iron: 1, calcium: 200,
    ingredients: ["1 cup full-fat milk", "1 tsp lemon juice", "Pinch of pepper (optional)"],
    steps: ["Boil milk and add lemon juice to curdle.", "Strain through muslin and press for 20 minutes.", "Cut into small soft cubes and serve at room temperature."],
    tips: "Homemade paneer is softer and salt-free, unlike store-bought blocks.",
    allergyWarning: "Contains dairy - avoid if cow milk protein allergy is suspected.",
    vegetarian: true, season: "All", tags: ["calcium", "protein", "finger food"],
  },
  {
    id: "r-chicken-soup", name: "Clear Chicken Soup", desc: "Mild slow-simmered chicken broth with shredded meat.",
    slot: "Dinner", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🍜",
    prepMinutes: 35, serving: "1 small bowl (150 ml)", texture: "Thin broth with fine shreds",
    storage: "Refrigerate up to 24 hours; reheat until steaming hot once.",
    benefits: ["Heme iron that is easily absorbed", "Zinc supports immunity", "Comforting during colds"],
    avoid: "Remove every bone; no stock cubes or salt.",
    calories: 120, protein: 10, iron: 2, calcium: 20,
    ingredients: ["50 g boneless chicken", "1.5 cups water", "1 small carrot", "Pinch of turmeric and pepper"],
    steps: ["Simmer chicken with carrot, turmeric and water for 25 minutes.", "Remove chicken, shred very finely and check for bones.", "Strain the broth, add shreds back and cool to lukewarm."],
    tips: "Chicken is one of the best iron sources for non-vegetarian babies.",
    allergyWarning: "Introduce meat alone and observe for 3 days.",
    vegetarian: false, season: "Winter", tags: ["iron", "protein", "soup", "non-veg"],
  },
  {
    id: "r-fish-rice", name: "Mashed Fish with Rice", desc: "Boneless steamed fish flaked into soft rice.",
    slot: "Lunch", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🐟",
    prepMinutes: 25, serving: "1 small bowl (150 g)", texture: "Soft flaky mash",
    storage: "Cook and serve fresh; never store cooked fish for a baby.",
    benefits: ["Omega-3 DHA for brain and eyes", "High protein", "Vitamin D"],
    avoid: "Avoid large predatory fish (shark, swordfish, king mackerel) due to mercury.",
    calories: 180, protein: 12, iron: 2, calcium: 60,
    ingredients: ["40 g boneless soft fish such as vanjaram or sardine fillet", "3 tbsp cooked rice", "Pinch of turmeric", "1/2 tsp ghee"],
    steps: ["Steam the fish with turmeric for 8 minutes.", "Flake it carefully and check twice for bones.", "Mix into warm mashed rice with ghee and serve."],
    tips: "Twice-check for bones - run the flakes between your fingers.",
    allergyWarning: "Fish is a common allergen. Introduce alone and watch 3 days.",
    vegetarian: false, season: "All", tags: ["omega-3", "protein", "brain", "non-veg"],
  },
  {
    id: "r-dates-puree", name: "Dates and Milk Purée", desc: "Soaked dates blended with warm milk, a natural sweetener.",
    slot: "Snacks", ageGroup: "10-12 Months", ageSuitable: "10+ months", emoji: "🌰",
    prepMinutes: 12, serving: "3 tbsp", texture: "Thick smooth purée",
    storage: "Refrigerate up to 24 hours in a covered jar.",
    benefits: ["Natural iron and sweetness", "Fibre prevents constipation", "Energy dense for weight gain"],
    avoid: "Never give whole dates - the pit and skin are choking hazards.",
    calories: 130, protein: 3, iron: 2, calcium: 90,
    ingredients: ["3 seedless dates", "1/4 cup warm milk", "Pinch of cardamom"],
    steps: ["Soak dates in warm water for 20 minutes and peel if the skin is tough.", "Blend into a smooth paste.", "Mix with warm milk and cardamom and serve."],
    tips: "Use this instead of sugar to sweeten porridges.",
    allergyWarning: "Contains dairy if milk is used.",
    vegetarian: true, season: "All", tags: ["iron", "weight gain", "natural sweetener"],
  },
  // ---------------- 1-2 Years : toddler family meals ----------------
  {
    id: "r-mini-dosa", name: "Mini Ghee Dosa", desc: "Small soft dosas cooked in ghee, made for tiny hands.",
    slot: "Breakfast", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🥞",
    prepMinutes: 15, serving: "2 mini dosas", texture: "Soft and foldable",
    storage: "Batter keeps refrigerated 2 days; cook dosas fresh.",
    benefits: ["Fermented batter aids digestion", "Encourages independent eating", "Ghee supports brain growth"],
    avoid: "Do not serve with spicy chutney or pickle.",
    calories: 200, protein: 5, iron: 2, calcium: 45,
    ingredients: ["1/2 cup dosa batter", "1 tsp ghee", "1 tbsp mild coconut chutney without chilli"],
    steps: ["Heat a tawa on medium and pour small rounds of batter.", "Drizzle ghee and cook until the base sets but stays soft.", "Fold and serve warm with mild chutney."],
    tips: "Keep them soft rather than crisp so toddlers can chew easily.",
    allergyWarning: "Contains urad dal; coconut chutney adds a nut-family food.",
    vegetarian: true, season: "All", tags: ["fermented", "finger food", "breakfast"],
  },
  {
    id: "r-sambar-rice", name: "Toddler Sambar Rice", desc: "Rice mixed with mild vegetable sambar and a spoon of ghee.",
    slot: "Lunch", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🍛",
    prepMinutes: 30, serving: "1 bowl (200 g)", texture: "Soft mixed rice",
    storage: "Refrigerate up to 24 hours; reheat until steaming.",
    benefits: ["Dal protein plus mixed vegetables", "Iron with tamarind vitamin C", "Family meal the toddler shares"],
    avoid: "Use a quarter of the adult chilli and very little salt.",
    calories: 250, protein: 8, iron: 3, calcium: 70,
    ingredients: ["4 tbsp cooked rice", "1/4 cup mild sambar", "2 tbsp cooked vegetables", "1 tsp ghee"],
    steps: ["Cook toor dal with drumstick, pumpkin and carrot until soft.", "Add a small amount of tamarind and turmeric, simmer 5 minutes.", "Mix with warm rice, mash lightly and add ghee."],
    tips: "Ladle out the toddler portion before adding full spice to the family pot.",
    allergyWarning: "Contains lentils and tamarind; keep chilli minimal.",
    vegetarian: true, season: "All", tags: ["protein", "veggies", "family meal"],
  },
  {
    id: "r-veg-pongal", name: "Ven Pongal", desc: "Creamy rice and moong dal pongal with pepper and cumin.",
    slot: "Breakfast", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🍲",
    prepMinutes: 25, serving: "1 bowl (180 g)", texture: "Soft creamy",
    storage: "Serve fresh; it firms up when cold.",
    benefits: ["Complete protein", "Pepper aids digestion", "Warm comfort food during colds"],
    avoid: "Keep whole peppercorns out - use powder.",
    calories: 240, protein: 8, iron: 2, calcium: 50,
    ingredients: ["3 tbsp rice", "1.5 tbsp moong dal", "1/4 tsp pepper powder", "1/4 tsp cumin", "1.5 tsp ghee", "6 cashews, crushed"],
    steps: ["Dry roast the dal until aromatic, then cook with rice and plenty of water until mushy.", "Temper cumin, pepper and crushed cashew in ghee.", "Stir the tempering in and serve warm."],
    tips: "Crush the cashews finely - whole nuts are a choking hazard under 4 years.",
    allergyWarning: "Contains tree nuts (cashew) and lentils.",
    vegetarian: true, season: "Winter", tags: ["protein", "comfort", "breakfast"],
  },
  {
    id: "r-veg-idiyappam", name: "Idiyappam with Milk", desc: "Steamed rice string hoppers softened in warm milk.",
    slot: "Dinner", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🍜",
    prepMinutes: 25, serving: "1 idiyappam", texture: "Very soft strands",
    storage: "Serve fresh; steamed idiyappam dries out quickly.",
    benefits: ["Light easy-to-digest dinner", "Calcium from milk", "Low fat"],
    avoid: "Do not add sugar; use mashed banana for sweetness.",
    calories: 210, protein: 5, iron: 1, calcium: 140,
    ingredients: ["1 idiyappam", "1/3 cup warm milk", "1 tbsp mashed banana", "Pinch of cardamom"],
    steps: ["Steam the idiyappam for 6-8 minutes.", "Break the strands into short lengths.", "Pour warm milk over, add mashed banana and cardamom."],
    tips: "A perfect light dinner when the toddler has had a heavy lunch.",
    allergyWarning: "Contains dairy.",
    vegetarian: true, season: "All", tags: ["light", "calcium", "dinner"],
  },
  {
    id: "r-veg-cutlet", name: "Steamed Vegetable Cutlet", desc: "Pan-cooked potato and vegetable patties, lightly crisped.",
    slot: "Snacks", ageGroup: "1-2 Years", ageSuitable: "15+ months", emoji: "🥔",
    prepMinutes: 30, serving: "2 small cutlets", texture: "Soft inside, lightly firm outside",
    storage: "Refrigerate the mix up to 24 hours; cook fresh.",
    benefits: ["Sneaks in mixed vegetables", "Finger food independence", "Balanced snack"],
    avoid: "Do not deep fry; shallow cook in a little ghee or oil.",
    calories: 180, protein: 4, iron: 2, calcium: 40,
    ingredients: ["1 boiled potato", "3 tbsp boiled carrot, beans and peas", "1 tbsp rava for binding", "Pinch of cumin and turmeric", "1 tsp ghee"],
    steps: ["Mash the potato and vegetables together with the spices.", "Bind with rava and shape into small patties.", "Cook on a tawa with ghee on both sides until lightly golden."],
    tips: "Freeze shaped patties for up to 2 weeks for quick snacks.",
    allergyWarning: "Contains gluten from rava.",
    vegetarian: true, season: "All", tags: ["veggies", "finger food", "snack"],
  },
  {
    id: "r-fruit-yogurt", name: "Fruit and Yogurt Bowl", desc: "Fresh curd folded with soft chopped seasonal fruit.",
    slot: "Snacks", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🥛",
    prepMinutes: 8, serving: "1 small bowl (120 g)", texture: "Creamy with soft fruit pieces",
    storage: "Serve immediately; do not store cut fruit in curd.",
    benefits: ["Probiotics for gut health", "Calcium and vitamin C", "Cooling summer snack"],
    avoid: "No added sugar or honey; avoid citrus if curd upsets the tummy.",
    calories: 140, protein: 5, iron: 1, calcium: 160,
    ingredients: ["1/2 cup fresh curd", "3 tbsp chopped banana, papaya or mango", "Pinch of cardamom"],
    steps: ["Whisk the curd until smooth.", "Fold in finely chopped soft fruit.", "Add cardamom and serve chilled but not cold."],
    tips: "Chop fruit no larger than a pea to keep it safe.",
    allergyWarning: "Contains dairy; mango can cause mouth rash in some children.",
    vegetarian: true, season: "Summer", tags: ["probiotic", "calcium", "fruit", "snack"],
  },
  {
    id: "r-drumstick-dal", name: "Drumstick Dal", desc: "Toor dal simmered with drumstick and tomato.",
    slot: "Lunch", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🥬",
    prepMinutes: 30, serving: "1 small bowl (150 g)", texture: "Thick dal, scrape the drumstick pulp",
    storage: "Refrigerate up to 24 hours.",
    benefits: ["Iron, calcium and vitamin C together", "Boosts immunity", "Traditional Tamil goodness"],
    avoid: "Never give the fibrous drumstick skin - only the inner pulp.",
    calories: 160, protein: 8, iron: 3, calcium: 90,
    ingredients: ["3 tbsp toor dal", "2 drumstick pieces", "1 small tomato", "Pinch of turmeric", "1 tsp ghee"],
    steps: ["Pressure cook dal with turmeric, tomato and drumstick.", "Scrape the soft pulp from the drumstick and discard the skin.", "Mash the dal, add ghee and serve with rice."],
    tips: "Drumstick pulp is one of the richest local sources of calcium.",
    allergyWarning: "Contains lentils.",
    vegetarian: true, season: "All", tags: ["iron", "calcium", "protein", "traditional"],
  },
  {
    id: "r-aval-upma", name: "Aval Upma (Poha)", desc: "Flattened rice tossed with vegetables and gentle spices.",
    slot: "Snacks", ageGroup: "1-2 Years", ageSuitable: "12+ months", emoji: "🍚",
    prepMinutes: 15, serving: "1 small bowl (140 g)", texture: "Soft and fluffy",
    storage: "Serve fresh and warm.",
    benefits: ["Iron from flattened rice", "Light and quick to digest", "Good evening energy"],
    avoid: "Rinse aval briefly - soaking too long makes it mushy and hard to chew.",
    calories: 190, protein: 4, iron: 3, calcium: 30,
    ingredients: ["1/2 cup thick aval", "2 tbsp chopped carrot and peas", "Pinch of turmeric and cumin", "1 tsp ghee", "1 tsp lemon juice"],
    steps: ["Rinse aval in water and drain immediately.", "Sauté vegetables with cumin and turmeric in ghee.", "Add aval, toss for 3 minutes, finish with lemon juice."],
    tips: "Lemon juice at the end helps the body absorb the iron in aval.",
    allergyWarning: "Low allergy risk.",
    vegetarian: true, season: "All", tags: ["iron", "quick", "snack"],
  },
  // ---------------- 2-3 Years : full family food, self-feeding ----------------
  {
    id: "r-chapati-roll", name: "Soft Chapati Veg Roll", desc: "Whole wheat chapati rolled with mashed vegetable filling.",
    slot: "Dinner", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🌯",
    prepMinutes: 25, serving: "1 small roll", texture: "Soft rolled bread",
    storage: "Dough keeps refrigerated 24 hours; roll fresh.",
    benefits: ["Whole grain fibre", "Vegetable vitamins", "Encourages independent eating"],
    avoid: "Do not use hard or day-old chapati - it is difficult to chew.",
    calories: 240, protein: 7, iron: 3, calcium: 60,
    ingredients: ["1 small whole wheat chapati", "3 tbsp mashed potato and carrot", "1/2 tsp ghee", "Pinch of cumin powder"],
    steps: ["Knead soft dough with a little ghee and roll a thin chapati.", "Cook on a tawa until soft with light brown spots.", "Spread the mashed vegetable filling and roll up.", "Cut into two short pieces and serve warm."],
    tips: "Add a spoon of curd to the dough to keep chapatis soft for hours.",
    allergyWarning: "Contains gluten.",
    vegetarian: true, season: "All", tags: ["whole grain", "veggies", "self-feeding"],
  },
  {
    id: "r-lemon-rice", name: "Mild Lemon Rice", desc: "Turmeric rice tossed with lemon juice and crushed peanuts.",
    slot: "Lunch", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🍋",
    prepMinutes: 15, serving: "1 bowl (180 g)", texture: "Soft separate grains",
    storage: "Keeps well for a lunchbox up to 5 hours.",
    benefits: ["Vitamin C improves iron absorption", "Turmeric is anti-inflammatory", "Travel-friendly meal"],
    avoid: "Crush peanuts finely; whole nuts are a choking risk under 4 years.",
    calories: 230, protein: 6, iron: 2, calcium: 40,
    ingredients: ["1 cup cooked rice", "1 tbsp lemon juice", "1 tbsp crushed roasted peanuts", "Pinch of turmeric, cumin and hing", "1 tsp oil"],
    steps: ["Temper cumin and hing in oil, add turmeric.", "Toss in cooked rice and mix gently.", "Turn off the heat, add lemon juice and crushed peanuts."],
    tips: "Add lemon juice off the flame so the vitamin C is not destroyed.",
    allergyWarning: "Contains peanuts - omit if there is any nut allergy in the family.",
    vegetarian: true, season: "All", tags: ["vitamin c", "lunchbox", "quick"],
  },
  {
    id: "r-veg-pasta", name: "Vegetable Milk Pasta", desc: "Soft pasta in a mild milk and vegetable sauce.",
    slot: "Dinner", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🍝",
    prepMinutes: 22, serving: "1 small bowl (160 g)", texture: "Soft with tender vegetable pieces",
    storage: "Serve fresh; the sauce thickens on standing.",
    benefits: ["Calcium from milk", "Hidden vegetables", "Familiar fun food for fussy eaters"],
    avoid: "Skip packaged sauces and cheese spreads high in salt.",
    calories: 250, protein: 9, iron: 2, calcium: 180,
    ingredients: ["1/2 cup cooked small pasta", "1/2 cup milk", "3 tbsp steamed carrot, corn and beans", "1 tsp butter or ghee", "Pinch of pepper"],
    steps: ["Boil pasta until very soft, drain.", "Warm milk with butter, add vegetables and simmer 3 minutes.", "Fold in pasta, add pepper and serve warm."],
    tips: "Use small shapes such as macaroni that toddlers can spoon easily.",
    allergyWarning: "Contains gluten and dairy.",
    vegetarian: true, season: "All", tags: ["calcium", "veggies", "fussy eater"],
  },
  {
    id: "r-ragi-laddu", name: "Ragi Dates Laddu", desc: "No-sugar laddus of roasted ragi, dates and ghee.",
    slot: "Snacks", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🟤",
    prepMinutes: 25, serving: "1 small laddu", texture: "Soft and moist",
    storage: "Airtight box at room temperature up to 4 days, refrigerated 10 days.",
    benefits: ["Calcium and iron rich", "Sweetened only with dates", "Healthy energy snack"],
    avoid: "No refined sugar or jaggery syrup needed.",
    calories: 160, protein: 3, iron: 3, calcium: 170,
    ingredients: ["1/2 cup ragi flour", "8 seedless dates", "1.5 tbsp ghee", "1 tbsp powdered almonds", "Pinch of cardamom"],
    steps: ["Roast ragi flour in ghee on low flame for 8 minutes until aromatic.", "Blend the dates into a thick paste.", "Mix everything while warm and roll into small laddus."],
    tips: "Roast the flour patiently on low heat or it will taste raw.",
    allergyWarning: "Contains tree nuts (almond) and dairy (ghee).",
    vegetarian: true, season: "All", tags: ["calcium", "iron", "snack", "no sugar"],
  },
  {
    id: "r-egg-bhurji", name: "Soft Egg Bhurji", desc: "Scrambled egg with tomato and a pinch of turmeric.",
    slot: "Breakfast", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🍳",
    prepMinutes: 12, serving: "1 egg portion", texture: "Soft moist scramble",
    storage: "Serve immediately; never store cooked egg for a toddler.",
    benefits: ["Complete protein and choline", "Iron and vitamin B12", "Quick nourishing breakfast"],
    avoid: "Cook until fully set - no runny egg.",
    calories: 160, protein: 9, iron: 2, calcium: 50,
    ingredients: ["1 egg", "1 small tomato, finely chopped", "Pinch of turmeric and pepper", "1 tsp ghee"],
    steps: ["Sauté tomato in ghee until soft.", "Add turmeric, pour in the beaten egg.", "Scramble on low heat until fully cooked and moist, finish with pepper."],
    tips: "Serve with a soft chapati strip for a balanced plate.",
    allergyWarning: "Egg is a common allergen.",
    vegetarian: false, season: "All", tags: ["protein", "iron", "breakfast", "non-veg"],
  },
  {
    id: "r-veg-soup", name: "Mixed Vegetable Soup", desc: "Blended carrot, beans and tomato soup with a hint of pepper.",
    slot: "Dinner", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🥣",
    prepMinutes: 25, serving: "1 bowl (180 ml)", texture: "Smooth soup",
    storage: "Refrigerate up to 24 hours; reheat once.",
    benefits: ["Hydrating and vitamin rich", "Light dinner", "Comforting when unwell"],
    avoid: "No corn flour thickeners or bouillon cubes.",
    calories: 110, protein: 3, iron: 2, calcium: 50,
    ingredients: ["1 carrot", "5 beans", "1 tomato", "1/4 cup green peas", "Pinch of pepper", "1 tsp butter"],
    steps: ["Pressure cook all the vegetables with 1 cup water for 2 whistles.", "Blend smooth and strain if needed.", "Simmer with butter and pepper for 3 minutes and serve warm."],
    tips: "Serve in a small cup so the child can sip independently.",
    allergyWarning: "Contains dairy if butter is used.",
    vegetarian: true, season: "Winter", tags: ["veggies", "light", "soup", "immunity"],
  },
  {
    id: "r-thinai-pongal", name: "Thinai (Foxtail Millet) Sweet Pongal", desc: "Foxtail millet cooked soft with dates and ghee.",
    slot: "Breakfast", ageGroup: "2-3 Years", ageSuitable: "24+ months", emoji: "🌾",
    prepMinutes: 30, serving: "1 small bowl (160 g)", texture: "Soft and creamy",
    storage: "Serve fresh; refrigerate up to 12 hours.",
    benefits: ["Millet fibre and iron", "Slow energy release", "Gluten-free festive food"],
    avoid: "Replace jaggery with date paste for children under 3 where possible.",
    calories: 230, protein: 6, iron: 3, calcium: 60,
    ingredients: ["3 tbsp thinai", "1.5 tbsp moong dal", "6 dates, blended", "1.5 tsp ghee", "Pinch of cardamom", "5 cashews, crushed"],
    steps: ["Roast the dal, add thinai and pressure cook with water until mushy.", "Stir in date paste and cardamom, cook 5 minutes.", "Finish with ghee-roasted crushed cashews."],
    tips: "Rotate millets weekly so the child gets a wide mineral profile.",
    allergyWarning: "Contains tree nuts (cashew) and dairy (ghee).",
    vegetarian: true, season: "All", tags: ["millet", "iron", "energy", "no sugar"],
  },
  {
    id: "r-peanut-chutney-rice", name: "Groundnut Chutney Rice", desc: "Rice mixed with a mild roasted groundnut chutney.",
    slot: "Lunch", ageGroup: "2-3 Years", ageSuitable: "30+ months", emoji: "🥜",
    prepMinutes: 20, serving: "1 bowl (180 g)", texture: "Soft rice with smooth paste",
    storage: "Chutney keeps refrigerated 2 days; mix with rice fresh.",
    benefits: ["Healthy fats and protein", "Niacin and magnesium", "Filling lunchbox meal"],
    avoid: "Not suitable if there is any history of peanut allergy.",
    calories: 260, protein: 8, iron: 2, calcium: 60,
    ingredients: ["1 cup cooked rice", "2 tbsp roasted groundnuts", "1 tbsp grated coconut", "Pinch of cumin and hing", "1 tsp sesame oil"],
    steps: ["Grind roasted groundnuts with coconut and cumin into a smooth paste.", "Temper hing in sesame oil and mix into the paste.", "Fold into warm rice until evenly coated."],
    tips: "Grind the chutney very smooth so there are no hard nut pieces.",
    allergyWarning: "Contains peanuts - a major allergen. Introduce with care.",
    vegetarian: true, season: "All", tags: ["protein", "healthy fats", "lunchbox"],
  },
];

/** Lookup helpers ------------------------------------------------------- */

export const recipeById = (id: string) => recipes.find((r) => r.id === id);

export const recipesByAgeGroup = (group: AgeGroup) => recipes.filter((r) => r.ageGroup === group);

export const recipesBySlot = (slot: MealSlot) => recipes.filter((r) => r.slot === slot);

/** Map an age in months to the matching age band. */
export function ageGroupForMonths(months: number): AgeGroup {
  if (months < 8) return "6-8 Months";
  if (months < 10) return "8-10 Months";
  if (months < 12) return "10-12 Months";
  if (months < 24) return "1-2 Years";
  return "2-3 Years";
}

/** Age bands a baby of `months` can safely eat from (own band and below). */
export function allowedAgeGroups(months: number): AgeGroup[] {
  const idx = ageGroups.indexOf(ageGroupForMonths(months));
  return ageGroups.slice(0, idx + 1);
}

/**
 * Intelligent recipe search across name, description, ingredients, age group,
 * meal type, nutrition benefits, texture and tags. Supports partial keywords
 * and multi-word queries (every word must match somewhere).
 */
export function searchRecipes(query: string, list: Recipe[] = recipes): Recipe[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const words = q.split(/\s+/);
  const haystack = (r: Recipe) =>
    [
      r.name,
      r.desc,
      r.slot,
      r.ageGroup,
      r.ageSuitable,
      r.texture,
      r.season,
      r.vegetarian ? "vegetarian veg" : "non-vegetarian non-veg",
      ...r.ingredients,
      ...r.benefits,
      ...r.tags,
    ]
      .join(" ")
      .toLowerCase();
  return list.filter((r) => {
    const hay = haystack(r);
    return words.every((w) => hay.includes(w));
  });
}

/**
 * Baby-safe replacement suggestions for a meal: same meal slot first, limited
 * to age-appropriate recipes and ranked by nutritional closeness. Always
 * returns results - the age filter widens if a slot has too few matches.
 */
export function suggestReplacements(
  current: { id?: string; slot: MealSlot; calories?: number; protein?: number; iron?: number; calcium?: number },
  ageMonths: number,
  limit = 6
): Recipe[] {
  const allowed = allowedAgeGroups(ageMonths);
  const distance = (r: Recipe) =>
    Math.abs(r.calories - (current.calories ?? r.calories)) / 40 +
    Math.abs(r.protein - (current.protein ?? r.protein)) +
    Math.abs(r.iron - (current.iron ?? r.iron)) +
    Math.abs(r.calcium - (current.calcium ?? r.calcium)) / 40;

  const pools: Recipe[][] = [
    recipes.filter((r) => r.id !== current.id && r.slot === current.slot && allowed.includes(r.ageGroup)),
    recipes.filter((r) => r.id !== current.id && r.slot === current.slot),
    recipes.filter((r) => r.id !== current.id && allowed.includes(r.ageGroup)),
    recipes.filter((r) => r.id !== current.id),
  ];
  const pool = pools.find((p) => p.length > 0) ?? [];
  return [...pool].sort((a, b) => distance(a) - distance(b)).slice(0, limit);
}

/** Recipes highest in a given nutrient - used by recommendation cards and AI. */
export function topRecipesByNutrient(
  nutrient: "calories" | "protein" | "iron" | "calcium",
  ageMonths: number,
  limit = 3
): Recipe[] {
  const allowed = allowedAgeGroups(ageMonths);
  return recipes
    .filter((r) => allowed.includes(r.ageGroup))
    .sort((a, b) => b[nutrient] - a[nutrient])
    .slice(0, limit);
}

/** Default daily plan for a baby, generated from the central database. */
const defaultPlanIds = ["r-ragi-porridge", "r-rice-dal-carrot", "r-banana-mash", "r-idly-sambar"] as const;
export const defaultPlanTimes: Record<MealSlot, string> = {
  Breakfast: "9:00 AM",
  Lunch: "12:30 PM",
  Snacks: "4:00 PM",
  Dinner: "7:30 PM",
};
export const defaultPlanRecipes = defaultPlanIds
  .map((id) => recipeById(id))
  .filter((r): r is Recipe => Boolean(r));
