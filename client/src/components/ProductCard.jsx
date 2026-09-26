import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { resolveMediaUrl } from '../utils/media';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
    const [adding, setAdding] = useState(false);

    const inWishlist = isInWishlist(product.id);

    const effectivePrice = product.discount_price ? parseFloat(product.discount_price) : parseFloat(product.price);
    const originalPrice = parseFloat(product.price);
    const availableStock = product.available_stock ?? product.stock_quantity ?? 0;
    const moq = product.minimum_order_quantity || 1;
    const isOutOfStock = availableStock <= 0;
    const belowMoqStock = !isOutOfStock && availableStock < moq;
    const canOrder = !isOutOfStock && !belowMoqStock;

    const handleCartClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canOrder || adding) return;
        setAdding(true);
        await addToCart(product.id, moq);
        setAdding(false);
    };

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWishlist) {
            await removeFromWishlist(product.id);
        } else {
            await addToWishlist(product.id);
        }
    };

    return (
        <div className="group relative bg-white rounded-3xl border border-gray-200 card-hover-elevation flex flex-col overflow-hidden shadow-xs">
            {/* Top Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                {product.discount_percentage > 0 && (
                    <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-[#E67E22] text-white shadow-sm">
                        {product.discount_percentage}% OFF
                    </span>
                )}
                {product.is_best_seller === 1 && (
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#0D2818] text-amber-300 border border-emerald-800">
                        Top Seller
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <button
                onClick={handleWishlistToggle}
                className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    inWishlist
                        ? 'bg-rose-50 text-rose-600 shadow-md ring-2 ring-rose-200'
                        : 'bg-white/90 backdrop-blur-md text-gray-400 hover:text-rose-500 hover:bg-white shadow-xs'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Product Image Link */}
            <Link to={`/products/${product.slug || product.id}`} className="block relative aspect-4/3 bg-[#F8FAF7] overflow-hidden">
                <img
                    src={resolveMediaUrl(product.thumbnail) || 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                
                {/* APMC Mandi Badge Overlay */}
                <div className="absolute bottom-2 left-2 bg-[#0D2818]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Mandi Verified
                </div>

                {isOutOfStock && (
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-3.5 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-full uppercase tracking-wider shadow-lg">
                            Out of Stock
                        </span>
                    </div>
                )}
                {belowMoqStock && (
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xs flex items-center justify-center">
                        <span className="px-3 py-1 bg-amber-600 text-white font-bold text-xs rounded-full uppercase tracking-wider text-center shadow-lg">
                            Below MOQ Stock
                        </span>
                    </div>
                )}
            </Link>

            {/* Product Content */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                    {/* Category & Weight Pill */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1 font-medium">
                        <span className="truncate max-w-[120px] font-semibold text-emerald-800">{product.category_name || 'Mandi Item'}</span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F0F4EE] text-[#164E33] text-[10px] font-bold border border-emerald-100">
                            {product.weight || product.unit}
                        </span>
                    </div>

                    {/* Product Name */}
                    <Link to={`/products/${product.slug || product.id}`} className="block">
                        <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#164E33] line-clamp-2 transition-colors leading-snug">
                            {product.name}
                        </h3>
                    </Link>

                    {/* Rating Stars */}
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map(star => (
                                <Star
                                    key={star}
                                    className={`w-3.5 h-3.5 ${
                                        star <= Math.round(product.avg_rating || 4.5)
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="text-[11px] font-bold text-gray-500 ml-1">
                            ({product.review_count || 12})
                        </span>
                    </div>

                    {/* Wholesale Key Highlights — MOQ & Stock Availability */}
                    <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#C0392B] text-[10px] font-extrabold border border-amber-200 shadow-2xs">
                            MOQ: {moq} {product.unit}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            belowMoqStock || isOutOfStock
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}>
                            {availableStock} {product.unit} available
                        </span>
                    </div>
                </div>

                {/* Pricing & Add to Cart Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-base font-black text-[#0D2818]">
                                ₹{effectivePrice.toFixed(2)}
                            </span>
                            <span className="text-[11px] text-gray-500 font-semibold">
                                /{product.unit}
                            </span>
                        </div>
                        {product.discount_price && (
                            <span className="text-xs text-gray-400 line-through block">
                                ₹{originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleCartClick}
                        disabled={!canOrder || adding}
                        title={belowMoqStock ? `Only ${availableStock} ${product.unit} left — below the ${moq} ${product.unit} MOQ` : undefined}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                            !canOrder
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                : 'bg-[#164E33] text-white hover:bg-[#0D2818] active:scale-95 shadow-md'
                        }`}
                    >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        {adding ? 'Adding...' : `Add ${moq}`}
                    </button>
                </div>
            </div>
        </div>
    );
}