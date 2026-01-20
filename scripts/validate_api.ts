
import { log } from "../src/config/logger.js";

interface TestResult {
    name: string;
    passed: boolean;
    duration: number;
    error?: string;
}

async function runTests() {
    console.log("\n🚀 TATAKAI API VALIDATION SUITE\n");

    const tests = [
        // 1. ANIMELOK (Currently Debugging)
        {
            name: "Animelok: Home",
            url: "http://localhost:4000/api/v1/animelok/home",
            check: (data: any) => data.data.sections && data.data.sections.length > 0
        },
        {
            name: "Animelok: Watch",
            url: "http://localhost:4000/api/v1/animelok/watch/one-piece-21?ep=1",
            check: (data: any) => data.data.servers && data.data.servers.length > 0
        },
        // 2. WATCHANIME WORLD (Proxy)
        {
            name: "WatchAnime: Episode (Proxy)",
            url: "http://localhost:4000/api/v1/watchaw/episode?id=naruto-shippuden-1x1",
            check: (data: any) => data.data.sources && data.data.sources.length > 0
        },
        // 3. ANIMEHINDIDUBBED (Fixed)
        {
            name: "HindiDubbed: Search",
            url: "http://localhost:4000/api/v1/hindidubbed/search?title=naruto",
            check: (data: any) => data.data.totalFound && data.data.totalFound > 0
        },
        // 4. HIANIME (Reliable)
       { name: "HiAnime: Home",
        url: "http://localhost:4000/api/v1/hianime/home",
        check: (data: any) => data.provider === "Tatakai" && data.data.spotlightAnimes && data.data.spotlightAnimes.length > 0
        },
// 5. CONSUMET (Aggregator)
{
    name: "Consumet: Search",
        url: "http://localhost:4000/api/v1/consumet/anime/gogoanime/naruto",
            check: (data: any) => data.results && data.results.length > 0
},
// 6. DOCS (Static)
{
    name: "Docs: UI Access",
        url: "http://localhost:4000/docs",
            raw: true,
                check: (text: string) => text.includes("TATAKAI")
},
{
    name: "Docs: LLM Endpoint",
        url: "http://localhost:4000/docs/llm",
            raw: true,
                check: (text: string) => text.includes("SYSTEM NOTE")
}
    ];

const results: TestResult[] = [];

for (const test of tests) {
    process.stdout.write(`Testing: ${test.name.padEnd(30)} ... `);
    const start = performance.now();
    try {
        const res = await fetch(test.url);
        let valid = false;

        if (test.raw) {
            const text = await res.text();
            valid = res.status === 200 && test.check(text);
        } else {
            const json = await res.json();
            valid = res.status === 200 && test.check(json);
        }

        const duration = Math.round(performance.now() - start);

        if (valid) {
            console.log(`✅ PASS (${duration}ms)`);
            results.push({ name: test.name, passed: true, duration });
        } else {
            console.log(`❌ FAIL (${duration}ms)`);
            results.push({ name: test.name, passed: false, duration, error: "Validation failed" });
        }
    } catch (error) {
        const duration = Math.round(performance.now() - start);
        console.log(`❌ ERROR (${duration}ms)`);
        results.push({ name: test.name, passed: false, duration, error: String(error) });
    }
}

console.log("\n--- SUMMARY ---");
const passed = results.filter(r => r.passed).length;
const total = results.length;
console.log(`Passed: ${passed}/${total}`);

if (passed === total) {
    console.log("✨ ALL SYSTEMS OPERATIONAL");
    process.exit(0);
} else {
    console.log("⚠️ SOME SYSTEMS FAILED");
    process.exit(1);
}
}

runTests();
