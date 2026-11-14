import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, ShieldCheck, Truck, Award } from 'lucide-react';
import MandiLogo from './common/MandiLogo';

export default function Footer() {
    return (
        <footer className="bg-[#0D2818] text-gray-300 pt-16 pb-8 border-t-4 border-[#E67E22]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Features Value Props */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-emerald-900/60">
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white mb-0.5">Direct Farm Harvest</h4>
                            <p className="text-xs text-emerald-200/70">Direct APMC Mandi lots</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-amber-400 shrink-0 border border-emerald-800">
                            <Truck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white mb-0.5">District Logistics</h4>
                            <p className="text-xs text-emerald-200/70">Pincode zone shipping</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800">
                            <Award className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white mb-0.5">Authentic APMC Rates</h4>
                            <p className="text-xs text-emerald-200/70">0% middleman markups</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-800">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white mb-0.5">GST Invoiced</h4>
                            <p className="text-xs text-emerald-200/70">Automated Tax PDFs & credit notes</p>
                        </div>
                    </div>
                </div>

                {/* Main Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12">
                    {/* Brand Info */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <MandiLogo variant="badge" size="md" className="shadow-md" />
                            <span className="text-2xl font-black tracking-tight text-white font-serif">
                                Mandi<span className="text-[#E67E22]">Connect</span>
                            </span>
                        </div>
                        <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
                            MandiConnect is an enterprise B2B Wholesale Marketplace connecting agricultural APMC Mandis directly with commercial buyers, hotels, caterers, and retailers with complete transparency.
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-300">
                            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 1800-MANDI-CONNECT</span>
                            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> support@mandiconnect.com</span>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Categories</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link to="/category/vegetables" className="hover:text-emerald-400 transition-colors">Fresh Vegetables</Link></li>
                            <li><Link to="/category/fruits" className="hover:text-emerald-400 transition-colors">Seasonal Fruits</Link></li>
                            <li><Link to="/category/potatoes-onions" className="hover:text-emerald-400 transition-colors">Potatoes & Onions</Link></li>
                            <li><Link to="/category/leafy-vegetables" className="hover:text-emerald-400 transition-colors">Leafy Greens</Link></li>
                            <li><Link to="/category/groceries" className="hover:text-emerald-400 transition-colors">Groceries & Flours</Link></li>
                            <li><Link to="/category/organic-products" className="hover:text-emerald-400 transition-colors">100% Organic Produce</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Quick Links</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link to="/products" className="hover:text-emerald-400 transition-colors">All Wholesale Products</Link></li>
                            <li><Link to="/cart" className="hover:text-emerald-400 transition-colors">Wholesale Order Cart</Link></li>
                            <li><Link to="/wishlist" className="hover:text-emerald-400 transition-colors">My Wishlist</Link></li>
                            <li><Link to="/orders" className="hover:text-emerald-400 transition-colors">Live Order Tracker</Link></li>
                            <li><Link to="/profile" className="hover:text-emerald-400 transition-colors">Account Profile</Link></li>
                            <li><Link to="/admin/login" className="text-amber-400 hover:underline transition-colors font-bold">Admin Portal Login</Link></li>
                        </ul>
                    </div>

                    {/* Customer Policies */}
                    <div>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Policies</h4>
                        <ul className="space-y-2.5 text-xs">
                            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
                            <li><Link to="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
                            <li><Link to="/refund-policy" className="hover:text-emerald-400 transition-colors">Refund & Return Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="pt-8 border-t border-emerald-900/60 flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
                    <p>© 2026 MandiConnect Wholesale Marketplace. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span>Razorpay B2B Secured Gateway</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
