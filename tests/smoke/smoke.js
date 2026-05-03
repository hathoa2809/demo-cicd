const axios = require('axios');

const BASE_URL = process.env.GREEN_APP_URL || 'http://localhost:3000';

async function waitForService(url, retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            const res = await axios.get(`${url}/health`, { timeout: 3000 });

            if (res.status === 200 && res.data.status === 'UP') {
                console.log("Service is UP");
                return;
            }

        } catch (e) {
            console.log(`Waiting for service... (${i + 1}/${retries})`);
        }

        await new Promise(r => setTimeout(r, delay));
    }

    throw new Error("Service did not become ready in time");
}

async function runSmokeTest() {
    console.log(`Starting Smoke Test on: ${BASE_URL}`);

    try {
        // 1. Health check
        await waitForService(BASE_URL);

        // 2. API check
        const response = await axios.get(`${BASE_URL}/api/v1/students`, {
            timeout: 5000
        });

        if (response.status !== 200) {
            throw new Error(`API returned ${response.status}`);
        }

        if (!response.data) {
            throw new Error("Empty response");
        }

        console.log("API responding correctly");
        console.log("Smoke Test PASSED");

        process.exit(0);

    } catch (error) {
        console.error("Smoke Test FAILED");
        console.error(`Reason: ${error.message}`);
        process.exit(1);
    }
}

runSmokeTest();
