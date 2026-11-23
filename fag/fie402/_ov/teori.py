# -*- coding: utf-8 -*-
"""Øv uten stopp FIE402: to korte teorioppgaver (skribent 3).

   ov-teo1  Kapitalstrukturteoriene brukt på et selskap: trade-off (skatteskjold mot
            forventede konkurskostnader), én direkte og én indirekte konkurskostnad
            (brannsalg), og hakkeordenen. Tema «skatt». Format som H2024 E2 og H2025 E2
            (setningsbudsjett, poeng per ledd); innhold fra forelesning 3, 4 og 6.
   ov-teo2  Utbyttepolitikk: MM-irrelevans med tall (kurs, selger og beholder),
            signaler og bruk av kontantene (klebrig utbytte, tilbakekjøp ved
            undervurdering, invester hvis det finnes gode prosjekter), skatt og
            klienteller. Tema «utbytte». Innhold fra forelesning 5 (A10, D8 i
            docs/fie402-forelesninger-2026.md, opptak 05).

   Hver variant trekker en vignett (selskap, situasjon, tall i teksten). Deloppgavene
   spør om samme mekanisme i alle variantene; kriteriene følger vignetten.
"""
from ov_lib import *  # noqa: F401,F403


_BRUKT = {}


def _velg(oid, liste, r):
    """Velg blant de minst brukte vignettene, så hver vignett brukes like ofte."""
    tell = _BRUKT.setdefault(oid, {})
    minst = min(tell.get(x["navn"], 0) for x in liste)
    return r.choice([x for x in liste if tell.get(x["navn"], 0) == minst])


def _registrer(oid, ov, navn):
    """Tell vignetten som brukt når varianten er ferdig."""
    tell = _BRUKT.setdefault(oid, {})
    tell[navn] = tell.get(navn, 0) + 1
    return ov


def _belop(C, cur):
    """Et beløp i millioner med ord: «NOK 500 million» eller «$1 billion»."""
    if C >= 1000:
        return f"{penger(C / 1000, 0 if C % 1000 == 0 else 1, cur)} billion"
    return f"{penger(C, 0, cur)} million"


def _inn(t):
    """En vignettsetning bygd inn i et kriterium: liten forbokstav og uten punktum til slutt."""
    t = t.strip()
    return (t[0].lower() + t[1:]).rstrip(".")


# ---------------------------------------------------------------------------
# ov-teo1 · Trade-off mot hakkeordenen, brukt på et selskap
# ---------------------------------------------------------------------------
TEO1 = [
    dict(
        navn="Vestland Kraft ASA", cur="NOK",
        om=("a hydropower producer. It sells most of its power on long-term contracts, so its cash flows are stable. "
            "Its assets are dams and turbines that will produce for decades. It pays a lot of corporate tax and has "
            "few growth options."),
        prosjekt="a new power station costing NOK 3 billion",
        kasse="It has NOK 1 billion of retained earnings in the bank.",
        a_anv=("Stable contracted cash flows make distress unlikely and cheap, since long-lived physical assets keep "
               "their value, while large taxable profits make the tax shield valuable."),
        a_konk="a high level of debt",
        b_dir="For a large firm like this they are a small share of value (Kurbatov: 3 to 4%).",
        b_ind="a forced sale of a power station at a discount",
        b_anv=("Few buyers can run a power station, so a seller under time pressure gets a low price, although its "
               "stable contracts make that unlikely."),
        c_anv=("It should use the NOK 1 billion of retained earnings first and borrow the remaining NOK 2 billion. It "
               "would not issue shares."),
        c_enig=("Here the two theories agree: both point to debt rather than equity, although the pecking order has "
                "no target ratio and the trade-off does."),
    ),
    dict(
        navn="Kjeldsberg Biotech ASA", cur="NOK",
        om=("a biotech firm with no revenue yet. It has large tax losses carried forward. Its main assets are a "
            "patent and its research team. The outcome of its drug trial is very uncertain."),
        prosjekt="a final drug trial costing NOK 400 million",
        kasse="It has almost no cash left.",
        a_anv=("It has no taxable profit, so a tax shield is worth little, while distress is very likely and very "
               "costly because its value lies in people and a patent."),
        a_konk="little or no debt, as is typical for biotech firms",
        b_dir="For a small firm they are a large share of value (Kurbatov: 20 to 25%).",
        b_ind="the loss of key researchers and trial partners",
        b_anv=("Its value walks out of the door with the researchers, while a patent sold in a hurry fetches a "
               "fraction of its worth."),
        b_storst=("Both kinds are large here, since distress is likely and the firm is small, but losing the team and "
                  "the partners would still cost the most."),
        c_anv=("It has no internal funds and cannot borrow on sensible terms, so it must issue equity despite the "
               "information cost. It can reduce that cost with certification by a respected investor or partner, or a "
               "rights issue to its existing owners."),
        c_enig=("The two theories agree on equity, but for different reasons: the trade-off because debt is too "
                "risky, the pecking order because nothing cheaper is available."),
    ),
    dict(
        navn="Kvitfjell Software ASA", cur="NOK",
        om=("a very profitable software firm that pays a lot of corporate tax. Its assets are its code, its "
            "customer relationships and its programmers. It has no debt."),
        prosjekt="the purchase of a competitor for NOK 1.5 billion",
        kasse="It has NOK 2 billion of cash from retained earnings.",
        a_anv=("Large taxable profits make the tax shield valuable, which argues for more debt than zero, but its "
               "assets are intangible and lose much of their value in distress."),
        a_konk="a moderate level of debt, more than the zero it has today",
        b_dir="For a firm of its size the legal and advisory fees are only a few percent of value.",
        b_ind="the loss of programmers and of customers who fear the software will not be supported",
        b_anv=("A software firm is its people and its customers' trust, which vanish quickly when the firm looks "
               "weak."),
        c_anv="It should pay with its own cash: internal funds come first, so it needs neither debt nor equity.",
        c_enig=("Here the theories disagree: the trade-off says a firm this profitable should borrow to use the tax "
                "shield, while the pecking order explains why the most profitable firms borrow the least."),
    ),
    dict(
        navn="Kystrederi ASA", cur="NOK",
        om=("a shipping company with a fleet of tankers. Its ships are standard designs that trade in an active "
            "second-hand market, but freight rates swing with the business cycle. It has little cash after two "
            "weak years."),
        prosjekt="two new tankers costing NOK 800 million",
        kasse="It has almost no retained earnings available.",
        a_anv=("Standard ships are good collateral and keep their value, which argues for debt, but volatile freight "
               "rates raise the probability of distress and make the tax shield uncertain."),
        a_konk="a substantial but not maximal level of debt, secured on the ships",
        b_dir="A restructuring with several ship lenders needs lawyers and advisers, but the fees are a few percent of "
              "value.",
        b_ind="a fire sale of ships in a downturn",
        b_anv=("In a slump every shipowner wants to sell at the same time, so a firm in distress sells its ships far "
               "below their long-run value."),
        c_anv=("With no internal funds it should borrow next, for example with a loan secured on the new ships. Equity "
               "comes only as a last resort."),
        c_enig=("The theories largely agree here: both favour debt secured on the ships, but the trade-off would stop "
                "borrowing earlier because of the cyclical risk."),
    ),
    dict(
        navn="Fjellfly ASA", cur="NOK",
        om=("an airline. Its aircraft can be resold, but its cash flows swing with fuel prices and demand. Its "
            "fixed costs are high. It is profitable this year."),
        prosjekt="ten new aircraft costing NOK 2 billion",
        kasse="It has NOK 500 million of retained earnings.",
        a_anv=("Aircraft are standard collateral that lenders can resell, so they keep much of their value in "
               "distress while profits make the tax shield valuable. Volatile demand and high fixed costs raise the "
               "chance of distress, which caps the debt below what the collateral alone would allow."),
        a_konk="a fairly high level of debt secured on the aircraft, as is typical for airlines",
        b_dir="For a large airline the legal and advisory fees are a few percent of value.",
        b_ind="lost bookings from passengers who fear being stranded",
        b_anv=("Nobody buys a ticket months ahead from an airline that may not exist on the travel date, so distress "
               "itself destroys revenue."),
        c_anv=("It should use the NOK 500 million of retained earnings first and then borrow against the aircraft. "
               "Equity comes last."),
        c_enig=("Both theories favour debt here: the trade-off because the aircraft are good collateral, the pecking "
                "order because debt comes before equity."),
    ),
    dict(
        navn="Solheim Dagligvare ASA", cur="NOK",
        om=("a grocery chain. Demand for groceries is stable and the chain is profitable and pays corporate tax. It "
            "leases its stores, so it owns few physical assets."),
        prosjekt="30 new stores costing NOK 600 million",
        kasse="It has NOK 200 million of retained earnings.",
        a_anv=("Stable demand keeps the probability of distress low and taxable profits make the tax shield "
               "valuable, but few owned assets limit what it can pledge."),
        a_konk="a fairly high level of debt",
        b_dir="For a large chain the legal and advisory fees are a few percent of value.",
        b_ind="the loss of supplier credit, as suppliers demand cash on delivery",
        b_anv=("A grocer lives on supplier credit, which suppliers of a weak chain shorten exactly when cash is "
               "short."),
        c_anv=("It should use the NOK 200 million of retained earnings and borrow the other NOK 400 million. It would "
               "not issue shares."),
        c_enig="Here the two theories agree on debt for the part it cannot fund itself.",
    ),
    dict(
        navn="Atlas Robotics Inc", cur="$",
        om=("a fast-growing and profitable robotics firm. Much of its value lies in growth options and research. "
            "After a disappointing quarter its managers believe the market undervalues its shares."),
        prosjekt="a new factory costing $500 million",
        kasse="It has $150 million of cash.",
        a_anv=("Taxable profits favour some debt, but its growth options and research lose value in distress and high "
               "debt would make it pass up good projects (debt overhang)."),
        a_konk="a low to moderate level of debt",
        b_dir="For a firm of its size the legal and advisory fees are a few percent of value.",
        b_ind="underinvestment: passing up positive-NPV projects whose value would go to the creditors",
        b_anv=("For a firm whose value is growth options, forgone projects and departing engineers destroy much of "
               "that value."),
        c_anv=("It should use the $150 million first and borrow the rest. Above all it should not issue shares now: "
               "selling undervalued shares hands wealth to new investors, while the market would read an issue as a "
               "sign of overvaluation."),
        c_enig=("The theories differ in emphasis: the trade-off keeps its debt low because of the growth options, "
                "while the pecking order rules out equity because the managers think the shares are undervalued."),
    ),
    dict(
        navn="Harbor Steel Inc", cur="$",
        om=("a mature steelmaker with large plants built for steelmaking only. Its profits are high now but swing "
            "with the cycle. It has few growth options."),
        prosjekt="a modernisation of its main plant costing $1 billion",
        kasse="It paid out its cash last year and has little left.",
        a_anv=("High taxable profits make the tax shield valuable, but cyclical profits raise the chance of distress "
               "and specialised plants fetch little in a forced sale."),
        a_konk="a moderate level of debt",
        b_dir="For a large steelmaker the legal and advisory fees are small next to the value of its plants.",
        b_ind="a fire sale of specialised equipment",
        b_anv=("Equipment built only for steelmaking has few other users, so in a forced sale it may go for little "
               "more than scrap value."),
        c_anv="With no internal funds it should borrow before it issues equity.",
        c_enig=("The theories agree on debt before equity here, but the trade-off would stop at a moderate level "
                "because of the cycle."),
    ),
    dict(
        navn="Nordhavn Eiendom ASA", cur="NOK",
        om=("a commercial property firm. Its office buildings are let to stable tenants on long leases. They are "
            "easy to value and to pledge as security. It pays corporate tax on steady profits."),
        prosjekt="a new office building costing NOK 1.2 billion",
        kasse="It has NOK 300 million of retained earnings.",
        a_anv=("Long leases make distress unlikely and buildings keep their value as collateral, while steady taxable "
               "profits make the tax shield valuable."),
        a_konk="a high level of debt, which is typical for property firms",
        b_dir="Lawyers and advisers in a restructuring cost a few percent of the property value.",
        b_ind="a forced sale of buildings in a weak property market",
        b_anv=("If it must sell when the property market is weak, buyers who know it is under pressure pay well below "
               "fair value."),
        c_anv=("It should use the NOK 300 million of retained earnings and finance the rest with a mortgage loan. It "
               "would not issue shares."),
        c_enig="Here the two theories agree: both point to debt secured on the building.",
    ),
    dict(
        navn="Bergheim Consulting ASA", cur="NOK",
        om=("a consulting firm whose main asset is its consultants. It is profitable and pays corporate tax, but it "
            "owns almost no physical assets."),
        prosjekt="the purchase of a smaller consulting firm for NOK 100 million",
        kasse="It has NOK 150 million of cash from retained earnings.",
        a_anv=("Its taxable profits make some debt attractive, but its value is human capital that walks out of the "
               "door in distress, so distress would be very costly."),
        a_konk="little debt",
        b_dir="The fees are small in money terms but a large share of a small consultancy's value.",
        b_ind="the loss of consultants and clients",
        b_anv=("Clients avoid a consultancy that may not finish the job, while the best consultants are the first to "
               "find new jobs."),
        c_anv="It should pay with its own cash, since internal funds come first.",
        c_enig="Here both theories point to little debt, the trade-off because of the distress costs.",
    ),
    dict(
        navn="Redcliff Pharma Inc", cur="$",
        om=("a large drug maker. Its patented drugs bring in steady, highly taxed profits, but much of its value lies "
            "in a research pipeline whose outcome is uncertain."),
        prosjekt="the acquisition of a smaller drug developer for $3 billion",
        kasse="It has $1 billion of cash.",
        a_anv=("Its value lies mostly in patents and a research pipeline that lose much of their value in distress. "
               "Steady taxed profits make a tax shield worth something, but not enough to outweigh that."),
        a_konk="little debt, as is typical for drug makers",
        b_dir="For a firm of its size the legal and advisory fees are a few percent of value.",
        b_ind="underinvestment: research cut back when cash is short",
        b_anv=("A drug maker in distress cuts the research that creates its future value, while its best scientists "
               "leave."),
        c_anv=("It should use the $1 billion of cash first and borrow the other $2 billion, issuing shares only if "
               "debt ran out."),
        c_enig=("The theories pull apart here: the pecking order borrows the $2 billion before issuing shares, while "
                "the trade-off keeps debt low because research loses value in distress."),
    ),
    dict(
        navn="Tidewater Gas Utility Inc", cur="$",
        om=("a regulated gas distributor. Regulated prices give it stable cash flows. Its pipelines are long-lived "
            "assets. It pays out most of its earnings and pays corporate tax."),
        prosjekt="a network expansion costing $800 million",
        kasse="It has little cash, since it pays out most of its earnings.",
        a_anv=("Stable regulated cash flows make distress unlikely and long-lived pipelines keep their value, while "
               "taxable profits make the tax shield valuable."),
        a_konk="a high level of debt, as is typical for utilities",
        b_dir="Lawyers, advisers and the regulator's process cost a few percent of value.",
        b_ind="a forced sale of network assets or tighter terms from the regulator",
        b_anv="A utility in distress may lose the regulator's goodwill, while its pipelines have few other buyers.",
        c_anv="With little internal cash it should borrow before it issues equity.",
        c_enig="Here the two theories agree on debt.",
    ),
]


STORST = ("Indirect costs are usually the larger part, since expected direct costs are small (Kurbatov: a few "
          "percent of value, times a low probability of distress).")


@oppgave("ov-teo1", tema="skatt", tittel="Capital structure theory applied to a firm", antall=12,
         kilde="H2025 E2 (format), Lectures 3, 4 and 6")
def _(r):
    v = _velg("ov-teo1", TEO1, r)
    fi = v["navn"]
    enhet = "krone" if v["cur"] == "NOK" else "dollar"
    case = (f"<p>{fi} is {v['om']}</p>"
            f"<p>It is planning {v['prosjekt']}. {v['kasse']} The CFO asks you how {fi} should think about its "
            f"capital structure.</p>"
            f"<p>Answer each part within its sentence budget. No calculations are needed.</p>")

    a_del = tekst_del(
        "a", poeng=4,
        q=(f"<p>What does the trade-off theory say about how much debt {fi} should have? Name the benefit and the cost "
           f"of debt the theory weighs and apply them to {fi}.</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>The trade-off theory weighs the tax shield (interest is deductible, so debt saves corporate tax) "
              f"against the expected costs of financial distress (the probability of distress times its direct and "
              f"indirect costs). {v['a_anv']} So the theory points to {v['a_konk']}, where the marginal tax benefit of "
              f"one more {enhet} of debt equals its marginal expected distress cost.</p>"),
        losning=(f"<p><b>The theory.</b> With taxes, debt adds value through the interest tax shield, so MM with taxes "
                 f"alone would give 100% debt. What stops it is the expected cost of financial distress: the "
                 f"probability of distress times the cost if it happens. The optimal debt level is where the marginal "
                 f"tax benefit equals the marginal expected distress cost.</p>"
                 f"<p><b>What drives each side.</b> The shield is worth more the more taxable profit the firm has; a "
                 f"firm with losses carried forward gains little. The expected distress cost rises with the "
                 f"volatility of the cash flows (probability) and with how much value disappears in distress (cost): "
                 f"intangible assets, specialised assets and fragile customer relationships lose the most. Kurbatov's "
                 f"industry examples fit this: airlines, utilities and property firms borrow a lot, while biotech, "
                 f"pharma and software borrow little.</p>"
                 f"<p><b>Applied to {fi}.</b> {v['a_anv']} Hence {v['a_konk']}.</p>"
                 f"<p><b>Typical mistakes:</b> naming the tax shield without the distress costs (that is MM with "
                 f"taxes, not the trade-off), listing firm features without saying which way they push, or giving a "
                 f"conclusion that does not follow from the features.</p>"
                 f"<p><b>Remember:</b> the trade-off is tax shield against expected distress costs, applied to this "
                 f"firm's profits and assets.</p>"),
        kriterier=[
            "Names the benefit: interest is tax-deductible, so debt creates a tax shield that is worth more the more "
            "taxable profit the firm has (1 p)",
            "Names the cost: expected financial distress costs, the probability of distress times its direct and "
            "indirect costs (1 p)",
            f"Applies both to {fi}: {_inn(v['a_anv'])} (1 p)",
            f"Concludes that the trade-off points to {v['a_konk']}, at the level where the marginal benefit equals the "
            f"marginal cost (1 p)",
        ],
        selvstendig=True,
    )

    b_del = tekst_del(
        "b", poeng=4,
        q=(f"<p>Name one direct and one indirect cost of financial distress that would matter for {fi}. Explain why "
           f"each matters for this firm. Which kind is likely to be larger?</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>A direct cost is the legal, advisory and administrative fees of a restructuring or bankruptcy: "
              f"{_inn(v['b_dir'])}. An indirect cost that matters for {fi} is {v['b_ind']}. {v['b_anv']} "
              f"{v.get('b_storst', STORST)}</p>"),
        losning=(f"<p><b>Direct costs</b> are the out-of-pocket costs of the legal process: lawyers, advisers, "
                 f"courts and administrators. Kurbatov's figures are 3 to 4% of value for large firms and 20 to 25% "
                 f"for small ones, times an annual probability of distress below 1%. Expected direct costs are "
                 f"therefore small and cannot on their own explain why firms borrow so little.</p>"
                 f"<p><b>Indirect costs</b> come from how others behave when the firm looks weak: customers and "
                 f"suppliers walk away, key employees leave, managers are distracted, the firm passes up good "
                 f"projects (debt overhang) and it may have to sell assets in a hurry. Fire sales deserve special "
                 f"weight: a buyer who knows you must sell pays little. Specialised assets fetch close to scrap "
                 f"value.</p>"
                 f"<p><b>Applied to {fi}.</b> {v['b_dir']} The relevant indirect cost is {v['b_ind']}. "
                 f"{v['b_anv']}</p>"
                 f"<p><b>Typical mistakes:</b> naming two direct costs, naming a cost without saying why it matters "
                 f"for this firm, or calling the fall in the share price itself a distress cost.</p>"
                 f"<p><b>Remember:</b> expected direct costs are small; the indirect costs, fire sales above all, "
                 f"are what limit debt.</p>"),
        kriterier=[
            f"Names a direct cost (legal, advisory or administrative fees of a bankruptcy or restructuring) and says why "
            f"it matters here: {_inn(v['b_dir'])} (1 p)",
            f"Names an indirect cost that fits {fi}, such as {v['b_ind']} (1 p)",
            f"Explains why that indirect cost matters for this firm: {_inn(v['b_anv'])} (1 p)",
            f"Says which kind is larger: {_inn(v.get('b_storst', STORST))} (1 p)",
        ],
        selvstendig=True,
    )

    c_del = tekst_del(
        "c", poeng=4,
        q=(f"<p>What does the pecking order theory predict about how {fi} will finance {v['prosjekt']}? Explain the "
           f"mechanism. Does it agree with the trade-off theory here?</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>The pecking order says firms use internal funds first, then safe debt and equity only as a last "
              f"resort, because managers know more than investors: equity is the claim most sensitive to that "
              f"knowledge, so an equity issue signals overvaluation and the share price falls (Myers-Majluf). "
              f"{v['c_anv']} {v['c_enig']}</p>"),
        losning=(f"<p><b>The mechanism.</b> Managers know more about the firm's value than outside investors. Investors "
                 f"know that managers prefer to sell shares when they are overvalued, so they read an equity issue as "
                 f"bad news and the price falls on the announcement. Debt is less sensitive to what managers know. "
                 f"Internal funds need no outside investor at all. So the cheapest finance is internal funds, "
                 f"then debt. Equity comes last. The theory ranks sources; it has no target debt ratio, so a "
                 f"firm's leverage is the sum of its past financing needs.</p>"
                 f"<p><b>Applied to {fi}.</b> {v['c_anv']}</p>"
                 f"<p><b>Against the trade-off.</b> {v['c_enig']} A classic difference: the trade-off predicts that "
                 f"profitable firms borrow more (they have more tax to shield), while the pecking order predicts that "
                 f"they borrow less (they have more internal funds), which is what the data usually show.</p>"
                 f"<p><b>Typical mistakes:</b> stating the order without the reason, or saying equity is never "
                 f"issued. A firm with no internal funds and no debt capacity still issues equity.</p>"
                 f"<p><b>Remember:</b> internal funds, then debt, then equity, because of what managers know.</p>"),
        kriterier=[
            "States the order: internal funds first, then (safe) debt, equity as the last resort (1 p)",
            "Explains the mechanism: managers know more than investors and equity is the most information-sensitive "
            "claim, so an equity issue signals overvaluation and the price falls (1 p)",
            f"Applies it to {fi}: {_inn(v['c_anv'])} (1 p)",
            f"Compares with the trade-off: {_inn(v['c_enig'])} (1 p)",
        ],
        selvstendig=True,
    )
    return _registrer("ov-teo1", ovelse(case, [a_del, b_del, c_del]), fi)


# ---------------------------------------------------------------------------
# ov-teo2 · Utbyttepolitikk: MM, signaler, skatt og klienteller
# ---------------------------------------------------------------------------
TEO2 = [
    dict(navn="Sognefjord Seafood ASA", cur="NOK", N=100, P=60, C=500,
         situasjon=("It has received NOK 500 million from selling a subsidiary. The money is a one-off. The firm "
                    "has no new projects that need it."),
         eiere="Most of its shareholders are Norwegian private investors.",
         b_anv=("The cash is a one-off and there are no good projects, so it should be paid out, but as a share "
                "buyback or a special dividend rather than a higher regular dividend that would have to be cut "
                "later."),
         c_anv=("Its Norwegian private investors pay the same rate on dividends and gains, so they prefer the buyback: "
                "only those who sell pay tax, on their gain only."),
         b_bruk="the cash should be paid out, since no projects need it and idle cash invites waste",
         ),
    dict(navn="Varanger Telecom ASA", cur="NOK", N=200, P=45, C=400,
         situasjon=("Its new network is finished. It expects free cash flow to stay NOK 400 million a year higher "
                    "from now on. It has no large new projects planned and has the first NOK 400 million in the "
                    "bank."),
         eiere="Its shareholders are mainly pension funds and foreign institutions.",
         b_anv=("The extra cash flow is permanent, so a higher regular dividend is the credible signal: managers raise "
                "dividends only when they expect to sustain them. Committing the cash also keeps it from being "
                "wasted on empire building."),
         c_anv=("Its pension funds and institutions are largely indifferent on tax, so the signal and their need for a "
                "steady cash return decide the choice."),
         b_bruk="the cash should be paid out, since the network is built and no large projects need it",
         ),
    dict(navn="Kvitfjell Software ASA", cur="NOK", N=50, P=80, C=300,
         situasjon=("It has NOK 300 million of excess cash. After a profit warning its managers believe the market "
                    "undervalues the shares, but they have no new projects to spend the money on."),
         eiere="Its shareholders are a mix of Norwegian private investors and mutual funds.",
         b_anv=("If the managers are right that the shares are undervalued, a buyback both signals that view and moves "
                "value from the shareholders who sell to those who stay; the signal is credible because the firm "
                "loses money if the managers are wrong."),
         c_anv=("Its private investors prefer the buyback for the tax deferral; the funds are largely indifferent."),
         b_bruk="the cash should be paid out, since the firm has no projects to spend it on",
         ),
    dict(navn="Tømmerdal Industri ASA", cur="NOK", N=20, P=150, C=200,
         situasjon=("Its profits have risen steadily for five years. It has NOK 200 million of cash it does not "
                    "need for its projects."),
         eiere=("A holding company owns 60% of the shares; Norwegian private investors own the rest."),
         b_anv=("The steady rise in profits supports a higher regular dividend, a credible signal that the higher "
                "cash flow is expected to last; paying out also avoids holding idle cash that managers might waste."),
         c_anv=("The holding company, a corporate shareholder, prefers dividends, while its private investors prefer a "
                "buyback for the tax deferral. The two clienteles pull in opposite directions."),
         b_bruk="only the cash its projects do not need should be paid out, which is the case here",
         ),
    dict(navn="Redwood Analytics Inc", cur="$", N=100, P=50, C=1000,
         situasjon=("It holds $1 billion of cash and has several projects with clearly positive NPVs that will need "
                    "most of it over the next two years. An activist investor demands that all of it be paid out "
                    "now."),
         eiere="Its shareholders are mainly institutions and growth investors.",
         b_anv=("It should invest in its positive-NPV projects first: paying out cash it will need forces it to raise "
                "costly outside money later and signals a lack of good projects. Only truly excess cash should be paid "
                "out."),
         c_anv=("Its institutions are largely indifferent on tax, while growth investors value reinvestment in good "
                "projects more than a payout."),
         b_bruk="the cash should go to the positive-NPV projects first; only what they do not need should be paid out",
         ),
    dict(navn="Prairie Utilities Inc", cur="$", N=50, P=40, C=100,
         situasjon=("It is a mature utility with steady cash flows and few new projects. It pays a regular dividend of "
                    "$2.00 per share, $100 million a year. The board considers replacing the dividend with share "
                    "buybacks of the same amount."),
         eiere="Most of its shareholders are retirees who live on the dividend.",
         b_anv=("Replacing the dividend would likely be read as bad news about future cash flows, since the market "
                "punishes a cut far more than it rewards an increase. It should keep the dividend."),
         c_anv=("Its retirees want steady cash income and would face transaction costs if they had to sell shares, so "
                "this clientele prefers dividends even though a buyback would let them defer tax."),
         b_bruk="a mature utility with few new projects should keep paying out its cash rather than hold it",
         ),
    dict(navn="Lofoten Pelagic ASA", cur="NOK", N=30, P=120, C=300,
         situasjon=("Fish prices gave it a record year and NOK 300 million of extra cash, but its profits swing "
                    "strongly with prices. It has no new projects that need the cash. The board wants to raise the "
                    "regular dividend."),
         eiere="Its shareholders are a mix of Norwegian private investors and funds.",
         b_anv=("A record year in a cyclical business is not permanent, so raising the regular dividend risks a cut "
                "later, which the market punishes. A special dividend or a buyback pays out the cash without that "
                "commitment."),
         c_anv=("Its private investors prefer a buyback for the tax deferral; the funds are largely indifferent."),
         b_bruk="the extra cash should be paid out, since no projects need it",
         ),
    dict(navn="Ridgeline Brands Inc", cur="$", N=40, P=50, C=200,
         situasjon=("It has $200 million of cash that no project needs. Its CEO receives a large bonus if earnings per "
                    "share reach a target this year. In the fourth quarter the CEO proposes a $200 million share "
                    "buyback, which would lift EPS above the target."),
         eiere="Its shareholders are mainly institutions.",
         b_anv=("A buyback raises EPS mechanically by cutting the share count, but that creates no value; here it "
                "looks driven by the bonus, a short-term 'sugar high'. The board should choose the form of payout on its "
                "merits and fix the EPS target in the pay contract."),
         c_anv=("Its institutions are largely indifferent on tax, so taxes give no reason for the buyback either."),
         b_bruk="paying out is fine since no project needs the cash, but the EPS target should not decide the form",
         ),
    dict(navn="Hardanger Kraftverk ASA", cur="NOK", N=60, P=90, C=600,
         situasjon=("An unusually cold winter with record power prices has left it with NOK 600 million of extra cash. "
                    "Prices are expected to normalise. It has no new projects."),
         eiere="Its shareholders are Norwegian private investors and local municipalities, which pay no tax.",
         b_anv=("The cash is a windfall that will not repeat, so it should be paid out as a special dividend or a "
                "buyback, not as a higher regular dividend that would have to be cut next year."),
         c_anv=("The municipalities pay no tax and are indifferent, while the private investors prefer a buyback for "
                "the tax deferral."),
         b_bruk="the windfall should be paid out, since there are no new projects",
         ),
    dict(navn="Stavanger Offshore ASA", cur="NOK", N=80, P=50, C=400,
         situasjon=("It has NOK 400 million of excess cash and no new projects. Its managers privately believe the "
                    "shares are overvalued after a rally in the sector."),
         eiere="Its shareholders are foreign funds and Norwegian private investors.",
         b_anv=("If the managers think the shares are overvalued, a buyback would pay the sellers too much at the "
                "expense of those who stay, so a dividend is the fairer choice. The market cannot read an "
                "undervaluation signal into it either."),
         c_anv=("Its private investors prefer a buyback for the tax deferral, while the foreign funds are largely "
                "indifferent."),
         b_bruk="the cash should be paid out, since there are no new projects",
         ),
    dict(navn="Bluefield Retail Inc", cur="$", N=60, P=25, C=60,
         situasjon=("It has paid a $1.00 dividend per share, $60 million a year, for twenty years. Its market is now "
                    "shrinking. Some directors want to replace the dividend with buybacks; others want to cut the "
                    "payout to fund a restructuring with a positive NPV."),
         eiere="Its shareholders are mostly income-oriented investors who value the steady dividend.",
         b_anv=("Replacing or cutting the dividend will be read as bad news, because dividends are sticky. Funding a "
                "positive-NPV restructuring is still the right use of the cash, so the board should cut the payout "
                "and explain the projects clearly."),
         c_anv=("Its income-oriented investors prefer dividends for steady cash, even though a buyback would let "
                "individuals defer tax."),
         b_bruk="the cash should fund the positive-NPV restructuring rather than be paid out",
         ),
    dict(navn="Northgate Pharma Inc", cur="$", N=50, P=60, C=300,
         situasjon=("Its founder and CEO owns 40% of the shares and will not sell any. The firm has $300 million of "
                    "excess cash and no new projects."),
         eiere="Institutions hold the other 60%.",
         b_anv=("With no projects the cash should be paid out as a special dividend, which keeps ownership unchanged: "
                "a buyback would raise the founder's stake above 40%, since the founder does not sell, tightening "
                "control without creating any value."),
         c_anv=("The founder, as an individual who does not sell, pays no tax on a buyback, while the institutions are "
                "largely indifferent."),
         b_bruk="the cash should be paid out, since there are no new projects",
         ),
]


@oppgave("ov-teo2", tema="utbytte", tittel="Payout policy: dividend or buyback", antall=12,
         kilde="H2025 E2 (format), Lecture 5")
def _(r):
    v = _velg("ov-teo2", TEO2, r)
    fi, cur, N, P, C = v["navn"], v["cur"], v["N"], v["P"], v["C"]
    belop = _belop(C, cur)
    d = C / N
    Pex = P - d
    n_kjop = C / P
    case = (f"<p>{fi} has {tall(N)} million shares trading at {penger(P, 2, cur)}. {v['situasjon']}</p>"
            f"<p>{v['eiere']} The board asks whether to pay out the {belop} as a cash dividend or to buy back "
            f"shares.</p>"
            f"<p>Answer each part within its sentence budget.</p>")

    a_del = tekst_del(
        "a", poeng=4,
        q=(f"<p>Suppose capital markets are perfect. Does it matter to {gen(fi)} shareholders whether the "
           f"{belop} is paid as a dividend or used to buy back shares? Use the share price and "
           f"the wealth of a shareholder who sells and of one who keeps the shares.</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>No: under MM the firm's value is set by its investments, so payout policy only changes the form of "
              f"the payment. A dividend of {penger(d, 2, cur)} per share makes the price fall from "
              f"{penger(P, 2, cur)} to {penger(Pex, 2, cur)}, so each shareholder holds the same "
              f"{penger(P, 2, cur)} in cash and shares. A buyback of {tall(n_kjop, 4)} million shares at "
              f"{penger(P, 2, cur)} leaves the price unchanged: those who sell get {penger(P, 2, cur)} in cash, those "
              f"who keep own a larger part of a smaller firm worth the same per share. Any investor can create the "
              f"other pattern by selling shares or reinvesting the dividend (homemade dividends).</p>"),
        losning=(f"<p><b>The mechanism.</b> In a perfect market the firm's value comes from its investments. Paying out "
                 f"cash moves it from the firm to the owners; it does not create or destroy anything. The share "
                 f"price falls by exactly the cash paid out per share when the cash leaves the firm.</p>"
                 f"<p><b>Dividend.</b> {belop} over {tall(N)} million shares is "
                 f"{penger(d, 2, cur)} per share. The price goes ex-dividend from {penger(P, 2, cur)} to "
                 f"{penger(Pex, 2, cur)}: a holder has {penger(Pex, 2, cur)} in shares plus {penger(d, 2, cur)} in "
                 f"cash, the same {penger(P, 2, cur)} as before.</p>"
                 f"<p><b>Buyback.</b> At {penger(P, 2, cur)} the firm buys {tall(C)}/{tall(P, 2)} = "
                 f"{tall(n_kjop, 4)} million shares. The firm's value falls by {tall(C)} million and the share count by "
                 f"{tall(n_kjop, 4)} million, so the price stays at {penger(P, 2, cur)}. Sellers and keepers are "
                 f"equally well off.</p>"
                 f"<p><b>Homemade dividends.</b> A shareholder who wanted cash after a buyback can sell shares; one "
                 f"who did not want the dividend can buy shares with it. So the policy cannot matter.</p>"
                 f"<p><b>Typical mistakes:</b> dividing the buyback cash by a price other than the price on the "
                 f"buyback date (Kurbatov's most common error), or saying the price drop after a dividend is a loss.</p>"
                 f"<p><b>Remember:</b> under MM, cash out of the firm equals the fall in its value; who gets it how "
                 f"does not matter.</p>"),
        kriterier=[
            "States that under MM payout policy is irrelevant: firm value is set by the investment policy (1 p)",
            f"Dividend: the price falls by the dividend, from {penger(P, 2, cur)} to {penger(Pex, 2, cur)}, while the "
            f"holder's wealth is unchanged (1 p)",
            f"Buyback: about {tall(n_kjop, 2)} million shares are bought at {penger(P, 2, cur)}, the price stays at "
            f"{penger(P, 2, cur)}. Sellers and keepers are equally well off (1 p)",
            "Explains homemade dividends: investors can sell shares or reinvest the dividend to get the pattern they "
            "want (1 p)",
        ],
        selvstendig=True,
    )

    b_del = tekst_del(
        "b", poeng=4,
        q=(f"<p>Outside the perfect market, what would each choice signal in {gen(fi)} situation? Should {fi} pay out "
           f"the cash at all? What do you recommend and why?</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>Dividends are sticky: firms raise them only when they expect to sustain them and the market "
              f"punishes a cut, so a higher regular dividend signals confidence in permanent cash flows, while a buyback "
              f"is flexible and can signal that managers think the shares are undervalued. "
              f"{v['b_bruk'][0].upper() + v['b_bruk'][1:]}. {v['b_anv']}</p>"),
        losning=(f"<p><b>Signals.</b> Managers know more than investors, so payout decisions carry information. "
                 f"Regular dividends are sticky: firms smooth them and raise them only when they can keep them. The "
                 f"market reacts much more to a cut than to an increase. A higher regular dividend therefore signals "
                 f"that management expects the higher cash flow to last. A buyback commits the firm to nothing in the "
                 f"future. It can signal that managers think the shares are undervalued, a signal that is credible "
                 f"only if the managers lose when they are wrong.</p>"
                 f"<p><b>Uses of cash.</b> Kurbatov's ranking: invest if there are good (positive-NPV) investment "
                 f"opportunities; otherwise pay the cash out rather than hold it, since idle cash invites empire "
                 f"building and lowers the tax shield (cash is negative debt).</p>"
                 f"<p><b>Applied to {fi}.</b> On the use of the cash: {v['b_bruk']}. {v['b_anv']}</p>"
                 f"<p><b>Typical mistakes:</b> recommending 'invest' without the condition that the projects have a "
                 f"positive NPV, or treating a one-off gain as a reason to raise the regular dividend.</p>"
                 f"<p><b>Remember:</b> regular dividends promise the future; buybacks and special dividends do "
                 f"not.</p>"),
        kriterier=[
            "Explains that dividends are sticky: firms raise them only when they can sustain them and cuts are "
            "punished, so a higher regular dividend signals permanent cash flow (1 p)",
            "Explains what a buyback signals: flexibility for one-off cash, or managers' view that the shares are "
            "undervalued (1 p)",
            f"Gives a recommendation that fits the situation: {_inn(v['b_anv'])} (1 p)",
            f"Answers whether to pay out at all: {v['b_bruk']} (1 p)",
        ],
        selvstendig=True,
    )

    c_del = tekst_del(
        "c", poeng=4,
        q=(f"<p>How do taxes affect the choice for {gen(fi)} shareholders? Which kinds of shareholders prefer which "
           f"payout (clienteles)?</p>"),
        setninger="Answer in at most four sentences.",
        kort=(f"<p>Today dividends and capital gains are taxed at the same rate in Norway and the US, so the advantage "
              f"of a buyback is deferral: only the shareholders who sell pay tax, on their gain and when they "
              f"sell. Kurbatov's clienteles: individuals prefer buybacks, corporations prefer dividends and "
              f"institutions are largely indifferent, while investors sort themselves to firms whose policy suits "
              f"them. {v['c_anv']}</p>"),
        losning=(f"<p><b>Taxes.</b> Historically dividends were taxed more heavily than capital gains. Kurbatov "
                 f"stresses that this is no longer true in Norway or the US: the rates are equal. What remains is "
                 f"timing. A dividend is taxed for every shareholder now, while a buyback taxes only those who sell, "
                 f"only on their gain and only when they sell. The deferral has value.</p>"
                 f"<p><b>Clienteles (Kurbatov, lecture 5).</b> Individual investors prefer buybacks for the deferral. "
                 f"Corporate shareholders prefer dividends, since dividends between companies are largely tax-free "
                 f"in Norway. Institutions such as pension funds pay little tax and are largely indifferent. Other "
                 f"preferences matter too: investors who live on the payout want steady dividends and would face "
                 f"transaction costs selling shares.</p>"
                 f"<p><b>Applied to {fi}.</b> {v['c_anv']}</p>"
                 f"<p><b>Equilibrium.</b> Investors sort themselves into firms whose policy suits them. A firm that "
                 f"changes policy loses one clientele and gains another, so clienteles explain why policies differ "
                 f"more than they create value.</p>"
                 f"<p><b>Typical mistakes:</b> writing that dividends are taxed at a higher rate today, or ignoring "
                 f"the shareholder base described in the case.</p>"
                 f"<p><b>Remember:</b> equal tax rates today; the buyback's tax advantage is deferral.</p>"),
        kriterier=[
            "States that dividends and capital gains are taxed at the same rate today, so the buyback's advantage is "
            "deferral: only sellers pay, on their gain, when they sell (1 p)",
            "Gives the clienteles: individuals prefer buybacks, corporations prefer dividends, institutions are "
            "largely indifferent (1 p)",
            f"Applies them to {gen(fi)} shareholders: {_inn(v['c_anv'])} (1 p)",
            "Notes that clienteles sort themselves to firms, so a change of policy mainly reshuffles the owners; "
            "credit for income needs or transaction costs as a non-tax reason (1 p)",
        ],
        selvstendig=True,
    )
    return _registrer("ov-teo2", ovelse(case, [a_del, b_del, c_del]), fi)
