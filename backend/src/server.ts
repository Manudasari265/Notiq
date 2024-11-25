import app from './app';

async function main() {
    try {
        await app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started listening on port: ${3000}`)
        })
    } catch (error) {
        console.log(`Application failed to start the server`);
    }
}

main()