import React from 'react';
import { Check, Clock, Package, Truck, CheckCircle2, AlertTriangle, MapPin, Sparkles } from 'lucide-react';

const STEPS = [
    { key: 'Pending', label: 'Order Placed', icon: Clock },
    { key: 'Confirmed', label: 'APMC Confirmed', icon: CheckCircle2 },
    { key: 'Packed', label: 'Mandi Packed', icon: Package },
    { key: 'Shipped', label: 'In Transit', icon: Truck },
    { key: 'Out for Delivery', label: 'Out for Delivery', icon: MapPin },
    { key: 'Delivered', label: 'Delivered', icon: Check }
];

export default function OrderTrackerStepper({ currentStatus, history = [] }) {
    if (['Cancelled', 'Returned', 'Refunded'].includes(currentStatus)) {
        return (
            <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-4 text-rose-800 shadow-xs">
                <AlertTriangle className="w-8 h-8 shrink-0 text-rose-600" />
                <div>
                    <h4 className="text-base font-bold">Order {currentStatus}</h4>
                    <p className="text-xs text-rose-600 mt-1">
                        This order has been {currentStatus.toLowerCase()}. Contact support if you need further assistance with your shipment.
                    </p>
                </div>
            </div>
        );
    }

    const currentStepIndex = STEPS.findIndex(s => s.key === currentStatus);
    const activeIndex = currentStepIndex >= 0 ? currentStepIndex : 0;

    const historyMap = {};
    history.forEach(h => {
        historyMap[h.status] = h.created_at;
    });

    return (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#E67E22]" />
                    <h3 className="text-base font-bold text-[#0D2818]">Visual Mandi Dispatch Tracker</h3>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 bg-emerald-100 text-[#164E33] rounded-full border border-emerald-200">
                    Status: {currentStatus}
                </span>
            </div>

            {/* Desktop Horizontal Stepper */}
            <div className="hidden md:block relative py-4">
                {/* Connecting Line */}
                <div className="absolute top-9 left-10 right-10 h-1.5 bg-gray-100 rounded-full z-0">
                    <div
                        className="h-full bg-gradient-to-r from-[#164E33] to-[#248A68] rounded-full transition-all duration-500 shadow-xs"
                        style={{
                            width: `${(activeIndex / (STEPS.length - 1)) * 100}%`
                        }}
                    />
                </div>

                <div className="relative z-10 flex justify-between">
                    {STEPS.map((step, idx) => {
                        const isCompleted = idx <= activeIndex;
                        const isCurrent = idx === activeIndex;
                        const StepIcon = step.icon;
                        const timestamp = historyMap[step.key];

                        return (
                            <div key={step.key} className="flex flex-col items-center text-center max-w-[110px]">
                                <div
                                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                                        isCompleted
                                            ? 'bg-[#164E33] text-white shadow-md ring-4 ring-emerald-100'
                                            : 'bg-white border-2 border-gray-200 text-gray-400'
                                    } ${isCurrent ? 'scale-110 ring-4 ring-amber-200 bg-[#E67E22] text-white' : ''}`}
                                >
                                    <StepIcon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-bold mt-3 ${isCompleted ? 'text-[#0D2818]' : 'text-gray-400'}`}>
                                    {step.label}
                                </span>
                                {timestamp && (
                                    <span className="text-[10px] text-gray-500 mt-0.5 font-medium">
                                        {new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Vertical Stepper */}
            <div className="md:hidden space-y-6 relative pl-6 border-l-2 border-emerald-200 ml-2 py-2">
                {STEPS.map((step, idx) => {
                    const isCompleted = idx <= activeIndex;
                    const isCurrent = idx === activeIndex;
                    const StepIcon = step.icon;
                    const timestamp = historyMap[step.key];

                    return (
                        <div key={step.key} className="relative flex items-start gap-4">
                            <div
                                className={`w-8 h-8 -ml-[33px] rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    isCurrent 
                                        ? 'bg-[#E67E22] text-white ring-4 ring-amber-100' 
                                        : isCompleted 
                                        ? 'bg-[#164E33] text-white' 
                                        : 'bg-gray-100 border border-gray-300 text-gray-400'
                                }`}
                            >
                                <StepIcon className="w-4 h-4" />
                            </div>
                            <div>
                                <p className={`text-xs font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                                    {step.label}
                                </p>
                                {timestamp && (
                                    <p className="text-[10px] text-gray-500 font-medium">{new Date(timestamp).toLocaleString()}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
