export type Lang = 'en' | 'am'

const dict = {
  'topBar.freeDelivery': {
    en: 'Free delivery inside Addis Ababa on orders above {{threshold}} ETB',
    am: 'በአዲስ አበባ ውስጥ ከ{{threshold}} ብር በላይ ለሆኑ ትዕዛዞች ነጻ ማድረስ',
  },
  'topBar.call': { en: 'Call: {{phone}}', am: 'ይደውሉ፦ {{phone}}' },

  'header.nav.products': { en: 'Products', am: 'ምርቶች' },
  'header.nav.deals': { en: 'Deals', am: 'ቅናሾች' },
  'header.nav.brands': { en: 'Brands', am: 'ብራንዶች' },
  'header.nav.howToOrder': { en: 'How to order', am: 'እንዴት ማዘዝ እንደሚቻል' },
  'header.nav.faq': { en: 'FAQ', am: 'ተደጋጋሚ ጥያቄዎች' },
  'header.nav.contact': { en: 'Contact', am: 'አግኙን' },
  'header.orderTelegram': { en: 'Order on Telegram', am: 'በቴሌግራም ይዘዙ' },
  'header.searchPlaceholder': { en: 'Search products…', am: 'ምርቶችን ይፈልጉ…' },
  'header.searchAria': { en: 'Search products', am: 'ምርቶችን ይፈልጉ' },

  'hero.badge': { en: 'Genuine products · Official warranty', am: 'ኦሪጅናል ምርቶች · ኦፊሴላዊ ዋስትና' },
  'hero.title': {
    en: 'Quality home appliances, delivered to your door.',
    am: 'ጥራት ያላቸው የቤት እቃዎች፣ እስከ በርዎ ድረስ ይደርሳሉ።',
  },
  'hero.subtitle': {
    en: 'Fridges, washing machines, TVs, cookers and more from trusted brands. Browse the catalogue, then message us to order. We deliver and install.',
    am: 'ፍሪጆች፣ ማጠቢያ ማሽኖች፣ ቴሌቪዥኖች፣ ምድጃዎች እና ሌሎችም ከታመኑ ብራንዶች። ካታሎጉን ይመልከቱ፣ ከዚያም ለማዘዝ መልዕክት ይላኩልን። እናደርሳለን እንገጥማለን።',
  },
  'hero.browseProducts': { en: 'Browse products', am: 'ምርቶችን ይመልከቱ' },
  'hero.callUs': { en: 'Call {{phone}}', am: 'ይደውሉልን {{phone}}' },
  'hero.statsProductsInStock': { en: 'Products in stock', am: 'ያሉ ምርቶች' },
  'hero.statsHappyCustomers': { en: 'Happy customers', am: 'ደስተኛ ደንበኞች' },
  'hero.statsYearsInBusiness': { en: 'In business', am: 'በስራ ላይ' },
  'hero.followUs': { en: 'Follow us for videos & deals', am: 'ቪዲዮዎችና ቅናሾችን ለማግኘት ይከተሉን' },
  'hero.watchShowroom': { en: 'Watch: appliances in action', am: 'ይመልከቱ፦ እቃዎቹ በስራ ላይ' },
  'hero.tapForSound': { en: 'Tap for sound', am: 'ድምጽ ለመስማት ይንኩ' },
  'hero.mute': { en: 'Mute', am: 'ድምጽ ዝጋ' },
  'hero.featuredProduct': { en: 'Featured product', am: 'ተለይቶ የቀረበ ምርት' },
  'hero.order': { en: 'Order', am: 'ይዘዙ' },

  'trust.genuineTitle': { en: '100% genuine', am: '100% ኦሪጅናል' },
  'trust.genuineDesc': { en: 'Original brand products', am: 'ኦሪጅናል የብራንድ ምርቶች' },
  'trust.warrantyTitle': { en: '{{years}}-year warranty', am: '{{years}}-ዓመት ዋስትና' },
  'trust.warrantyDesc': { en: 'On every appliance', am: 'በሁሉም እቃ ላይ' },
  'trust.deliveryTitle': { en: 'Fast delivery', am: 'ፈጣን ማድረስ' },
  'trust.deliveryDesc': { en: 'Same or next day in Addis', am: 'በአዲስ አበባ በተመሳሳይ ወይም በሚቀጥለው ቀን' },
  'trust.installTitle': { en: 'Free installation', am: 'ነጻ ገጠማ' },
  'trust.installDesc': { en: 'By trained technicians', am: 'በሰለጠኑ ቴክኒሺያኖች' },

  'categories.eyebrow': { en: 'Shop by category', am: 'በምድብ ይግዙ' },
  'categories.title': { en: 'Everything for your home', am: 'ለቤትዎ የሚያስፈልግ ሁሉ' },
  'categories.browseNow': { en: 'Browse now', am: 'አሁን ይመልከቱ' },

  'featured.eyebrow': { en: 'Featured', am: 'ተለይተው የቀረቡ' },
  'featured.title': { en: 'Popular right now', am: 'አሁን ተወዳጅ የሆኑ' },
  'featured.all': { en: 'All', am: 'ሁሉም' },
  'featured.viewAll': { en: 'View all products', am: 'ሁሉንም ምርቶች ይመልከቱ' },

  'videos.eyebrow': { en: 'Watch our videos', am: 'ቪዲዮዎቻችንን ይመልከቱ' },
  'videos.title': { en: 'See the products in action', am: 'ምርቶቹን በተግባር ይመልከቱ' },
  'videos.empty': {
    en: 'Videos you add in the admin will show up here.',
    am: 'በአስተዳዳሪ ገጽ የሚጨምሯቸው ቪዲዮዎች እዚህ ይታያሉ።',
  },
  'videos.prev': { en: 'Previous video', am: 'ቀዳሚ ቪዲዮ' },
  'videos.next': { en: 'Next video', am: 'ቀጣይ ቪዲዮ' },

  'deal.eyebrow': { en: 'Deal of the week', am: 'የሳምንቱ ቅናሽ' },
  'deal.grab': { en: 'Grab the deal', am: 'ቅናሹን ይውሰዱ' },
  'deal.days': { en: 'Days', am: 'ቀናት' },
  'deal.hours': { en: 'Hours', am: 'ሰዓታት' },
  'deal.minutes': { en: 'Minutes', am: 'ደቂቃዎች' },
  'deal.ended': {
    en: 'This deal has ended — check back soon.',
    am: 'ይህ ቅናሽ አብቅቷል — በቅርቡ ይመልከቱ።',
  },
  'deal.noPhoto': { en: 'Add a deal photo in the admin', am: 'በአስተዳዳሪ ገጽ የቅናሽ ፎቶ ይጨምሩ' },

  'why.eyebrow': { en: 'Why choose us', am: 'ለምን እኛን ይምረጡ' },
  'why.title': { en: 'Shopping you can trust', am: 'የሚታመን የግዢ ተሞክሮ' },
  'why.desc': {
    en: 'We handle everything from choosing the right appliance to delivery, installation and after-sales service.',
    am: 'ትክክለኛውን እቃ ከመምረጥ ጀምሮ እስከ ማድረስ፣ ገጠማ እና ድህረ ሽያጭ አገልግሎት ድረስ ሁሉንም እናከናውናለን።',
  },
  'why.reason1Title': { en: 'Expert advice', am: 'የባለሙያ ምክር' },
  'why.reason1Desc': {
    en: "Not sure which fridge fits your kitchen? Message us and we'll help you pick the right size and model.",
    am: 'የትኛው ፍሪጅ ለኩሽናዎ እንደሚመጥን እርግጠኛ አይደሉም? መልዕክት ይላኩልን እና ትክክለኛውን መጠንና ሞዴል እንድመርጡ እንረዳዎታለን።',
  },
  'why.reason2Title': { en: 'Pay on delivery', am: 'ሲደርስዎት ይክፈሉ' },
  'why.reason2Desc': {
    en: 'Check your appliance when it arrives, then pay by cash, Telebirr or bank transfer. No risk.',
    am: 'እቃዎ ሲደርስ ይመርምሩ፣ ከዚያም በጥሬ ገንዘብ፣ በቴሌብር ወይም በባንክ ዝውውር ይክፈሉ። ምንም ስጋት የለም።',
  },
  'why.reason3Title': { en: 'After-sales support', am: 'ድህረ ሽያጭ ድጋፍ' },
  'why.reason3Desc': {
    en: "Warranty repairs and maintenance handled by our own technicians. One call and we're on it.",
    am: 'የዋስትና ጥገናና ጥበቃ በራሳችን ቴክኒሺያኖች ይከናወናል። አንድ ጥሪ ብቻ እና ወዲያውኑ እንደርሳለን።',
  },

  'fleet.eyebrow': { en: 'Our fleet', am: 'የመኪና ስብስባችን' },
  'fleet.title': { en: 'We deliver it ourselves', am: 'በራሳችን እናደርሳለን' },
  'fleet.desc': {
    en: 'No third-party couriers. Our own branded vehicles bring every order straight to your door, on time.',
    am: 'ምንም ሶስተኛ ወገን አላኪ የለም። የራሳችን ምልክት ያላቸው ተሽከርካሪዎች እያንዳንዱን ትዕዛዝ በሰዓቱ እስከ በርዎ ያደርሳሉ።',
  },
  'fleet.van': {
    en: 'Delivery van — same-day drop-offs across Addis Ababa.',
    am: 'ማድረሻ ቫን — በአዲስ አበባ ውስጥ በተመሳሳይ ቀን ማድረስ።',
  },
  'fleet.truck': {
    en: 'Delivery truck — built for bulk and heavy appliances.',
    am: 'ማድረሻ ትራክ — ለብዙ እና ከባድ እቃዎች የተዘጋጀ።',
  },
  'fleet.motorcycle': {
    en: 'Delivery motorcycle — fast same-day drop-offs nearby.',
    am: 'ማድረሻ ሞተር ሳይክል — በአቅራቢያ ፈጣን ተመሳሳይ ቀን ማድረስ።',
  },
  'fleet.bicycle': {
    en: 'Delivery bicycle — quiet, quick drop-offs around the neighborhood.',
    am: 'ማድረሻ ብስክሌት — በአካባቢው ጸጥ ያለ እና ፈጣን ማድረስ።',
  },

  'howTo.eyebrow': { en: 'How to order', am: 'እንዴት ማዘዝ እንደሚቻል' },
  'howTo.title': { en: 'Three simple steps', am: 'ሶስት ቀላል ደረጃዎች' },
  'howTo.step1Title': { en: 'Browse & choose', am: 'ይመልከቱና ይምረጡ' },
  'howTo.step1Desc': { en: 'Find the appliance you like on our website.', am: 'በድረ-ገጻችን ላይ የሚወዱትን እቃ ያግኙ።' },
  'howTo.step2Title': { en: 'Message or call us', am: 'መልዕክት ይላኩልን ወይም ይደውሉልን' },
  'howTo.step2Desc': {
    en: 'Tap "Order now" to reach us on Telegram, WhatsApp or by phone.',
    am: 'ለማግኘት "አሁን ይዘዙ" የሚለውን ይጫኑ፣ በቴሌግራም፣ በዋትስአፕ ወይም በስልክ።',
  },
  'howTo.step3Title': { en: 'We deliver & install', am: 'እናደርሳለን እንገጥማለን' },
  'howTo.step3Desc': {
    en: 'We bring it to your home, set it up, and you pay on delivery.',
    am: 'ወደ ቤትዎ እናመጣዋለን፣ እንገጥመዋለን፣ እናም ሲደርስዎት ይከፍላሉ።',
  },

  'brands.eyebrow': { en: 'Our partners', am: 'አጋሮቻችን' },
  'brands.title': { en: 'Brands we carry', am: 'የምንሸከማቸው ብራንዶች' },
  'brands.empty': {
    en: 'Brands you add in the admin will show up here.',
    am: 'በአስተዳዳሪ ገጽ የሚጨምሯቸው ብራንዶች እዚህ ይታያሉ።',
  },
  'brands.genuine': { en: 'Genuine products', am: 'ኦሪጅናል ምርቶች' },

  'reviews.eyebrow': { en: 'Customer reviews', am: 'የደንበኞች አስተያየት' },
  'reviews.title': { en: 'What our customers say', am: 'ደንበኞቻችን ምን ይላሉ' },

  'faq.eyebrow': { en: 'FAQ', am: 'ተደጋጋሚ ጥያቄዎች' },
  'faq.title': { en: "Questions? We've got answers.", am: 'ጥያቄ አለዎት? መልስ አለን።' },
  'faq.desc': {
    en: "Can't find what you need? Send us a message on Telegram and we'll reply fast.",
    am: 'የሚፈልጉትን ማግኘት አልቻሉም? በቴሌግራም መልዕክት ይላኩልን እና በፍጥነት እንመልሳለን።',
  },

  'contact.eyebrow': { en: 'Contact & visit', am: 'ያግኙን እና ይጎብኙን' },
  'contact.title': { en: 'Ready to order? Reach us anytime.', am: 'ለማዘዝ ዝግጁ ነዎት? በማንኛውም ጊዜ ያግኙን።' },
  'contact.orderTelegram': { en: 'Order on Telegram', am: 'በቴሌግራም ይዘዙ' },
  'contact.whatsapp': { en: 'WhatsApp', am: 'ዋትስአፕ' },
  'contact.callUs': { en: 'Call us', am: 'ይደውሉልን' },
  'contact.showroom': { en: 'Showroom', am: 'መደብር' },
  'contact.hours': { en: 'Opening hours', am: 'የመክፈቻ ሰዓት' },
  'contact.getDirections': { en: 'Get directions', am: 'አቅጣጫ ያግኙ' },
  'contact.noMap': {
    en: 'Add your showroom address in the admin to show the map here',
    am: 'ካርታውን ለማሳየት በአስተዳዳሪ ገጽ የመደብርዎን አድራሻ ይጨምሩ',
  },

  'telegramCta.title': { en: 'Never miss a deal', am: 'ምንም ቅናሽ አያመልጥዎት' },
  'telegramCta.desc': {
    en: 'Join our Telegram channel for new arrivals, weekly discounts and price drops.',
    am: 'አዳዲስ ምርቶችን፣ ሳምንታዊ ቅናሾችን እና የዋጋ ቅናሾችን ለማግኘት የቴሌግራም ቻናላችንን ይቀላቀሉ።',
  },
  'telegramCta.join': { en: 'Join our Telegram channel', am: 'የቴሌግራም ቻናላችንን ይቀላቀሉ' },

  'footer.shop': { en: 'Shop', am: 'ይግዙ' },
  'footer.help': { en: 'Help', am: 'እገዛ' },
  'footer.followUs': { en: 'Follow us', am: 'ይከተሉን' },
  'footer.refrigerators': { en: 'Refrigerators', am: 'ፍሪጆች' },
  'footer.washingMachines': { en: 'Washing machines', am: 'ማጠቢያ ማሽኖች' },
  'footer.tvs': { en: 'TVs', am: 'ቴሌቪዥኖች' },
  'footer.kitchen': { en: 'Kitchen', am: 'የወጥ ቤት እቃዎች' },
  'footer.deliveryWarranty': { en: 'Delivery & warranty', am: 'ማድረስና ዋስትና' },
  'footer.rights': { en: 'All rights reserved.', am: 'መብቱ በህግ የተጠበቀ ነው።' },
  'footer.location': { en: 'Addis Ababa, Ethiopia', am: 'አዲስ አበባ፣ ኢትዮጵያ' },

  'products.eyebrow': { en: 'Full catalogue', am: 'ሙሉ ካታሎግ' },
  'products.title': { en: 'All products', am: 'ሁሉም ምርቶች' },
  'products.backHome': { en: 'Back to home', am: 'ወደ መነሻ ተመለስ' },
  'products.searchPlaceholder': { en: 'Search products…', am: 'ምርቶችን ይፈልጉ…' },
  'products.sortFeatured': { en: 'Featured', am: 'ተለይተው የቀረቡ' },
  'products.sortPriceAsc': { en: 'Price: low to high', am: 'ዋጋ፦ ከዝቅተኛ ወደ ከፍተኛ' },
  'products.sortPriceDesc': { en: 'Price: high to low', am: 'ዋጋ፦ ከከፍተኛ ወደ ዝቅተኛ' },
  'products.sortName': { en: 'Name: A to Z', am: 'ስም፦ ከ A እስከ Z' },
  'products.clear': { en: 'Clear', am: 'አጽዳ' },
  'products.clearFilters': { en: 'Clear filters', am: 'ማጣሪያዎችን አጽዳ' },
  'products.noMatch': { en: 'No products match your filters.', am: 'ምንም ምርት ከማጣሪያዎችዎ ጋር አይዛመድም።' },
  'products.loading': { en: 'Loading products…', am: 'ምርቶች በመጫን ላይ…' },
  'products.empty': { en: 'No products in this category yet.', am: 'በዚህ ምድብ ውስጥ እስካሁን ምንም ምርት የለም።' },
  'products.minPrice': { en: 'Min ETB', am: 'ዝቅተኛ ብር' },
  'products.maxPrice': { en: 'Max ETB', am: 'ከፍተኛ ብር' },

  'productCard.orderNow': { en: 'Order now', am: 'አሁን ይዘዙ' },
  'productCard.inStock': { en: 'In stock', am: 'በመደብሩ ይገኛል' },
  'productCard.sale': { en: 'Sale', am: 'ቅናሽ' },

  'productDetail.backToProducts': { en: 'Back to products', am: 'ወደ ምርቶች ተመለስ' },
  'productDetail.notFoundTitle': { en: 'Product not found', am: 'ምርቱ አልተገኘም' },
  'productDetail.notFoundDesc': {
    en: 'It may have been removed or the link is incorrect.',
    am: 'ተወግዶ ሊሆን ወይም አገናኙ ትክክል ላይሆን ይችላል።',
  },
  'productDetail.loading': { en: 'Loading…', am: 'በመጫን ላይ…' },
  'productDetail.inStock': { en: 'In stock', am: 'በመደብሩ ይገኛል' },
  'productDetail.outOfStock': { en: 'Out of stock', am: 'የለም' },
  'productDetail.orderTelegram': { en: 'Order on Telegram', am: 'በቴሌግራም ይዘዙ' },
  'productDetail.whatsapp': { en: 'WhatsApp', am: 'ዋትስአፕ' },
  'productDetail.callUs': { en: 'Call us', am: 'ይደውሉልን' },
  'productDetail.specifications': { en: 'Specifications', am: 'ዝርዝር መግለጫ' },

  'notFound.title': { en: 'Page not found', am: 'ገጹ አልተገኘም' },
  'notFound.desc': {
    en: "The page you're looking for doesn't exist or may have moved.",
    am: 'የሚፈልጉት ገጽ የለም ወይም ተንቀሳቅሷል።',
  },
  'notFound.backHome': { en: 'Back to home', am: 'ወደ መነሻ ተመለስ' },
  'notFound.browseProducts': { en: 'Browse products', am: 'ምርቶችን ይመልከቱ' },
} satisfies Record<string, Record<Lang, string>>

export type TranslationKey = keyof typeof dict

export default dict
