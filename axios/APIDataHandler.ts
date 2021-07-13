import axios from 'axios';
import { widgetRepository } from '../index';

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
            const allData = response.data['hydra:member'];
        },
        (error) => {
            console.log(error);
        },
    );
}

export function getData(url: string): void {
    // routes ALLDATA from user /data/saved-plans?username=email@email.com
    // routes SPECIFIC from user /data/saved-plans?username=email@email.com&filename=exampleFile

    const dataToCollect = axios.create({
        baseURL: url,
        headers: {
            'Content-type': 'application/json',
        },
    });

    dataToCollect.get(url).then(
        (response) => {
            console.log(response);
            // collect data in const and send to function in widgetRepo
            const data: string[] = [];
            widgetRepository.loadPlan(data);
        },
        (error) => {
            console.log(error);
        },
    );
}
