import { spawn } from 'child_process';

const BASE_URL = 'http://localhost:4000/api/v1';

interface TestResult {
    endpoint: string;
    method: string;
    status: number;
    success: boolean;
    error?: string;
}

async function testEndpoint(url: string, method: 'GET' | 'POST' = 'GET', body?: any): Promise<TestResult> {
    try {
        const options: RequestInit = { method };
        if (body) {
            options.headers = { 'Content-Type': 'application/json' };
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options);
        const success = response.ok;
        let error: string | undefined;
        if (!success) {
            try {
                const text = await response.text();
                error = text || `HTTP ${response.status}`;
            } catch {
                error = `HTTP ${response.status}`;
            }
        }
        return {
            endpoint: url,
            method,
            status: response.status,
            success,
            error,
        };
    } catch (error) {
        return {
            endpoint: url,
            method,
            status: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
}

async function runTests() {
    const results: TestResult[] = [];

    console.log('Starting comprehensive endpoint tests...\n');

    // /anime endpoints
    // results.push(await testEndpoint(`${BASE_URL}/anime/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/anime/gogoanime/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/anime/chia-anime/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/anime/anime-freak/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/anime/animeland/naruto`));

    // /anime-api endpoints
    // results.push(await testEndpoint(`${BASE_URL}/anime-api/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/anime-api/quotes/random`));
    results.push(await testEndpoint(`${BASE_URL}/anime-api/quotes/random?anime=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/anime-api/images/waifu`));
    results.push(await testEndpoint(`${BASE_URL}/anime-api/facts/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/anime-api/waifu`));
    results.push(await testEndpoint(`${BASE_URL}/anime-api/trace`, 'POST', { imageUrl: 'https://example.com/image.jpg' }));

    // /animehindidubbed endpoints
    // results.push(await testEndpoint(`${BASE_URL}/hindidubbed/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/hindidubbed/home`));
    results.push(await testEndpoint(`${BASE_URL}/hindidubbed/category/action`));
    results.push(await testEndpoint(`${BASE_URL}/hindidubbed/search?title=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/hindidubbed/anime/naruto`));

    // /animelok endpoints
    // results.push(await testEndpoint(`${BASE_URL}/animelok/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/animelok/home`));
    results.push(await testEndpoint(`${BASE_URL}/animelok/schedule`));
    results.push(await testEndpoint(`${BASE_URL}/animelok/languages`));
    results.push(await testEndpoint(`${BASE_URL}/animelok/languages/sub`));
    results.push(await testEndpoint(`${BASE_URL}/animelok/anime/123`));
    results.push(await testEndpoint(`${BASE_URL}/animelok/watch/123`));

    // /animeya endpoints
    results.push(await testEndpoint(`${BASE_URL}/animeya/home`));
    results.push(await testEndpoint(`${BASE_URL}/animeya/search?q=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/animeya/info/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/animeya/watch/123`));

    // /hianime endpoints
    // results.push(await testEndpoint(`${BASE_URL}/hianime/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/hianime/home`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/azlist/default`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/qtip/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/category/action`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/genre/action`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/producer/studio`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/schedule?date=2024-01-01`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/search?q=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/search/suggestion?q=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/anime/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/episode/servers?episodeId=123`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/episode/sources?episodeId=123`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/anime/naruto/episodes`));
    results.push(await testEndpoint(`${BASE_URL}/hianime/anime/naruto/next-episode-schedule`));

    // /watchaw endpoints
    // results.push(await testEndpoint(`${BASE_URL}/watchaw/`)); // Root endpoint may not be mounted
    results.push(await testEndpoint(`${BASE_URL}/watchaw/home`));
    results.push(await testEndpoint(`${BASE_URL}/watchaw/search?q=naruto`));
    results.push(await testEndpoint(`${BASE_URL}/watchaw/parse/naruto`));
    results.push(await testEndpoint(`${BASE_URL}/watchaw/episode?slug=naruto&episode=1`));

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;

    console.log(`\nTest Results: ${successful} passed, ${failed} failed\n`);

    if (failed > 0) {
        console.log('Failed endpoints:');
        results.filter(r => !r.success).forEach(r => {
            console.log(`- ${r.method} ${r.endpoint}: ${r.status} ${r.error || ''}`);
        });
    }

    process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);