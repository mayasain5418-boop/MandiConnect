import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, Award, Sparkles, ChevronRight, Zap, TrendingUp, FileText, CheckCircle2, Store } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import API from '../api/client';
import { resolveMediaUrl, DEFAULT_CATEGORY_IMAGE } from '../utils/media';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, featRes, bestRes] = await Promise.all([
                    API.get('/categories'),
                    API.get('/products?featured=true&limit=8'),
                    API.get('/products?best_seller=true&limit=8')
                ]);

                if (catRes.data.success) setCategories(catRes.data.categories);
                if (featRes.data.success) setFeaturedProducts(featRes.data.products);
                if (bestRes.data.success) setBestSellers(bestRes.data.products);
            } catch (error) {
                console.error('Home data fetch error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-16 pb-20">
            {/* Hero Section */}
            <section className="relative mandi-hero-pattern text-white py-16 lg:py-24 rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 shadow-2xl border border-emerald-900/80 mt-4">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-amber-300 text-xs font-black uppercase tracking-wider shadow-inner">
                            <Sparkles className="w-4 h-4 text-amber-400" /> Enterprise B2B Wholesale Marketplace
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif leading-tight text-white tracking-tight">
                            Farm-Fresh Produce <br />
                            <span className="text-[#E67E22]">Direct From Mandi</span>
                        </h1>
                        <p className="text-sm sm:text-base text-emerald-100/90 max-w-lg leading-relaxed font-light">
                            Connect direct with verified APMC farmers & Mandi vendors. Source vegetables, fruits, and grains at authentic wholesale prices with zero middleman markup.
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link
                                to="/products"
                                className="px-8 py-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold text-sm rounded-full shadow-lg hover:shadow-2xl transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                            >
                                Browse Wholesale Produce <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/category/vegetables"
                                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full border border-white/20 transition-all backdrop-blur-md"
                            >
                                Fresh Vegetables
                            </Link>
                        </div>

                        {/* Mandi Trust Statistics */}
                        <div className="pt-8 border-t border-emerald-800/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                            <div>
                                <h3 className="text-2xl font-black text-white">0%</h3>
                                <p className="text-xs text-emerald-300/80 font-medium">Middleman Markup</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-amber-300">₹ Daily</h3>
                                <p className="text-xs text-emerald-300/80 font-medium">APMC Rate Updates</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white">100%</h3>
                                <p className="text-xs text-emerald-300/80 font-medium">GST Invoiced</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Visual Mockup Highlight */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md bg-gradient-to-b from-white/15 to-white/5 p-5 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-4/3">
                                <img
                                    src="https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80"
                                    alt="Fresh Vegetables Mandi Lot"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-[#0D2818]/90 text-amber-300 text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border border-emerald-800">
                                    Direct Mandi Lot #402
                                </div>
                            </div>

                            <div className="mt-4 bg-white/95 text-gray-900 p-4 rounded-2xl shadow-xl border border-white/40 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#164E33] flex items-center justify-center font-bold">
                                        <Leaf className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900">Nashik Red Onions (Grade A)</p>
                                        <p className="text-xs text-gray-500 font-medium">MOQ: 50 kg • APMC Rate</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-base font-black text-[#164E33]">₹28.00<span className="text-xs font-normal text-gray-500">/kg</span></span>
                                    <span className="text-[10px] text-emerald-700 font-bold block bg-emerald-50 px-2 py-0.5 rounded">Saved 22%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Project Pillars Focus Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <span className="text-xs font-black uppercase tracking-widest text-[#E67E22]">Core Mandi Platform Features</span>
                    <h2 className="text-3xl font-black text-[#0D2818] font-serif mt-1">Built For Wholesale Buyers & Farmers</h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                        Streamlined direct sourcing, real-time APMC pricing, visual order tracking, and GST tax invoicing.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:border-[#164E33] transition-all card-hover-elevation space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#164E33] flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-[#164E33]" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Live APMC Mandi Ticker</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Track live commodity market rates updated direct from regional APMC mandi auctions in real time.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:border-[#164E33] transition-all card-hover-elevation space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#E67E22] flex items-center justify-center">
                            <Store className="w-6 h-6 text-[#E67E22]" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Wholesale Tiered Pricing</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Transparent Minimum Order Quantity (MOQ) rules and bulk volume discounts tailored for HORECA and retailers.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:border-[#164E33] transition-all card-hover-elevation space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#164E33] flex items-center justify-center">
                            <Truck className="w-6 h-6 text-[#164E33]" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Live Visual Order Stepper</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Monitor shipment progress step-by-step from Mandi Packing to District Express Delivery.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs hover:border-[#164E33] transition-all card-hover-elevation space-y-3">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
                            <FileText className="w-6 h-6 text-blue-700" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Automated GST Invoices</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">
                            Compliant B2B tax invoices generated automatically with downloadable PDF credit notes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#164E33]">Mandi Produce Catalog</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0D2818]">Explore Categories</h2>
                    </div>
                    <Link to="/products" className="text-xs font-bold text-[#164E33] hover:text-[#E67E22] flex items-center gap-1 transition-colors">
                        View All Categories <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {categories.map(cat => (
                        <Link
                            key={cat.id}
                            to={`/category/${cat.slug}`}
                            className="group bg-white p-4 rounded-3xl border border-gray-200 hover:border-[#164E33] hover:shadow-lg transition-all text-center flex flex-col items-center card-hover-elevation"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#F0F4EE] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform overflow-hidden border border-emerald-100">
                                {cat.image ? (
                                    <img
                                        src={resolveMediaUrl(cat.image)}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = DEFAULT_CATEGORY_IMAGE;
                                        }}
                                    />
                                ) : (
                                    <Leaf className="w-8 h-8 text-[#164E33]" />
                                )}
                            </div>
                            <h3 className="text-xs font-bold text-gray-800 group-hover:text-[#164E33] line-clamp-2">
                                {cat.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Mandi Produce Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#E67E22]">Fresh Direct Arrivals</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0D2818]">Featured Wholesale Produce</h2>
                    </div>
                    <Link to="/products?featured=true" className="text-xs font-bold text-[#164E33] hover:underline flex items-center gap-1">
                        Explore All Featured <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-72 skeleton rounded-3xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>

            {/* Promotional Wholesale Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-[#0D2818] via-[#164E33] to-[#248A68] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-emerald-800">
                    <div className="space-y-3 text-center md:text-left">
                        <span className="px-3.5 py-1 bg-[#E67E22] text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm">
                            Wholesale Seasonal Discount
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black font-serif text-white">Flat 20% OFF On Bulk Farm Greens</h2>
                        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                            Use wholesale discount coupon code <span className="font-mono font-bold text-amber-300 bg-black/40 px-2.5 py-1 rounded-md border border-amber-400/30">FRESH20</span> during checkout.
                        </p>
                    </div>
                    <Link
                        to="/category/organic-products"
                        className="px-8 py-4 bg-[#E67E22] hover:bg-[#D35400] text-white font-extrabold text-sm rounded-full shadow-lg transition-all shrink-0 hover:scale-105"
                    >
                        Claim Wholesale Offer
                    </Link>
                </div>
            </section>

            {/* Best Selling Staples */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Highest Demand Lots</span>
                        <h2 className="text-2xl sm:text-3xl font-black text-[#0D2818]">Best Selling Mandi Staples</h2>
                    </div>
                    <Link to="/products?sort=popular" className="text-xs font-bold text-[#164E33] hover:underline flex items-center gap-1">
                        View Popular Items <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>
        </div>
    );
}
