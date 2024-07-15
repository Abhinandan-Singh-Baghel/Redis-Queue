import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string){
    const { problemId, code, language } = JSON.parse(submission);


    console.log(`Processing submission for problemId ${problemId}...`);
    console.log(`Code: ${code}`);
    console.log(`Language: ${language}`);

    // the processing logic should come here

    // simulating the processing delay

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Finished processing submission for problemId ${problemId}`);
}

async function startWorker() {
    
    try{
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop

        while(true){
            try{
                const submission = await client.brPop('problems', 0);
                // @ts-ignore
                await processSubmission(submission?.element);
            }catch (error){
                console.error('Error processing submission:', error);

                // Implement your error handling logic here
                // for eg, you might want to push the submission bacck onto the queue
                // or log the error to a file.
            }
        }
    } catch(error){
        console.error('Failed to connect to Redis:', error);
    }
}

startWorker();