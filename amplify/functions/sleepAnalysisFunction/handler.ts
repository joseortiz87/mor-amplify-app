import type { Handler } from 'aws-lambda';
import { Schema } from '../../data/resource';
import { Rekognition } from 'aws-sdk';

export const handler: Schema["doSleepAnalysis"]["functionHandler"] = async (event, context) => {
    const { imageKey,userId } = event.arguments
    const bucketName = 'amplify-d216tf5eivd8jp-ma-moruserimagebucket224d36-zvczp2lhgyjd'; // bucket para test 'amplify-amplifyangulartem-moruserimagebucket224d36-yufumopab1mn';
    const rekognition = new Rekognition();

    const params : Rekognition.Types.DetectFacesRequest = {
        Image: { S3Object: { Bucket: bucketName, Name: imageKey || '' } },
        Attributes: ['ALL'],
    };
    console.log(`Params: ${params}`);

    try {
        const response = await rekognition.detectFaces(params).promise();
        console.log("Facial Analysis Result:", response);

        if (response.FaceDetails && response.FaceDetails.length > 0) {
            const isSleeping = determineSleepState(response); // Implement your analysis logic
            const faceDetails = response.FaceDetails[0];

            return {
                statusCode: 200,
                isSleeping: isSleeping,
                confidence: faceDetails.Confidence,
                message: 'Analisis completado',
            };

        }else{
            return {
                statusCode: 200,
                message: "No faces detected",
            };
        }
    } catch (error) {
        console.error(error);
        throw new Error('Error analyzing sleep state');
    }
};

function determineSleepState(response : any){
    console.log("Facial Analysis Result:", JSON.stringify(response));
    let isSleeping = !response.FaceDetails[0].EyesOpen.Value && response.FaceDetails[0].MouthOpen.Value;
    return isSleeping;
}