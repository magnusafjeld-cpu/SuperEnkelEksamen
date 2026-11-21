# -*- coding: utf-8 -*-
"""Eksamenstrening FIE459: business models and materiality (tema «forretningsmodell»).

   Statiske spørsmål bm-s01 … bm-s30. Kilder: manualkapittel k6
   (fag/fie459/_fragmenter/k6.html) og foilene til forelesning 6
   (FIE459_H26_6_Business_models.txt), med Oatly som gjennomgående case.
   Skribent B.

   Foilfeil som læres riktig: foil 35 kaller 0.58 «return on assets». Det er
   omløpshastigheten (sales/assets). Avkastning på eiendeler er
   net profit/assets = −0.4/1.2 = −33 % for 2022 (bm-s13).

   Dekning: målet og rekkefølgen, forretningsmodellen (Osterwalder og Pigneur,
   Johnson et al.), konkurranseposisjon (Porter) og Oatly, immaterielle eiendeler
   mot ressurser, Haskel og Westlake, strategi (Hambrick og Fredrickson),
   verdidrivere, OCF mot FCF, DuPont, bruttomargin, formål, interessentanalyse og
   impact map, finansiell mot impact materiality, double materiality, Khan,
   Serafeim og Yoon, pathways to materiality, top-down mot bottom-up, de tre
   impact-kriteriene, Oatly på kriteriene, de sju LTVC-retningslinjene og
   sustainable business model innovation.
"""
from trening_lib import *  # noqa: F401,F403


statisk(
    "bm-s01", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the order in which lecture 6 analyses a company before forecasting its cash flows.",
        "The lecture's goal is to assess a company's ability to sustainably generate free cash flows. It works in four "
        "stages: business model, sustainability analysis, impact and long-term value creation.",
        "<p><b>Step 1: list the four stages in order.</b></p>"
        "<p><b>Step 2: find the first one.</b> Which option describes it, rather than a later stage?</p>"
        "<p><b>Step 3: ask what each later stage builds on.</b> The first stage is the one every other stage needs.</p>",
    ),
    q="<p>An analyst starts her valuation of Hardanger Salmon by collecting its ESG scores and then forecasting ten years "
      "of cash flows. Following the order of lecture 6, which step has she skipped at the very start?</p>",
    alternativer=[
        R("Understanding how the business earns money, its business model"),
        F("Measuring which SDGs the firm helps achieve and which it harms",
          "Impact comes after the business model and the sustainability analysis, not first."),
        F("Rating the firm top-down and bottom-up on its sustainability",
          "That rating is part of the sustainability analysis, which builds on an understanding of the business."),
        F("Drawing up a materiality matrix of the firm's sustainability issues",
          "Materiality asks which issues can hit the business, so it cannot come before the business is "
          "understood."),
    ],
    kort="<p><b>The business model.</b> First understand how the company earns money; only then ask which sustainability "
         "issues can hit it, what it does to the world and how long its cash flows can last.</p>",
    full="<p><b>The goal.</b> Lecture 6 sets out to assess a company's ability to sustainably generate free cash flows. "
         "It is the first stage of ESG integration for valuation, with the textbook appendix as a checklist.</p>"
         "<p><b>The order is deliberate.</b></p>"
         "<ul><li><b>Business model:</b> how the company creates, delivers and captures value, its competitive "
         "position, intangibles, strategy and value drivers.</li>"
         "<li><b>Sustainability analysis:</b> purpose, stakeholders and materiality.</li>"
         "<li><b>Impact:</b> SDGs and the three impact criteria.</li>"
         "<li><b>Long-term value creation:</b> does the strategy address the material issues and what are the "
         "forecasts?</li></ul>"
         "<p><b>Here.</b> The analyst jumps from ESG scores to a forecast. She has no idea which of the scored issues "
         "matter to how a salmon farmer earns money, so she cannot tell which ones should move the cash flows.</p>"
         "<p><b>Remember:</b> business model first, then sustainability, then impact, then the long-term "
         "forecast.</p>",
)

statisk(
    "bm-s02", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the three components of a successful business model in Johnson et al.",
        "The three: a customer value proposition (a job for customers that alternatives do not do), a profit formula "
        "(revenue model, cost structure, margins, turnover) and key resources and processes (people, products, "
        "facilities, equipment, brand).",
        "<p><b>Step 1: whose point of view is the pitch written from?</b> The customer's or the firm's?</p>"
        "<p><b>Step 2: what does it describe?</b> What the customer gets, how the firm earns money or what the firm "
        "owns?</p>",
    ),
    q="<p>Bysykkel Pluss rents out serviced bikes by the month. Its pitch to commuters: \"A working bike every morning, "
      "repairs within a day, nothing to store or maintain.\" No bike shop offers this. Which component of a successful "
      "business model (Johnson et al. 2008) does the pitch describe?</p>",
    alternativer=[
        R("The customer value proposition"),
        F("The profit formula",
          "The profit formula is how the firm earns money: revenue model, costs, margins. The pitch says what the "
          "customer gets."),
        F("The key resources and processes",
          "Resources and processes are the people, products, facilities and brand behind the offer, not the offer "
          "itself."),
        F("The competitive position",
          "Competitive position (Porter) asks whether the firm can keep its profits against rivals. It is not one of "
          "the three components."),
    ],
    kort="<p><b>The customer value proposition.</b> The pitch names a job commuters need done that alternative offerings "
         "do not address.</p>",
    full="<p><b>A business model.</b> Osterwalder and Pigneur (2010): it \"describes the rationale of how an "
         "organization creates, delivers and captures value\". Johnson et al. (2008) say a successful one has three "
         "parts:</p>"
         "<ul><li><b>Customer value proposition:</b> helps customers perform a job that alternative offerings do not "
         "address.</li>"
         "<li><b>Profit formula:</b> how the firm earns money, through its revenue model, cost structure, margins and "
         "inventory turnover.</li>"
         "<li><b>Key resources and processes:</b> people, products, facilities, equipment and brand.</li></ul>"
         "<p><b>Here.</b> \"A working bike every morning, nothing to store or maintain\" is the job done for the "
         "commuter and no bike shop does it. That is the value proposition. The monthly fee would be part of the "
         "profit formula; the workshops and mechanics would be key resources.</p>"
         "<p><b>The usual mix-up.</b> Confusing the value proposition with competitive position. The first is what "
         "customers get; the second is whether the firm can keep its profits against rivals.</p>"
         "<p><b>Remember:</b> value proposition, profit formula, key resources and processes.</p>",
)

statisk(
    "bm-s03", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about Osterwalder and Pigneur's definition of a business model and its three verbs.",
        "A business model describes how an organisation creates, delivers and captures value. A firm can succeed at "
        "one or two of these and fail at another.",
        "<p><b>Step 1: is value created?</b> Do users get something they value?</p>"
        "<p><b>Step 2: is it delivered?</b> Does it reach them?</p>"
        "<p><b>Step 3: is it captured?</b> Does the firm get paid for it?</p>",
    ),
    q="<p>Millions of hikers use Turkart, a free trail-map app, every week and they rate it highly. Yet the company "
      "behind it earns almost nothing from them. In terms of Osterwalder and Pigneur's definition of a business model, "
      "where does Turkart fall short?</p>",
    alternativer=[
        R("It creates and delivers value but does not capture it"),
        F("It captures value but creates none for its users",
          "The app is widely used and highly rated, so it does create value for users."),
        F("It has no customer value proposition for hikers",
          "Hikers clearly get a job done that they value."),
        F("Its competitive position is weak because rivals can copy the app",
          "The case says nothing about rivals."),
    ],
    kort="<p><b>It does not capture value.</b> Users get and value the maps, but the firm earns almost nothing. A business "
         "model must also explain how the firm gets paid.</p>",
    full="<p><b>The definition.</b> Osterwalder and Pigneur (2010): a business model \"describes the rationale of how an "
         "organization creates, delivers and captures value\". All three verbs matter.</p>"
         "<p><b>Here.</b> Turkart creates value, since hikers rate it highly and delivers it, since millions use it "
         "every week. What is missing is capture: the firm earns almost nothing from that value. In Johnson et al.'s "
         "terms the customer value proposition works, but the profit formula does not.</p>"
         "<p><b>Why it matters for sustainability.</b> Lecture 6 asks the same about purpose: how does the company "
         "create value for society and how does it get paid for that value creation? A firm that does good but "
         "cannot capture any of it may not generate free cash flows that last.</p>"
         "<p><b>The usual mix-up.</b> Assuming popularity means a good business. Users and revenue are different "
         "things.</p>"
         "<p><b>Remember:</b> create, deliver and capture. Without capture there are no cash flows.</p>",
)

statisk(
    "bm-s04", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the sources of competitive advantage in lecture 6, following Porter.",
        "The four sources: resources (natural resources, data), knowledge (technology, processes), human capital and "
        "culture and networks or access (regulation, switching costs, scale).",
        "<p><b>Step 1: why do clients stay?</b> Is it something Lagerløft has, or something leaving would cost "
        "them?</p>"
        "<p><b>Step 2: find the source that lists that reason.</b></p>"
        "<p><b>Step 3: read the case closely.</b> Use only the reason the case gives for clients staying.</p>",
    ),
    q="<p>Lagerløft sells warehouse software. Rival products are cheaper, but clients rarely leave: switching would mean "
      "retraining their staff and rewriting their own systems around a new product. Which source of competitive "
      "advantage in lecture 6 does Lagerløft rely on?</p>",
    alternativer=[
        R("Networks and access, which include switching costs"),
        F("Knowledge, such as superior technology and processes",
          "What keeps clients is the cost of leaving, not better technology."),
        F("Resources, such as natural resources and data",
          "Lagerløft owns no scarce resource that the case mentions."),
        F("Human capital and culture inside Lagerløft",
          "The case is about the clients' cost of leaving, not Lagerløft's staff."),
    ],
    kort="<p><b>Networks and access.</b> Switching costs are listed there, next to regulation and scale. Clients stay "
         "because leaving is expensive.</p>",
    full="<p><b>Competitive position.</b> Porter (1985): can the firm keep its profits against rivals? Lecture 6 lists "
         "four sources of advantage:</p>"
         "<ul><li><b>Resources:</b> natural resources, data.</li>"
         "<li><b>Knowledge:</b> technology, processes.</li>"
         "<li><b>Human capital and culture.</b></li>"
         "<li><b>Networks and access:</b> regulation, switching costs, scale.</li></ul>"
         "<p><b>Here.</b> Lagerløft's products cost more, yet clients stay, because moving to a rival means "
         "retraining staff and rebuilding their systems. That is a switching cost, which sits under networks and "
         "access.</p>"
         "<p><b>The lesson from Oatly.</b> A brand and a head start are worth less if nothing like switching costs, "
         "scale or access keeps rivals out. Oatly lost market share once competitors could match its product.</p>"
         "<p><b>The usual mix-up.</b> Crediting the product's technology. The case gives no reason to think "
         "Lagerløft's software is better, only that leaving is costly.</p>"
         "<p><b>Remember:</b> switching costs, scale and regulation are networks and access.</p>",
)

statisk(
    "bm-s05", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about Oatly's competitive position in lecture 6: what a brand and a head start are worth.",
        "Porter's sources of advantage include networks and access: regulation, switching costs and scale. Ask "
        "whether any of these protected Oatly once rivals could make the same product.",
        "<p><b>Step 1: what was Oatly's edge?</b></p>"
        "<p><b>Step 2: what happened when rivals entered?</b> Did anything stop them from matching the product?</p>"
        "<p><b>Step 3: test each option against the case.</b> Which reading explains why a strong brand did not protect market share?</p>",
    ),
    q="<p>Oatly built a strong brand and an early lead in oat drinks. Then rival producers and supermarket brands "
      "launched their own oat drinks and Oatly lost market share. What lesson does lecture 6 draw about its "
      "competitive position?</p>",
    alternativer=[
        R("A product rivals can copy keeps its margin only if something like scale or switching costs holds them back"),
        F("A strong brand is a permanent advantage, so the lost share must be temporary",
          "Too strong. The headlines in the lecture show the opposite: competition got fierce."),
        F("Oatly's problem is its impact, since oat drinks emit more than cow's milk",
          "Oatly presents lower emissions as its main impact mechanism. The problem here is competition."),
        F("The lost share shows that Oatly never had a customer value proposition",
          "Customers valued the product; rivals could offer the same."),
    ],
    kort="<p><b>A head start is not a moat.</b> Unless switching costs, scale or access keep rivals out, a product others "
         "can match puts the margin under pressure, however good the story.</p>",
    full="<p><b>The case.</b> Lecture 6's sources run from a video on how Oatly built \"a $100 million oat milk empire\" to "
         "headlines that competition in oat milk was getting fierce and that Oatly was losing market share.</p>"
         "<p><b>The lesson.</b> Oatly's edge was a brand and an early lead. Those are an advantage only while something "
         "keeps rivals out. Porter's networks and access, meaning regulation, switching costs and scale, would do "
         "that. Oat drinks are easy for dairies and supermarkets to make and shoppers can switch at no cost, so the "
         "margin came under pressure.</p>"
         "<p><b>Why it matters for valuation.</b> The goal of the lecture is to judge whether free cash flows can last. "
         "A strong story and a strong impact case do not protect margins on their own. Oatly's DuPont figures show the "
         "result: negative margins and a negative ROE.</p>"
         "<p><b>The usual mix-up.</b> Treating a good brand as a permanent advantage.</p>"
         "<p><b>Remember:</b> an edge lasts only while rivals cannot match the product.</p>",
)

statisk(
    "bm-s06", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the difference between intangible assets and intangible resources and what goodwill measures.",
        "Intangible assets, such as goodwill, show up on the balance sheet; intangible resources, such as human "
        "capital, do not. Goodwill arises in an acquisition and is defined by the price paid.",
        "<p><b>Step 1: where does goodwill come from?</b> What exactly is it measured as?</p>"
        "<p><b>Step 2: is that the same as the value of the engineers' know-how?</b> Check how each option "
        "classifies goodwill and human capital.</p>",
    ),
    q="<p>Kvitfjell Tech bought a rival and booked goodwill on its balance sheet. An analyst writes: \"The goodwill shows "
      "what the rival's engineers and their know-how are worth.\" What is wrong with this?</p>",
    alternativer=[
        R("Goodwill is the premium paid over book value, which need not match the value of the know-how"),
        F("Goodwill is an intangible resource, so it never appears on the balance sheet at all",
          "Goodwill is an intangible asset and does appear on the balance sheet."),
        F("The engineers are an intangible asset, so they already appear on the balance sheet at their true value",
          "Human capital is an intangible resource and does not show up on the balance sheet."),
        F("Nothing: goodwill is the accounting measure of a firm's human capital",
          "Goodwill comes from an acquisition price, which is not a valuation of staff."),
    ],
    kort="<p><b>Goodwill is a price premium.</b> It is the price paid above the book value of the assets, so it need not "
         "reflect the value of intangible resources such as human capital.</p>",
    full="<p><b>Assets and resources.</b> Lecture 6 draws a key line. Intangible assets, such as goodwill, show up on the "
         "balance sheet. Intangible resources, such as human capital, do not.</p>"
         "<p><b>Goodwill.</b> It is the price paid in an acquisition in excess of the book value of the assets. The "
         "lecture adds: it is not necessarily a good reflection of the value of the intangible resources. The buyer "
         "may have overpaid or got a bargain and the premium also pays for things other than the engineers.</p>"
         "<p><b>Here.</b> The analyst treats the goodwill as a valuation of the rival's people. It is only what "
         "Kvitfjell paid above book.</p>"
         "<p><b>Why it matters.</b> Value has shifted from tangible to intangible, which is why most listed firms trade "
         "above book. Much of what sustainability changes, such as brand trust, employee motivation and know-how, is "
         "an intangible resource that the accounts miss.</p>"
         "<p><b>Remember:</b> goodwill is on the balance sheet but measures a price, not the people.</p>",
)

statisk(
    "bm-s07", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the four economic characteristics of intangibles in Haskel and Westlake.",
        "The four: intangibles represent a sunk cost, generate spillovers, are often scalable and tend to have "
        "synergies with each other.",
        "<p><b>Step 1: who benefits in the case?</b> Varde itself, or other firms?</p>"
        "<p><b>Step 2: match that to the characteristic about who gains from an intangible.</b></p>"
        "<p><b>Step 3: separate the firm's own gains from other firms' gains.</b> Which characteristics concern Varde itself?</p>",
    ),
    q="<p>Varde Batteries spends heavily developing a new cell design. Within two years, rival firms use what they learn "
      "from its patents, from engineers they hire away and from its published results to improve their own cells. "
      "Which of Haskel and Westlake's characteristics of intangibles does this show?</p>",
    alternativer=[
        R("They generate spillovers"),
        F("They represent a sunk cost",
          "Sunk cost means the money cannot be recovered if the project fails. The case is about others "
          "benefiting."),
        F("They are often scalable",
          "Scalable means the firm itself can use the intangible again and again at little extra cost."),
        F("They have synergies with each other",
          "Synergies arise when a firm's own intangibles are worth more together."),
    ],
    kort="<p><b>Spillovers.</b> Others benefit from Varde's investment in knowledge without paying for it, through "
         "patents, hires and published results.</p>",
    full="<p><b>Haskel and Westlake (2017).</b> Intangibles have four economic characteristics:</p>"
         "<ul><li><b>Sunk cost:</b> money spent on them is hard to recover if things go wrong.</li>"
         "<li><b>Spillovers:</b> others can benefit from them.</li>"
         "<li><b>Scalability:</b> they can often be used again and again at little extra cost.</li>"
         "<li><b>Synergies:</b> they tend to be worth more in combination.</li></ul>"
         "<p><b>Here.</b> Rivals learn from Varde's patents, its former engineers and its published results. The value "
         "of Varde's research leaks to firms that did not pay for it. That is a spillover.</p>"
         "<p><b>Why it matters.</b> Spillovers make it harder for the investing firm to capture the value of its "
         "intangibles, which links back to the profit formula and to competitive position. They are one reason "
         "intangibles are valuable for society but risky for the firm that pays for them.</p>"
         "<p><b>The usual mix-up.</b> Scalability and spillovers both mean \"more use for little cost\". Scalability "
         "is the firm's own reuse; spillovers are other firms' gain.</p>"
         "<p><b>Remember:</b> sunk cost, spillovers, scalability, synergies.</p>",
)

statisk(
    "bm-s08", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about why many listed firms trade well above their book value, as lecture 6 explains it.",
        "As economies shift from agriculture and basic industry to services, value shifts from tangible assets (land, "
        "buildings, materials) to intangibles (human capital, processes, data, innovation). Ask which of these the "
        "balance sheet records.",
        "<p><b>Step 1: what does a consultancy's value rest on?</b> Compare it with a cement producer.</p>"
        "<p><b>Step 2: does the balance sheet capture that?</b> Book value is what the balance sheet shows.</p>",
    ),
    q="<p>Fjordråd, a consultancy, trades at five times its book value, while a cement producer of similar size trades "
      "close to book. Which explanation does lecture 6 offer?</p>",
    alternativer=[
        R("Much of the consultancy's value lies in intangibles such as human capital, which the balance sheet misses"),
        F("The consultancy's goodwill must be many times larger than its other assets",
          "Goodwill only arises from acquisitions and nothing says the consultancy bought anyone."),
        F("The cement producer's shares must be mispriced, since every listed firm should trade far above book",
          "Nothing in the case suggests mispricing; the two firms simply differ in what their value rests on."),
        F("The cement producer has more intangible assets on its balance sheet, which lowers its market value",
          "Intangible assets on the balance sheet do not lower market value."),
    ],
    kort="<p><b>Intangibles off the balance sheet.</b> A consultancy's value lies mostly in people, processes and data. "
         "Book value misses them, so the market prices it far above book.</p>",
    full="<p><b>The shift to intangibles.</b> As economies move from agriculture and basic industry to services, value "
         "moves from tangible assets such as land, buildings and materials to intangibles such as human capital, "
         "processes, data and innovation. That is why most listed firms are priced above their book values, "
         "especially in R&amp;D-intense sectors such as healthcare and IT and in services such as consultancy.</p>"
         "<p><b>Here.</b> The consultancy's value walks in and out of the door every day: its consultants and their "
         "know-how. These are intangible resources and do not show up on the balance sheet. A cement producer's value "
         "is mostly plant and equipment, which the balance sheet does record.</p>"
         "<p><b>Why it matters for sustainability.</b> Much of what sustainability changes, such as brand trust, "
         "employee motivation and know-how, sits in those same intangible resources. An analysis of the accounts "
         "alone misses it. The lecture illustrates this with evidence on employee satisfaction and stock returns.</p>"
         "<p><b>Remember:</b> a high market-to-book ratio often reflects intangibles the accounts do not show.</p>",
)

statisk(
    "bm-s09", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the five elements a strategy must contain, following Hambrick and Fredrickson.",
        "Arenas: in which markets will the company be active? Vehicles: how will it get there? Differentiators: how "
        "will it win? Staging: what is the speed and sequence of moves? Economic logic: how will returns be "
        "obtained?",
        "<p><b>Step 1: what is already decided?</b> Strike out the element the board has settled.</p>"
        "<p><b>Step 2: what is the board debating now?</b> Match the question to an element.</p>"
        "<p><b>Step 3: test the other elements.</b> Is the board discussing timing, how to win against rivals or how returns will be earned?</p>",
    ),
    q="<p>Havsalt Foods has decided that Germany is its next market. The board now debates whether to get there by "
      "buying a local brand or by building its own sales force from scratch. Which element of a strategy (Hambrick and "
      "Fredrickson 2001) is the board deciding?</p>",
    alternativer=[
        R("Vehicles: how the company will get there"),
        F("Arenas: in which markets the company will be active",
          "The market is already chosen. The debate is about the means of entry."),
        F("Staging: the speed and sequence of moves",
          "Speed and sequence are not at issue; the board weighs two ways of entering one market."),
        F("Economic logic: how the returns will be obtained",
          "Economic logic is how the strategy earns returns, not how the firm enters the market."),
    ],
    kort="<p><b>Vehicles.</b> Buying a local brand or building from scratch are two ways of getting to a market already "
         "chosen.</p>",
    full="<p><b>What a strategy must contain.</b> Hambrick and Fredrickson (2001):</p>"
         "<ul><li><b>Arenas:</b> in which markets is the company going to be active?</li>"
         "<li><b>Vehicles:</b> how is it going to get there?</li>"
         "<li><b>Differentiators:</b> how can the company win in the marketplace?</li>"
         "<li><b>Staging:</b> what will be the speed and sequence of moves?</li>"
         "<li><b>Economic logic:</b> how will returns be obtained?</li></ul>"
         "<p><b>Here.</b> Germany is settled, so the arena is chosen. Acquisition against organic growth is the "
         "question of how to get there: the vehicle.</p>"
         "<p><b>The sustainability link.</b> Lecture 6 shows ESG megatrends (CESGA's overview) that can change the "
         "answer to every element. A tightening climate policy, for example, can close an arena or make one vehicle, "
         "such as buying a high-emitting rival, far riskier.</p>"
         "<p><b>The usual mix-up.</b> Arenas against vehicles: where you go against how you get there.</p>"
         "<p><b>Remember:</b> arenas, vehicles, differentiators, staging, economic logic.</p>",
)

statisk(
    "bm-s10", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the five elements of a strategy in Hambrick and Fredrickson. You need the one a plan sets out.",
        "Arenas: which markets. Vehicles: how to get there. Differentiators: how to win. Staging: the speed and "
        "sequence of moves. Economic logic: how returns are obtained.",
        "<p><b>Step 1: what has Polar Pharma already chosen?</b></p>"
        "<p><b>Step 2: what does the plan add?</b> Look at the words about timing and order.</p>"
        "<p><b>Step 3: test the other elements.</b> Does the plan say how the firm will enter, or how it will beat rivals?</p>",
    ),
    q="<p>Having chosen to sell its new product in Norway, Sweden, Denmark and Germany, Polar Pharma plans to launch in "
      "Norway first, add Sweden and Denmark a year later if sales hold up and enter Germany only after that. Which "
      "element of a strategy does this plan mainly set out?</p>",
    alternativer=[
        R("Staging"),
        F("Arenas",
          "The markets were chosen before the plan. What the plan adds is the order and pace of entry."),
        F("Vehicles",
          "The plan does not say how the firm will enter each market."),
        F("Differentiators",
          "Nothing in the plan says how the product will beat its rivals."),
    ],
    kort="<p><b>Staging.</b> The plan sets the speed and sequence of moves: one market first, others later and only if "
         "sales hold up.</p>",
    full="<p><b>Staging.</b> Hambrick and Fredrickson (2001) say a strategy must answer what the speed and sequence of "
         "moves will be. A staged plan lets the firm learn from one market before committing to the next.</p>"
         "<p><b>Here.</b> The four markets are already chosen, so the arenas are settled. The plan adds the order "
         "(Norway, then Sweden and Denmark, then Germany), the pace (a year apart) and a condition (sales must hold "
         "up). That is staging.</p>"
         "<p><b>The other elements.</b> Vehicles would be how Polar Pharma enters each market, for example through a "
         "partner or its own sales force. Differentiators would be how it wins against rivals. Economic logic would be "
         "how the strategy earns its returns.</p>"
         "<p><b>The usual mix-up.</b> Calling any plan that names countries an arena decision. Arenas are where; "
         "staging is in what order and how fast.</p>"
         "<p><b>Remember:</b> staging is the speed and sequence of moves.</p>",
)

statisk(
    "bm-s11", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the value-driver questions on sales growth in lecture 6's checklist.",
        "On growth, the checklist asks how important volume and pricing are as components of growth, how they differ "
        "across divisions, which drivers are long-term and which short-term and what growth rate is realistic.",
        "<p><b>Step 1: split the growth.</b> How much came from price and how much from volume?</p>"
        "<p><b>Step 2: ask the checklist's next question.</b> Can growth with that make-up continue?</p>"
        "<p><b>Step 3: keep to the value driver at hand.</b> The checklist groups its questions by driver.</p>",
    ),
    q="<p>Fjellmat's sales grew 12% last year. The annual report shows that prices rose 15% while volumes fell. "
      "Following the value-driver questions in lecture 6, what should the analyst ask next?</p>",
    alternativer=[
        R("Whether price-led growth with falling volumes is a short-term driver"),
        F("Nothing more, since 12% growth is strong whatever its source",
          "The checklist asks how volume and price contribute to growth, so the source matters."),
        F("Whether the firm's goodwill on the balance sheet grew at the same rate as its sales",
          "Goodwill comes from acquisitions and says nothing about where sales growth comes from."),
        F("Whether the price rise lifted the firm's financial leverage",
          "Leverage is assets over equity. It does not tell you where sales growth comes from."),
    ],
    kort="<p><b>Can price-driven growth last?</b> The checklist asks how much of growth comes from volume and how much "
         "from price and which drivers are short-term and which long-term.</p>",
    full="<p><b>Sales growth as a value driver.</b> Lecture 6's checklist asks: What has historical sales growth been? "
         "How important are volume and pricing as components of growth? How has this differed across divisions? What "
         "are the underlying drivers and can you distinguish long-term from short-term ones? What is a realistic "
         "growth rate?</p>"
         "<p><b>Here.</b> Sales grew because prices rose, while fewer units were sold. Price increases with falling "
         "volumes may not repeat: customers can switch, or the price rise may reflect a one-off cost shock. The "
         "analyst needs to know whether this growth is a short-term driver before she forecasts it for ten years.</p>"
         "<p><b>The other value drivers.</b> Margins (gross, EBIT, EBITDA, net and how fixed the cost base is), "
         "invested capital and return on capital, the cost of capital and cash flow, meaning how much operating cash "
         "flow becomes free cash flow.</p>"
         "<p><b>Remember:</b> split growth into volume and price, then ask whether it lasts.</p>",
)

statisk(
    "bm-s12", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the difference between operating cash flow and free cash flow, one of lecture 6's value "
        "drivers.",
        "Operating cash flow (OCF) is the cash the operations generate. Free cash flow (FCF) is what is left once the "
        "investment the business needs has been paid.",
        "<p><b>Step 1: start from OCF.</b> The case calls it strong.</p>"
        "<p><b>Step 2: subtract the investment the business needs.</b> How much is left?</p>"
        "<p><b>Step 3: check the sign.</b> Free cash flow turns negative only when investment is larger than operating cash flow. Is it here?</p>",
    ),
    q="<p>Nordlys Data generates strong operating cash flow every year, but must spend almost all of it on new data "
      "centres just to keep growing. What does this mean for its free cash flow?</p>",
    alternativer=[
        R("It is small, since free cash flow is what remains of operating cash flow after the investment the business "
          "needs"),
        F("It equals the operating cash flow, since spending on data centres is not a cash flow",
          "Investment is a cash outflow and free cash flow is measured after it."),
        F("It cannot be judged without first knowing the firm's return on equity",
          "ROE is an accounting ratio. The case gives what you need: operating cash flow and investment."),
        F("It is negative by definition, since any investment makes free cash flow negative",
          "Free cash flow is negative only if investment exceeds operating cash flow."),
    ],
    kort="<p><b>Small.</b> Free cash flow is operating cash flow minus the investment the business needs. If almost all of "
         "the OCF goes to new data centres, little FCF is left.</p>",
    full="<p><b>OCF and FCF.</b> Lecture 6 asks how much operating cash flow (OCF) a firm generates and how much of it "
         "becomes free cash flow (FCF) once the investment the business needs has been paid. FCF is what the firm "
         "could hand to its investors.</p>"
         "<p><b>Here.</b> Nordlys Data's OCF is strong, but it must reinvest almost all of it to keep growing. Its FCF "
         "is therefore small. Whether that is good or bad depends on the returns on those data centres, which is why "
         "the checklist also asks about return on capital.</p>"
         "<p><b>The checklist's questions.</b> To what extent have profits been converted to FCF? What explains the "
         "conversion rate and will it change? If FCF is negative, do you expect an inflection point to positive "
         "FCF?</p>"
         "<p><b>Why it matters.</b> The lecture's goal is a firm's ability to sustainably generate free cash flows. "
         "Strong operations are not enough if the business needs all the cash back.</p>"
         "<p><b>Remember:</b> FCF = OCF minus the investment the business needs.</p>",
)

statisk(
    "bm-s13", tema="forretningsmodell", type="begrep",
    hjelp=hjelp3(
        "This is about return on assets and about a known mislabel on the Oatly DuPont slide in lecture 6.",
        "Return on assets is net profit divided by total assets, which equals net profit margin times asset turnover. "
        "Asset turnover is sales divided by assets and contains no profit.",
        "<p><b>Step 1: pick the right numerator and denominator.</b> Profit over assets, not sales over assets.</p>"
        "<p><b>Step 2: divide.</b> Watch the sign.</p>"
        "<p><b>Step 3: compare with the slide's label.</b> Which DuPont ratio did the slide mislabel? What does it measure?</p>",
    ),
    q="<p>Oatly's 2022 figures (USD billion) are revenue 0.7, total assets 1.2, net profit −0.4 and equity 0.8. The "
      "lecture slide labels sales divided by assets \"return on assets\". What is Oatly's actual return on assets for "
      "2022?</p>",
    alternativer=[
        R("−33%"),
        F("58%", "That is sales over assets, the asset turnover the slide mislabels. It contains no profit."),
        F("−57%", "That is the net profit margin: net profit over sales."),
        F("−50%", "That is ROE: net profit over equity."),
    ],
    kort="<p><b>−33%.</b> Return on assets is net profit over assets: −0.4/1.2. The slide's 0.58 is asset turnover, "
         "sales over assets.</p>",
    full="<p><b>The DuPont formula.</b> ROE = (net profit / sales) × (sales / assets) × (assets / equity): net profit "
         "margin × asset turnover × financial leverage.</p>"
         "<p><b>Oatly 2022.</b></p>"
         "<ul><li>Net profit margin: −0.4/0.7 = −57%.</li>"
         "<li>Asset turnover: 0.7/1.2 = 0.58.</li>"
         "<li>Financial leverage: 1.2/0.8 = 1.5.</li>"
         "<li>ROE: −57% × 0.58 × 1.5 = −50%.</li></ul>"
         "<p><b>The slide's mistake.</b> Foil 35 calls 0.58 \"return on assets\". It is asset turnover: sales per dollar "
         "of assets, with no profit in it. Return on assets is net profit / assets = margin × turnover = −0.4/1.2 = "
         "−33%.</p>"
         "<p><b>The usual mix-up.</b> Reading a positive 0.58 as a 58% return. Oatly's assets earned a loss. A "
         "statement that asset turnover measures profitability is false.</p>"
         "<p><b>Remember:</b> ROA = net profit / assets; asset turnover = sales / assets.</p>",
)

statisk(
    "bm-s14", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about how financial leverage affects ROE in the DuPont formula when the margin is negative.",
        "ROE = net profit margin × asset turnover × financial leverage. Leverage multiplies whatever margin times "
        "turnover gives, positive or negative.",
        "<p><b>Step 1: compute margin times turnover.</b> That is the return on assets.</p>"
        "<p><b>Step 2: multiply by leverage before and after.</b> Compare the two ROEs, watching the sign.</p>"
        "<p><b>Step 3: interpret.</b> Does more leverage soften or deepen a loss?</p>",
    ),
    q="<p>Havre Foods has a net profit margin of −10% and an asset turnover of 1.0. It takes on debt to buy back shares, "
      "raising its financial leverage from 1.5 to 2.5 while margin and turnover stay the same. What happens to its "
      "ROE?</p>",
    alternativer=[
        R("It falls from −15% to −25%, since leverage magnifies the loss"),
        F("It improves from −15% to −4%, since more debt spreads the loss over more capital",
          "That result divides margin times turnover by leverage instead of multiplying."),
        F("It stays at −10%, since leverage does not enter ROE",
          "Leverage is one of the three DuPont ratios."),
        F("It turns positive at +25%, since leverage turns a loss into a gain",
          "Leverage scales ROE; it cannot change its sign."),
    ],
    kort="<p><b>It falls from −15% to −25%.</b> ROE = −10% × 1.0 × leverage. With a negative margin, more leverage makes ROE "
         "more negative.</p>",
    full="<p><b>The formula.</b> ROE = net profit margin × asset turnover × financial leverage. Leverage is assets over "
         "equity: how many dollars of assets each dollar of equity carries.</p>"
         "<p><b>Here.</b> Margin times turnover is −10% × 1.0 = −10%, the return on assets. Before the buyback ROE = "
         "−10% × 1.5 = −15%. After it, ROE = −10% × 2.5 = −25%. The same loss now sits on a thinner layer of equity.</p>"
         "<p><b>The Oatly parallel.</b> From 2021 to 2022 Oatly's turnover rose from 0.38 to 0.58 and its leverage from "
         "1.33 to 1.50, yet ROE fell from −17% to −50%. With a negative margin, both multiply the loss. The margin is "
         "the root problem.</p>"
         "<p><b>The usual mix-up.</b> Assuming more leverage always raises ROE. It does so only when margin times "
         "turnover is positive. Leverage magnifies in both directions.</p>"
         "<p><b>Remember:</b> leverage multiplies the return on assets, so with a loss it deepens the loss.</p>",
)

statisk(
    "bm-s15", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about what gross margin measures and what it leaves out, among the margin measures in lecture 6.",
        "The checklist lists gross profit, EBIT, EBITDA and net income. Gross profit is sales minus the direct cost of "
        "the goods sold. Ask which costs come after it.",
        "<p><b>Step 1: what does gross margin subtract from sales?</b></p>"
        "<p><b>Step 2: which costs are still to come?</b> Could the firm still make a net loss?</p>"
        "<p><b>Step 3: compare with net income.</b> Which line of the income statement shows whether the firm is profitable?</p>",
    ),
    q="<p>Lindesnes Snacks reports that its gross margin rose from 18% to 27% in a year. A blogger concludes that the "
      "company has turned profitable. Why does this figure alone not justify the conclusion?</p>",
    alternativer=[
        R("Gross margin comes before operating costs, interest and tax, so on its own it shows no net profit"),
        F("Gross margin is measured after tax, so a higher figure overstates the profit",
          "Tax is not deducted in gross margin."),
        F("A higher gross margin always means the firm sold fewer units",
          "Margins and volumes can move independently."),
        F("Gross margin is a balance-sheet item, not a measure of profitability",
          "Gross margin is a profitability ratio from the income statement."),
    ],
    kort="<p><b>Gross margin is before most costs.</b> Operating costs, interest and tax come afterwards, so a better gross "
         "margin is progress but does not by itself show a profit.</p>",
    full="<p><b>Margins as a value driver.</b> Lecture 6 asks how profitable a company has been by gross profit, EBIT, "
         "EBITDA and net income and which of these is most meaningful for the company. Gross profit is sales minus "
         "the direct cost of the goods sold. Operating costs such as marketing and administration, then interest and "
         "tax, all come later.</p>"
         "<p><b>Here.</b> A gross margin of 27% means each krone of sales leaves 27 øre after the cost of the snacks. If "
         "marketing, staff and interest take more than that, the company still makes a net loss.</p>"
         "<p><b>The Oatly parallel.</b> Oatly's gross margin improved from 19.4% in 2023 to 28.7% in 2024, while the "
         "company had made heavy net losses in 2021 and 2022. A better gross margin is a step, not proof of "
         "profit.</p>"
         "<p><b>Also ask.</b> How fixed is the cost base? A firm with high fixed costs needs much higher sales before a "
         "better gross margin reaches the bottom line.</p>"
         "<p><b>Remember:</b> gross margin is before operating costs, interest and tax.</p>",
)

statisk(
    "bm-s16", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the steps of the sustainability analysis in lecture 6. You need the one two questions belong "
        "to.",
        "The sustainability analysis has three parts: purpose, the stakeholder analysis and the "
        "materiality analysis. The impact step follows after them.",
        "<p><b>Step 1: what do the two questions ask about?</b> Groups affected, issues that matter or the reason the "
        "company exists?</p>"
        "<p><b>Step 2: match them to a step.</b></p>"
        "<p><b>Step 3: recall the order.</b> The sustainability analysis has a fixed sequence. Which part opens it?</p>",
    ),
    q="<p>An analyst opens her sustainability analysis of Rørvik Water with two questions: \"In what way does this company "
      "create value for society?\" and \"How does it get paid for that value?\" Which step of the sustainability "
      "analysis is she on?</p>",
    alternativer=[
        R("The company's purpose"),
        F("The stakeholder analysis",
          "Stakeholder analysis identifies, categorises and prioritises the groups affected, which is a later step."),
        F("The materiality analysis",
          "Materiality asks which ESG issues matter most and it comes after purpose and stakeholders."),
        F("The three impact criteria",
          "Impact is scored after the sustainability analysis, on material, intentional and transformational."),
    ],
    kort="<p><b>Purpose.</b> The sustainability analysis starts with the company's raison d'être: how it creates value for "
         "society and how it gets paid for that value.</p>",
    full="<p><b>The sustainability analysis.</b> After the business model, lecture 6 moves to three steps:</p>"
         "<ul><li><b>Purpose:</b> the company's raison d'être. In what way does it create value for society and how "
         "does it get paid for that value creation?</li>"
         "<li><b>Stakeholder analysis:</b> identify, categorise and prioritise, with a stakeholder impact map.</li>"
         "<li><b>Materiality analysis:</b> which ESG issues are most material and how the company performs on "
         "them.</li></ul>"
         "<p><b>Here.</b> Both questions are the purpose questions, word for word.</p>"
         "<p><b>Why both halves matter.</b> A company that creates value for society but cannot get paid for it may "
         "not last; one that gets paid without creating value may face internalisation of what it harms. The purpose "
         "question links impact to the business model.</p>"
         "<p><b>Link.</b> Edmans (lecture 4) defines purpose as the answer to \"how is the world a better place by your "
         "company being here?\"</p>"
         "<p><b>Remember:</b> purpose first, then stakeholders, then materiality.</p>",
)

statisk(
    "bm-s17", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the three steps of stakeholder analysis in lecture 6.",
        "Identify all potential stakeholders affected by the product or project. Categorise them, for example internal "
        "against external and group them into types. Prioritise them with an interest-power matrix.",
        "<p><b>Step 1: have the groups already been found?</b></p>"
        "<p><b>Step 2: on what basis are they being placed?</b> Type, or interest and power?</p>"
        "<p><b>Step 3: recall the tool each step uses.</b> One of the three steps has a matrix of its own.</p>",
    ),
    q="<p>In its stakeholder analysis, Lyngen Wind places local reindeer herders in the box for high interest and high "
      "power and nearby holiday-home owners in the box for high interest but low power. Which step of stakeholder "
      "analysis is this?</p>",
    alternativer=[
        R("Prioritising the stakeholders with an interest-power matrix"),
        F("Identifying all the potential stakeholders",
          "The groups were already identified before they were placed in boxes."),
        F("Categorising the stakeholders as internal or external to the firm",
          "Neither group is sorted by whether it is inside or outside the firm."),
        F("Drawing up a materiality matrix of ESG issues",
          "A materiality matrix ranks ESG issues, not stakeholder groups."),
    ],
    kort="<p><b>Prioritising.</b> Placing groups by their interest and their power is the interest-power matrix, the third "
         "step of stakeholder analysis.</p>",
    full="<p><b>Stakeholder analysis in three steps.</b></p>"
         "<ul><li><b>Identify</b> all potential stakeholders: people, groups or organisations affected by the product or "
         "project.</li>"
         "<li><b>Categorise</b> them: internal versus external, grouped into types.</li>"
         "<li><b>Prioritise</b> them with an interest-power matrix.</li></ul>"
         "<p><b>Here.</b> The herders and the holiday-home owners are already identified. Lyngen Wind now ranks them by "
         "how much they care and how much they can affect the project. That is prioritising.</p>"
         "<p><b>The next tool.</b> The stakeholder impact map (Schoenmaker and Schramade 2017) lists the main "
         "stakeholders, their short- and long-term goals and how the company helps or hurts each one. Where the map "
         "shows the firm hurting a stakeholder with power, as the herders here, you have a likely candidate for "
         "internalisation and so a candidate material issue.</p>"
         "<p><b>Remember:</b> identify, categorise, prioritise.</p>",
)

statisk(
    "bm-s18", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about what a stakeholder impact map can tell an analyst about future material issues.",
        "The impact map shows how the company helps or hurts each main stakeholder. Ask what tends to happen when a "
        "firm hurts a stakeholder who has power and how that links to materiality.",
        "<p><b>Step 1: who is hurt and do they have power?</b></p>"
        "<p><b>Step 2: what could they do about it?</b> Would that reach the firm's costs or sales?</p>"
        "<p><b>Step 3: link to materiality.</b> If the harm comes back as a cost to the firm, which lens would then count it?</p>",
    ),
    q="<p>Kystplast's stakeholder impact map shows that its plastic packaging hurts coastal municipalities, which bear the "
      "clean-up costs. The municipalities are lobbying for a national packaging levy. What does lecture 6 suggest the "
      "analyst should conclude?</p>",
    alternativer=[
        R("The harm is a likely candidate for internalisation and so a candidate material issue"),
        F("The harm is an externality, so it can never affect Kystplast's cash flows",
          "Externalities can be internalised, for instance by a levy."),
        F("The municipalities are internal stakeholders, so the harm belongs in the profit formula",
          "Municipalities are external stakeholders."),
        F("The issue can only be material under impact materiality, never under financial materiality",
          "A levy would hit the firm's costs."),
    ],
    kort="<p><b>A candidate for internalisation.</b> Where the map shows the firm hurting a stakeholder with power, the "
         "harm is likely to come back as a cost, so it is a candidate material issue.</p>",
    full="<p><b>The stakeholder impact map.</b> Schoenmaker and Schramade (2017): list the main stakeholders, their "
         "short- and long-term goals and how the company helps or hurts each one.</p>"
         "<p><b>The link to materiality.</b> Lecture 6's reading: where the map shows the company hurting a stakeholder "
         "with power, you have found a likely candidate for internalisation (lecture 3) and so a candidate material "
         "issue.</p>"
         "<p><b>Here.</b> The municipalities bear Kystplast's clean-up costs and they have political power. A national "
         "levy would turn the externality into a cost on Kystplast's own books. The issue is already impact-material; "
         "it is on its way to becoming financially material too.</p>"
         "<p><b>The checklist's question.</b> Does the company generate serious externalities and how likely are they "
         "to be internalised?</p>"
         "<p><b>The usual mix-up.</b> Treating an externality as permanently outside the firm. Internalisation through "
         "regulation, litigation or customers is exactly how impact turns into financial materiality.</p>"
         "<p><b>Remember:</b> hurting a powerful stakeholder signals a future cost.</p>",
)

statisk(
    "bm-s19", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the two materiality lenses and the direction each one looks in.",
        "Financial materiality (SASB): information reasonably likely to be important to investors; outside-in, how "
        "sustainability affects the firm. Impact materiality (GRI): the firm's effect on the economy, environment and "
        "people; inside-out; written for all stakeholders.",
        "<p><b>Step 1: which way does the effect run?</b> From the climate to the firm, or from the firm to the "
        "world?</p>"
        "<p><b>Step 2: match the direction to a lens.</b> Check each option's description of the standard-setter "
        "too.</p>",
    ),
    q="<p>Fjellheis, a ski-resort operator, faces shorter snow seasons as winters warm, which cuts its visitor numbers and "
      "raises its snowmaking costs. Which materiality lens captures this issue most directly?</p>",
    alternativer=[
        R("Financial materiality: outside-in, how sustainability affects the firm"),
        F("Impact materiality: inside-out, how the firm affects people and the environment",
          "The case runs from the climate to the firm's cash flows, not from the firm to the world."),
        F("Neither, since the firm does not cause climate change on its own",
          "A firm need not cause an issue for it to be material."),
        F("Impact materiality, since GRI's definition is written for investors",
          "GRI's definition serves all stakeholders, not investors in particular."),
    ],
    kort="<p><b>Financial materiality.</b> Warmer winters hit Fjellheis's sales and costs. That is outside-in, the SASB "
         "lens of what is important to investors.</p>",
    full="<p><b>Two lenses.</b></p>"
         "<ul><li><b>Financial materiality (SASB):</b> information \"reasonably likely to be important to investors in "
         "making investment decisions\". Outside-in: how sustainability affects the firm. Audience: investors.</li>"
         "<li><b>Impact materiality (GRI):</b> topics that affect the organisation's ability to \"create, preserve or "
         "erode economic, environmental and social value for itself, its stakeholders and society at large\". "
         "Inside-out: how the firm affects the economy, environment and people. Audience: all stakeholders.</li></ul>"
         "<p><b>Here.</b> Shorter seasons reduce visitors and raise snowmaking costs. The effect runs from the climate "
         "into the firm's growth and cost. SASB assesses an issue by its potential to affect growth, cost or trust, so "
         "this is financial materiality.</p>"
         "<p><b>The usual mix-up.</b> Thinking an issue is material only if the firm causes it. Physical climate risk "
         "is material to a ski resort whatever its own emissions are.</p>"
         "<p><b>Double materiality.</b> Lecture 6 concludes that both lenses should be used.</p>"
         "<p><b>Remember:</b> outside-in is financial (SASB); inside-out is impact (GRI).</p>",
)

statisk(
    "bm-s20", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about double materiality: looking at a sustainability issue through both lenses.",
        "Under double materiality an issue can be material because it moves the firm's cash flows, because of the "
        "firm's effect on the world, or both. Neither lens waits for a regulator.",
        "<p><b>Step 1: the impact lens.</b> Does the firm's supply chain harm people or nature?</p>"
        "<p><b>Step 2: the financial lens.</b> Could the issue hit the firm's sales, costs or trust?</p>"
        "<p><b>Step 3: combine the two answers.</b></p>",
    ),
    q="<p>Palmegården buys palm oil for its biscuits. Clearing forest for the plantations destroys habitats. Several "
      "large retail customers say they will drop suppliers linked to deforestation. Under double materiality, how should "
      "the issue be treated?</p>",
    alternativer=[
        R("As material through both lenses: for its effect on nature and for its effect on the firm's sales"),
        F("As financially material only, since the retailers' threat is what counts for valuation",
          "The habitat damage is material in its own right under the impact lens."),
        F("As impact material only, since the firm does not own the plantations it buys from",
          "The retailers' threat would hit Palmegården's own sales."),
        F("As immaterial until a regulator bans palm oil from cleared land",
          "Neither lens waits for regulation."),
    ],
    kort="<p><b>Material through both lenses.</b> Deforestation harms nature (impact) and threatens Palmegården's sales to "
         "retailers (financial). Double materiality counts both.</p>",
    full="<p><b>Double materiality.</b> Lecture 6 sets SASB's financial definition against GRI's impact definition and "
         "concludes: look through both lenses. An issue can be material because it moves the firm's cash flows, "
         "because of the firm's effect on the world or both.</p>"
         "<p><b>Here.</b> Inside-out: clearing forest for plantations destroys habitats, an impact on the environment "
         "along Palmegården's supply chain. Outside-in: large customers threaten to drop suppliers linked to "
         "deforestation, which would hit Palmegården's sales. The issue is material on both counts.</p>"
         "<p><b>The usual mix-ups.</b> Counting only what investors care about, which is a single, financial lens. Or "
         "excusing harm because it happens at suppliers: impact materiality covers the firm's effect through its "
         "chain. And neither lens requires a rule to exist first.</p>"
         "<p><b>Link.</b> Double materiality returns in lecture 7, where the CSRD and ESRS require both lenses.</p>"
         "<p><b>Remember:</b> double materiality means financial, impact or both.</p>",
)

statisk(
    "bm-s21", tema="forretningsmodell", type="fakta",
    hjelp=hjelp3(
        "This is about the finding of Khan, Serafeim and Yoon on which sustainability performance is linked to stock "
        "returns.",
        "The study separates sustainability issues that are material for a firm's industry from those that are not. "
        "Ask which of the two kinds of performance is linked to outperformance.",
        "<p><b>Step 1: what does an overall ESG score contain?</b> Only material issues, or all issues mixed?</p>"
        "<p><b>Step 2: which part does the study link to outperformance?</b></p>"
        "<p><b>Step 3: apply it to the fund.</b> Does the fund's screen look at the part of the score the study links to returns?</p>",
    ),
    q="<p>A fund manager builds a portfolio of the firms with the highest overall ESG scores, without checking which issues "
      "are material in each firm's industry. What do Khan, Serafeim and Yoon (2016) suggest about this strategy?</p>",
    alternativer=[
        R("Overall scores mix in immaterial issues, where good performance is not linked to outperformance"),
        F("It should outperform, since good performance on any ESG issue is eventually rewarded by the market",
          "The study does not find that every ESG issue pays."),
        F("It should underperform, since firms with high ESG scores are always overpriced",
          "The study says nothing of the kind about ESG leaders as a group."),
        F("It should do best when its firms are strongest on the issues that are immaterial to them",
          "This reverses the finding."),
    ],
    kort="<p><b>Only material issues matter.</b> Khan, Serafeim and Yoon (2016) find that firms performing well on material "
         "sustainability issues outperform, while performance on immaterial issues does not matter.</p>",
    full="<p><b>The finding.</b> Khan, Serafeim and Yoon (2016) classify sustainability issues as material or immaterial "
         "for each industry. Firms that perform well on material issues outperform. Performance on immaterial issues "
         "does not matter for returns.</p>"
         "<p><b>Here.</b> An overall ESG score adds up performance on all issues. A firm can score high because it does "
         "well on issues that do not matter for its industry. The fund then loads up on strengths the study does not "
         "link to returns and the link it does find is diluted.</p>"
         "<p><b>What it implies.</b> Screen on the issues that are material to each industry. SASB's Materiality Map "
         "sets out which issues those are.</p>"
         "<p><b>Do not overstate it.</b> The finding is not that ESG always pays, nor that it never pays. It is that "
         "materiality separates the two.</p>"
         "<p><b>Also note.</b> Materiality changes over time: Rogers and Serafeim describe the pathways by which issues "
         "become financially material.</p>"
         "<p><b>Remember:</b> good ESG on material issues pays; on immaterial issues it does not.</p>",
)

statisk(
    "bm-s22", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about how the materiality of a sustainability issue can change over time.",
        "Rogers and Serafeim describe how sustainability issues become financially material to firms and their "
        "investors. Firms such as CCBJH keep reviewing their material issues for this reason.",
        "<p><b>Step 1: was water use material fifteen years ago?</b> Is it now?</p>"
        "<p><b>Step 2: what changed?</b> Which concept describes an issue moving from immaterial to material?</p>"
        "<p><b>Step 3: check each option's definition.</b> Is it stated correctly? Is it about issues changing over time?</p>",
    ),
    q="<p>Fifteen years ago, water use was not a material issue for Tinn Breweries. After repeated droughts, new limits on "
      "water extraction and rising water prices, it now affects the firm's costs and growth. Which idea from lecture 6 "
      "describes this change?</p>",
    alternativer=[
        R("Pathways to materiality: sustainability issues can become financially material over time"),
        F("Amoral drift: public firms slide towards putting little weight on their externalities",
          "Amoral drift is Hart and Zingales's idea about takeovers, not about an issue gaining financial weight."),
        F("Double materiality: an issue counts only if it is material through both lenses at the same time",
          "Double materiality counts an issue that is material through either lens or both."),
        F("Sunk cost: the brewery's past spending on water cannot be recovered",
          "Sunk cost is one of Haskel and Westlake's characteristics of intangibles."),
    ],
    kort="<p><b>Pathways to materiality.</b> Rogers and Serafeim describe how sustainability issues become financially "
         "material. Droughts, limits and prices turned water into a cost and growth issue.</p>",
    full="<p><b>Materiality moves.</b> An issue that is immaterial today can become material. Rogers and Serafeim's "
         "\"Pathways to Materiality\" describes how sustainability issues become financially material to corporations "
         "and their investors, for example as regulation tightens, prices change or stakeholders press.</p>"
         "<p><b>Here.</b> Water was cheap and plentiful for Tinn Breweries. Droughts, extraction limits and higher prices "
         "now reach its costs and growth. The issue has travelled the path from immaterial to financially "
         "material.</p>"
         "<p><b>In practice.</b> CCBJH identified its material issues in 2023 and has kept reviewing them \"while "
         "monitoring for new issues that may arise with changing social conditions\". Firms show the result as a "
         "materiality matrix, as Unilever does.</p>"
         "<p><b>The usual mix-up.</b> Treating a materiality assessment as fixed. That is why the trap \"good ESG pays\" "
         "is wrong twice: only material issues pay and what is material changes.</p>"
         "<p><b>Remember:</b> issues can become material, so assessments are repeated.</p>",
)

statisk(
    "bm-s23", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the two sustainability ratings in lecture 6's checklist: top-down and bottom-up.",
        "Top-down sustainability rates the exposure of the company's sector. Bottom-up sustainability rates how well "
        "the company itself manages the issues. Each is scored from 1 (very weak) to 5 (very well positioned).",
        "<p><b>Step 1: the sector.</b> How exposed is it? That gives one rating.</p>"
        "<p><b>Step 2: the company.</b> How well does it manage the issues? That gives the other.</p>"
        "<p><b>Step 3: keep the two scales apart.</b> Does one rating limit the other?</p>",
    ),
    q="<p>Ranfoss Steel operates in a sector that is heavily exposed to carbon pricing, but the company itself manages its "
      "emissions and energy use far better than its peers. How should an analyst rate it on the lecture's top-down and "
      "bottom-up sustainability scales?</p>",
    alternativer=[
        R("Low top-down, since its sector is exposed; high bottom-up, since it manages the issues well"),
        F("High top-down, since it beats all its peers; low bottom-up, since its whole sector is exposed",
          "Top-down is about the sector, which the case calls heavily exposed."),
        F("Low on both, since the sector's exposure caps any company's rating",
          "The two scales are separate, so a well-run company is not held down by its sector."),
        F("High on both, since good management removes the sector's exposure",
          "Good management does not change how exposed the sector is."),
    ],
    kort="<p><b>Low top-down, high bottom-up.</b> Top-down rates the sector's exposure, which is high; bottom-up rates the "
         "company's own management, which is strong.</p>",
    full="<p><b>Two ratings.</b> Lecture 6's checklist asks the analyst to place the company in a table on two scales, each "
         "from 1 (very weak) to 5 (very well positioned):</p>"
         "<ul><li><b>Top-down sustainability:</b> the exposure of the company's sector.</li>"
         "<li><b>Bottom-up sustainability:</b> how well the company itself manages the issues.</li></ul>"
         "<p><b>Here.</b> Steel is heavily exposed to carbon pricing, so the top-down rating is low. Ranfoss manages its "
         "emissions and energy far better than peers, so the bottom-up rating is high.</p>"
         "<p><b>Why both.</b> A strong company in a weak sector and a weak company in a strong sector face different "
         "risks. An investor may still buy the best firm in an exposed sector if it is likely to win the "
         "transition.</p>"
         "<p><b>Before the rating.</b> For each material ESG factor, record how the company performs on it, whether it "
         "gives a competitive (dis)advantage and which value drivers it affects.</p>"
         "<p><b>Remember:</b> top-down is the sector, bottom-up is the company.</p>",
)

statisk(
    "bm-s24", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about scoring a company's impact on the three impact criteria in lecture 6.",
        "Material: how relevant is the impact to the company's value drivers? Intentional: is it a deliberate choice, "
        "part of strategy and purpose? Transformational: does the company drive major change through its business "
        "model, technology, scale or standards?",
        "<p><b>Step 1: material?</b> Does the impact come from what earns the profit?</p>"
        "<p><b>Step 2: intentional?</b> Was it part of strategy or purpose?</p>"
        "<p><b>Step 3: transformational?</b> Did it change the sector?</p>",
    ),
    q="<p>Bølge Tech designed a cheap sensor to cut its own production costs. Rivals copied it and it became the industry "
      "standard that sharply cut water waste across the sector. Sensor sales are now Bølge's main source of profit, yet "
      "improving water use was never part of its strategy or purpose. How does its impact score on the three "
      "criteria?</p>",
    alternativer=[
        R("High on material and transformational, low on intentional"),
        F("High on intentional, low on material and transformational",
          "The water saving was never planned and it changed the whole sector."),
        F("High on all three, since the outcome is clearly positive",
          "A good outcome does not make the impact a deliberate choice."),
        F("High on transformational only, since its profit is unrelated to the impact",
          "The profit comes from selling the sensor that delivers the impact."),
    ],
    kort="<p><b>Material and transformational, not intentional.</b> The impact drives the profit and set a standard for the "
         "sector, but it was never part of strategy or purpose.</p>",
    full="<p><b>The three impact criteria.</b></p>"
         "<ul><li><b>Material:</b> how relevant is the impact to the company's value drivers (sales, profits, investment, "
         "cost of capital)?</li>"
         "<li><b>Intentional:</b> is the impact a deliberate choice, part of strategy and purpose?</li>"
         "<li><b>Transformational:</b> does the company drive major change for the better through its business model, "
         "technology, scale or standards?</li></ul>"
         "<p><b>Here.</b> The sensor that saves water is also what earns the profit, so the impact is material. It became "
         "the industry standard and cut water waste across the sector, so it is transformational through standards. "
         "But Bølge built it to cut its own costs and water was never part of its strategy or purpose, so it is not "
         "intentional.</p>"
         "<p><b>The usual mix-up.</b> Scoring high on everything because the outcome is good. The criteria are "
         "separate; a lucky impact is not an intentional one.</p>"
         "<p><b>Next questions.</b> Can the impact be measured and does the company report on it? That leads into "
         "lecture 7.</p>"
         "<p><b>Remember:</b> material, intentional and transformational are scored one by one.</p>",
)

statisk(
    "bm-s25", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about applying the three impact criteria to Oatly, as lecture 6 does.",
        "Material: is the impact relevant to the value drivers? Intentional: is it part of strategy and purpose? "
        "Transformational: does the firm drive major change through its business model, technology, scale or "
        "standards?",
        "<p><b>Step 1: material.</b> Do the impact and the revenue come from the same product?</p>"
        "<p><b>Step 2: intentional.</b> What does Oatly say its ambition is?</p>"
        "<p><b>Step 3: transformational.</b> What would it take and what is happening to Oatly's market share?</p>",
    ),
    q="<p>Oatly presents the switch from cow's milk to oat drinks as its main route to impact, citing lower emissions, "
      "land use and energy use. Applying the three impact criteria as lecture 6 does, which criterion is most in "
      "doubt?</p>",
    alternativer=[
        R("Transformational, since that requires shifting diets at scale while Oatly is losing market share"),
        F("Material, since Oatly's impact and its revenue come from different products",
          "The impact and the revenue come from the same litre sold."),
        F("Intentional, since Oatly never mentions plant-based diets in its strategy",
          "Oatly presents a shift from dairy to plant-based diets as a central ambition."),
        F("Measurability, since Oatly reports no figures on its impact at all",
          "Measurement is a follow-up question, not one of the three criteria and Oatly does cite its impacts."),
    ],
    kort="<p><b>Transformational.</b> Oatly's impact is material and intentional, but it transforms the market only if it "
         "shifts diets at scale and lost market share is exactly that risk.</p>",
    full="<p><b>Oatly on the three criteria.</b> Oatly presents the switch from cow's milk to its oat drinks as its main "
         "mechanism for impact, citing lower emissions, land use and energy use.</p>"
         "<ul><li><b>Material:</b> yes. The impact and the revenue come from the same litre sold.</li>"
         "<li><b>Intentional:</b> yes. The company presents a shift from dairy to plant-based diets as a central "
         "ambition.</li>"
         "<li><b>Transformational:</b> only if it shifts diets at scale. Oatly is losing market share to rivals, which "
         "is exactly the risk.</li></ul>"
         "<p><b>A twist.</b> Rivals selling oat drinks may still shift diets, so the sector could transform while Oatly "
         "itself does not capture it. That is why the lecture stresses that a strong impact story does not guarantee "
         "sustainable free cash flow.</p>"
         "<p><b>The usual mix-up.</b> Treating measurement and reporting as a fourth criterion. It is the follow-up "
         "question: can the impact be measured and does the company report on it?</p>"
         "<p><b>Remember:</b> for Oatly, transformational is the open question.</p>",
)

statisk(
    "bm-s26", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's seven guidelines for a company pursuing long-term value creation.",
        "The seven: purpose in strategy; sustainability and externalities in all functions; communicate long-term "
        "goals; keep promises; build long-term intangibles; long-term performance measurement; "
        "long-term incentives without short-term variable pay.",
        "<p><b>Step 1: what does the company do well?</b> Strike out the guideline the case says it meets.</p>"
        "<p><b>Step 2: what goes wrong?</b> Match the failure to a guideline.</p>"
        "<p><b>Step 3: use only what the case states.</b> Do not infer problems the case does not describe.</p>",
    ),
    q="<p>Bremnes Paper announced a clear emissions target for 2030 and explained it well to investors, staff and "
      "customers. But it has missed every interim milestone so far and quietly moved them back each time. Which of "
      "Schoenmaker and Schramade's seven guidelines for long-term value creation is it breaking most directly?</p>",
    alternativer=[
        R("Deliver on what you promise"),
        F("Communicate long-term goals clearly with all stakeholders",
          "The case says the goal was explained well. The failure lies elsewhere."),
        F("Make the company's purpose a key part of corporate strategy",
          "Nothing in the case concerns purpose."),
        F("Base incentives on long-term objectives and drop short-term variable pay",
          "The case says nothing about pay."),
    ],
    kort="<p><b>Deliver on what you promise.</b> Bremnes communicates well but misses its milestones and moves them, so "
         "its promises lose credibility.</p>",
    full="<p><b>The seven guidelines.</b> Schoenmaker and Schramade (2019) give a company pursuing long-term value creation "
         "seven guidelines:</p>"
         "<ul><li>make the company's purpose a key part of corporate strategy;</li>"
         "<li>integrate sustainability and externalities in all functional business areas;</li>"
         "<li>communicate long-term goals clearly with all stakeholders;</li>"
         "<li>deliver on what you promise;</li>"
         "<li>build and maintain the key long-term intangibles needed for transformational change;</li>"
         "<li>focus performance measurement on the long term and on meeting the purpose;</li>"
         "<li>base incentives on meeting long-term objectives and get rid of short-term variable pay.</li></ul>"
         "<p><b>Here.</b> Bremnes meets the communication guideline. But missing every milestone and quietly moving "
         "them breaks the next one: deliver on what you promise. Investors and customers learn to discount its "
         "targets.</p>"
         "<p><b>Remember:</b> communicating a goal and delivering on it are separate guidelines.</p>",
)

statisk(
    "bm-s27", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's seven guidelines for long-term value creation. You need the one a "
        "company's organisation breaks.",
        "The seven: purpose in strategy; sustainability and externalities in all functions; communicate long-term "
        "goals; keep promises; build long-term intangibles; long-term performance measurement; "
        "long-term incentives without short-term variable pay.",
        "<p><b>Step 1: where does sustainability sit in Moldeplast?</b></p>"
        "<p><b>Step 2: which guideline is about where it should sit?</b></p>"
        "<p><b>Step 3: look at procurement and design.</b> Do the functions that create the waste consider it?</p>",
    ),
    q="<p>At Moldeplast, sustainability is handled by a two-person CSR team that writes the annual report. Procurement "
      "picks suppliers on price alone and product design never considers recyclability. Which long-term value creation "
      "guideline does Moldeplast break most clearly?</p>",
    alternativer=[
        R("Integrate sustainability and externalities in all functional business areas"),
        F("Deliver on what you promise to stakeholders",
          "The case does not mention any promise that was broken."),
        F("Focus performance measurement on the long term and on meeting the purpose",
          "Nothing is said about how performance is measured."),
        F("Build and maintain the key long-term intangibles for transformational change",
          "The case does not describe the loss or neglect of an intangible."),
    ],
    kort="<p><b>Integrate sustainability in all functions.</b> Procurement and design ignore it, so sustainability is a "
         "reporting task, not part of how the business is run.</p>",
    full="<p><b>The guideline.</b> Schoenmaker and Schramade's second guideline for long-term value creation: integrate "
         "sustainability and externalities in all functional business areas. Sustainability is not a department; it "
         "belongs in procurement, design, production, sales and finance.</p>"
         "<p><b>Here.</b> Moldeplast's CSR team writes the report, while procurement buys on price alone and design never "
         "asks about recyclability. The functions that create the externalities do not consider them. That is the "
         "failure the guideline targets.</p>"
         "<p><b>Why it matters.</b> The material issues of a plastics firm, such as waste and recyclability, are decided "
         "in design and sourcing. A report cannot fix what those functions ignore and the risk of internalisation "
         "(a packaging levy, lost customers) stays with the firm.</p>"
         "<p><b>The other guidelines.</b> Purpose in strategy, clear communication, delivering on promises, long-term "
         "intangibles, long-term measurement and long-term incentives.</p>"
         "<p><b>Remember:</b> sustainability in every function, not in a CSR corner.</p>",
)

statisk(
    "bm-s28", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about Schoenmaker and Schramade's seven guidelines for long-term value creation. You need the one a "
        "cost cut goes against.",
        "The seven: purpose in strategy; sustainability and externalities in all functions; communicate long-term "
        "goals; keep promises; build long-term intangibles; long-term performance measurement; "
        "long-term incentives without short-term variable pay.",
        "<p><b>Step 1: what does Tyssedal lose?</b> Is it a tangible asset or something like know-how?</p>"
        "<p><b>Step 2: which guideline protects that?</b></p>"
        "<p><b>Step 3: think about the balance sheet.</b> Would the loss show up in the accounts, or only in the firm's future?</p>",
    ),
    q="<p>To meet a cost target, Tyssedal Metals closes its research lab and lets go of the engineering team that was "
      "developing a low-carbon smelting process. Which long-term value creation guideline does this cut go against most "
      "directly?</p>",
    alternativer=[
        R("Build and maintain the key long-term intangibles for transformational change"),
        F("Communicate long-term goals clearly with all stakeholders",
          "The case is not about how goals are communicated."),
        F("Deliver on what you promise to investors and customers",
          "No promise is mentioned in the case."),
        F("Integrate sustainability and externalities in all functional business areas",
          "The case is not about which functions consider sustainability."),
    ],
    kort="<p><b>Build long-term intangibles.</b> The engineering team and its know-how are the intangibles Tyssedal needs for "
         "a low-carbon future and the cut throws them away.</p>",
    full="<p><b>The guideline.</b> Schoenmaker and Schramade's fifth guideline: build and maintain the key long-term "
         "intangibles needed for transformational change.</p>"
         "<p><b>Here.</b> The engineers and their know-how about low-carbon smelting are intangible resources. They do "
         "not show up on the balance sheet, so cutting them flatters this year's numbers. But they are what Tyssedal "
         "would need to stay competitive as carbon costs rise. Losing them is hard to undo: intangibles are a sunk cost "
         "and tend to have synergies with each other, so a team once dispersed is not easily rebuilt.</p>"
         "<p><b>Why it matters.</b> Lecture 6 stresses that much of what sustainability changes lives in intangibles "
         "that the accounts miss. A cost target measured on this year's accounts can destroy long-term value.</p>"
         "<p><b>Related guidelines.</b> Focus performance measurement on the long term and base incentives on "
         "long-term objectives rather than short-term variable pay.</p>"
         "<p><b>Remember:</b> protect the intangibles needed for transformational change.</p>",
)

statisk(
    "bm-s29", tema="forretningsmodell", type="tolkning",
    hjelp=hjelp3(
        "This is about the last part of the business-model section in lecture 6: changing the model itself.",
        "Lecture 6 ends the business-model part with redesigning how the firm creates, delivers and captures value so "
        "that the model itself becomes sustainable.",
        "<p><b>Step 1: what changes at the retailer?</b> Its market, its view of value or how it earns money?</p>"
        "<p><b>Step 2: name that kind of change.</b></p>"
        "<p><b>Step 3: compare with the business model definition.</b> Which of create, deliver and capture has changed?</p>",
    ),
    q="<p>Strikk &amp; Co, a clothing retailer, stops selling new garments to most customers. Instead it rents out clothes "
      "for a monthly fee, repairs them and resells them, earning more per garment while using fewer new materials. What "
      "does lecture 6 call this kind of change?</p>",
    alternativer=[
        R("Sustainable business model innovation"),
        F("Entering a new arena in Hambrick and Fredrickson's strategy",
          "The retailer keeps serving the same customers in the same market."),
        F("A switch from pie-growing to pie-splitting",
          "Pie-splitting treats value as fixed between groups, which the case does not describe."),
        F("A move from financial to impact materiality",
          "Materiality is a lens for judging issues, not a way for a firm to earn money."),
    ],
    kort="<p><b>Sustainable business model innovation.</b> The retailer redesigns how it creates, delivers and captures "
         "value so that the model itself becomes sustainable.</p>",
    full="<p><b>The concept.</b> Lecture 6 closes the business-model section with sustainable business model innovation: "
         "redesigning how the firm creates, delivers and captures value so that the model itself becomes "
         "sustainable.</p>"
         "<p><b>Here.</b> Strikk &amp; Co changes all three. It creates value by keeping garments in use, delivers it "
         "through rental and repair and captures it through a monthly fee and resale. Fewer new materials are needed "
         "per krone earned, so the sustainability gain is built into the profit formula rather than added on top.</p>"
         "<p><b>Why it matters.</b> The lecture's goal is free cash flow that lasts. A model whose revenue rises as its "
         "environmental impact falls has less to fear from internalisation and its impact is material by "
         "design.</p>"
         "<p><b>The usual mix-up.</b> Calling it a new market. The customers and the market are the same; what changes "
         "is how the firm makes money.</p>"
         "<p><b>Remember:</b> sustainable business model innovation redesigns create, deliver and capture.</p>",
)

statisk(
    "bm-s30", tema="forretningsmodell", type="paastand", rekkefolge="fast",
    hjelp=hjelp3(
        "This is about the four economic characteristics of intangibles in Haskel and Westlake. Check each statement "
        "on its own.",
        "Haskel and Westlake list four characteristics: intangibles represent a sunk cost, generate spillovers, are "
        "often scalable and tend to have synergies with each other.",
        "<p><b>Step 1: statement I.</b> Is it easy to recover money spent on an intangible if the project fails?</p>"
        "<p><b>Step 2: statement II.</b> Does this match one of the four characteristics?</p>"
        "<p><b>Step 3: combine.</b></p>",
    ),
    q="<p>Consider two statements about intangibles, following Haskel and Westlake (2017).</p>"
      "<p>I. Intangibles are rarely a sunk cost, since they can usually be sold if a project fails.</p>"
      "<p>II. Intangibles are often scalable: the same design or software can be used again and again at little extra "
      "cost.</p>"
      "<p>Which is correct?</p>",
    alternativer=[
        F("Only I", "Statement I needs a second look: recall what Haskel and Westlake say about recovering the cost of "
                    "an intangible."),
        R("Only II"),
        F("Both I and II", "Statement I needs a second look: compare it with the four characteristics."),
        F("Neither I nor II", "At least one of the statements is among Haskel and Westlake's four characteristics."),
    ],
    kort="<p><b>Only II.</b> Haskel and Westlake list scalability as a characteristic of intangibles. Statement I reverses "
         "another: intangibles represent a sunk cost.</p>",
    full="<p><b>The four characteristics.</b> Haskel and Westlake (2017):</p>"
         "<ul><li><b>Sunk cost:</b> money spent on intangibles is hard to recover. A brand, a trained team or a piece of "
         "custom software usually cannot be sold for what it cost if the project fails.</li>"
         "<li><b>Spillovers:</b> others can benefit from them.</li>"
         "<li><b>Scalability:</b> they can often be used again and again at little extra cost.</li>"
         "<li><b>Synergies:</b> they tend to be worth more together.</li></ul>"
         "<p><b>Statement I</b> reverses the sunk-cost characteristic, so it is false. <b>Statement II</b> is the "
         "scalability characteristic, so it is true.</p>"
         "<p><b>Why it matters.</b> Sunk costs make intangible investment risky: if the business model fails, little "
         "can be recovered. Scalability makes it rewarding: a design that works can serve many customers cheaply. "
         "Both shape how analysts judge the long-term cash flows of firms whose value lies in intangibles.</p>"
         "<p><b>Remember:</b> sunk cost, spillovers, scalability, synergies.</p>",
)
