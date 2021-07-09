import axios from 'axios';

export function sendData(fileName: string, email: string, contents: string, url: string): void {
    const dataToSend = axios.create({
        baseURL: url,
        headers: {
            'Content-type': 'application/json',
        },
        data: {
            fileName,
            email,
            contents,
        },
    });

    dataToSend.post(url).then(
        (response) => {
            console.log(response);
        },
        (error) => {
            console.log(error);
        },
    );
}
