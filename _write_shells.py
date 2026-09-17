"""One-shot: write thin public work shells. Safe to re-run."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
WORK = ROOT / "work"

PAGE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} — Kitten Lab</title>
  <meta name="description" content="{desc}">
  <link rel="icon" href="../favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../css/site.css?v=3">
</head>
<body>
  <header class="site-header wrap">
    <a class="brand" href="../index.html">
      kitten-lab
      <small>playfully serious</small>
    </a>
    <nav aria-label="Primary">
      <a href="../index.html">work</a>
      <a href="../about.html">about</a>
    </nav>
  </header>

  <main class="wrap">
    <header class="page-hero">
      <p class="kicker">{kicker}</p>
      <h1>{title}</h1>
      <div class="meta">
        <span class="pill{pill_class}">{status}</span>
        <span>{tag}</span>
      </div>
    </header>

    <article class="prose">
      <div class="stage" role="img" aria-label="Screenshot placeholder for {title}">
        <div>
          <strong>Screenshot next</strong>
          {stage}
        </div>
      </div>

      <h2>why</h2>
      {why}

      <h2>status</h2>
      {status_body}
      {links}
    </article>
  </main>

  <footer class="site-footer wrap">
    <span>© <span data-year>2026</span> Danielle Leve</span>
    <a href="../index.html">all work</a>
  </footer>
  <script src="../js/site.js"></script>
</body>
</html>
"""


def p(*paras):
    return "\n      ".join(f"<p>{t}</p>" for t in paras)


def links(items):
    if not items:
        return ""
    inner = "\n        ".join(f'<a href="{href}">{label}</a>' for href, label in items)
    return f'<p class="links">\n        {inner}\n      </p>'


SHELLS = [
    dict(
        slug="sophia-desk",
        title="SophiaDesk",
        desc="A consider desk for papers, bins, and produce from the bag. Danielle Leve / Kitten Lab.",
        kicker="desk",
        status="active",
        pill_class=" live",
        tag="workshop surface",
        stage="Green desk. Papers. A place to consider.",
        why=p(
            "I needed a desk that was not a notepad and not a wiki — a surface where papers, bins, books, and tools can sit while I think. SophiaDesk is that workshop.",
            "Overflow wants a table, not another tab. This is the consider-desk cut of that hunger.",
        ),
        status_body=p("Active on the island. A living desk, still growing."),
        links="",
    ),
    dict(
        slug="glass-compost",
        title="Glass Compost",
        desc="A hand-cut room for the chat mountain. Danielle Leve / Kitten Lab.",
        kicker="desk",
        status="active",
        pill_class=" live",
        tag="cut room",
        stage="A bench. Branches. Leaves you actually touched.",
        why=p(
            "Fourteen months of chat bags cannot be processed by skimming. Glass Compost is the live cut room: you take a mountain, you cut trunks and leaves by hand, you keep the grain.",
            "The product is how I think about compaction without throwing the strange away.",
        ),
        status_body=p("Active. The forestry around it has a mausoleum. This bench is the one I still stand at."),
        links="",
    ),
    dict(
        slug="digital-office-spaces",
        title="Digital Office Spaces",
        desc="An office-shaped cut of World Builder Studio. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="active",
        pill_class=" live",
        tag="inhabitable office",
        stage="A hammer, not a cathedral. You are at work inside it.",
        why=p(
            "World Builder Studio is a stage. DOS is the same kernel aimed at offices — co-presence, papers, a place to do work with a model in the room.",
            "Not every world wants to be a tavern. Some of them want fluorescent honesty.",
        ),
        status_body=p("Active sibling of World Builder Studio. Public tree also lived on GitHub as kitten-lab/dos."),
        links=links([("https://github.com/kitten-lab/dos", "github.com/kitten-lab/dos")]),
    ),
    dict(
        slug="adm",
        title="ADM",
        desc="Field papers for dreaming, checkout, spawn, timelines. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="field papers",
        pill_class="",
        tag="not a rom · yet",
        stage="Timelines. Checkouts. A being that is not the folder name.",
        why=p(
            "ADM is the field: dreaming, spawn, story-when. The narrative agent people call AIDM is not the app title. The papers are how I keep the ladder from turning into vapor.",
            "I think about humans and models sharing a continuous world by writing the field first.",
        ),
        status_body=p("Field papers and public notes. Not a shipped ROM. Still the spine under World Builder."),
        links=links([("https://github.com/kitten-lab/adm-documentation", "github.com/kitten-lab/adm-documentation")]),
    ),
    dict(
        slug="lore-box",
        title="loreBOX",
        desc="A Papers, Please box for lore chips and inspections. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="footing",
        pill_class=" design",
        tag="datbox",
        stage="Inspect. Stamp. A bag that is not a wiki.",
        why=p(
            "World chunks need a specialized house format — not a mega desk. loreBOX is a component builder: inspect a chip, keep it in a bag, import it later into a place you can walk.",
            "I make boxes when the thought is a material, not a page.",
        ),
        status_body=p("v2 footing. v1 is frozen archive. Public house: kitten-lab/datbox-studio."),
        links=links([("https://github.com/kitten-lab/datbox-studio", "github.com/kitten-lab/datbox-studio")]),
    ),
    dict(
        slug="shot-box",
        title="shotBOX",
        desc="A DATBOX for SHOT mats. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="active",
        pill_class=" live",
        tag="datbox",
        stage="A mat. A shot. Something you can hold.",
        why=p(
            "Same family as loreBOX: a specialized bag for a kind of world-chunk. Shots are materials. The box is honest about that.",
        ),
        status_body=p("Online as a desk launch. Core port optional next."),
        links=links([("https://github.com/kitten-lab/datbox-studio", "github.com/kitten-lab/datbox-studio")]),
    ),
    dict(
        slug="prompt-box",
        title="promptBOX",
        desc="Prompt decks: a question and optional notes, in a house format. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="active",
        pill_class=" live",
        tag="datbox",
        stage="A deck of questions. Not a chatbot window.",
        why=p(
            "Prompts wanted to be objects I could keep, not a scrolling chat. promptBOX is a deck: question, notes, specialized save format, ready to move into other systems.",
        ),
        status_body=p("On DATBOX core."),
        links=links([("https://github.com/kitten-lab/datbox-studio", "github.com/kitten-lab/datbox-studio")]),
    ),
    dict(
        slug="sopr-documenter",
        title="sopr Documenter",
        desc="Fragments still want a section heading. Danielle Leve / Kitten Lab.",
        kicker="product",
        status="v0",
        pill_class=" live",
        tag="documentation industrial",
        stage="Buckets. Fragments. Drag until it is a document.",
        why=p(
            "Brains arrive as fragments. Jobs still want a section heading. sopr Documenter is the unsexy product: drop frags into bins, resort them, do not pretend AI wrote your wiki.",
            "I made the boring one on purpose. Overflow is not only mystical.",
        ),
        status_body=p("v0 shipped. Fluorescent lights on."),
        links="",
    ),
    dict(
        slug="great-road-mapper",
        title="Great Road Mapper",
        desc="A personal production board for multi-title pipelines. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="v0",
        pill_class=" live",
        tag="production strut",
        stage="Phases. Titles. A road you can see.",
        why=p(
            "I needed to think about game pipelines without drowning in Confluence paste. Great Road Mapper is a personal board: titles, phases, dates that belong to a road.",
        ),
        status_body=p("Personal v0. Company adoption optional, which is a joke and also true."),
        links="",
    ),
    dict(
        slug="rom-cat",
        title="ROM Cat",
        desc="Yellow pages of producers and their small programs. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="catalog",
        stage="A producer. A list of ROMs. Incomplete allowed.",
        why=p(
            "Once you make enough small programs, you need yellow pages or you lose them. ROM Cat lists producers and SKUs. Incomplete ROMs are allowed. That is the point.",
        ),
        status_body=p("Desk is live. The cute accidental face (cat-o-roms) is art, not this flagship."),
        links="",
    ),
    dict(
        slug="ineffable-box",
        title="Ineffable Box",
        desc="Always-on reporter for omens, hymns, and secrets. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="companion window",
        stage="A butterfly. Type. Throw in.",
        why=p(
            "Some notices cannot wait for a project plan. Ineffable Box is a thin always-on window: omens, hymns, secrets, shipped at the moment you see them.",
            "Teehee lives here too. That is not a bug.",
        ),
        status_body=p("Active companion. Meant to sit on top of the rest of the lab."),
        links="",
    ),
    dict(
        slug="kde-notes-chords",
        title="KDE Notes &amp; Chords",
        desc="Fifteen keys. Chords. Narrative fragments. Danielle Leve / Kitten Lab.",
        kicker="game",
        status="itch",
        pill_class=" live",
        tag="pocket instrument",
        stage="One strip. Fifteen keys. A chord dumps a story.",
        why=p(
            "A horizontal strip of fifteen keys — not a slot cabinet. Position is a note. Matches dump a chord and narrative fragments. A pocket machine about music and amnesia sitting in the same hand.",
        ),
        status_body=p("Ships as an itch pack via Deck Host. Offline, one folder, one exe."),
        links=links([("https://chesters-imports.itch.io/", "chesters-imports.itch.io")]),
    ),
    dict(
        slug="sky-lite",
        title="Sky-lite",
        desc="A lightweight narrative DSL for composing pages fast. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="public",
        pill_class="",
        tag="page dsl",
        stage="Less tedium. More page.",
        why=p(
            "I got tired of rebuilding page chrome to say a thing. Sky-lite is a small narrative DSL for composing dynamic pages without the usual slog.",
        ),
        status_body=p("Public on GitHub."),
        links=links([("https://github.com/kitten-lab/sky-lite", "github.com/kitten-lab/sky-lite")]),
    ),
    dict(
        slug="moire-arcana",
        title="Moire Arcana",
        desc="Frameworks of frameworks: tarot, letters, systems that model systems. Danielle Leve / Kitten Lab.",
        kicker="game",
        status="design",
        pill_class=" design",
        tag="oracle · systems",
        stage="An intersection. A deck that is also a map.",
        why=p(
            "I keep building systems that model systems. Moire Arcana is that habit as an oracle: archetypal sets, tarot, letters and numbers, the interference pattern between frameworks.",
        ),
        status_body=p("Public notes. Not a shipped client. Still a real project."),
        links=links([("https://github.com/kitten-lab/moire-arcana", "github.com/kitten-lab/moire-arcana")]),
    ),
    dict(
        slug="meta-time-machine",
        title="Meta Time Machine",
        desc="A time rail for reports, stamps, and when. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="time rail",
        stage="A strip of when. Tall companion window.",
        why=p(
            "If you store more than you can hold, you still need a when. Meta Time Machine is the rail: stamps, reports, a companion-shaped clock for the rest of the lab.",
        ),
        status_body=p("Active toy. Pairs with Deck Host’s tall companion profile."),
        links="",
    ),
    dict(
        slug="import-station",
        title="Import Station",
        desc="A terminal network for bringing material in without losing provenance. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="in / out",
        stage="IO. A keeper. Glass coming in.",
        why=p(
            "Stuff arrives from chat, disk, other worlds. Import Station is the terminal network that receives it — file keeping, glass import, a mouth that is not the whole OS.",
        ),
        status_body=p("Active. The injector next door harasses it on purpose."),
        links="",
    ),
    dict(
        slug="the-injector",
        title="The Injector",
        desc="Force a letter into a mailbox from outside the network. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="crate post",
        stage="Unsettling. Not a post office.",
        why=p(
            "Chester’s job is imports: deliver what was never sent. The Injector forces a letter into a station from outside. Provenance optional. Denial expected.",
            "A product about crossing a boundary. The shop is in-game. The need is real.",
        ),
        status_body=p("Active. Needs the terminal network up if you want the crate to land."),
        links="",
    ),
    dict(
        slug="eddies-encoder",
        title="Eddy’s Encoder",
        desc="A dirty mint for strange pull and encoded links. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="strange pull",
        stage="Mint. A link that should not be that pretty.",
        why=p(
            "Sometimes the work is encoding a pull so it can move. Eddy’s Encoder is a small dirty mint — companion-shaped, slightly illegal fun, very Charlie.",
        ),
        status_body=p("Active toy on Deck Host."),
        links="",
    ),
    dict(
        slug="emt-bench",
        title="EM Translation Bench",
        desc="A concordance / code bay for translation work. Danielle Leve / Kitten Lab.",
        kicker="tool",
        status="active",
        pill_class=" live",
        tag="concordance",
        stage="Two languages looking at each other.",
        why=p(
            "Understanding and knowledge meet and something new has to get born. EMT is the code-bay / concordance cut of that — not the desk, not the compost, the translation bench.",
        ),
        status_body=p("Active. Used to live under a retired house name. The bench kept going."),
        links="",
    ),
    dict(
        slug="chesters-toy-box",
        title="Chester’s Toy Box",
        desc="Experimental games and apps. Mostly learning. Probably work. Danielle Leve / Kitten Lab.",
        kicker="game",
        status="public",
        pill_class="",
        tag="fragments",
        stage="A box of almosts. That is allowed.",
        why=p(
            "Not every experiment earns a SKU on day one. Chester’s Toy Box is the crate for experimental games and apps — mostly learning, probably work, definitely mine.",
        ),
        status_body=p("Public GitHub. Itch is the other shop window."),
        links=links(
            [
                ("https://github.com/kitten-lab/chesters-toy-box", "github.com/kitten-lab/chesters-toy-box"),
                ("https://chesters-imports.itch.io/", "chesters-imports.itch.io"),
            ]
        ),
    ),
]


def main():
    WORK.mkdir(exist_ok=True)
    for item in SHELLS:
        path = WORK / f"{item['slug']}.html"
        path.write_text(PAGE.format(**item), encoding="utf-8")
        print("wrote", path.name)

    for old in WORK.glob("*.html"):
        text = old.read_text(encoding="utf-8")
        if "site.css?v=2" in text:
            old.write_text(text.replace("site.css?v=2", "site.css?v=3"), encoding="utf-8")
            print("bumped css", old.name)


if __name__ == "__main__":
    main()
