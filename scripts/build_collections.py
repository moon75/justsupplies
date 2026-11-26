"""Rebuild src/data/collections.json from a raw Shopify collections.json + src/data/products.json.
Usage: python3 -I scripts/build_collections.py <raw/collections.json>"""
import json, os, re, sys

STOP = {"all", "and", "the", "camping", "outdoor", "outdoors", "gear", "for", "of", "uk", "co"}
norm = lambda s: re.sub(r"[^a-z0-9]", "", (s or "").lower())
words = lambda s: [w.rstrip("s") for w in re.findall(r"[a-z0-9]+", (s or "").lower()) if w not in STOP]

raw = json.load(open(sys.argv[1]))["collections"]
products = json.load(open("src/data/products.json"))
old = {c["handle"]: c for c in json.load(open("src/data/collections.json"))}
known = {p["handle"] for p in products}
missing = set()

out = []
for c in raw:
    handle, title = c["handle"], c["title"]
    keys = {norm(handle), norm(title)}
    exact = f"raw/collection-products/{handle}.json"
    if os.path.exists(exact):  # real membership downloaded by fetch_collection_products.py
        listed = json.load(open(exact))
        if isinstance(listed, dict):  # raw Shopify {"products": [...]} saved from the browser
            listed = [p["handle"] for p in listed.get("products", [])]
        missing.update(h for h in listed if h not in known)
        handles = [h for h in listed if h in known]
    elif handle == "all":
        handles = [p["handle"] for p in products]
    else:
        matched = [p["handle"] for p in products
                   if norm(p["vendor"]) in keys or norm(p["type"]) in keys or any(norm(t) in keys for t in p["tags"])]
        if not matched:  # keyword fallback, e.g. "All Tents" -> type/tags containing "tent"
            kw = words(title)
            if kw:
                matched = [p["handle"] for p in products
                           if all(w in " ".join([p["type"], *p["tags"]]).lower() for w in kw)]
        handles = list(dict.fromkeys(old.get(handle, {}).get("productHandles", []) + matched))
    out.append({"handle": handle, "title": title, "descriptionHtml": c.get("body_html") or "",
                "image": (c.get("image") or {}).get("src"), "productHandles": handles})

json.dump(out, open("src/data/collections.json", "w"), ensure_ascii=False, separators=(",", ":"))
print(len(missing), "products listed in collections but missing from products.json")
print(len(out), "collections;", sum(1 for c in out if not c["productHandles"]), "empty")
