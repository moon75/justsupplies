"""Download the real product list for every collection (handles only).
Usage: python3 scripts/fetch_collection_products.py [--delay 4]
Saves raw/collection-products/<handle>.json and resumes if stopped."""
import argparse, json, os, time, urllib.request, urllib.error

BASE = "https://www.woodtowater.co.uk"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
OUT = "raw/collection-products"

def get(url, delay):
    for attempt in range(30):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=30) as r:
                time.sleep(delay)
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return {"products": []}
            if not (e.code in (429, 430) or e.code >= 500):
                raise
            # Back off harder each time (60s, 2m, 4m ... max 10m) so the store's limit can reset.
            wait = max(int(e.headers.get("Retry-After") or 60), min(600, 60 * 2 ** attempt))
            print(f"  HTTP {e.code}, waiting {wait}s (attempt {attempt + 1}/30)")
            time.sleep(wait)
        except (urllib.error.URLError, TimeoutError) as e:
            print(f"  network error ({e}), waiting 30s")
            time.sleep(30)
    raise SystemExit(f"Gave up on {url}")

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--delay", type=float, default=8); a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    handles = [c["handle"] for c in json.load(open("src/data/collections.json"))]
    for i, h in enumerate(handles, 1):
        path = f"{OUT}/{h}.json"
        if os.path.exists(path):
            continue
        found, page = [], 1
        while True:
            data = get(f"{BASE}/collections/{h}/products.json?limit=250&page={page}", a.delay)
            batch = [p["handle"] for p in data.get("products", [])]
            found += batch
            if len(batch) < 250:
                break
            page += 1
        json.dump(found, open(path, "w"))
        print(f"[{i}/{len(handles)}] {h}: {len(found)}")
    print("Done. Now run: python3 -I scripts/build_collections.py ../woodtowater-product-fecthing/src/raw/collections.json")

main()
