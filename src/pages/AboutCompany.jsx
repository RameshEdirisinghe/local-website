import React, { useEffect } from 'react'
import './Pages.css'

export default function AboutCompany({ language }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const t = {
    EN: {
      title: "Our Company",
      subtitle: "Heritage & Vision",
      content: [
        {
          heading: "A Boutique Export Competitor",
          text: "While global giants dominate bulk spice markets, Ceylon Spice Reserve positions itself as a boutique competitor. We do not chase immense volumes; instead, we target high-value niche markets that demand extreme quality, unique terroir profiles, and premium organic processing."
        },
        {
          heading: "GlobalG.A.P. & Certified Organic Sourcing",
          text: "For B2B contracts, particularly in European and North American markets, adhering to GlobalG.A.P. and Certified Organic standards is practically mandatory. We source strictly from collectives that meet these rigorous certifications, ensuring every shipment passes strict phytosanitary hurdles with zero synthetic pesticide residues."
        },
        {
          heading: "Value-Added Processing",
          text: "To maximize the inherent value of Sri Lankan spices like our Local Ginger and Nai Miris, our facilities focus on value-added formats. This includes meticulously dehydrated flakes, specialized hot sauces, oleoresin extractions, and premium organic powders designed for culinary and medicinal industries worldwide."
        }
      ]
    },
    SI: {
      title: "අපේ සමාගම",
      subtitle: "උරුමය සහ දැක්ම",
      content: [
        {
          heading: "සුවිශේෂී අපනයනකරුවෙක්",
          text: "ගෝලීය දැවැන්තයින් තොග කුළුබඩු වෙළඳපොලවල් ආධිපත්‍යය දරන අතර, අපගේ සමාගම සුවිශේෂී තරඟකරුවෙකු ලෙස ස්ථානගත වේ. අපි ඉහළ වටිනාකමකින් යුත් කාබනික වෙළඳපල ඉලක්ක කරමු."
        },
        {
          heading: "කාබනික ප්‍රමිතිකරණය",
          text: "B2B ගිවිසුම් සඳහා, විශේෂයෙන්ම යුරෝපීය සහ උතුරු ඇමරිකානු වෙළෙඳපොළ තුළ, GlobalG.A.P. සහ කාබනික ප්‍රමිතීන් පිළිපැදීම අනිවාර්ය වේ. අපි මෙම දැඩි සහතික සපුරාලන ගොවීන්ගෙන් පමණක් අපගේ නිෂ්පාදන ලබා ගනිමු."
        },
        {
          heading: "අගය එකතු කළ නිෂ්පාදන",
          text: "ශ්‍රී ලාංකික කුළුබඩුවල සහජ වටිනාකම උපරිම කිරීම සඳහා, අපගේ පහසුකම් අගය එකතු කළ ආකෘති කෙරෙහි අවධානය යොමු කරයි. ලොව පුරා සූපශාස්ත්‍ර හා ඖෂධ කර්මාන්ත සඳහා නිර්මාණය කර ඇති කාබනික කුඩු සහ සාරය මෙයට ඇතුළත් වේ."
        }
      ]
    }
  }[language]

  return (
    <div className="page-container animate-fade-in">
      <div className="container">
        <div className="page-header">
          <span className="section-label">{t.subtitle}</span>
          <h1 className="page-title">{t.title}</h1>
        </div>

        <div className="company-content">
          {t.content.map((section, idx) => (
            <div key={idx} className="company-section glass">
              <h3 className="company-section-title">
                {section.heading}
              </h3>
              <p className="company-section-text">
                {section.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
