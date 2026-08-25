import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Menu, ShoppingCart, ChevronRight, Heart, Home, Grid2X2, Headphones, ShieldCheck, Truck, RotateCcw, Star, ArrowRight, ArrowLeft, SlidersHorizontal, ChevronDown, Sparkles, FileText, X, Camera, Send, Upload, Phone, Mail, MessageCircle, Bell } from 'lucide-react';
import './styles.css';
import './overrides.css';
import './modern.css';
import './footer.css';
import './footer-theme.css';
import './category-modern.css';
import './search.css';
import './header-brand.css';
import './header-fixes.css';
import './category-final.css';
import './footer-professional.css';
import './bathroom-revamp.css';
import './bathroom-categories-v2.css';
import './bathroom-hero.css';
import './bathroom-lifestyle.css';
import './footer-dark.css';
import './handles-category.css';
import './handles-dynamic.css';
import './cart-flow.css';
import './cart-dk.css';
import './quote-page.css';
import './footer-v2.css';
import './departments-v2.css';
import './top-rated.css';
import './reviews-v2.css';
import './layout-safe.css';
import './checkout-prototype.css';
import './departments-v3.css';
import './footer-v3.css';
import './footer-v4.css';
import './menu-v2.css';
import './product-detail.css';
import './shop-browser.css';
import './android-preview.css';

const categories = [
  ['Marine & Boats', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/marine_and_boats.webp'],
  ['Cabinet Hardware', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/cabinet_and_furniture_gray.webp?2'],
  ['Windows & Doors', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/windows_and_doors_gray.webp?2'],
  ['Bathroom', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/bathroom_gray.webp?2'],
  ['Hospitality & Display', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/hospitality_gray.webp?2'],
  ['Automotive', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/automotive_gray.webp?2'],
  ['Hardware, Tools & Sealants', '/categories/hardware-tools-sealants-clean.png'],
  ['Security, Architectural & Storefront', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/security_architectural_storefront_gray.webp?2'],
  ['Plumbing', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/plumbing_gray.webp?2'],
  ['Electrical & Gas', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/electrical_gray.webp?2'],
  ['HVAC', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/hvac_gray.webp?2'],
  ['Outdoor & Pets', 'https://dkstatic.blob.core.windows.net/static/mainpage/cats/outdoor_pets_gray.webp?2']
];

const products = [
  { name: 'Milwaukee 2674-22C M18 Cordless Short Throw Press Tool Kit with PEX Crimp Jaws', price: '$1,159.11', old: '', image: '/products/milwaukee-2674-22c.png', tag: 'SELLING FAST', meta: 'Item #2674-22C · Milwaukee' },
  { name: 'Rust-Oleum 214944 Reflective Finish Spray Paint, Clear/Semi-Transparent, 10 oz.', price: '$45.95', old: '', image: '/products/rust-oleum-214944.png', tag: 'BULK INVENTORY', meta: 'Item #214944 · Rust-Oleum' },
  { name: 'CRL AMR205CTBS Brushed Stainless AMR Series Keyed Cylinder/Thumbturn', price: '$36.40', old: '', image: '/products/crl-amr205ctbs.png', tag: 'IN STOCK', meta: 'Item #AMR205CTBS · CRL' },
  { name: 'CRL 1006D73 Bronze 73â€ Outswing Adjustable Oak Top Threshold', price: '$327.20', old: '', image: '/products/crl-1006d73.png', tag: 'LIMITED STOCK', meta: 'Item #1006D73 · CRL' },
  { name: 'CRL Brushed Bronze No-Drill Fixed Panel Glass Clamp', price: '$17.01', old: '', image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&w=600&q=80', tag: 'BEST SELLER' },
  { name: 'Precision Replacement Molding Clip â€” Pack of 25', price: '$9.94', old: '$21.50', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80', tag: 'SAVE 53%' },
  { name: 'Milwaukee Fastback Folding Utility Knife', price: '$28.10', old: '', image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=600&q=80', tag: 'PRO PICK' }
];

const homeCatalog = products.map((product,index)=>({
  ...product,
  item: product.meta?.match(/Item #([^·]+)/)?.[1]?.trim() || `DK-${index+1}`,
  priceValue: Number(product.price.replace(/[$,]/g,'')),
  brand: product.meta?.split('·')[1]?.trim() || 'DK Hardware',
  finish: 'Standard'
}));

const brands = [
  ['Featured brand', 'https://s.dkhardware.com/images/1874281/300x300/20886.webp?2927baa04bb6c55bc83b0d3764a00395'],
  ['Featured brand', 'https://s.dkhardware.com/images/1873366/300x300/1564.webp?6e21805ab87e21c0c3d1b9b037e9fb51'],
  ['Featured brand', 'https://s.dkhardware.com/images/1942824/300x300/logo_2_1_1_.webp?b8f8e36c38d8e29b2f90f624b70bfe37'],
  ['Featured brand', 'https://s.dkhardware.com/images/1870485/300x300/73782360-af51-401e-b44a-16f937f4125e.webp?58cb9f3ab8ab6e94a579d59a7424c4f9'],
  ['Hafele', 'https://s.dkhardware.com/images/1893618/300x300/Hafele_(1).webp?8b06f440fa124836df6a21b8fca7267e'],
  ['Featured brand', 'https://s.dkhardware.com/images/1869168/300x300/2ec4c395-f0ba-4680-888f-b2282d12850e.webp?a46d19b50fa3b370d6af97d97b0289b7'],
  ['Fish Antibiotics', 'https://s.dkhardware.com/images/2590317/300x300/Fish_Antibiotics_logo.webp?4d6bb7f5ff27801d638fea50212415ba'],
  ['Kwikset', 'https://s.dkhardware.com/images/1872879/300x300/Kwikset.webp?98b9a63a1fa7ab00a0a7cdbdb17b4129'],
  ['Featured brand', 'https://s.dkhardware.com/images/1872775/300x300/22.webp?697b9349200edfc6ec8d74346aa89626']
];

const audiences = [
  ['Contractors, Builders and Manufacturers', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-1.webp'],
  ['Government & Educational', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-2.webp'],
  ['Hotels and Restaurants', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-3.webp'],
  ['Multi-Family & Property Management', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-4.webp'],
  ['Facility Maintenance', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-5.webp'],
  ['DIY Enthusiasts', 'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-6.webp']
];

const triggerPrototype = (message, panel) => window.dispatchEvent(new CustomEvent('dk-prototype-action', { detail: { message, panel } }));

const bathroomCategories = [
  'Shower Door Seals and Wipes', 'Shower Door Handles and Knobs', 'Shower Door Hinges & Hinge Replacement Parts',
  'Shower Enclosure U-Channels, Headers and Thresholds', 'Shower Door Towel Rack', 'Shower Door Accessories, Installation Supplies, and Tapes',
  'Tub Enclosure, Sliding Shower Door and Mounting Hardware', 'Shower Door Kits', 'Shower Enclosure Glass Clips, Clamps and Brackets',
  'Bathtub & Shower Repair Parts', 'Mirror Mounting', 'Shower Enclosure Headers, Support Bars, and Thresholds',
  'Bath Safety & Accessibility', 'Bathtubs & Showers', 'Bathroom Accessories', 'Storage Cabinet', 'Closeouts', 'Frameless Systems'
];

const departmentL2 = {
  'Most popular': ['Shower Door Handles and Knobs','Cabinet Handles, Knobs and Pulls','Door Closers and Accessories','Plumbing Tools','Locks and Accessories','Lighting','HVAC Filters','Marine Electrical','Power Tools'],
  'Marine & Boats': ['Boat Maintenance','Marine Electrical','Anchor and Docking','Deck Hardware','Fishing Equipment','Water Sports'],
  'Cabinet Hardware': ['Handles, Knobs and Pulls','Cabinet Hinges and Rollers','Cabinet Accessories','Drawer Slides','Furniture Hardware','Closet Hardware'],
  'Windows & Doors': ['Screen, Patio and Storm Door Hardware','Door Closers and Accessories','Commercial and Residential Door Hardware','Weatherstripping','Window Hardware','Locks and Latches'],
  'Bathroom': bathroomCategories,
  'Hospitality & Display': ['Display and Shelving Systems Hardware','Service Windows and Doors','Showcase Frames and Accessories','Crowd Control Hardware','Signs and Display Hardware','Food Service Hardware'],
  'Automotive': ['Auto Glass Tools','Replacement Components','Auto Glass Adhesives and Cleaners','Van Windows','Wipers and Washers','Body Hardware'],
  'Hardware, Tools & Sealants': ['Construction Tapes, Sealants and Adhesives','Hand Tools and Accessories','Power Tools','Fasteners','Paint Supplies','Safety Equipment'],
  'Security, Architectural & Storefront': ['Locks and Accessories','Keys and Accessories','Door Controls','Storefront Hardware','Exit Devices','Access Control'],
  'Plumbing': ['Faucet Repair Parts','Pipe, Tubing and Fittings','Appliances','Plumbing Tools','Valves','Pumps'],
  'Electrical & Gas': ['Lighting','Distribution and Breakers','Glass and Acrylic Mirror Accessories','Wiring and Cable','Switches and Outlets','Gas Equipment'],
  'HVAC': ['Heating Equipment','Service and Installation Parts','Fireplaces and Hearths','Ventilation','Air Conditioning','Filters'],
  'Outdoor & Pets': ['Pet Supplies','Lawn and Garden','Landscape','Outdoor Furniture','Grills and Outdoor Cooking','Pool and Spa']
};

const shopDepartments = [
  ['Most popular', null],
  ...categories
];

const popularShopImages = [
  categories[3][1],categories[1][1],categories[2][1],categories[8][1],categories[7][1],
  categories[9][1],categories[10][1],categories[0][1],categories[6][1]
];

const suppliedL2Images = [
  'https://s.dkhardware.com/images/968102/120x/D2811H1214-1.webp?98652d98ccef4e2c62e3e81e2f4de0e8',
  'https://s.dkhardware.com/images/1855292/120x/FP221RU19.webp?75e89e08dfc4ec9603976e4ba4619bb7',
  'https://s.dkhardware.com/images/3355678/120x/wes3700i1i1sl20-dmy.webp?9fc3066480ec9d7a1d36acefda867603',
  'https://s.dkhardware.com/images/80478/120x/kwikset-157hflsqt514-iron-black-151.webp?fe4ac5860d121ce050b5bbe2ca471524',
  'https://s.dkhardware.com/images/2646138/120x/45-91-DK-1.webp?cdeed513d492ccbb6f24772c7d9f343d'
];

const suppliedL2ImageMap = {
  'Cabinet Hinges and Rollers': suppliedL2Images[0],
  'Handles, Knobs and Pulls': suppliedL2Images[1],
  'Door Closers and Accessories': suppliedL2Images[2],
  'Locks and Accessories': suppliedL2Images[3],
  'Plumbing Tools': suppliedL2Images[4]
};

const generalL2ImagePool = [...suppliedL2Images,...categories.map(([,image])=>image)];

const bathPopular = [
  ['Shower Door Handles and Knobs', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&h=600&q=82'],
  ['Shower Door Wipes and Seals', 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=500&q=80'],
  ['Deep U-Channel for 3/8â€ and 1/2â€ Glass', 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=500&q=80'],
  ['Door Pulls, Stops, Kick Plates and Signs', 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=500&q=80'],
  ['Tubular Pull Handles', 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=500&q=80'],
  ['Wall Mount Full Back Plate Hinges', 'https://images.unsplash.com/photo-1564540583246-934409427776?auto=format&fit=crop&w=500&q=80'],
  ['Hinge Replacement Parts and Special Hardware', 'https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=600&h=600&q=82'],
  ['Towel Bars', 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=500&q=80'],
  ['Shower Panel Support Bars and Brackets', 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=600&h=600&q=82'],
  ['Robe Hooks', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&h=600&q=82'],
  ['No Drill Fixed Panel Clamps', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&h=600&q=82'],
  ['Solid Pull Handles', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&h=600&q=82'],
  ['Shower Door Knobs', 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=600&h=600&q=82']
];

const bathProducts = [
  ['Clear Polycarbonate H-Jamb 180 Degree for 3/8â€ Glass', '$25.57', bathPopular[0][1]],
  ['Polycarbonate Strike and Door H-Jamb with Vinyl Insert', '$31.26', bathPopular[1][1]],
  ['Clear Bottom Wipe with Drip Rail for Sliding Shower Doors', '$6.96', bathPopular[2][1]],
  ['Multi-Purpose Clear L Angle Jamb Seal â€” 95â€', '$16.87', bathPopular[3][1]],
  ['Clear U Seal with 90 Degree Vinyl Finseal', '$30.25', bathPopular[4][1]],
  ['Co-Extruded Bottom Wipe with Drip Rail', '$24.25', bathPopular[5][1]]
];

const showerHandleCategories = [
  'Acrylic Pull Handles',
  'Bathroom Kits',
  'Common Replacement Parts for Various CRL Handles',
  'Door Pulls, Stops, Kick Plates and Signs',
  'Ladder Pull Towel Bars',
  'Shower Door Knobs',
  'Solid Pull Handle Replacement Parts',
  'Solid Pull Handles',
  'Tubular Pull Handles'
];

const showerHandleCategoryImages = {
  'Acrylic Pull Handles': 'https://s.dkhardware.com/images/1778490/500x500/HA10BTBBN.webp?5dc32aa35d4a2b0b3519742d50a377ab',
  'Bathroom Kits': 'https://s.dkhardware.com/images/1791613/300x300/7462328_e1a4.webp?e1a4a5557631a68899d155d24fdea7b8',
  'Common Replacement Parts for Various CRL Handles': 'https://s.dkhardware.com/images/1804039/300x300/30SKBN.webp?ee766fe15be8bb4b65b8fe572a217042',
  'Door Pulls, Stops, Kick Plates and Signs': 'https://s.dkhardware.com/images/1411394/300x300/1200Wx1200H.webp?dc46b9616f824d7bb5e84703acef27da',
  'Ladder Pull Towel Bars': 'https://s.dkhardware.com/images/1779534/300x300/TBL18BTBMB-1.webp?cd6e5070437fcb0e443bb647b65719eb',
  'Shower Door Knobs': 'https://s.dkhardware.com/images/1519637/300x300/SDK100ULBR-DK-1.webp?101ea495cdf9e2995999fd66a0bf7d44',
  'Solid Pull Handle Replacement Parts': 'https://s.dkhardware.com/images/1553150/300x300/30WKCH.webp?b18170b510897c77cd4b170c571bc5bb',
  'Solid Pull Handles': 'https://s.dkhardware.com/images/1533348/300x300/SDPR6BL-DK-2.webp?40cc21efc6910c3288d7ab6cc59762d7',
  'Tubular Pull Handles': 'https://s.dkhardware.com/images/1552466/500x500/BM8X8SB-MPN-DK-1.webp?5fa08e92e976be3a4dc0116987859ae2'
};

const showerHandleProducts = [
  ['CRL Back-to-Back Acrylic Pull Handle', 'HA10BTBBN', '$84.60', showerHandleCategoryImages['Acrylic Pull Handles']],
  ['CRL Complete Shower Door Handle Kit', '7462328', '$129.95', showerHandleCategoryImages['Bathroom Kits']],
  ['CRL Shower Door Handle Replacement Kit', '30SKBN', '$36.48', showerHandleCategoryImages['Common Replacement Parts for Various CRL Handles']],
  ['CRL Commercial Door Pull Handle', '1200', '$118.72', showerHandleCategoryImages['Door Pulls, Stops, Kick Plates and Signs']],
  ['CRL Ladder Pull Towel Bar', 'TBL18BTBMB', '$196.40', showerHandleCategoryImages['Ladder Pull Towel Bars']],
  ['CRL Shower Door Knob', 'SDK100ULBR', '$41.25', showerHandleCategoryImages['Shower Door Knobs']],
  ['CRL Washer Kit for Pull Handles', '30WKCH', '$18.96', showerHandleCategoryImages['Solid Pull Handle Replacement Parts']],
  ['CRL Solid Pull Handle', 'SDPR6BL', '$74.50', showerHandleCategoryImages['Solid Pull Handles']],
  ['CRL Back-to-Back Tubular Pull Handle', 'BM8X8SB', '$92.30', showerHandleCategoryImages['Tubular Pull Handles']]
];

const showerKnobProducts = [
  { name:'CRL Square Shower Door Knob', item:'SDK100ULBR', price:41.25, brand:'CRL', finish:'Chrome', image:showerHandleCategoryImages['Shower Door Knobs'] },
  { name:'CRL Back-to-Back Shower Door Knob', item:'30SKBN', price:36.48, brand:'CRL', finish:'Matte Black', image:showerHandleCategoryImages['Common Replacement Parts for Various CRL Handles'] },
  { name:'FHC Round Glass Shower Door Knob', item:'FHK100BN', price:52.80, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Bathroom Kits'] },
  { name:'CRL Solid Brass Shower Door Knob', item:'SDK6SB', price:74.50, brand:'CRL', finish:'Satin Brass', image:showerHandleCategoryImages['Solid Pull Handles'] },
  { name:'Hafele Contemporary Shower Door Knob', item:'HF30CH', price:64.90, brand:'Hafele', finish:'Chrome', image:showerHandleCategoryImages['Solid Pull Handle Replacement Parts'] },
  { name:'FHC Oil Rubbed Bronze Door Knob', item:'FHK8ORB', price:58.35, brand:'FHC', finish:'Oil Rubbed Bronze', image:showerHandleCategoryImages['Tubular Pull Handles'] },
  { name:'CRL Polished Brass Shower Knob', item:'SDK100PB', price:48.20, brand:'CRL', finish:'Polished Brass', image:showerHandleCategoryImages['Acrylic Pull Handles'] },
  { name:'Hafele Brushed Nickel Glass Door Knob', item:'HF32BN', price:69.75, brand:'Hafele', finish:'Brushed Nickel', image:showerHandleCategoryImages['Door Pulls, Stops, Kick Plates and Signs'] },
  { name:'FHC Classic Back-to-Back Shower Knob', item:'FHC100BN', price:46.25, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Shower Door Knobs'] },
  { name:'FHC Low-Profile Round Glass Knob', item:'FHC125BN', price:39.80, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Common Replacement Parts for Various CRL Handles'] },
  { name:'FHC Contemporary Square Shower Knob', item:'FHC200BN', price:57.40, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Solid Pull Handles'] },
  { name:'FHC Twin-Grip Frameless Door Knob', item:'FHC225BN', price:61.95, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Tubular Pull Handles'] },
  { name:'FHC Compact Glass Door Knob', item:'FHC250BN', price:43.65, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Acrylic Pull Handles'] },
  { name:'FHC Commercial Shower Door Knob', item:'FHC275BN', price:68.10, brand:'FHC', finish:'Brushed Nickel', image:showerHandleCategoryImages['Door Pulls, Stops, Kick Plates and Signs'] }
];

const showerKnobBrands = [
  ['CRL', 'https://s.dkhardware.com/images/1869168/300x300/2ec4c395-f0ba-4680-888f-b2282d12850e.webp?a46d19b50fa3b370d6af97d97b0289b7'],
  ['FHC', 'https://s.dkhardware.com/images/1942824/300x300/logo_2_1_1_.webp?b8f8e36c38d8e29b2f90f624b70bfe37'],
  ['Hafele', 'https://s.dkhardware.com/images/1893618/300x300/Hafele_(1).webp?8b06f440fa124836df6a21b8fca7267e']
];

const promotions = [
  { eyebrow: 'LABOR DAY SALE', title: 'Project savings are here.', copy: 'Save on selected hardware and tools.', action: 'Shop the sale', image: '/banners/labor-day-sale.jpg', tone: 'red' },
  { eyebrow: 'CUSTOM QUOTES', title: 'Better pricing for bigger jobs.', copy: 'Send your list. Weâ€™ll handle the quote.', action: 'Request a quote', image: '/banners/custom-quotes.jpg', tone: 'blue' },
  { eyebrow: 'BUSINESS BENEFITS', title: 'Built for volume purchasing.', copy: 'Volume pricing and business payment options.', action: 'Learn more', image: '/banners/volume-purchasing.jpg', tone: 'navy' },
  { eyebrow: 'EXPERT SUPPORT', title: 'Find the right part, faster.', copy: 'Talk with a hardware specialist.', action: 'Contact an expert', image: '/banners/expert-support.jpg', tone: 'dark' }
];

const androidPromotions = [
  { eyebrow:'LABOR DAY EVENT', title:'Save $45 sitewide.', copy:'Limited-time savings on select hardware and tools.', action:'Shop the event', image:'/banners/labor-day-sale.jpg', theme:'labor', target:'shop' },
  { eyebrow:'DK PROJECT DESK', title:'Send the list. We handle the rest.', copy:'Volume pricing and sourcing support for commercial projects.', action:'Request a quote', image:'/banners/custom-quotes.jpg', theme:'quote', target:'quote' },
  { eyebrow:'BUSINESS PURCHASING', title:'Net 30 for qualified businesses.', copy:'Flexible terms designed for professional purchasing teams.', action:'Explore terms', image:'/banners/volume-purchasing.jpg', theme:'terms', target:'quote' },
  { eyebrow:'HARDWARE SPECIALISTS', title:'Find the right part faster.', copy:'Get product guidance from real hardware experts.', action:'Talk to support', image:'/banners/expert-support.jpg', theme:'support', target:'support' },
  { eyebrow:'BATHROOM HARDWARE', title:'Built for cleaner installations.', copy:'Shop handles, knobs, seals and frameless shower hardware.', action:'Shop bathroom', image:'https://dkstatic.blob.core.windows.net/static/mainpage/audience-segment-6.webp', theme:'bath', target:'bathroom' },
  { eyebrow:'FAST-MOVING INVENTORY', title:'Popular picks for project teams.', copy:'Frequently ordered products, ready for professional jobs.', action:'View products', image:'/products/milwaukee-2674-22c.png', theme:'products', target:'knobs' }
];
function PromoCarousel() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, x: 0 });
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setSlide(current => (current + 1) % promotions.length), 5500);
    return () => clearInterval(timer);
  }, [paused]);
  const finishDrag = event => {
    if (!drag.current.active) return;
    const distance = event.clientX - drag.current.x;
    if (Math.abs(distance) > 45) setSlide(current => distance < 0 ? (current + 1) % promotions.length : (current - 1 + promotions.length) % promotions.length);
    drag.current.active = false;
    setPaused(false);
  };
  const currentPromotion = promotions[slide];
  return <section className="promo-carousel" onPointerDown={event => { drag.current = { active: true, x: event.clientX }; setPaused(true); }} onPointerUp={finishDrag} onPointerCancel={finishDrag} onPointerLeave={finishDrag}>
    <div className="promo-track"><article className={`promo-slide promo-${currentPromotion.tone}`} key={currentPromotion.title}><img src={currentPromotion.image} alt="" draggable="false" loading="eager" fetchPriority="high"/><div className="promo-copy"><span>{currentPromotion.eyebrow}</span><h1>{currentPromotion.title}</h1><p>{currentPromotion.copy}</p><button onClick={()=>triggerPrototype(currentPromotion.action,currentPromotion.action.toLowerCase().includes('quote')?'quote':null)}>{currentPromotion.action} <ArrowRight/></button></div></article></div>
    <div className="promo-dots">{promotions.map((item,index)=><button className={index===slide?'active':''} onClick={event=>{event.stopPropagation();setSlide(index)}} aria-label={`Show promotion ${index+1}`} key={item.title}></button>)}</div>
  </section>;
}

function BathroomHeroCarousel() {
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(true);
  const drag = useRef({ active: false, x: 0 });
  useEffect(() => {
    const timer = setInterval(() => setSlide(current => current + 1), 5000);
    return () => clearInterval(timer);
  }, []);
  const finishLoop = () => {
    if (slide !== 2) return;
    setTransitioning(false);
    setSlide(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setTransitioning(true)));
  };
  const finishDrag = event => {
    if (!drag.current.active) return;
    const distance = event.clientX - drag.current.x;
    if (Math.abs(distance) > 35) setSlide(current => current + 1);
    drag.current.active = false;
  };
  return <section className="bath-hero-carousel" onPointerDown={event => { drag.current = { active: true, x: event.clientX }; }} onPointerUp={finishDrag} onPointerCancel={finishDrag} onPointerLeave={finishDrag}>
    <div className="bath-hero-track" onTransitionEnd={finishLoop} style={{ transform: `translateX(-${slide * 100}%)`, transition: transitioning ? undefined : 'none' }}>
      <article className="bath-intro bath-hero bath-lifestyle-hero"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=88" alt="Modern bathroom interior"/><div><h1>Bathroom Hardware</h1><p>Hardware and parts for showers, enclosures, and bathroom projects.</p></div></article>
      <article className="bath-hero-sale"><img src="/banners/labor-day-sale.jpg" alt="Labor Day sale on selected hardware and tools"/><div className="bath-sale-copy"><h2>Project savings are here.</h2><p>Save on selected hardware and tools.</p></div></article>
      <article className="bath-intro bath-hero bath-lifestyle-hero" aria-hidden="true"><img src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=88" alt=""/><div><h1>Bathroom Hardware</h1><p>Hardware and parts for showers, enclosures, and bathroom projects.</p></div></article>
    </div>
    <div className="bath-hero-dots">{[0,1].map(index => <button key={index} className={slide % 2 === index ? 'active' : ''} onClick={() => { if (slide % 2 !== index) setSlide(current => current + 1); }} aria-label={`Show banner ${index + 1}`}></button>)}</div>
  </section>;
}

function SearchBar({ context = '' }) {
  const [mode, setMode] = useState('search');
  const [query, setQuery] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const phrases = mode === 'ai' ? ['Which hinge fits my glass door?', 'Help me identify this hardware', 'What do I need for my project?'] : [context ? `Search ${context}` : 'Search by product name', 'Try a part number: 2674-22C', 'Search brands, categories, or UPC'];
  const phrase = phrases[phraseIndex % phrases.length];
  useEffect(() => {
    const complete = characterIndex >= phrase.length;
    const timer = setTimeout(() => {
      if (complete) { setCharacterIndex(0); setPhraseIndex(index => (index + 1) % phrases.length); }
      else setCharacterIndex(index => index + 1);
    }, complete ? 1500 : 58);
    return () => clearTimeout(timer);
  }, [characterIndex, phrase, phrases.length]);
  const changeMode = nextMode => { setMode(nextMode); setCharacterIndex(0); setPhraseIndex(0); };
  return <div className={`search search-v2 ${mode === 'ai' ? 'ai-search' : ''}`}><span className="search-leading">{mode === 'ai' ? <Sparkles/> : <Search/>}</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={`${phrase.slice(0,characterIndex)}${characterIndex < phrase.length ? '|' : ''}`} aria-label={mode === 'ai' ? 'Ask DK AI' : 'Search products'}/><div className="search-modes"><button className={mode==='search'?'active':''} onClick={()=>changeMode('search')}>Search</button><button className={mode==='ai'?'active':''} onClick={()=>changeMode('ai')}><Sparkles/> AI</button></div></div>;
}

function MobileHeader({ back, onHome, title, cartCount = 0, onCart }) {
  return <header className="header category-header">
    <div className="top-row">{back ? <button className="icon-button" onClick={back} aria-label="Back"><ArrowLeft/></button> : <button className="icon-button" onClick={()=>triggerPrototype('Menu opened','menu')}><Menu/></button>}<a className="logo" href="#" onClick={event=>{event.preventDefault();if(onHome)onHome();else if(back)back()}} aria-label="DK Hardware home"><img className="dk-main-logo" src="https://dkstatic.blob.core.windows.net/static/dkh/dkhardware-logo.svg" alt="DK Hardware"/><img className="years-badge" src="https://dkstatic.blob.core.windows.net/static/icons/20-years-badge.svg" alt="Celebrating 20 years"/></a><div className="header-actions"><button className="icon-button cart-icon" onClick={onCart||(()=>triggerPrototype('Your cart is empty'))} aria-label={`Cart with ${cartCount} items`}><ShoppingCart/>{cartCount>0&&<i>{cartCount}</i>}</button></div></div>
    <SearchBar context={title}/>
  </header>;
}

function SiteFooter() {
  const groups = [
    ['Customer service', ['Contact us', 'Returns', 'Shipping', 'FAQ', 'Secure shopping']],
    ['Shop DK', ['All departments', 'All brands', 'Business accounts', 'Request a quote']],
    ['Policies', ['Privacy policy', 'Terms of use', 'Accessibility']],
    ['About DK', ['About us', 'Locations', 'Careers', 'Customer reviews']]
  ];
  return <footer className="site-footer"><div className="footer-brand"><img src="https://dkstatic.blob.core.windows.net/static/dkh/dkhardware-logo.svg" alt="DK Hardware"/><p>Hardware solutions for every project.</p></div><div className="footer-contact"><a href="tel:+18775098040"><Phone/><span><b>Call us</b><small>+1 877 509 8040</small></span></a><a href="mailto:sales@dkhardware.com"><Mail/><span><b>Email us</b><small>Sales and support</small></span></a></div><form className="footer-signup" onSubmit={event=>{event.preventDefault();triggerPrototype('Thanks â€” you are signed up')}}><h3>Get deals and product updates</h3><div><input required type="email" placeholder="Email address" aria-label="Email address"/><button>Sign up</button></div></form><div className="footer-links">{groups.map(([title,links])=><details key={title}><summary>{title}<ChevronDown/></summary><div>{links.map(link=><a href="#" onClick={event=>{event.preventDefault();triggerPrototype(`${link} selected`,link==='Request a quote'?'quote':null)}} key={link}>{link}</a>)}</div></details>)}</div><div className="footer-bottom"><span>Â© 2026 DK Hardware Supply</span><span>Secure payments</span></div></footer>;
}

function MenuDrawer({onClose,onHome,onQuote,setPanel}) { const open=(message,panel)=>{onClose();if(panel==='home'&&onHome)onHome();else if(panel==='quote'&&onQuote)onQuote();else if(panel)setPanel(panel);else triggerPrototype(message)}; const rows=[['All departments','Browse every hardware department','home','arrow'],['Shop by room','Find products by project space',null,'arrow'],['All manufacturers','Browse manufacturer directory'],['All brands','Explore DK Hardware brands'],['About DK','Company information'],['Submit quote','Request volume and project pricing','quote'],['Submit PO','Send a purchase order'],['DK Net Terms','Apply for business payment terms'],['Quick order form','Order quickly with item numbers'],['Knowledge center','Guides, resources, and product help'],['Clearance','Shop current clearance deals',null,'clearance'],['Live chat','Chat with a hardware specialist','support','support'],['24/7 help','Call or email the DK support team','support','support'],['Account / registration','Business account access']]; return <aside className="app-tool-panel menu-panel menu-panel-v2"><div className="menu-v2-head"><div><span>MENU</span><h2>Build every project better.</h2></div><button onClick={onClose} aria-label="Close menu"><X/></button></div><div className="menu-v2-list">{rows.map(([label,sub,panel,tone])=><button className={tone==='clearance'?'menu-clearance':''} key={label} onClick={()=>open(label,panel)}><span><b>{label}</b>{sub&&<small>{sub}</small>}</span>{tone==='support'?<Headphones/>:<ChevronRight/>}</button>)}</div><div className="menu-v2-business"><FileText/><span><b>Ordering for a business?</b><small>Get volume pricing and dedicated project support.</small></span><button onClick={()=>open('Submit quote','quote')}>Get a quote</button></div></aside>; }

function AppNav({ active = 'home', onHome, onCart, onQuote, onShopCategory, cartCount = 0 }) {
function ShopBrowser({onClose,onSelect}) {
  const [active,setActive] = useState('Most popular');
  const items = departmentL2[active] || [];
  const departmentIndex = Math.max(0,shopDepartments.findIndex(([name])=>name===active));
  const categoryImage = (item,index) => {
    if (suppliedL2ImageMap[item]) return suppliedL2ImageMap[item];
    if (active === 'Bathroom') return bathPopular[index % bathPopular.length][1];
    if (active === 'Most popular') return popularShopImages[index % popularShopImages.length];
    return generalL2ImagePool[(departmentIndex * 3 + index) % generalL2ImagePool.length];
  };
  return <aside className="app-tool-panel shop-browser-panel">
    <header><div><h2>Shop departments</h2><p>Browse products by category</p></div><button onClick={onClose} aria-label="Close departments"><X/></button></header>
    <div className="shop-browser-body">
      <nav className="shop-l1-list" aria-label="Departments">{shopDepartments.map(([name,image])=><button className={active===name?'active':''} key={name} onClick={()=>setActive(name)}>{image?<img src={image} alt=""/>:<span className="popular-star"><Star/></span>}<b>{name}</b></button>)}</nav>
      <section className="shop-l2-panel">
        <h3>{active}</h3>
        <button className="shop-all-link" onClick={()=>onSelect(active,`All ${active}`)}>Shop all <ChevronRight/></button>
        <div className="shop-l2-grid">{items.map((item,index)=><button key={item} onClick={()=>onSelect(active,item)}><span><img src={categoryImage(item,index)} alt=""/></span><b>{item}</b></button>)}</div>
      </section>
    </div>
  </aside>;
}

  const [panel, setPanel] = useState(null);
  const [question, setQuestion] = useState('');
  const [asked, setAsked] = useState(false);
  const [fileName, setFileName] = useState('');
  const [quoteType, setQuoteType] = useState('Volume order');
  const [notice, setNotice] = useState('');
  useEffect(()=>{
    const handleAction = event => { if(event.detail?.panel==='quote'&&onQuote)onQuote();else if(event.detail?.panel)setPanel(event.detail.panel); if(event.detail?.message){setNotice(event.detail.message);setTimeout(()=>setNotice(''),1800);} };
    window.addEventListener('dk-prototype-action',handleAction);
    return ()=>window.removeEventListener('dk-prototype-action',handleAction);
  },[onQuote]);
  return <>
    {panel && <div className="tool-backdrop" onClick={() => setPanel(null)}></div>}
    {panel === 'shop' && <ShopBrowser onClose={()=>setPanel(null)} onSelect={(department,item)=>{setPanel(null);if(onShopCategory)onShopCategory(department,item);else triggerPrototype(`${item} selected`)}}/>}
    {panel === 'ai' && <aside className="app-tool-panel ai-panel">
      <div className="tool-panel-head"><div><span><Sparkles/> DK AI</span><h2>How can we help?</h2></div><button onClick={() => setPanel(null)}><X/></button></div>
      <div className="ai-conversation">{asked ? <><div className="user-message">{question || 'Help me identify this hardware.'}{fileName && <small>ðŸ“Ž {fileName}</small>}</div><div className="ai-message"><Sparkles/><p>I can help identify parts, compare products, or plan your project. This prototype is ready to connect to the DK AI service.</p></div></> : <div className="ai-welcome"><Sparkles/><h3>Ask DK Hardware AI</h3><p>Find a part, solve a project problem, or upload a photo to identify hardware.</p><div><button onClick={() => setQuestion('What hardware do I need for a frameless shower door?')}>Plan a project</button><button onClick={() => setQuestion('Help me find a replacement part')}>Find a part</button></div></div>}</div>
      <div className="ai-composer">{fileName && <span className="file-chip"><Camera/> {fileName}<button onClick={() => setFileName('')}><X/></button></span>}<div><label aria-label="Upload image"><Upload/><input type="file" accept="image/*" onChange={e => setFileName(e.target.files?.[0]?.name || '')}/></label><textarea value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Ask a question or upload a photo..."/><button className="send" onClick={()=>{if(question || fileName)setAsked(true)}}><Send/></button></div><small>AI can make mistakes. Verify important product details.</small></div>
    </aside>}
    {panel === 'support' && <aside className="app-tool-panel support-panel"><div className="tool-panel-head"><div><span><Headphones/> CUSTOMER SUPPORT</span><h2>Talk to a real person</h2></div><button onClick={() => setPanel(null)}><X/></button></div><div className="support-intro"><p>Our hardware specialists can help with product selection, availability, volume orders, and project questions.</p><small>MONâ€“FRI · 8:00 AMâ€“6:00 PM EST</small></div><div className="support-actions"><a href="tel:+18775098040" className="primary-support"><Phone/><span><b>Call sales & support</b><small>+1 877 509 8040</small></span><ChevronRight/></a><a href="mailto:sales@dkhardware.com"><Mail/><span><b>Email our team</b><small>For orders and project questions</small></span><ChevronRight/></a><button onClick={() => setPanel('ai')}><Sparkles/><span><b>Ask DK AI</b><small>Identify a part or ask a quick question</small></span><ChevronRight/></button></div><div className="account-help"><ShieldCheck/><p><b>Business account support</b><br/>Need payment terms or volume pricing? Request a custom quote and our team will follow up.</p></div></aside>}
    {panel === 'quote' && <aside className="app-tool-panel quote-panel quote-panel-v2"><div className="tool-panel-head"><div><span><FileText/> DK BUSINESS</span><h2>Get project pricing</h2></div><button onClick={() => setPanel(null)}><X/></button></div><div className="quote-promise"><div><ShieldCheck/><span><b>Built for business orders</b><small>Volume pricing and dedicated project support</small></span></div><small>RESPONSE WITHIN 1 BUSINESS DAY</small></div><form onSubmit={e=>{e.preventDefault();setPanel('thanks')}}><fieldset><legend>What can we quote?</legend><div className="quote-types">{['Volume order','Project list','Hard-to-find part'].map(type=><button type="button" className={quoteType===type?'selected':''} onClick={()=>setQuoteType(type)} key={type}>{type}</button>)}</div></fieldset><div className="field-row"><label>Company<input required placeholder="Company name"/></label><label>Your name<input required placeholder="Full name"/></label></div><div className="field-row"><label>Work email<input required type="email" placeholder="name@company.com"/></label><label>Phone<input required placeholder="Phone number"/></label></div><label>Products and quantities<textarea required placeholder="Paste item numbers, quantities, or describe your project..."/></label><label className="quote-upload"><span><Upload/><b>Attach product list or photos</b></span><small>PDF, spreadsheet, JPG or PNG</small><input type="file" multiple/></label><button className="quote-submit">Request my quote <ArrowRight/></button><p className="quote-privacy">Your information is shared only with the DK project team.</p></form></aside>}
    {panel === 'thanks' && <aside className="app-tool-panel thanks-panel"><button className="thanks-close" onClick={()=>setPanel(null)}><X/></button><div><ShieldCheck/><h2>Request received</h2><p>Thanks! A DK Hardware project specialist will contact you shortly.</p><button onClick={()=>setPanel(null)}>Done</button></div></aside>}
    {panel === 'menu' && <MenuDrawer onClose={()=>setPanel(null)} onHome={onHome} onQuote={onQuote} setPanel={setPanel}/>}
    {notice&&<div className="prototype-toast">{notice}</div>}
    <nav className="bottom-nav"><button className={active==='home'?'active':''} onClick={onHome}><Home/><span>Home</span></button><button className={panel==='shop'||active==='shop'?'active':''} onClick={()=>setPanel('shop')}><Grid2X2/><span>Shop</span></button><button className={active==='quote'?'active':''} onClick={onQuote||(()=>setPanel('quote'))}><FileText/><span>Get Quote</span></button><button onClick={()=>setPanel('support')}><Headphones/><span>Support</span></button><button onClick={onCart||(()=>setNotice('Your cart is empty'))} className={active==='cart'?'active':''}><span className="nav-cart-icon"><ShoppingCart/>{cartCount>0&&<i>{cartCount}</i>}</span><span>Cart</span></button></nav>
  </>;
}

function BathroomPage({ onBack, onOpenHandles, onQuote }) {
  const subcategoryRail = useRef(null);
  const [bathSaved,setBathSaved] = useState([]);
  const [bathCart,setBathCart] = useState([]);
  const [bathQuantities,setBathQuantities] = useState({});
  const [bathCommerceStep,setBathCommerceStep] = useState(null);
  const [bathJustAdded,setBathJustAdded] = useState(null);
  const [descriptionExpanded,setDescriptionExpanded] = useState(false);
  const subcategoryDrag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const startSubcategoryDrag = event => { if(event.pointerType === 'touch') return; subcategoryDrag.current = { active: true, startX: event.clientX, scrollLeft: subcategoryRail.current.scrollLeft }; };
  const moveSubcategoryDrag = event => { if(subcategoryDrag.current.active) subcategoryRail.current.scrollLeft = subcategoryDrag.current.scrollLeft - (event.clientX - subcategoryDrag.current.startX); };
  const endSubcategoryDrag = () => { subcategoryDrag.current.active = false; };
  const bathCatalog = bathProducts.map(([name,price,image],index)=>({name,item:`BATH-${String(index+1).padStart(3,'0')}`,price:Number(price.replace(/[$,]/g,'')),image,brand:'CRL',finish:'Multiple finishes'}));
  const bathCartProducts = bathCatalog.filter(product=>bathCart.includes(product.item));
  const bathCartTotal = bathCartProducts.reduce((total,product)=>total+product.price*(bathQuantities[product.item]||1),0);
  const bathCartCount = bathCartProducts.reduce((total,product)=>total+(bathQuantities[product.item]||1),0);
  const addBathProduct = product => { setBathCart(items=>items.includes(product.item)?items:[...items,product.item]);setBathQuantities(current=>({...current,[product.item]:(current[product.item]||0)+1}));setBathJustAdded(product);setBathCommerceStep('added'); };
  const updateBathQuantity = (item,change) => setBathQuantities(current=>({...current,[item]:Math.max(1,(current[item]||1)+change)}));
  const removeBathItem = item => { setBathCart(items=>items.filter(value=>value!==item));setBathQuantities(current=>{const next={...current};delete next[item];return next}) };
  return <main className="stage">
    <div className="phone-shell"><div className="speaker"></div><div className="app">
      <MobileHeader back={onBack} onHome={onBack} title="Bathroom Hardware"/>
      <div className="app-content category-page-content">
        <div className="crumbs"><button onClick={onBack}>Home</button><ChevronRight/> <b>Bathroom Hardware</b></div>
        <BathroomHeroCarousel/>
        <section className="bath-popular"><div className="section-title"><h2>Most popular subcategories</h2><button onClick={()=>{subcategoryRail.current.scrollTo({left:subcategoryRail.current.scrollWidth,behavior:'smooth'})}}>See all</button></div><div className="bath-subcat-rail" ref={subcategoryRail} onPointerDown={startSubcategoryDrag} onPointerMove={moveSubcategoryDrag} onPointerUp={endSubcategoryDrag} onPointerLeave={endSubcategoryDrag} onPointerCancel={endSubcategoryDrag}>{bathPopular.map(([name,image])=><button className="bath-subcat" key={name} onClick={() => { if (name === 'Shower Door Handles and Knobs') onOpenHandles(); else triggerPrototype(`${name} selected`); }}><img src={image} alt="" draggable="false"/><b>{name}</b></button>)}</div></section>
        <section className="bath-products"><div className="section-title"><div><small>POPULAR NOW</small><h2>Best-selling bathroom hardware</h2></div><button className="filter" onClick={()=>triggerPrototype('Bathroom filters opened')}><SlidersHorizontal/> Filter</button></div><div className="bath-product-grid">{bathCatalog.map(product=><article className="bath-product" key={product.item} onClick={()=>triggerPrototype(`${product.name} opened`)}><button className={`heart ${bathSaved.includes(product.item)?'saved':''}`} onClick={event=>{event.stopPropagation();setBathSaved(items=>items.includes(product.item)?items.filter(item=>item!==product.item):[...items,product.item])}}><Heart/></button><img src={product.image} alt={product.name}/><div className="stars">★★★★★ <span>(23)</span></div><h3>{product.name}</h3><div className="price">${product.price.toFixed(2)}<small> /each</small></div><button className={`cart-btn ${bathCart.includes(product.item)?'added':''}`} onClick={event=>{event.stopPropagation();addBathProduct(product)}}><ShoppingCart/> {bathCart.includes(product.item)?'Add another':'Add to cart'}</button></article>)}</div><button className="load-more" onClick={()=>triggerPrototype('More bathroom products loaded')}>View more products</button></section>
        <section className="bath-brands"><div className="section-title"><h2>Popular bathroom brands</h2></div><div className="brand-rail">{brands.slice(0,6).map(([name,image])=><button className="brand" key={image} onClick={()=>triggerPrototype(`${name} selected`)}><img src={image} alt={name}/></button>)}</div></section>
        <section className="bath-guides"><div className="section-title"><h2>Bathroom project guides</h2><button onClick={()=>triggerPrototype('All bathroom guides opened')}>View all <ChevronRight/></button></div><article onClick={()=>triggerPrototype('Bathtub guide opened')}><img src="https://images.unsplash.com/photo-1564540574859-0dfb63985953?auto=format&fit=crop&w=700&q=80" alt="Bathroom bathtub"/><div><small>3 MIN READ</small><h3>How to choose the best bathtub for your bathroom</h3><button onClick={()=>triggerPrototype('Bathtub guide opened')}>Read guide <ArrowRight/></button></div></article><article onClick={()=>triggerPrototype('Shower door handle guide opened')}><img src="https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=700&q=80" alt="Glass shower"/><div><small>4 MIN READ</small><h3>How to choose the perfect shower door handle</h3><button onClick={()=>triggerPrototype('Shower door handle guide opened')}>Read guide <ArrowRight/></button></div></article></section>
        <section className="bath-description"><h2>Bathroom Hardware</h2><p>From the smallest towel hook to sleek modern handles, bathroom hardware plays a big role in how a space feels and functions. Find the right parts for repairs, upgrades and complete installations.{descriptionExpanded&&' Browse professional-grade components for new installations, repairs, replacements, and ongoing facility maintenance.'}</p><button onClick={()=>setDescriptionExpanded(value=>!value)}>{descriptionExpanded?'Show less':'Read more'}</button></section>
        <SiteFooter/>
      </div>
      {bathCommerceStep==='added'&&bathJustAdded&&<AddedCartPanel product={bathJustAdded} recommendations={bathCatalog.filter(product=>product.item!==bathJustAdded.item&&!bathCart.includes(product.item)).slice(0,2)} subtotal={bathCartTotal} onClose={()=>setBathCommerceStep(null)} onViewCart={()=>setBathCommerceStep('cart')} onCheckout={()=>setBathCommerceStep('checkout')} onAdd={item=>{const product=bathCatalog.find(value=>value.item===item);if(product)addBathProduct(product)}}/>}
      {bathCommerceStep==='cart'&&<ShoppingCartPanel products={bathCartProducts} quantities={bathQuantities} subtotal={bathCartTotal} onQuantity={updateBathQuantity} onRemove={removeBathItem} onClose={()=>setBathCommerceStep(null)} onCheckout={()=>setBathCommerceStep('checkout')}/>} 
      {bathCommerceStep==='checkout'&&<CheckoutPanel subtotal={bathCartTotal} onClose={()=>setBathCommerceStep('cart')} onComplete={()=>setBathCommerceStep('complete')}/>} 
      {bathCommerceStep==='complete'&&<div className="commerce-sheet order-complete"><div><ShieldCheck/><h2>Order confirmed</h2><p>Your prototype order has been placed successfully.</p><button onClick={()=>{setBathCart([]);setBathQuantities({});setBathCommerceStep(null)}}>Continue shopping</button></div></div>}
      <AppNav active={bathCommerceStep==='cart'?'cart':'shop'} onHome={onBack} onCart={()=>setBathCommerceStep('cart')} onQuote={onQuote} cartCount={bathCartCount}/>
    </div></div>
  </main>;
}

function ShowerHandlesPage({ onBack, onHome, onOpenKnobs, onQuote }) {
  const [saved,setSaved] = useState([]);
  const [cartItems,setCartItems] = useState([]);
  const [quantities,setQuantities] = useState({});
  const [commerceStep,setCommerceStep] = useState(null);
  const [justAdded,setJustAdded] = useState(null);
  const [fulfillment,setFulfillment] = useState('delivery');
  const handleCatalog = showerHandleProducts.map(([name,item,price,image])=>({name,item,price:Number(price.replace(/[$,]/g,'')),image,brand:'CRL',finish:'Multiple finishes'}));
  const cartProducts = handleCatalog.filter(product=>cartItems.includes(product.item));
  const cartTotal = cartProducts.reduce((total,product)=>total+product.price*(quantities[product.item]||1),0);
  const cartCount = cartProducts.reduce((total,product)=>total+(quantities[product.item]||1),0);
  const addHandleToCart = item => { const product=handleCatalog.find(value=>value.item===item);if(!product)return;setCartItems(items=>items.includes(item)?items:[...items,item]);setQuantities(current=>({...current,[item]:(current[item]||0)+1}));setJustAdded(product);setCommerceStep('added'); };
  const updateHandleQuantity=(item,change)=>setQuantities(current=>({...current,[item]:Math.max(1,(current[item]||1)+change)}));
  const removeHandleItem=item=>{setCartItems(items=>items.filter(value=>value!==item));setQuantities(current=>{const next={...current};delete next[item];return next})};
  return <main className="stage">
    <div className="phone-shell"><div className="speaker"></div><div className="app">
      <MobileHeader back={onBack} onHome={onHome} title="Shower Door Handles"/>
      <div className="app-content category-page-content handles-page">
        <div className="crumbs"><button onClick={onHome}>Home</button><ChevronRight/><button onClick={onBack}>Bathroom</button><ChevronRight/><b>Handles & Knobs</b></div>
        <section className="handles-categories"><h1>Shower Door Handles and Knobs</h1><p>Choose a category to find handles, knobs, and replacement hardware.</p><div>{showerHandleCategories.map(name=><button key={name} onClick={() => { if (name === 'Shower Door Knobs') onOpenKnobs(); else triggerPrototype(`${name} selected`); }}>{showerHandleCategoryImages[name] ? <img src={showerHandleCategoryImages[name]} alt=""/> : <span className="handles-image-placeholder" aria-hidden="true"></span>}<b>{name}</b></button>)}</div></section>
        <section className="handles-products"><div className="handles-products-head"><div><h2>Shower door handles and knobs</h2><p>{showerHandleProducts.length} products</p></div><div><button onClick={()=>triggerPrototype('Handle filters opened')}><SlidersHorizontal/> Filter</button><button onClick={()=>triggerPrototype('Products sorted')}>Sort <ChevronDown/></button></div></div><div className="handles-product-grid">{showerHandleProducts.map(([name,item,price,image])=><article className="handles-product-card" key={item} onClick={()=>triggerPrototype(`${name} opened`)}><button className={`handles-product-heart ${saved.includes(item)?'saved':''}`} aria-label={`Save ${name}`} onClick={event=>{event.stopPropagation();setSaved(items=>items.includes(item)?items.filter(value=>value!==item):[...items,item])}}><Heart/></button><img src={image} alt={name}/><div className="handles-product-rating">★★★★★ <span>(23)</span></div><h3>{name}</h3><small>Item #{item} · CRL</small><div className="handles-product-price">{price}<span> /each</span></div><button className={`handles-add-cart ${cartItems.includes(item)?'added':''}`} onClick={event=>{event.stopPropagation();addHandleToCart(item)}}><ShoppingCart/> {cartItems.includes(item)?'Add another':'Add to cart'}</button></article>)}</div><button className="handles-load-more" onClick={()=>triggerPrototype('More handle products loaded')}>Load more products</button></section>
        <section className="handles-help"><div><h2>Need help matching a handle?</h2><p>Send our project team a photo, dimensions, or an existing part number.</p></div><button onClick={()=>{window.location.href='tel:+18775098040'}}>Talk to a specialist</button></section>
        <SiteFooter/>
      </div>
      {commerceStep==='added'&&justAdded&&<AddedCartPanel product={justAdded} recommendations={handleCatalog.filter(product=>product.item!==justAdded.item&&!cartItems.includes(product.item)).slice(0,2)} subtotal={cartTotal} onClose={()=>setCommerceStep(null)} onViewCart={()=>setCommerceStep('cart')} onCheckout={()=>setCommerceStep('checkout')} onAdd={addHandleToCart}/>}
      {commerceStep==='cart'&&<ShoppingCartPanel products={cartProducts} quantities={quantities} subtotal={cartTotal} fulfillment={fulfillment} onFulfillment={setFulfillment} onQuantity={updateHandleQuantity} onRemove={removeHandleItem} onClose={()=>setCommerceStep(null)} onCheckout={()=>setCommerceStep('checkout')}/>} 
      {commerceStep==='checkout'&&<CheckoutPanel subtotal={cartTotal} fulfillment={fulfillment} onClose={()=>setCommerceStep('cart')} onComplete={()=>setCommerceStep('complete')}/>} 
      {commerceStep==='complete'&&<div className="commerce-sheet order-complete"><div><ShieldCheck/><h2>Order confirmed</h2><p>Your prototype order has been placed successfully.</p><button onClick={()=>{setCartItems([]);setQuantities({});setCommerceStep(null)}}>Continue shopping</button></div></div>}
      <AppNav active={commerceStep==='cart'?'cart':'shop'} onHome={onHome} onCart={()=>setCommerceStep('cart')} onQuote={onQuote} cartCount={cartCount}/>
    </div></div>
  </main>;
}

function AddedCartPanel({ product, recommendations, subtotal, onClose, onViewCart, onCheckout, onAdd }) {
  return <div className="commerce-sheet added-cart-sheet"><div className="added-cart-title"><span><ShieldCheck/> Added to cart</span><button onClick={onClose}><X/></button></div><article className="added-product"><img src={product.image} alt=""/><div><strong>${product.price.toFixed(2)}</strong><h2>{product.name}</h2><p>In stock · Ready to ship</p></div></article><section className="cart-recommendations"><h2>Recommended for your project</h2><p>Frequently purchased with this item.</p>{recommendations.map(item=><article key={item.item}><img src={item.image} alt=""/><div><h3>{item.name}</h3><strong>${item.price.toFixed(2)}</strong><button onClick={()=>onAdd(item.item)}>+ Add to cart</button></div></article>)}</section><div className="added-cart-actions"><p>Subtotal: <strong>${subtotal.toFixed(2)}</strong></p><div><button onClick={onClose}>Keep shopping</button><button onClick={onViewCart}>View cart</button></div><span>or check out quickly</span><button className="express-checkout" onClick={onCheckout}>Express checkout</button></div></div>;
}

function ShoppingCartPanel({ products, quantities, subtotal, onQuantity, onRemove, onClose, onCheckout }) {
  const [securePlus,setSecurePlus] = useState(false);
  const itemCount = products.reduce((total,item)=>total+(quantities[item.item]||1),0);
  const shipping = products.length ? 8.79 : 0;
  const protection = securePlus ? .08 : 0;
  const total = subtotal + shipping + protection;
  return <div className="commerce-sheet cart-page-sheet dk-cart-page"><div className="commerce-head"><div><h2>Your cart</h2><p>{itemCount} {itemCount===1?'item':'items'}</p></div><button onClick={onClose}><X/></button></div>{products.length?<><section className="money-back-strip"><ShieldCheck/><div><b>30-day money back</b><small>No-hassle returns guarantee</small></div><button onClick={()=>triggerPrototype('Return policy opened')}>Policy</button></section><div className="cart-lines cart-lines-detailed">{products.map(product=><article key={product.item}><span className="quick-ship"><Truck/> Ships in 1 business day</span><img src={product.image} alt=""/><div className="cart-line-copy"><strong>${product.price.toFixed(2)}</strong><h3>{product.name}</h3><small>Item #{product.item} · {product.finish}</small><button className="details-link" onClick={()=>triggerPrototype(`${product.name} details opened`)}>View details</button><div className="quantity-control"><button onClick={()=>onQuantity(product.item,-1)}>âˆ’</button><span>{quantities[product.item]||1}</span><button onClick={()=>onQuantity(product.item,1)}>+</button></div><button className="save-later" onClick={()=>triggerPrototype(`${product.name} saved for later`)}>Save for later</button></div><button className="remove-line" onClick={()=>onRemove(product.item)}><X/></button></article>)}</div><div className="cart-assurances"><button onClick={()=>triggerPrototype('Secure shopping details opened')}><ShieldCheck/><b>Secure shopping</b><span>View details</span></button><button onClick={()=>triggerPrototype('Shipping policy opened')}><Truck/><b>Fast nationwide shipping</b><span>View details</span></button><button onClick={()=>triggerPrototype('Customer support opened','support')}><Headphones/><b>Hardware specialist support</b><span>Chat now</span></button></div><div className="order-summary-card"><h2>Order summary</h2><p><span>Item subtotal ({itemCount})</span><strong>${subtotal.toFixed(2)}</strong></p><p><span>Estimated shipping & handling</span><strong>${shipping.toFixed(2)}</strong></p><p><span>Estimated tax</span><strong>Calculated at checkout</strong></p><button className="promo-code" onClick={()=>triggerPrototype('Promo code field opened')}>Add promo code <ChevronDown/></button><div className="grand-total"><span>Grand total</span><strong>${total.toFixed(2)}</strong></div><p className="pay-later"><b>PayPal</b> Buy now, pay later available.</p><button className={`secure-plus ${securePlus?'selected':''}`} onClick={()=>setSecurePlus(value=>!value)}><ShieldCheck/><span><b>Secure+</b><small>Priority support and shipping protection</small></span><strong>+ $0.08</strong></button><button className="secure-checkout" onClick={onCheckout}><ShieldCheck/> {securePlus?'Secure+ checkout':'Standard checkout'} · ${total.toFixed(2)}</button><span className="express-label">Express checkout</span><button className="paypal-checkout" onClick={onCheckout}>PayPal</button><button className="amazon-checkout" onClick={onCheckout}>amazon pay</button><div className="cart-secondary-links"><button onClick={()=>triggerPrototype('Cart saved as quote','quote')}>Save as quote</button><button onClick={()=>triggerPrototype('Shipping policy opened')}>Shipping policy</button></div><div className="cart-help"><h3>Need help?</h3><a href="tel:+13058512811">Call 1-305-851-2811</a><a href="mailto:cs@dkhardware.com">cs@dkhardware.com</a><button onClick={()=>triggerPrototype('Support opened','support')}>Chat now</button></div></div></>:<div className="empty-cart"><ShoppingCart/><h3>Your cart is empty</h3><button onClick={onClose}>Continue shopping</button></div>}</div>;
}

function CheckoutPanel({ subtotal, onClose, onComplete }) {
  return <div className="commerce-sheet checkout-sheet checkout-flow"><div className="commerce-head"><div><h2>Secure checkout</h2><p>Contact · Shipping · Payment</p></div><button onClick={onClose}><X/></button></div><div className="checkout-progress"><span className="active">1</span><i></i><span>2</span><i></i><span>3</span></div><form onSubmit={event=>{event.preventDefault();onComplete()}}><div className="prototype-form-note">Prototype checkout â€” fictional information is prefilled for demonstration.</div><section><h3>Contact information</h3><label>Email address<input required type="email" defaultValue="alex.morgan@example.com"/></label><label>Phone number<input required inputMode="tel" defaultValue="305-555-0147"/></label></section><section><h3>Shipping address</h3><label>Full name<input required defaultValue="Alex Morgan"/></label><label>Company<input defaultValue="Morgan Glass & Hardware"/></label><label>Street address<input required defaultValue="2450 Example Commerce Drive"/></label><div className="checkout-row"><label>City<input required defaultValue="Miami"/></label><label>ZIP code<input required defaultValue="33166"/></label></div></section><section><h3>Shipping method</h3><label className="checkout-choice"><input type="radio" defaultChecked/><span><b>Standard shipping</b><small>Ships in 1 business day</small></span><strong>$8.79</strong></label></section><section><h3>Payment</h3><label>Test card number<input required inputMode="numeric" defaultValue="4242 4242 4242 4242"/></label><div className="checkout-row"><label>Expiration<input required defaultValue="12 / 30"/></label><label>Security code<input required defaultValue="123"/></label></div></section><div className="checkout-total"><span>Estimated total</span><strong>${(subtotal+8.79).toFixed(2)}</strong></div><button className="place-order"><ShieldCheck/> Place secure order</button><button type="button" className="express-checkout" onClick={onComplete}>PayPal checkout</button></form></div>;
}

function ShowerKnobsPage({ onBack, onHome, onQuote, onOpenProduct }) {
  const finishes = ['Chrome','Brushed Nickel','Matte Black','Satin Brass','Oil Rubbed Bronze','Polished Brass'];
  const finishClasses = ['finish-chrome','finish-nickel','finish-black','finish-brass','finish-bronze','finish-polished'];
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sort, setSort] = useState('Recommended');
  const [savedItems, setSavedItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(()=>{if(selectedProduct&&onOpenProduct)onOpenProduct(selectedProduct)},[selectedProduct,onOpenProduct]);
  const [commerceStep, setCommerceStep] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [fulfillment, setFulfillment] = useState('delivery');
  const filteredProducts = showerKnobProducts
    .filter(product => selectedFinish === 'All' || product.finish === selectedFinish)
    .filter(product => selectedBrand === 'All' || product.brand === selectedBrand)
    .sort((a,b) => sort === 'Price: Low' ? a.price-b.price : sort === 'Price: High' ? b.price-a.price : 0);
  const clearFilters = () => { setSelectedFinish('All'); setSelectedBrand('All'); };
  const cycleSort = () => setSort(current => current === 'Recommended' ? 'Price: Low' : current === 'Price: Low' ? 'Price: High' : 'Recommended');
  const chooseFinish = finish => {
    const next = selectedFinish === finish ? 'All' : finish;
    if (next !== 'All' && selectedBrand !== 'All' && !showerKnobProducts.some(product => product.finish === next && product.brand === selectedBrand)) setSelectedBrand('All');
    setSelectedFinish(next);
  };
  const chooseBrand = brand => {
    const next = selectedBrand === brand ? 'All' : brand;
    if (next !== 'All' && selectedFinish !== 'All' && !showerKnobProducts.some(product => product.brand === next && product.finish === selectedFinish)) setSelectedFinish('All');
    setSelectedBrand(next);
  };
  const toggleSaved = item => setSavedItems(current => current.includes(item) ? current.filter(value => value !== item) : [...current,item]);
  const toggleCart = item => {
    const product = showerKnobProducts.find(value=>value.item===item);
    if (!product) return;
    setCartItems(current => current.includes(item) ? current : [...current,item]);
    setQuantities(current=>({...current,[item]:(current[item]||0)+1}));
    setSelectedProduct(null);
  };
  const cartProducts = showerKnobProducts.filter(product => cartItems.includes(product.item));
  const cartTotal = cartProducts.reduce((total,product) => total + product.price*(quantities[product.item]||1), 0);
  const cartCount = cartProducts.reduce((total,product)=>total+(quantities[product.item]||1),0);
  const updateQuantity = (item,change) => setQuantities(current=>({...current,[item]:Math.max(1,(current[item]||1)+change)}));
  const removeCartItem = item => { setCartItems(items=>items.filter(value=>value!==item)); setQuantities(current=>{const next={...current};delete next[item];return next}); };
  return <main className="stage">
    <div className="phone-shell"><div className="speaker"></div><div className="app">
      <MobileHeader back={onBack} onHome={onHome} title="Shower Door Knobs" cartCount={cartCount} onCart={()=>setCommerceStep('cart')}/>
      <div className="app-content category-page-content handles-page knobs-page">
        <div className="crumbs"><button onClick={onHome}>Home</button><ChevronRight/><button onClick={onBack}>Handles</button><ChevronRight/><b>Shower Door Knobs</b></div>
        <section className="knobs-heading"><h1>Shower Door Knobs</h1></section>
        <section className="finish-strip"><h2>Shop by finish</h2><div>{finishes.map((finish,index)=><button className={selectedFinish===finish?'selected':''} onClick={()=>chooseFinish(finish)} key={finish}><i className={finishClasses[index]}></i><span>{finish}</span></button>)}</div></section>
        <section className="brand-filter-strip"><h2>Shop by brand</h2><div><button className={selectedBrand==='All'?'selected':''} onClick={()=>setSelectedBrand('All')}><span>All brands</span></button>{showerKnobBrands.map(([brand,image])=><button className={selectedBrand===brand?'selected':''} onClick={()=>chooseBrand(brand)} key={brand}><img src={image} alt={brand}/><span>{brand}</span></button>)}</div></section>
        <section className="handles-products knobs-products"><div className="handles-products-head"><div><h2>Shower door knobs</h2><p>{filteredProducts.length} products</p></div><div>{(selectedFinish!=='All'||selectedBrand!=='All')&&<button onClick={clearFilters}>Clear</button>}<button onClick={cycleSort}>{sort} <ChevronDown/></button></div></div><div className="handles-product-grid">{filteredProducts.map(product=><article className="handles-product-card clickable-product" key={product.item} onClick={()=>setSelectedProduct(product)}><button className={`handles-product-heart ${savedItems.includes(product.item)?'saved':''}`} aria-label={`Save ${product.name}`} onClick={event=>{event.stopPropagation();toggleSaved(product.item)}}><Heart/></button><img src={product.image} alt={product.name}/><div className="handles-product-rating">★★★★★ <span>(23)</span></div><h3>{product.name}</h3><small>Item #{product.item} · {product.brand}</small><div className="handles-product-price">${product.price.toFixed(2)}<span> /each</span></div><button className={`handles-add-cart ${cartItems.includes(product.item)?'added':''}`} onClick={event=>{event.stopPropagation();toggleCart(product.item)}}><ShoppingCart/> {cartItems.includes(product.item)?'Added':'Add to cart'}</button></article>)}</div></section>
        <section className="handles-help"><div><h2>Not sure which knob fits?</h2><p>Share the glass thickness, hole spacing, or a photo with our hardware specialists.</p></div><button onClick={()=>{window.location.href='tel:+18775098040'}}>Talk to a specialist</button></section>
        <SiteFooter/>
      </div>
      {selectedProduct&&<div className="product-quick-view" onClick={()=>setSelectedProduct(null)}><article onClick={event=>event.stopPropagation()}><button className="quick-view-close" onClick={()=>setSelectedProduct(null)}><X/></button><img src={selectedProduct.image} alt={selectedProduct.name}/><div><h2>{selectedProduct.name}</h2><p>Item #{selectedProduct.item} · {selectedProduct.brand} · {selectedProduct.finish}</p><strong>${selectedProduct.price.toFixed(2)} <small>/each</small></strong><button className="quick-view-cart" onClick={()=>toggleCart(selectedProduct.item)}><ShoppingCart/> {cartItems.includes(selectedProduct.item)?'Added to cart':'Add to cart'}</button></div></article></div>}
      {commerceStep==='cart'&&<ShoppingCartPanel products={cartProducts} quantities={quantities} subtotal={cartTotal} fulfillment={fulfillment} onFulfillment={setFulfillment} onQuantity={updateQuantity} onRemove={removeCartItem} onClose={()=>setCommerceStep(null)} onCheckout={()=>setCommerceStep('checkout')}/>} 
      {commerceStep==='checkout'&&<CheckoutPanel subtotal={cartTotal} fulfillment={fulfillment} onClose={()=>setCommerceStep('cart')} onComplete={()=>setCommerceStep('complete')}/>} 
      {commerceStep==='complete'&&<div className="commerce-sheet order-complete"><div><ShieldCheck/><h2>Order confirmed</h2><p>Your prototype order has been placed successfully.</p><button onClick={()=>{setCartItems([]);setCommerceStep(null)}}>Continue shopping</button></div></div>}
      <AppNav active={commerceStep==='cart'?'cart':'shop'} onHome={onHome} onCart={()=>setCommerceStep('cart')} onQuote={onQuote} cartCount={cartCount}/>
    </div></div>
  </main>;
}

function RequestQuotePage({ onBack, onHome }) {
  const [quoteProducts,setQuoteProducts] = useState([{description:'',part:'',quantity:1}]);
  const [submitted,setSubmitted] = useState(false);
  const updateProduct=(index,key,value)=>setQuoteProducts(items=>items.map((item,itemIndex)=>itemIndex===index?{...item,[key]:value}:item));
  const addProduct=()=>setQuoteProducts(items=>[...items,{description:'',part:'',quantity:1}]);
  const removeProduct=index=>setQuoteProducts(items=>items.length===1?items:items.filter((_,itemIndex)=>itemIndex!==index));
  return <main className="stage"><div className="phone-shell"><div className="speaker"></div><div className="app"><MobileHeader back={onBack} title="Request a Quote"/><div className="app-content quote-page-content"><div className="quote-page-title"><h1>Request a quote</h1><p>Send your product list to our project team for volume pricing and sourcing support.</p><a href="tel:+18775098040"><Phone/> Prefer to call? +1 877 509 8040</a></div>{submitted?<section className="quote-page-success"><ShieldCheck/><h2>Quote request received</h2><p>A DK Hardware project specialist will review your request and contact you within one business day.</p><button onClick={()=>{setSubmitted(false);setQuoteProducts([{description:'',part:'',quantity:1}])}}>Start another request</button></section>:<form className="quote-page-form" onSubmit={event=>{event.preventDefault();setSubmitted(true)}}><section><h2>Products you need</h2><p>Add item numbers when available. General descriptions are also accepted.</p>{quoteProducts.map((product,index)=><div className="quote-product-row" key={index}><div className="quote-product-row-head"><b>Product {index+1}</b>{quoteProducts.length>1&&<button type="button" onClick={()=>removeProduct(index)}>Remove</button>}</div><label>Product name or description<input required value={product.description} onChange={event=>updateProduct(index,'description',event.target.value)} placeholder="Example: brushed nickel shower door knobs"/></label><div><label>Part number<input value={product.part} onChange={event=>updateProduct(index,'part',event.target.value)} placeholder="Optional"/></label><label>Quantity<input required min="1" type="number" value={product.quantity} onChange={event=>updateProduct(index,'quantity',event.target.value)}/></label></div></div>)}<button className="add-quote-product" type="button" onClick={addProduct}>+ Add another product</button><label className="quote-page-upload"><Upload/><span><b>Upload a product list or photos</b><small>PDF, spreadsheet, JPG or PNG</small></span><input type="file" multiple/></label></section><section><h2>Contact information</h2><div className="quote-form-grid"><label>Your name<input required placeholder="Full name"/></label><label>Company<input placeholder="Company name"/></label><label>Work email<input required type="email" placeholder="you@company.com"/></label><label>Phone number<input required inputMode="tel" placeholder="Phone number"/></label><label>ZIP code<input required inputMode="numeric" placeholder="ZIP code"/></label></div><label>Project details<textarea placeholder="Tell us about timelines, finishes, special pricing, or delivery requirements."/></label></section><div className="quote-form-promise"><ShieldCheck/><span><b>Your request goes directly to the DK project team.</b><small>Volume pricing · Product sourcing · Dedicated support</small></span></div><button className="submit-quote-page">Submit quote request <ArrowRight/></button></form>}<SiteFooter/></div><AppNav active="quote" onHome={onHome} onQuote={()=>{}}/></div></div></main>;
}

function ProductCard({ product, onAdd, inCart = false }) {
  const [saved,setSaved] = useState(false);
  const [added,setAdded] = useState(false);
  return <article className="product-card" onClick={()=>triggerPrototype(`${product.name} opened`)}>
    <button className={`heart ${saved?'saved':''}`} aria-label="Save item" onClick={event=>{event.stopPropagation();setSaved(value=>!value)}}><Heart size={18}/></button>
    <img src={product.image} alt="" />
    <div className="stars">★★★★★ <span>(23)</span></div>
    <h3>{product.name}</h3>{product.meta && <div className="product-meta">{product.meta}</div>}
    <div className="price">{product.price} <del>{product.old}</del><small> /each</small></div>
    <button className={`cart-btn ${(inCart||added)?'added':''}`} onClick={event=>{event.stopPropagation();if(onAdd)onAdd(product);else setAdded(true)}}><ShoppingCart size={16}/> {(inCart||added)?'Add another':'Add to cart'}</button>
  </article>
}

function DraggableProductRail({ items, className = '', onAdd, cartItems = [] }) {
  const rail = useRef(null);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });
  return <div className={`product-rail ${className}`} ref={rail} onPointerDown={event => { if(event.pointerType === 'touch') return; drag.current = { active: true, startX: event.clientX, scrollLeft: rail.current.scrollLeft }; }} onPointerMove={event => { if(drag.current.active) rail.current.scrollLeft = drag.current.scrollLeft - (event.clientX - drag.current.startX); }} onPointerUp={() => drag.current.active = false} onPointerLeave={() => drag.current.active = false} onPointerCancel={() => drag.current.active = false}>{items.map(product => <ProductCard key={product.name} product={product} onAdd={onAdd} inCart={cartItems.includes(product.item)}/>)}</div>;
}

function TopRatedCategories({ onAdd, cartItems }) {
  const [active,setActive] = useState(categories[0][0]);
  const activeIndex = categories.findIndex(([name])=>name===active);
  const ratedProducts = [...homeCatalog.slice(activeIndex%homeCatalog.length),...homeCatalog.slice(0,activeIndex%homeCatalog.length)].slice(0,4);
  return <section className="top-rated-section"><div className="section-title"><h2>Top rated categories</h2><button onClick={()=>triggerPrototype('All top rated products opened')}>See all <ChevronRight/></button></div><div className="top-rated-tabs">{categories.map(([name])=><button className={active===name?'active':''} onClick={()=>setActive(name)} key={name}>{name}</button>)}</div><div className="top-rated-products">{ratedProducts.map(product=><ProductCard key={product.item} product={product} onAdd={onAdd} inCart={cartItems.includes(product.item)}/>)}</div></section>;
}

function ReviewsSection() {
  const reviews = [
    {name:'Susan Stoudt',date:'August 20, 2026',text:'Quick ordering, clear updates, and the product arrived exactly as described.'},
    {name:'Sandra Stephenson',date:'August 21, 2026',text:'The item solved our problem and the DK team helped us find an uncommon replacement part.'},
    {name:'Bernadette Hiither',date:'August 21, 2026',text:'Reliable service, professional support, and everything arrived safely.'}
  ];
  const rail=useRef(null);
  const drag=useRef({active:false,x:0,left:0});
  useEffect(()=>{const timer=setInterval(()=>{const element=rail.current;if(!element||drag.current.active)return;const max=element.scrollWidth-element.clientWidth;const next=element.scrollLeft+267;if(next>=max-5)element.scrollTo({left:0,behavior:'auto'});else element.scrollTo({left:next,behavior:'smooth'})},4200);return()=>clearInterval(timer)},[]);
  return <section className="reviews-v2"><div className="reviews-v2-head"><div><h2>People trust DK</h2><p><b>4.8</b><span>★★★★★</span> Verified customer reviews</p></div><a href="https://www.shopperapproved.com/reviews/dkhardware.com" target="_blank" rel="noreferrer">View all reviews <ArrowRight/></a></div><div className="reviews-v2-rail" ref={rail} onPointerDown={event=>{if(event.pointerType==='touch')return;drag.current={active:true,x:event.clientX,left:rail.current.scrollLeft}}} onPointerMove={event=>{if(drag.current.active)rail.current.scrollLeft=drag.current.left-(event.clientX-drag.current.x)}} onPointerUp={()=>drag.current.active=false} onPointerLeave={()=>drag.current.active=false}>{reviews.map(review=><article key={review.name}><div className="review-stars">★★★★★</div><p>â€œ{review.text}â€</p><div><span><ShieldCheck/><b>Verified buyer</b></span><small>{review.date} · {review.name}</small></div><a href="https://www.shopperapproved.com/reviews/dkhardware.com" target="_blank" rel="noreferrer"><img src="https://www.shopperapproved.com/account/images/new_look/certificate30/ShopperApprovedLogo.svg" alt="Shopper Approved"/></a></article>)}</div></section>;
}

function ProductDetailPage({product,onBack,onHome,onQuote}) { const [displayed,setDisplayed]=useState(product);const [quantity,setQuantity]=useState(1);const [saved,setSaved]=useState(false);const [cartOpen,setCartOpen]=useState(null);const [inCart,setInCart]=useState(false);const subtotal=displayed.price*quantity;const cartProduct={...displayed,finish:displayed.finish||'Chrome'};const addToCart=()=>{setInCart(true);setCartOpen('added')};const related=showerKnobProducts.filter(item=>item.item!==displayed.item).slice(0,3);return <main className="stage"><div className="phone-shell"><div className="speaker"></div><div className="app"><MobileHeader back={onBack} onHome={onHome} title={displayed.name} cartCount={inCart?quantity:0} onCart={()=>setCartOpen('cart')}/><div className="app-content product-detail-page"><div className="pdp-crumbs"><button onClick={onHome}>Home</button><ChevronRight/><button onClick={onBack}>Shower Door Knobs</button></div><section className="pdp-gallery"><button className={saved?'saved':''} onClick={()=>setSaved(value=>!value)} aria-label="Save product"><Heart/></button><img src={displayed.image} alt={displayed.name}/><div><i className="active"></i><i></i><i></i></div></section><section className="pdp-summary"><div className="pdp-brand-row"><span>{displayed.brand}</span><small>Item #{displayed.item}</small></div><h1>{displayed.name}</h1><button className="pdp-rating" onClick={()=>triggerPrototype('Product reviews opened')}>★★★★★ <span>4.8 (23 reviews)</span></button><div className="pdp-demand"><b>16 people</b> purchased this product in the last 7 days</div><div className="pdp-price"><strong>${displayed.price.toFixed(2)}</strong><span>/each</span></div><p className="pdp-stock"><ShieldCheck/><span><b>In stock and ready to ship</b><small>Usually ships within 1 business day</small></span></p><div className="pdp-finish"><span>Finish</span><button>{displayed.finish}</button></div><div className="pdp-quantity"><span>Quantity</span><div><button onClick={()=>setQuantity(value=>Math.max(1,value-1))}>-</button><b>{quantity}</b><button onClick={()=>setQuantity(value=>value+1)}>+</button></div></div><button className="pdp-add" onClick={addToCart}><ShoppingCart/> {inCart?'Add another':'Add to cart'} - ${subtotal.toFixed(2)}</button><button className="pdp-quote" onClick={onQuote}><FileText/> Request volume pricing</button></section><section className="pdp-delivery"><div><Truck/><span><b>Fast nationwide delivery</b><small>Estimated at checkout</small></span></div><div><RotateCcw/><span><b>30-day returns</b><small>Simple and secure returns</small></span></div><div><Headphones/><span><b>Hardware specialist support</b><small>Get help before you order</small></span></div></section><section className="pdp-details"><details open><summary>Product overview <ChevronDown/></summary><p>Professional-grade shower door hardware designed for frameless and framed glass applications. Built for reliable daily use and a clean finished appearance.</p></details><details><summary>Product features <ChevronDown/></summary><ul><li>Durable solid-metal construction</li><li>Designed for common shower glass applications</li><li>Matching finish for coordinated installations</li><li>Installation hardware included</li></ul></details><details><summary>Specifications <ChevronDown/></summary><dl><div><dt>Brand</dt><dd>{displayed.brand}</dd></div><div><dt>Item number</dt><dd>{displayed.item}</dd></div><div><dt>Finish</dt><dd>{displayed.finish}</dd></div><div><dt>Application</dt><dd>Shower doors</dd></div></dl></details><details><summary>Questions & answers <ChevronDown/></summary><p>Need help confirming fit or glass thickness? Contact a DK Hardware specialist before ordering.</p></details></section><section className="pdp-related"><div className="section-title"><h2>You may also need</h2><button onClick={()=>triggerPrototype('Related products opened')}>See all <ChevronRight/></button></div><div>{related.map(item=><article key={item.item} onClick={()=>{setDisplayed(item);setQuantity(1);setInCart(false);document.querySelector('.product-detail-page')?.scrollTo({top:0,behavior:'smooth'})}}><img src={item.image} alt={item.name}/><h3>{item.name}</h3><strong>${item.price.toFixed(2)}</strong></article>)}</div></section><SiteFooter/></div>{cartOpen==='added'&&<AddedCartPanel product={cartProduct} recommendations={related} subtotal={subtotal} onClose={()=>setCartOpen(null)} onViewCart={()=>setCartOpen('cart')} onCheckout={()=>setCartOpen('checkout')} onAdd={()=>triggerPrototype('Related product added')}/>} {cartOpen==='cart'&&<ShoppingCartPanel products={inCart?[cartProduct]:[]} quantities={{[displayed.item]:quantity}} subtotal={subtotal} onQuantity={(item,change)=>setQuantity(value=>Math.max(1,value+change))} onRemove={()=>{setInCart(false);setCartOpen(null)}} onClose={()=>setCartOpen(null)} onCheckout={()=>setCartOpen('checkout')}/>} {cartOpen==='checkout'&&<CheckoutPanel subtotal={subtotal} onClose={()=>setCartOpen('cart')} onComplete={()=>setCartOpen('complete')}/>} {cartOpen==='complete'&&<div className="commerce-sheet order-complete"><div><ShieldCheck/><h2>Order confirmed</h2><p>Your prototype order has been placed successfully.</p><button onClick={()=>{setInCart(false);setCartOpen(null)}}>Continue shopping</button></div></div>}<AppNav active={cartOpen==='cart'?'cart':'shop'} onHome={onHome} onCart={()=>setCartOpen('cart')} onQuote={onQuote} cartCount={inCart?quantity:0}/></div></div></main>; }

function BrowserChromeBar() {
  return <div className="browser-chrome"><div className="browser-status"><b>4:30</b><span>5G&nbsp; 82%</span></div><div className="browser-toolbar"><button aria-label="Browser home"><Home/></button><div><ShieldCheck/><span>dkhardware.com</span></div><button aria-label="Browser tabs">3</button><button aria-label="Browser menu">...</button></div></div>;
}

function AndroidPreview() {
  const [screen,setScreen]=useState('home'),[trail,setTrail]=useState([]),[cart,setCart]=useState({}),[product,setProduct]=useState(showerKnobProducts[0]),[step,setStep]=useState(1),[loading,setLoading]=useState(false),[shopDepartment,setShopDepartment]=useState('Most popular'),[quoteSent,setQuoteSent]=useState(false),[notificationDrawer,setNotificationDrawer]=useState(false),[androidSlide,setAndroidSlide]=useState(0),[carouselPaused,setCarouselPaused]=useState(false);
  const notificationDrag=useRef(0),carouselDrag=useRef(0),carouselMoved=useRef(false);
  useEffect(()=>{if(screen!=='home'||carouselPaused)return;const timer=setInterval(()=>setAndroidSlide(value=>(value+1)%androidPromotions.length),2000);return()=>clearInterval(timer)},[screen,carouselPaused]);
  const transition=action=>{if(loading)return;setLoading(true);setTimeout(()=>{action();setLoading(false)},420)},go=next=>transition(()=>{setTrail(value=>[...value,screen]);setScreen(next)}),back=()=>transition(()=>{const value=[...trail];setScreen(value.pop()||'home');setTrail(value)});
  const count=Object.values(cart).reduce((a,b)=>a+b,0),cartItems=showerKnobProducts.filter(item=>cart[item.item]),subtotal=cartItems.reduce((sum,item)=>sum+item.price*cart[item.item],0);
  const add=item=>setCart(value=>({...value,[item.item]:(value[item.item]||0)+1})),change=(item,diff)=>setCart(value=>{const next={...value},qty=Math.max(0,(value[item.item]||0)+diff);qty?next[item.item]=qty:delete next[item.item];return next}),open=item=>{setProduct(item);go('product')};
  const Card=({item})=><article onClick={()=>open(item)}><button className="android-save" onClick={event=>event.stopPropagation()}><Heart/></button><img src={item.image} alt={item.name}/><div className="stars">★★★★★ <span>(23)</span></div><h3>{item.name}</h3><strong>${item.price.toFixed(2)}</strong><button className="android-add" onClick={event=>{event.stopPropagation();add(item)}}><ShoppingCart/> Add</button></article>;
  const Grid=({items,images,next})=><div className="android-category-grid">{items.map((name,index)=><button key={name} onClick={()=>next(name)}><span><img src={images?.[name]||showerHandleCategoryImages[showerHandleCategories[index%9]]} alt=""/></span><b>{name}</b></button>)}</div>;
  const home=<div className="android-commerce-home"><section className="android-quick-actions"><button className="active" onClick={()=>go('shop')}><span><Grid2X2/></span><b>Shop</b></button><button onClick={()=>go('quote')}><span><FileText/></span><b>Quick order</b></button><button onClick={()=>go('support')}><span><Truck/></span><b>Track order</b></button><button onClick={()=>go('support')}><span><Headphones/></span><b>Pro support</b></button></section><button className="android-deliver"><Home/><span><small>Delivering to</small><b>Miami, FL 33166</b></span><ChevronRight/></button><div className="android-home-search"><Search/><input placeholder="What hardware do you need?"/><button><Camera/></button></div><section className="android-home-hero android-home-carousel" onPointerDown={event=>{carouselDrag.current=event.clientX;carouselMoved.current=false;setCarouselPaused(true)}} onPointerMove={event=>{if(Math.abs(event.clientX-carouselDrag.current)>8)carouselMoved.current=true}} onPointerUp={event=>{const distance=event.clientX-carouselDrag.current;if(Math.abs(distance)>35)setAndroidSlide(value=>distance<0?(value+1)%androidPromotions.length:(value-1+androidPromotions.length)%androidPromotions.length);setTimeout(()=>setCarouselPaused(false),800)}}><div className="android-home-track" style={{transform:`translateX(-${androidSlide*100}%)`}}>{androidPromotions.map(promo=><article className={`android-campaign-${promo.theme}`} key={promo.title} onClick={()=>{if(!carouselMoved.current)go(promo.target)}}><img src={promo.image} alt={promo.title}/><div><small>{promo.eyebrow}</small><h1>{promo.title}</h1><p>{promo.copy}</p><button>{promo.action} <ArrowRight/></button></div></article>)}</div></section><div className="android-home-dots">{androidPromotions.map((promo,index)=><button aria-label={`Show ${promo.title}`} className={androidSlide===index?'active':''} onClick={()=>{setAndroidSlide(index);setCarouselPaused(true);setTimeout(()=>setCarouselPaused(false),1200)}} key={promo.title}/>)}</div><section className="android-home-categories"><div className="android-section-title"><h2>Shop departments</h2><button onClick={()=>go('bathroom')}>View all</button></div><div>{categories.slice(0,8).map(([name,image])=><button onClick={()=>name==='Bathroom'&&go('bathroom')} key={name}><span><img src={image} alt=""/></span><b>{name}</b></button>)}</div></section><section className="android-home-quote"><img src="/banners/volume-purchasing.jpg" alt="Commercial project support"/><div><h2>Need project pricing?</h2><p>Send your product list for volume pricing, sourcing, and specialist support.</p><span><b>Volume orders</b><b>Hard-to-find parts</b></span><button onClick={()=>go('quote')}>Request a quote <ArrowRight/></button></div></section><section className="android-shop-brands"><div className="android-section-title"><div><h2>Shop by brand</h2><p>Trusted names for professional projects</p></div><button onClick={()=>go('shop')}>View all</button></div><div>{brands.map(([name,image],index)=><button key={`${name}-${index}`} onClick={()=>go('shop')}><img src={image} alt={name}/></button>)}</div></section><section className="android-resume"><div className="android-section-title"><div><h2>Continue shopping</h2><p>Based on your recent project</p></div><button onClick={()=>go('knobs')}>See all</button></div><div>{showerKnobProducts.slice(0,4).map(item=><button key={item.item} onClick={()=>open(item)}><img src={item.image} alt={item.name}/><span>{item.name}</span><b>${item.price.toFixed(2)}</b></button>)}</div></section><section className="android-pro-banner"><div><FileText/><span><b>Project pricing for business</b><small>Upload a list and get a custom quote.</small></span></div><button onClick={()=>go('quote')}>Start quote</button></section><section className="android-brand-marquee"><div><b>Brands professionals trust</b>{[...brands,...brands].map(([name,image],index)=><button key={`${name}-${index}`} onClick={()=>go('shop')}><img src={image} alt={name}/></button>)}</div></section><section className="android-home-services"><h2>Built for professional purchasing</h2><div><article><Truck/><b>Fast shipping</b><span>Stocked products ship quickly</span></article><article><FileText/><b>Volume pricing</b><span>Better pricing for larger orders</span></article><article><Headphones/><b>Real support</b><span>Talk with a hardware specialist</span></article></div></section><section className="android-trust-strip"><ShieldCheck/><div><b>Secure purchasing for every project</b><span>30-day returns · Competitive pricing · Trusted support</span></div></section></div>
  const bathroom=<><section className="android-page-intro"><div><h1>Bathroom hardware</h1><p>Solutions for showers, baths and commercial projects.</p></div><img src="https://dkstatic.blob.core.windows.net/static/mainpage/cats/bathroom_gray.webp?2" alt=""/></section><section className="android-category-section"><div className="android-section-title"><h2>Shop bathroom</h2><span>{bathroomCategories.length} categories</span></div><Grid items={bathroomCategories} next={name=>name==='Shower Door Handles and Knobs'&&go('handles')}/></section></>;
  const handles=<section className="android-category-section"><div className="android-section-title"><div><h2>Shower door handles</h2><p>Choose a hardware type</p></div></div><Grid items={showerHandleCategories} images={showerHandleCategoryImages} next={name=>name==='Shower Door Knobs'&&go('knobs')}/><div className="android-help-card"><Headphones/><div><b>Need help matching hardware?</b><span>Talk to a bathroom specialist.</span></div><ChevronRight/></div></section>;
  const knobs=<><section className="android-filter-strip"><button className="selected">All finishes</button><button>Chrome</button><button>Matte black</button><button>Brushed nickel</button></section><section className="android-list-section"><div className="android-section-title"><div><h2>Shower door knobs</h2><p>{showerKnobProducts.length} products</p></div><button><SlidersHorizontal/> Filter</button></div><div className="android-product-list">{showerKnobProducts.map(item=><Card item={item} key={item.item}/>)}</div></section></>;
  const pdp=<><section className="android-pdp-image"><div className="android-pdp-actions"><button aria-label="Save product"><Heart/></button><button aria-label="Share product"><Send/></button></div><img src={product.image} alt={product.name}/></section><section className="android-pdp-info"><small>{product.brand} ú Item #{product.item}</small><h1>{product.name}</h1><div className="stars">★★★★★ <span>4.8 (23 reviews)</span></div><div className="android-pdp-price"><strong>${product.price.toFixed(2)}</strong><span>/each</span></div><p className="android-ready"><ShieldCheck/> In stock ú Ships in 1 business day</p></section><section className="android-pdp-options"><h2>Finish</h2><button>{product.finish}</button><div><Truck/><span><b>Fast nationwide delivery</b><small>Calculated at checkout</small></span></div><div><RotateCcw/><span><b>30-day returns</b><small>Easy, secure returns</small></span></div></section><section className="android-pdp-description"><h2>Product overview</h2><p>Professional-grade hardware designed for reliable daily use and a clean finished appearance.</p><div className="android-spec-grid"><span><small>Brand</small><b>{product.brand}</b></span><span><small>Finish</small><b>{product.finish}</b></span><span><small>Application</small><b>Shower doors</b></span><span><small>Return period</small><b>30 days</b></span></div></section><section className="android-pdp-reviews"><div className="android-section-title"><div><h2>Ratings & reviews</h2><p>Verified DK Hardware buyers</p></div><button>See all</button></div><div className="android-rating-summary"><strong>4.8</strong><span><b>★★★★★</b><small>Based on 23 reviews</small></span></div><article><div><b>Excellent quality and finish</b><span>★★★★★</span></div><p>Exactly as described and fit our frameless shower project perfectly.</p><small>Michael R. · Verified buyer</small></article><article><div><b>Fast shipping</b><span>★★★★★</span></div><p>Arrived quickly and the finish matched the rest of the hardware.</p><small>David C. · Verified buyer</small></article></section><section className="android-pdp-support"><Headphones/><div><b>Questions about fit or finish?</b><span>Our hardware specialists can help.</span></div><button>Contact</button></section><div className="android-sticky-buy"><div><strong>${product.price.toFixed(2)}</strong><span>{cart[product.item]||0} in cart</span></div><button onClick={()=>add(product)}><ShoppingCart/> Add to cart</button></div></>;
  const cartPage=cartItems.length?<><section className="android-cart-list">{cartItems.map(item=><article key={item.item}><img src={item.image} alt=""/><div><b>{item.name}</b><small>Item #{item.item}</small><strong>${(item.price*cart[item.item]).toFixed(2)}</strong><div><button onClick={()=>change(item,-1)}>-</button><span>{cart[item.item]}</span><button onClick={()=>change(item,1)}>+</button></div></div></article>)}</section><section className="android-assurance"><div><RotateCcw/><span><b>30-day returns</b><small>Simple and secure</small></span></div><div><ShieldCheck/><span><b>Secure checkout</b><small>Protected payment</small></span></div></section><section className="android-order-summary"><h2>Order summary</h2><p><span>Item subtotal</span><b>${subtotal.toFixed(2)}</b></p><p><span>Estimated shipping</span><b>$8.79</b></p><p className="total"><span>Estimated total</span><strong>${(subtotal+8.79).toFixed(2)}</strong></p><button onClick={()=>{setStep(1);go('checkout')}}><ShieldCheck/> Continue to checkout</button></section></>:<section className="android-empty"><ShoppingCart/><h1>Your cart is empty</h1><p>Add shower hardware to continue.</p><button onClick={()=>go('knobs')}>Shop shower hardware</button></section>;
  const checkout=<><div className="android-checkout-progress"><span className={step>=1?'done':''}>1</span><i/><span className={step>=2?'done':''}>2</span><i/><span className={step>=3?'done':''}>3</span></div>{step===1&&<section className="android-form"><h2>Contact & shipping</h2><label>Email<input defaultValue="buyer@company.com"/></label><label>Full name<input defaultValue="Alex Morgan"/></label><label>Company<input defaultValue="Morgan Contracting LLC"/></label><label>Street address<input defaultValue="2500 NW 79th Ave"/></label><div><label>City<input defaultValue="Miami"/></label><label>ZIP<input defaultValue="33122"/></label></div></section>}{step===2&&<section className="android-form"><h2>Delivery</h2><button className="android-delivery-choice"><Truck/><span><b>Standard delivery</b><small>Ships in 1 business day</small></span><strong>$8.79</strong></button><label>Delivery instructions<textarea placeholder="Optional carrier notes"/></label></section>}{step===3&&<section className="android-form"><h2>Payment</h2><label>Card number<input defaultValue="4242 4242 4242 4242"/></label><div><label>Expiration<input defaultValue="08/29"/></label><label>CVV<input defaultValue="123"/></label></div><label>Name on card<input defaultValue="Alex Morgan"/></label><div className="android-payment-safe"><ShieldCheck/><span><b>Your payment is protected</b><small>Prototype only. No payment is processed.</small></span></div></section>}<div className="android-checkout-sticky"><div><span>Estimated total</span><strong>${(subtotal+8.79).toFixed(2)}</strong></div><button onClick={()=>step<3?setStep(value=>value+1):go('complete')}>{step<3?'Continue':'Place secure order'} <ArrowRight/></button></div></>;
  const complete=<section className="android-complete"><span><ShieldCheck/></span><h1>Order confirmed</h1><p>Your prototype order has been placed successfully.</p><b>Order #DK-208614</b><button onClick={()=>{setCart({});setTrail([]);setScreen('home')}}>Continue shopping</button></section>;
  const shop=<section className="android-shop-hub"><div className="android-shop-tabs">{Object.keys(departmentL2).map(name=><button className={shopDepartment===name?'active':''} onClick={()=>setShopDepartment(name)} key={name}>{name==='Most popular'?<Star/>:<img src={categories.find(item=>item[0]===name)?.[1]||'/android-shop.jpg'} alt=""/>}<span>{name}</span></button>)}</div><div className="android-shop-results"><div className="android-section-title"><div><h2>{shopDepartment}</h2><p>Browse products by category</p></div></div><div>{departmentL2[shopDepartment].map((name,index)=><button key={name} onClick={()=>name.includes('Shower Door')||shopDepartment==='Bathroom'?go(name==='Shower Door Handles and Knobs'?'handles':'bathroom'):triggerPrototype(`${name} opened`)}><span><img src={showerHandleCategoryImages[showerHandleCategories[index%9]]} alt=""/></span><b>{name}</b></button>)}</div></div></section>;
  const quote=quoteSent?<section className="android-quote-success"><span><ShieldCheck/></span><h1>Quote request received</h1><p>A DK project specialist will contact you within one business day.</p><button onClick={()=>setQuoteSent(false)}>Start another quote</button></section>:<form className="android-quote-form" onSubmit={event=>{event.preventDefault();setQuoteSent(true)}}><section><h2>What do you need?</h2><p>Send a product list for volume pricing and sourcing support.</p><label>Product or general description<input required defaultValue="Shower door hardware for commercial project"/></label><div><label>Part number<input placeholder="Optional"/></label><label>Quantity<input type="number" min="1" defaultValue="10"/></label></div><label className="android-quote-upload"><Upload/><span><b>Upload your list or photos</b><small>PDF, spreadsheet, JPG or PNG</small></span><input type="file" multiple/></label></section><section><h2>Contact information</h2><label>Name<input required defaultValue="Alex Morgan"/></label><label>Company<input defaultValue="Morgan Contracting LLC"/></label><label>Work email<input required type="email" defaultValue="buyer@company.com"/></label><label>Phone<input required defaultValue="+1 305 555 0184"/></label><label>Project details<textarea placeholder="Timeline, finishes, delivery requirements..."/></label></section><button type="submit">Submit quote request <ArrowRight/></button></form>;
  const support=<><section className="android-support-hero"><Headphones/><h1>How can we help?</h1><p>Connect with a real hardware specialist.</p></section><section className="android-support-actions"><a href="tel:+18775098040"><Phone/><span><b>Call project support</b><small>+1 877 509 8040</small></span><ChevronRight/></a><a href="mailto:cs@dkhardware.com"><Mail/><span><b>Email support</b><small>cs@dkhardware.com</small></span><ChevronRight/></a><button onClick={()=>triggerPrototype('Android live chat opened')}><MessageCircle/><span><b>Start live chat</b><small>Average reply in under 2 minutes</small></span><ChevronRight/></button></section><section className="android-support-topics"><h2>Popular help topics</h2>{['Track an order','Returns and refunds','Product compatibility','Shipping information','Business account help'].map(topic=><button key={topic} onClick={()=>triggerPrototype(`${topic} opened`)}>{topic}<ChevronRight/></button>)}</section></>;  const screens={home,shop,bathroom,handles,knobs,product:pdp,cart:cartPage,checkout,complete,quote,support},titles={bathroom:'Bathroom',handles:'Handles & knobs',knobs:'Shower door knobs',product:'Product details',cart:'Your cart',checkout:'Secure checkout',shop:'Shop departments',quote:'Request a quote',support:'Support'};
  return <div className="phone-shell android-phone-shell"><div className="android-app"><div className="android-status" onPointerDown={event=>notificationDrag.current=event.clientY} onPointerUp={event=>{if(event.clientY-notificationDrag.current>18)setNotificationDrawer(true)}}><b>4:30</b><button className="android-status-notice" onClick={()=>setNotificationDrawer(true)} aria-label="Open notifications"><img src="/labor-day-app-icon.png" alt=""/><i/></button><span>5G&nbsp; 82%</span></div>{screen!=='home'&&<header className="android-header"><button onClick={back}><ArrowLeft/></button><div className="android-header-search"><Search/><input placeholder="Search DK Hardware"/><button><Camera/></button></div><button className="android-cart" onClick={()=>go('cart')}><ShoppingCart/>{count>0&&<i>{count}</i>}</button></header>}{!['home','complete'].includes(screen)&&<div className="android-page-bar"><span>{titles[screen]}</span></div>}<div className={`android-content android-screen-${screen}`}>{screens[screen]}</div>{!['product','checkout','complete'].includes(screen)&&<nav className="android-nav"><button className={screen==='home'?'active':''} onClick={()=>{setTrail([]);setScreen('home')}}><Home/><span>Home</span></button><button className={['shop','bathroom','handles','knobs'].includes(screen)?'active':''} onClick={()=>go('shop')}><Grid2X2/><span>Shop</span></button><button className={screen==='quote'?'active':''} onClick={()=>go('quote')}><FileText/><span>Quote</span></button><button className={screen==='support'?'active':''} onClick={()=>go('support')}><Headphones/><span>Support</span></button><button className={screen==='cart'?'active':''} onClick={()=>go('cart')}><ShoppingCart/><span>Cart</span>{count>0&&<i>{count}</i>}</button></nav>}{loading&&<div className="android-loading"><span className="android-loader-ring"/><b>Loading DK Hardware</b></div>}{notificationDrawer&&<div className="android-notification-drawer"><button className="android-drawer-backdrop" onClick={()=>setNotificationDrawer(false)}/><div><header><span><b>4:30</b><small>Tue, Aug 25</small></span><button onClick={()=>setNotificationDrawer(false)}><X/></button></header><section><div className="android-notice-app"><img src="/android-shop.jpg" alt="DK Hardware app"/><span><b>DK Hardware</b><small>now</small></span></div><h2>Save $45 sitewide</h2><p>Labor Day savings are live across select hardware and tools.</p><img className="android-notice-banner" src="/labor-day-app-icon.png" alt="Labor Day sale"/><footer><button onClick={()=>{setNotificationDrawer(false);go('shop')}}>Shop now</button><button onClick={()=>setNotificationDrawer(false)}>Dismiss</button></footer></section><button className="android-clear-notices" onClick={()=>setNotificationDrawer(false)}>Clear all</button></div></div>}<div className="android-system-nav"><span/><b/><i/></div></div></div>;
}

function App() {
  const categoryRail = useRef(null);
  const categoryDrag = useRef({ dragging: false, moved: false, startX: 0, scrollLeft: 0 });
  const productRail = useRef(null);
  const productDrag = useRef({ dragging: false, startX: 0, scrollLeft: 0 });
  const [activeCategory, setActiveCategory] = useState('Marine & Boats');
  const [activeProduct,setActiveProduct] = useState(showerKnobProducts[0]);
  const [page, setPage] = useState('home');
  const [homeCart,setHomeCart] = useState([]);
  const [homeQuantities,setHomeQuantities] = useState({});
  const [homeCommerceStep,setHomeCommerceStep] = useState(null);
  const [homeJustAdded,setHomeJustAdded] = useState(null);
  const [homeFulfillment,setHomeFulfillment] = useState('delivery');
  const homeCartProducts=homeCatalog.filter(product=>homeCart.includes(product.item)).map(product=>({...product,price:product.priceValue}));
  const homeCartTotal=homeCartProducts.reduce((total,product)=>total+product.price*(homeQuantities[product.item]||1),0);
  const homeCartCount=homeCartProducts.reduce((total,product)=>total+(homeQuantities[product.item]||1),0);
  const addHomeProduct=product=>{setHomeCart(items=>items.includes(product.item)?items:[...items,product.item]);setHomeQuantities(current=>({...current,[product.item]:(current[product.item]||0)+1}));setHomeJustAdded({...product,price:product.priceValue});setHomeCommerceStep('added')};
  const updateHomeQuantity=(item,change)=>setHomeQuantities(current=>({...current,[item]:Math.max(1,(current[item]||1)+change)}));
  const removeHomeItem=item=>{setHomeCart(items=>items.filter(value=>value!==item));setHomeQuantities(current=>{const next={...current};delete next[item];return next})};
  const startCategoryDrag = (event) => {
    if (event.pointerType === 'touch') return;
    const rail = categoryRail.current;
    categoryDrag.current = { dragging: true, moved: false, startX: event.clientX, scrollLeft: rail.scrollLeft };
  };
  const moveCategoryDrag = (event) => {
    const drag = categoryDrag.current;
    if (!drag.dragging) return;
    const distance = event.clientX - drag.startX;
    if (Math.abs(distance) > 4) drag.moved = true;
    categoryRail.current.scrollLeft = drag.scrollLeft - distance;
  };
  const endCategoryDrag = (event) => {
    categoryDrag.current.dragging = false;
  };
  const startProductDrag = event => {
    if (event.pointerType === 'touch') return;
    productDrag.current = { dragging: true, startX: event.clientX, scrollLeft: productRail.current.scrollLeft };
  };
  const moveProductDrag = event => {
    if (!productDrag.current.dragging) return;
    productRail.current.scrollLeft = productDrag.current.scrollLeft - (event.clientX - productDrag.current.startX);
  };
  const endProductDrag = () => { productDrag.current.dragging = false; };

  if (page === 'bathroom') return <BathroomPage onBack={() => setPage('home')} onOpenHandles={() => setPage('shower-handles')} onQuote={()=>setPage('quote')}/>;
  if (page === 'shower-handles') return <ShowerHandlesPage onBack={() => setPage('bathroom')} onHome={() => setPage('home')} onOpenKnobs={() => setPage('shower-knobs')} onQuote={()=>setPage('quote')}/>;
  if (page === 'shower-knobs') return <ShowerKnobsPage onBack={() => setPage('shower-handles')} onHome={() => setPage('home')} onQuote={()=>setPage('quote')} onOpenProduct={product=>{setActiveProduct(product);setPage('product')}}/>;
  if (page === 'product') return <ProductDetailPage product={activeProduct} onBack={()=>setPage('shower-knobs')} onHome={()=>setPage('home')} onQuote={()=>setPage('quote')}/>;
  if (page === 'quote') return <RequestQuotePage onBack={()=>setPage('home')} onHome={()=>setPage('home')}/>;

  return <main className="stage dual-preview-stage">
    <div className="phone-shell web-phone-shell">
      <div className="speaker"></div>
      <div className="app">
        <BrowserChromeBar/>
        <header className="header">
          <div className="top-row"><button className="icon-button" onClick={()=>triggerPrototype('Menu opened','menu')}><Menu /></button><a className="logo" href="#" onClick={event=>event.preventDefault()} aria-label="DK Hardware home"><img className="dk-main-logo" src="https://dkstatic.blob.core.windows.net/static/dkh/dkhardware-logo.svg" alt="DK Hardware"/><img className="years-badge" src="https://dkstatic.blob.core.windows.net/static/icons/20-years-badge.svg" alt="Celebrating 20 years"/></a><div className="header-actions"><button className="icon-button cart-icon" onClick={()=>setHomeCommerceStep('cart')} aria-label={`Cart with ${homeCartCount} items`}><ShoppingCart/>{homeCartCount>0&&<i>{homeCartCount}</i>}</button></div></div>
          <SearchBar/>
        </header>

        <div className="app-content">
          <section className="category-section">
            <div className="section-title"><h2>Shop departments</h2><button onClick={()=>categoryRail.current.scrollTo({left:categoryRail.current.scrollWidth,behavior:'smooth'})}>See all <ChevronRight size={16}/></button></div>
            <div className="category-slider">
              <div className="category-rail" ref={categoryRail} onPointerDown={startCategoryDrag} onPointerMove={moveCategoryDrag} onPointerUp={endCategoryDrag} onPointerLeave={endCategoryDrag} onPointerCancel={endCategoryDrag}>{categories.map(([name, image]) => <button className={`category ${activeCategory === name ? 'selected' : ''}`} key={name} onClick={(event) => { if (categoryDrag.current.moved) return; if(name === 'Bathroom') { setActiveCategory(name); setPage('bathroom'); return; } setActiveCategory(name); event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' }); triggerPrototype(`${name} selected`); }}><span><img src={image} alt="" draggable="false" /></span><b>{name}</b></button>)}</div>
            </div>
          </section>

          <PromoCarousel/>

          <section className="benefits">
            <div><RotateCcw/><span><b>30-day</b> easy returns</span></div>
            <div><Truck/><span><b>Fast</b> delivery</span></div>
            <div><ShieldCheck/><span><b>Secure</b> checkout</span></div>
          </section>

          <section>
            <div className="section-title"><h2>Shop by brand</h2><button onClick={()=>triggerPrototype('All brands opened')}>See all <ChevronRight size={16}/></button></div>
            <div className="brand-rail">{brands.map(([name, image], i) => <button className="brand" key={image} onClick={()=>triggerPrototype(`${name} selected`)}><img src={image} alt={name} draggable="false" /></button>)}</div>
          </section>

          <section className="deal">
            <div><span>DEAL OF THE WEEK</span><h2>Make a splash.</h2><p>Save 15% on marine equipment & tools.</p><button onClick={()=>triggerPrototype('Deal products opened')}>Shop the deal</button></div>
            <img src="https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=650&q=80" alt="Boat at a dock"/>
          </section>

          <section>
            <div className="section-title"><h2>Today's popular picks</h2><button onClick={()=>triggerPrototype('All popular products opened')}>See all <ChevronRight size={16}/></button></div>
            <div className="product-rail" ref={productRail} onPointerDown={startProductDrag} onPointerMove={moveProductDrag} onPointerUp={endProductDrag} onPointerLeave={endProductDrag} onPointerCancel={endProductDrag}>{homeCatalog.map(product => <ProductCard key={product.name} product={product} onAdd={addHomeProduct} inCart={homeCart.includes(product.item)}/>)}</div>
          </section>

          <section className="audience">
            <div className="section-title audience-title"><h2>Fix it, build it, boss it â€” <em>DK delivers it!</em></h2></div>
            <div className="audience-grid">{audiences.map(([name, image]) => <button className="audience-card" key={name} onClick={()=>triggerPrototype(`${name} solutions opened`)}><img src={image} alt=""/><b>{name}</b></button>)}</div>
          </section>

          <section className="trust"><ShieldCheck/><div><h2>Trust usâ€”we've got you covered.</h2><p>Five-star service, secure payments and expert support.</p></div></section>

          <section className="projects">
            <div className="section-title project-heading"><div><small>DK PROJECT DESK</small><h2>Commercial projects, simplified</h2></div><button onClick={()=>triggerPrototype('Project desk opened','quote')}>Explore <ChevronRight size={16}/></button></div>
            <div className="project-card project-card-v5"><div className="project-feature"><div className="project-feature-copy"><span>FOR BUSINESS</span><h3>The right hardware.<br/>The right price.</h3><p>Send us your list and let our project team take it from there.</p></div><img src="/banners/volume-purchasing.jpg" alt="Commercial hardware order being prepared"/></div><div className="project-action-panel"><div className="project-mini-benefits"><span><Search/><b>Source</b><small>Hard-to-find parts</small></span><span><FileText/><b>Price</b><small>Volume orders</small></span><span><Headphones/><b>Support</b><small>Real specialists</small></span></div><div className="project-actions"><button onClick={()=>triggerPrototype('Quote form opened','quote')}>Start a quote <ArrowRight/></button><button className="project-call" onClick={()=>{window.location.href='tel:+18775098040'}}><Phone/> Call project desk</button></div></div></div>
            <div className="best-sellers-section embedded-best-sellers"><div className="section-title"><div><small>POPULAR WITH PROS</small><h2>Best sellers</h2></div><button onClick={()=>triggerPrototype('All best sellers opened')}>See all <ChevronRight size={16}/></button></div><DraggableProductRail items={homeCatalog.slice(0, 5)} className="best-sellers-rail" onAdd={addHomeProduct} cartItems={homeCart}/></div>
            <div className="all-categories-modern"><div className="section-title"><h2>All categories</h2><button onClick={()=>triggerPrototype('All departments opened')}>See all <ChevronRight size={16}/></button></div><div className="modern-category-grid">{categories.map(([name,image], index)=><button className={`modern-category-card category-tone-${index%4}`} key={name} onClick={()=>{if(name==='Bathroom')setPage('bathroom');else triggerPrototype(`${name} selected`)}}><span className="modern-category-name">{name}</span><img src={image} alt=""/><span className="modern-category-arrow"><ChevronRight/></span></button>)}</div></div>
            <div className="purchase-options-head"><div><small>FLEXIBLE PURCHASING</small><h3>Ways to buy</h3></div><button onClick={()=>triggerPrototype('Business purchasing options opened')}>Learn more <ChevronRight/></button></div>
            <div className="purchase-options">
              <button className="purchase-card terms-card" onClick={()=>triggerPrototype('Business payment terms selected','quote')}><span className="purchase-icon"><FileText/></span><span className="purchase-copy"><b>Business payment terms</b><small>For qualified business and government accounts</small></span><strong>NET 30</strong><ChevronRight/></button>
              <button className="purchase-card finance-card" onClick={()=>triggerPrototype('Financing details opened')}><span className="purchase-icon"><RotateCcw/></span><span className="purchase-copy"><b>Flexible financing</b><small>Spread the cost of eligible purchases</small></span><strong>12 MO</strong><ChevronRight/></button>
              <button className="purchase-card sale-card" onClick={()=>triggerPrototype('Current specials opened')}><span className="purchase-icon"><ShoppingCart/></span><span className="purchase-copy"><b>Current specials</b><small>Limited-time offers on selected products</small></span><strong>SALE</strong><ChevronRight/></button>
            </div>
          </section>

          <TopRatedCategories onAdd={addHomeProduct} cartItems={homeCart}/>

          <ReviewsSection/>

          <SiteFooter/>
        </div>

        {homeCommerceStep==='added'&&homeJustAdded&&<AddedCartPanel product={homeJustAdded} recommendations={homeCatalog.filter(product=>product.item!==homeJustAdded.item&&!homeCart.includes(product.item)).slice(0,2).map(product=>({...product,price:product.priceValue}))} subtotal={homeCartTotal} onClose={()=>setHomeCommerceStep(null)} onViewCart={()=>setHomeCommerceStep('cart')} onCheckout={()=>setHomeCommerceStep('checkout')} onAdd={item=>{const product=homeCatalog.find(value=>value.item===item);if(product)addHomeProduct(product)}}/>}
        {homeCommerceStep==='cart'&&<ShoppingCartPanel products={homeCartProducts} quantities={homeQuantities} subtotal={homeCartTotal} fulfillment={homeFulfillment} onFulfillment={setHomeFulfillment} onQuantity={updateHomeQuantity} onRemove={removeHomeItem} onClose={()=>setHomeCommerceStep(null)} onCheckout={()=>setHomeCommerceStep('checkout')}/>} 
        {homeCommerceStep==='checkout'&&<CheckoutPanel subtotal={homeCartTotal} fulfillment={homeFulfillment} onClose={()=>setHomeCommerceStep('cart')} onComplete={()=>setHomeCommerceStep('complete')}/>} 
        {homeCommerceStep==='complete'&&<div className="commerce-sheet order-complete"><div><ShieldCheck/><h2>Order confirmed</h2><p>Your prototype order has been placed successfully.</p><button onClick={()=>{setHomeCart([]);setHomeQuantities({});setHomeCommerceStep(null)}}>Continue shopping</button></div></div>}
        <AppNav active={homeCommerceStep==='cart'?'cart':'home'} onHome={() => setPage('home')} onCart={()=>setHomeCommerceStep('cart')} onQuote={()=>setPage('quote')} onShopCategory={(department,item)=>{if(department==='Bathroom'||item.includes('Shower Door'))setPage(item==='Shower Door Handles and Knobs'?'shower-handles':'bathroom');else triggerPrototype(`${item} selected`)}} cartCount={homeCartCount}/>
      </div>
    </div>
    <AndroidPreview/>
  </main>
}

createRoot(document.getElementById('root')).render(<App/>);
