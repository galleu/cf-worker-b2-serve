import { AwsClient } from 'aws4fetch'

const b2 = new AwsClient({
    "accessKeyId": B2_ACCESS_KEY_ID,
    "secretAccessKey": B2_SECRET_ACCESS_KEY,
    "region": B2_DEFAULT_REGION
});


function handleRequest(request) {
    const url = new URL(request.url);
    return b2.fetch(`${B2_S3_BUCKET}/${url.pathname}`)
}

addEventListener("fetch", (event) => {
    event.respondWith(
        handleRequest(event.request).catch(
            (err) => new Response(err.stack, { status: 500 })
        )
    );
});