import axios from 'axios';

export function sendData(
    fileName: string,
    contents: string,
    url: string
): void {
    const dataToSend = axios.create({
        baseURL: url,
        headers: {
            'Content-type': 'application/json',
        },
        data: {
            fileName,
            contents,
        },
    });
    dataToSend.post(url).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        }
    );
}
