import React, { useEffect, useState } from "react";
import { TrendingUp, Activity, Sparkles } from "lucide-react";
import api from "../api/client";

// Signature Mandi Ticker: Displays live mandi prices & APMC market rates 
// from actual listed products, giving wholesale buyers instant price visibility.
const RateTicker = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        api.get("/products")
            .then(({ data }) => {
                if (Array.isArray(data)) {
                    setItems(data.slice(0, 15));
                } else if (data.success && Array.isArray(data.products)) {
                    setItems(data.products.slice(0, 15));
                }
            })
            .catch(() => setItems([]));
    }, []);

    if (items.length === 0) return null;

    const loopItems = [...items, ...items];

    return (
        <div className="ticker-container shadow-inner">
            <div className="max-w-7xl mx-auto flex items-center">
                {/* Live Badge */}
                <div className="bg-[#E67E22] text-white text-[11px] font-extrabold uppercase px-3 py-2 flex items-center gap-1.5 shrink-0 z-10 shadow-md tracking-wider">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                    <Activity className="w-3.5 h-3.5" />
                    <span>Live Mandi Rates</span>
                </div>

                {/* Marquee Track */}
                <div className="overflow-hidden flex-1 py-1.5">
                    <div className="ticker-track">
                        {loopItems.map((p, i) => {
                            const price = Number(p.discount_price || p.price_per_unit || p.price || 0);
                            const unit = p.unit || 'kg';
                            const moq = p.minimum_order_quantity || 1;

                            return (
                                <div
                                    key={`${p.id}-${i}`}
                                    className="inline-flex items-center gap-2 text-xs text-emerald-100/90 bg-white/5 hover:bg-white/10 px-3 py-1 rounded-full border border-white/10 transition-colors cursor-pointer"
                                >
                                    <span className="font-semibold text-white">{p.name}</span>
                                    <span className="text-amber-300 font-bold font-mono">
                                        ₹{price.toFixed(0)}/{unit}
                                    </span>
                                    <span className="text-[10px] text-emerald-300/80 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                                        MOQ: {moq}
                                    </span>
                                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RateTicker;