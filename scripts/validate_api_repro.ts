
import { log } from "../src/config/logger.js";

async function runTests() {
    console.log("🚀 Starting API Validation...");

    const tests = [
        {
            name: "Animelok Watch",
            url: "http://localhost:4000/api/v1/animelok/watch/naruto-shippuden-355?ep=1", // known working slug usually
            check: (data: any) => data.data.servers && data.data.servers.length > 0
        },
        {
            name: "HindiDubbed Search",
            url: "http://localhost:4000/api/v1/hindidubbed/search?title=naruto",
            check: (data: any) => data.data.totalFound && data.data.totalFound > 0
        }
    ];

    for (const test of tests) {
        try {
            console.log(`\nTesting: ${test.name}`);
            const start = performance.now();
            const res = await fetch(test.url);
            const json = await res.json();
            const duration = (performance.now() - start).toFixed(0);

            if (res.status === 200 && test.check(json)) {
                console.log(`✅ PASS (${duration}ms)`);
            } else {
                console.log(`❌ FAIL (${duration}ms)`);
                console.log("Response:", JSON.stringify(json, null, 2).slice(0, 200) + "...");
            }
        } catch (error) {
            console.log(`❌ ERROR: ${error}`);
        }
    }
}

runTests();
