import gingerProduct from '../assets/images/ginger_product.png'
import naimirisProduct from '../assets/images/naimiris_premium.png'

export const DEFAULT_PRODUCTS = [
  {
    id: 'ginger',
    name: 'Ceylon Ginger',
    sinhala: 'ඉඟුරු',
    tagline: 'Zesty, Warm & Intensely Aromatic',
    description: {
      EN: 'Ceylon Ginger (Zingiber officinale) is renowned for its high fiber content and intense gingerol concentration, delivering a sharper, sweeter, and more pungent kick than mass-produced Chinese ginger. Grown organically in wet-zone forest gardens, it is a staple in wellness remedies and culinary masterpieces alike.',
      SI: 'ශ්‍රී ලංකාවට ආවේණික දේශීය ඉඟුරු (Zingiber officinale) එහි ඇති ඉහළ කෙඳි ප්‍රමාණය සහ අධික ජින්ජරෝල් ප්‍රතිශතය හේතුවෙන් සුවිශේෂී ප්‍රබල සැරකින් සහ සුවඳකින් යුක්ත වේ. දේශීය වෙදකමට මෙන්ම ආහාර රසවත් කිරීමටද බහුලව භාවිත කෙරේ.'
    },
    image: gingerProduct,
    color: 'var(--clr-ginger)',
    grades: [
      { 
        name: 'Premium Dried Root', 
        desc: {
          EN: 'Premium dried whole ginger roots. Carefully washed, sun-dried, and hand-sorted. Highly concentrated flavor, ideal for brewing and culinary applications.',
          SI: 'ප්‍රමිතියෙන් උසස් වියළි ඉඟුරු අල. හොඳින් සෝදා, අව්වේ වියළා පිරිසිදු කර ඇති අතර, තේ සහ ආහාර රසවත් කිරීමට කදිම වේ.'
        }, 
        basePriceUSD: 16 
      },
      { 
        name: 'Organic Ginger Powder', 
        desc: {
          EN: 'Finely milled from select organic ginger. Sharp, warming spice with no additives. Perfect for baking, smoothies, and herbal tea blends.',
          SI: 'උසස්ම තත්ත්වයේ කාබනික ඉඟුරු කුඩු. කිසිදු රසායනික ද්‍රව්‍යයක් අඩංගු නොවන අතර, රසකැවිලි සහ ඖෂධීය පාන වර්ග සඳහා සෑදීමට සුදුසුය.'
        }, 
        basePriceUSD: 12 
      },
      { 
        name: 'Ginger Essential Oil', 
        desc: {
          EN: 'Pure steam-distilled ginger root essential oil. Rich in bioactive gingerols. Heavily used in aroma therapies, cosmetics, and wellness supplements.',
          SI: 'හුමාල ආසවනයෙන් නිස්සාරණය කරන ලද 100% පිරිසිදු ඉඟුරු තෙල්. ආලේපන සහ සුවඳ විලවුන් නිෂ්පාදනය සඳහා බහුලව යොදාගනී.'
        }, 
        basePriceUSD: 35 
      },
      { 
        name: 'Fresh Green Ginger', 
        desc: {
          EN: 'Freshly harvested local ginger rhizomes. Juicy, fibrous, and packed with zesty flavor. Best for immediate kitchen prep and juice extracts.',
          SI: 'අලුතින්ම නෙලාගත් නැවුම් අමු ඉඟුරු. යුෂ පිරුණු, ප්‍රබල සැර සහ ගුණාත්මක බවින් ඉහළම දේශීය ඉඟුරු වේ.'
        }, 
        basePriceUSD: 6 
      },
    ],
    certifications: ['USDA Organic', 'SLS Certified', 'ISO 22000'],
    active: true,
    pitch: {
      title: {
        EN: 'Why Choose Ceylon Local Ginger?',
        SI: 'දේශීය ලංකා ඉඟුරු තෝරාගත යුත්තේ ඇයි?'
      },
      text: {
        EN: 'Ceylon Local Ginger is the crown jewel of ginger cultivars. Physically smaller and highly concentrated, it contains a significantly higher ratio of natural oleoresin and active [6]-gingerol compared to bulky water-rich Chinese or Indian varieties. This yields an intensely fiery, aromatic, and woody flavor with deep therapeutic value. Cultivated sustainably by smallholder farmer collectives under GlobalG.A.P. standards, our ginger guarantees maximum flavor extraction with absolute pesticide-free purity. A perfect fit for gourmet food formulation, high-end confectionery, organic teas, and premium botanical brewing.',
        SI: 'දේශීය ලංකා ඉඟුරු යනු ඉඟුරු ප්‍රභේද අතර ඇති විශිෂ්ටතම ප්‍රභේදයයි. ප්‍රමාණයෙන් කුඩා වුවද, චීන හෝ ඉන්දියානු ප්‍රභේදවලට වඩා ඉහළ ක්‍රියාකාරී [6]-ජින්ජරෝල් ප්‍රමාණයක් මෙහි අඩංගු වේ. මෙය සුවිශේෂී සුවඳක් සහ සෞඛ්‍යමය වටිනාකමක් ගෙනදෙයි. GlobalG.A.P. ප්‍රමිතීන්ට අනුව කාබනිකව වගා කරන අපගේ ඉඟුරු, වෛද්‍ය සහ රසකැවිලි නිෂ්පාදන සඳහා ඉහළම ගුණාත්මක බව සහතික කරයි.'
      }
    },
    specifications: [
      { 
        label: { EN: 'Cultivars', SI: 'ප්‍රභේද' }, 
        value: { 
          EN: 'Local (highly pungent, fibrous), Chinese (large, low fiber), Rangoon (medium).', 
          SI: 'දේශීය (ඉහළ සැර, තන්තුමය), චීන (විශාල, අඩු තන්තු), රන්ගූන් (මධ්‍යම).' 
        } 
      },
      { 
        label: { EN: 'Key Advantage', SI: 'ප්‍රධාන වාසිය' }, 
        value: { 
          EN: "Extremely high [6]-gingerol content in 'Local Ginger'.", 
          SI: "'දේශීය ඉඟුරු' වල ඉතා ඉහළ [6]-ජින්ජරෝල් අන්තර්ගතය." 
        } 
      },
      { 
        label: { EN: 'Moisture Target', SI: 'තෙතමනය ඉලක්කය' }, 
        value: { 
          EN: 'Around 12% for export-grade dried ginger.', 
          SI: 'අපනයන මට්ටමේ වියළි ඉඟුරු සඳහා 12% පමණ.' 
        } 
      },
      { 
        label: { EN: 'Market Position', SI: 'වෙඳපොළ ස්ථානය' }, 
        value: { 
          EN: 'Premium value-added (flakes, essential oils, organic powders).', 
          SI: 'ඉහළ වටිනාකමක් එකතු කළ (flakes, අත්‍යවශ්‍ය තෙල්, කාබනික කුඩු).' 
        } 
      }
    ]
  },
  {
    id: 'naimiris',
    name: 'Hot Dragon Nai Miris',
    sinhala: 'නයි මිරිස්',
    tagline: 'Fierce Cobra Heat & Exotic Fruity Aroma',
    description: {
      EN: 'Known as the "Cobra Chilli" (Capsicum chinense), Sri Lankan Nai Miris delivers a legendary slow-burning sting ranging between 100,000 and 350,000+ SHU. Beyond its fiery heat, it carries a signature sweet, fruity aroma that makes it irreplaceable in authentic island sambols and hot sauces.',
      SI: 'ශ්‍රී ලංකාවේ වඩාත්ම සැරැති මිරිස් වර්ගයක් වන නයි මිරිස් (Capsicum chinense) එහි ඇති සුවිශේෂී පළතුරු සුවඳ සහ දිව දවනා සැර (Scoville Heat: 100,000 - 350,000+) නිසා ලොව පුරා ප්‍රසිද්ධය. මෙය සාම්ප්‍රදායික සම්බෝල සහ සැර සෝස් වර්ග සඳහා අත්‍යවශ්‍ය වේ.'
    },
    image: naimirisProduct,
    color: 'var(--clr-naimiris)',
    grades: [
      { 
        name: 'Fresh Cobra Pods', 
        desc: {
          EN: 'Hand-picked ripe red Nai Miris pods. Extremely hot, juicy, and packed with fruity aroma. Shipped under cold chain to preserve freshness.',
          SI: 'නැවුම්ව අතින් නෙලාගත් රතු පැහැති නයි මිරිස් කරල්. ඉතා සැර වන අතර නැවුම් බව සුරක්ෂිත වන සේ ඇසුරුම් කර ඇත.'
        }, 
        basePriceUSD: 24 
      },
      { 
        name: 'Dragon Fire Flakes', 
        desc: {
          EN: 'Coarsely crushed sun-dried red chilies. Adds a high-impact heat and deep aroma to pizza, curries, and dry rubs.',
          SI: 'වියළන ලද නයි මිරිස් කෑලි. ඕනෑම ආහාරයකට ඉහළ සැරක් සහ රසයක් එක් කර ගැනීම සඳහා කදිම වේ.'
        }, 
        basePriceUSD: 18 
      },
      { 
        name: 'Cobra Chili Powder', 
        desc: {
          EN: 'Pure ground red Nai Miris. Fine texture, fiery orange-red color. Extremely potent — handle with care.',
          SI: 'වියළා අඹරන ලද පිරිසිදු නයි මිරිස් කුඩු. අධික සැරකින් යුක්ත වන බැවින් භාවිතයේදී ප්‍රවේශම් වන්න.'
        }, 
        basePriceUSD: 14 
      },
      { 
        name: 'Dragon Sauce Base', 
        desc: {
          EN: 'Concentrated mash of red Nai Miris and organic sea salt. The perfect high-heat ingredient for artisanal hot sauce manufacturers.',
          SI: 'නයි මිරිස් සහ කාබනික මුහුදු ලුණු මිශ්‍ර කර සාදන ලද පේස්ට් වර්ගයක්. සැර සෝස් වර්ග නිෂ්පාදනය සඳහා කදිම අමුද්‍රව්‍යයකි.'
        }, 
        basePriceUSD: 20 
      },
    ],
    certifications: ['Organic Cert', 'HACCP', 'GMP Approved'],
    active: true,
    pitch: {
      title: {
        EN: 'Why Choose Ceylon Nai Miris?',
        SI: 'ලංකා නයි මිරිස් තෝරාගත යුත්තේ ඇයි?'
      },
      text: {
        EN: "Unlike mass-market chillies that deliver flat, stinging heat, Ceylon Nai Miris offers a complex sensory explosion. It pairs its intense, high-concentration capsaicin (150k–350k SHU) with delicate, delayed undertones of tropical citrus and smoky fruitiness. Grown in Matale's unique microclimates and certified organic collectives, our Nai Miris provides exceptional oil extraction yields and clean, pesticide-free profiles that pass the strictest global food standards. It is the ultimate differentiator for premium hot sauces, spice blends, and luxury culinary applications.",
        SI: "සාමාන්‍ය වෙළඳපල මිරිස් මෙන් නොව, ලංකා නයි මිරිස් දැඩි සැර (150k–350k SHU) සමඟ පැඟිරි සහ පලතුරු සුවඳක් එක් කරයි. මාතලේ සුවිශේෂී දේශගුණය තුළ වගා කර ඇති අපගේ නයි මිරිස්, ගෝලීය ආහාර ප්‍රමිතීන්ට ගැලපෙන ලෙස පලිබෝධනාශක වලින් තොරව සකසා ඇත. එය උසස් තත්ත්වයේ හොට් සෝස් සහ කුළුබඩු මිශ්‍රණ සඳහා අත්‍යවශ්‍ය වේ."
      }
    },
    specifications: [
      { 
        label: { EN: 'Heat Level (SHU)', SI: 'සැර මට්ටම (SHU)' }, 
        value: { 
          EN: '150,000 – 350,000 Scoville Heat Units', 
          SI: '150,000 – 350,000' 
        } 
      },
      { 
        label: { EN: 'Sensory Profile', SI: 'සංවේදී පැතිකඩ' }, 
        value: { 
          EN: 'Intense, delayed heat with distinct fruity, citrus, and slightly smoky undertones.', 
          SI: 'පලතුරු, පැඟිරි සහ මඳ දුම් සුවඳක් සහිත දැඩි සැර.' 
        } 
      },
      { 
        label: { EN: 'Morphology', SI: 'ස්වභාවය' }, 
        value: { 
          EN: 'Folded, slightly wrinkled pods, turning vibrant red, orange, or sometimes chocolate when mature.', 
          SI: 'රැලි සහිත, පරිණත වූ විට දීප්තිමත් රතු හෝ තැඹිලි පැහැයට හැරෙන කරල්.' 
        } 
      },
      { 
        label: { EN: 'Average Export Weight', SI: 'සාමාන්‍ය බර' }, 
        value: { 
          EN: '8.4g – 8.56g per pod', 
          SI: 'කරලක් ග්‍රෑම් 8.4 – 8.56' 
        } 
      }
    ]
  }
]
