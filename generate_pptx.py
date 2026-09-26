"""
MandiConnect - Executive PowerPoint Presentation Generator (6x6 Rule)
Generates MandiConnect_Executive_Presentation.pptx using python-pptx.
Requirements: pip install python-pptx
"""

import sys

try:
    from pptx import Presentation
    from pptx.util import Inches, Pt
    from pptx.dml.color import RGBColor
    from pptx.enum.text import PP_ALIGN
    from pptx.enum.shapes import MSO_SHAPE
except ImportError:
    print("Installing python-pptx is required to run this script: pip install python-pptx")
    sys.exit(1)

def create_presentation():
    prs = Presentation()
    # Set slide dimensions to widescreen 16:9
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette: Corporate Agri-Tech Theme
    COLOR_BG_DARK = RGBColor(15, 23, 42)       # Slate 900
    COLOR_BG_LIGHT = RGBColor(248, 250, 252)   # Slate 50
    COLOR_PRIMARY = RGBColor(16, 185, 129)     # Emerald 500
    COLOR_PRIMARY_DARK = RGBColor(6, 95, 70)   # Emerald 800
    COLOR_TEXT_MAIN = RGBColor(15, 23, 42)     # Dark slate
    COLOR_TEXT_MUTED = RGBColor(100, 116, 139) # Slate 500
    COLOR_CARD_BG = RGBColor(255, 255, 255)    # White
    COLOR_CARD_BORDER = RGBColor(226, 232, 240)# Slate 200

    slides_data = [
        {
            "type": "title",
            "tag": "EXECUTIVE PITCH DECK",
            "title": "MandiConnect Platform",
            "subtitle": "B2B Wholesale Agricultural Marketplace",
            "bullets": [
                "Direct Farmer To Commercial Marketplace",
                "Eliminating Middlemen In Agricultural Trade",
                "Real Time Inventory Dynamic Pricing",
                "Enterprise Security Scalable Cloud Architecture",
                "Automated Invoicing District Logistics Matrix",
                "High Performance React Node Architecture"
            ]
        },
        {
            "type": "standard",
            "number": "01",
            "category": "PROBLEM STATEMENT",
            "title": "Agricultural Supply Chain Inefficiencies",
            "subtitle": "Current wholesale agri-trade suffers from heavy friction and value leakage.",
            "bullets": [
                "Multi Layered Middlemen Reduce Farmer Earnings",
                "High Post Harvest Loss In Transport",
                "Opaque Wholesale Pricing Distorts Markets",
                "Fragmented Logistics Cause Delivery Delays",
                "Unreliable Cash Flow For Farmers",
                "Manual Paper Based Trade Accounting Systems"
            ]
        },
        {
            "type": "standard",
            "number": "02",
            "category": "STRATEGIC SOLUTION",
            "title": "Direct B2B Agri Wholesale Engine",
            "subtitle": "Transforming agricultural commerce through direct digital connectivity.",
            "bullets": [
                "Direct Mandi Vendor Buyer Connectivity",
                "Dynamic Tiered Bulk Pricing Models",
                "Verified District Zone Shipping Matrix",
                "Secure Digital Razorpay Payment Gateway",
                "Instant GST Compliant PDF Invoicing",
                "Multi Channel Web Android Experience"
            ]
        },
        {
            "type": "standard",
            "number": "03",
            "category": "TARGET MARKET",
            "title": "High Volume Ecosystem Partners",
            "subtitle": "Serving commercial buyers and primary agricultural producers.",
            "bullets": [
                "Farmers And Local Mandi Vendors",
                "Hotels Restaurants And Catering Businesses",
                "Bulk Agricultural Produce Commercial Buyers",
                "Institutional Food Supply Chain Managers",
                "Regional Logistics And Fleet Partners",
                "Multi City Retail Produce Distributors"
            ]
        },
        {
            "type": "standard",
            "number": "04",
            "category": "PLATFORM CAPABILITY",
            "title": "Core B2B Wholesale Features",
            "subtitle": "Built specifically for high-volume transactions and seamless buying.",
            "bullets": [
                "Tiered Volume Based Wholesale Discounts",
                "Real Time Item Stock Tracking",
                "Smart Shopping Cart Volume Calculators",
                "Multi Address Delivery Zone Matrix",
                "Automated Order Lifecycle Status Sweeps",
                "Interactive Vendor Admin Product Dashboards"
            ]
        },
        {
            "type": "standard",
            "number": "05",
            "category": "SYSTEM ARCHITECTURE",
            "title": "Enterprise Grade Tech Stack",
            "subtitle": "Modern, scalable, and resilient software architecture.",
            "bullets": [
                "React Nineteen Modern Frontend SPA",
                "Fast Vite Bundling Code Splitting",
                "Robust Node Express REST APIs",
                "Relational MySQL Eight Database Cluster",
                "Secure HTTP Only JWT Authentication",
                "Tailwind CSS Enterprise Design Tokens"
            ]
        },
        {
            "type": "standard",
            "number": "06",
            "category": "DATA & CONCURRENCY",
            "title": "High Concurrency Stock Integrity",
            "subtitle": "Enterprise-grade database safety preventing stock overselling.",
            "bullets": [
                "Row Level Select For Update Locking",
                "Atomic Stock Reservation Guard Logic",
                "Automated Expired Cart Sweep Workers",
                "Strict ACIDs Transaction Isolation Levels",
                "Zero Overselling On High Demand",
                "Idempotent Order Creation Webhook Safety"
            ]
        },
        {
            "type": "standard",
            "number": "07",
            "category": "LOGISTICS ENGINE",
            "title": "Smart District Shipping Matrix",
            "subtitle": "Regional pincode validation and automated zone fee structures.",
            "bullets": [
                "Pincode Level Delivery Serviceability Rules",
                "Dynamic Regional Zone Fee Calculations",
                "Minimum Order Free Shipping Thresholds",
                "Real Time Buyer Address Validation",
                "Multi District Fulfillment Routing Rules",
                "Integrated Dispatch Status Order Tracking"
            ]
        },
        {
            "type": "standard",
            "number": "08",
            "category": "FINANCIAL COMPLIANCE",
            "title": "Automated Payments & GST Invoices",
            "subtitle": "End-to-end digital payment verification and sequential tax invoicing.",
            "bullets": [
                "Seamless Razorpay Payment Verification Flow",
                "Webhook Signature Protection Fraud Prevention",
                "Automatic Sequential GST Invoicing Numbers",
                "Instant Compliant PDF Invoice Downloads",
                "Automated Refund Processing API Hooks",
                "Transparent Itemized Tax Breakdown Summaries"
            ]
        },
        {
            "type": "standard",
            "number": "09",
            "category": "DEVOPS & SECURITY",
            "title": "Production Container Architecture",
            "subtitle": "Containerized multi-stage deployments with hardened edge security.",
            "bullets": [
                "Multi Stage Container Build Optimization",
                "Isolated Nginx Edge Static Proxy",
                "Automated Docker Compose Service Orchestration",
                "High Efficiency Gzip Asset Compression",
                "Strict Helmet HTTP Security Headers",
                "Zero Downtime VPS PM2 Operations"
            ]
        },
        {
            "type": "standard",
            "number": "10",
            "category": "ECONOMIC IMPACT",
            "title": "Sustainable Value Creation",
            "subtitle": "Driving higher farm gate prices and reliable B2B supply chains.",
            "bullets": [
                "Fair Direct Pricing Increases Yield",
                "Commission Based B2B Marketplace Revenue",
                "Premium Vendor Visibility Subscriptions Model",
                "Logistics Freight Handling Service Fee",
                "Reduced Produce Waste Across Transport",
                "Transparent Trust Matrix For Wholesale"
            ]
        },
        {
            "type": "standard",
            "number": "11",
            "category": "STRATEGIC ROADMAP",
            "title": "Future Growth & Innovation",
            "subtitle": "Scaling technology capabilities and expanding geographic footprint.",
            "bullets": [
                "AI Driven Crop Price Forecasts",
                "Native Android iOS Mobile Apps",
                "Cold Chain Fleet Partner Integrations",
                "Multilingual Regional Voice Assistant Search",
                "Automated Escrow Payment Clearance Model",
                "Regional Mandi Expansion Across States"
            ]
        }
    ]

    blank_layout = prs.slide_layouts[6]

    for data in slides_data:
        slide = prs.slides.add_slide(blank_layout)
        
        if data["type"] == "title":
            # Title slide background: Dark Slate
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
            bg.fill.solid()
            bg.fill.fore_color.rgb = COLOR_BG_DARK
            bg.line.fill.background()

            # Green Accent bar top
            bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(0.8), Inches(1.5), Inches(0.08))
            bar.fill.solid()
            bar.fill.fore_color.rgb = COLOR_PRIMARY
            bar.line.fill.background()

            # Tag
            tx_tag = slide.shapes.add_textbox(Inches(0.8), Inches(1.1), Inches(11), Inches(0.4))
            tf_tag = tx_tag.text_frame
            p_tag = tf_tag.paragraphs[0]
            p_tag.text = data["tag"]
            p_tag.font.size = Pt(12)
            p_tag.font.bold = True
            p_tag.font.color.rgb = COLOR_PRIMARY

            # Main Title
            tx_title = slide.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(11), Inches(1.2))
            tf_title = tx_title.text_frame
            tf_title.word_wrap = True
            p_title = tf_title.paragraphs[0]
            p_title.text = data["title"]
            p_title.font.size = Pt(44)
            p_title.font.bold = True
            p_title.font.color.rgb = RGBColor(255, 255, 255)

            # Subtitle
            tx_sub = slide.shapes.add_textbox(Inches(0.8), Inches(2.7), Inches(11), Inches(0.6))
            tf_sub = tx_sub.text_frame
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = data["subtitle"]
            p_sub.font.size = Pt(20)
            p_sub.font.color.rgb = RGBColor(203, 213, 225)

            # Bullets in 2 grid columns (3 items per col) conforming to 6x6 rule
            for idx, bullet in enumerate(data["bullets"]):
                col = idx % 2
                row = idx // 2
                x = Inches(0.8 + col * 5.8)
                y = Inches(3.6 + row * 1.1)

                card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.5), Inches(0.95))
                card.fill.solid()
                card.fill.fore_color.rgb = RGBColor(30, 41, 59)
                card.line.color.rgb = RGBColor(51, 65, 85)

                tf_card = card.text_frame
                tf_card.word_wrap = True
                p_c = tf_card.paragraphs[0]
                p_c.text = f"•  {bullet}"
                p_c.font.size = Pt(14)
                p_c.font.bold = True
                p_c.font.color.rgb = RGBColor(241, 245, 249)

        else:
            # Standard Slide background: Light Slate
            bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
            bg.fill.solid()
            bg.fill.fore_color.rgb = COLOR_BG_LIGHT
            bg.line.fill.background()

            # Top Header Bar
            header_bar = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(1.3))
            header_bar.fill.solid()
            header_bar.fill.fore_color.rgb = COLOR_BG_DARK
            header_bar.line.fill.background()

            # Slide Number Badge
            num_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.2), Inches(1.0), Inches(0.4))
            p_num = num_box.text_frame.paragraphs[0]
            p_num.text = f"SLIDE {data['number']}"
            p_num.font.size = Pt(10)
            p_num.font.bold = True
            p_num.font.color.rgb = COLOR_PRIMARY

            # Slide Title
            title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.55), Inches(11.5), Inches(0.6))
            p_t = title_box.text_frame.paragraphs[0]
            p_t.text = data["title"]
            p_t.font.size = Pt(24)
            p_t.font.bold = True
            p_t.font.color.rgb = RGBColor(255, 255, 255)

            # Subtitle / Rationale
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.5), Inches(0.4))
            p_s = sub_box.text_frame.paragraphs[0]
            p_s.text = data["subtitle"]
            p_s.font.size = Pt(13)
            p_s.font.color.rgb = COLOR_TEXT_MUTED

            # 6 Bullets displayed as 6 Clean Cards in 2x3 Grid (6x6 Strict Rule)
            for idx, bullet in enumerate(data["bullets"]):
                col = idx % 2
                row = idx // 2
                x = Inches(0.8 + col * 5.9)
                y = Inches(2.0 + row * 1.65)

                card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.6), Inches(1.45))
                card.fill.solid()
                card.fill.fore_color.rgb = COLOR_CARD_BG
                card.line.color.rgb = COLOR_CARD_BORDER

                # Accent left strip
                strip = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(0.12), Inches(1.45))
                strip.fill.solid()
                strip.fill.fore_color.rgb = COLOR_PRIMARY
                strip.line.fill.background()

                # Number indicator
                num_t = slide.shapes.add_textbox(x + Inches(0.25), y + Inches(0.15), Inches(0.6), Inches(0.3))
                p_n = num_t.text_frame.paragraphs[0]
                p_n.text = f"0{idx+1}"
                p_n.font.size = Pt(11)
                p_n.font.bold = True
                p_n.font.color.rgb = COLOR_PRIMARY

                # Bullet text
                bt_box = slide.shapes.add_textbox(x + Inches(0.25), y + Inches(0.45), Inches(5.2), Inches(0.85))
                bt_tf = bt_box.text_frame
                bt_tf.word_wrap = True
                p_bt = bt_tf.paragraphs[0]
                p_bt.text = bullet
                p_bt.font.size = Pt(15)
                p_bt.font.bold = True
                p_bt.font.color.rgb = COLOR_TEXT_MAIN

    output_path = "MandiConnect_Executive_Presentation.pptx"
    prs.save(output_path)
    print(f"Successfully generated presentation: {output_path}")

if __name__ == "__main__":
    create_presentation()
