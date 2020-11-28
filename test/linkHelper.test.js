import { getStatus, ignoreUrl } from "../src/linkHelper";
import nock from "nock";

import "babel-polyfill" 

jest.mock('fs');
const fs = require("fs").promises;

describe("ignoreUrl tests", () => {
    const links = [
        'https://avatars1.githubusercontent.com/u/780020?s=400&amp',
        'https://www.youtube.com/watch?v=KDt01U859Ik'
    ]

    const fileIgnoreYoutube = "fileIgnoreYoutbe";
    const fileIgnoreYoutbeData = "https://www.youtube";

    const fileIgnoreEmpty = "fileIgnoreEmpty";
    const fileIgnoreEmptyData = "#dsfsd";

  
    beforeAll(() => {
      fs.__setMockFileData(fileIgnoreYoutube, fileIgnoreYoutbeData);
      fs.__setMockFileData(fileIgnoreEmpty, fileIgnoreEmptyData);
    });

    test("ignoreUrl ignore file with https://www.youtube.", () => {
        const resultLink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp'
        ]

        expect(ignoreUrl(fileIgnoreYoutube, links)).toStrictEqual(resultLink);
    })
    
    test("ignoreUrl ignore file with https://www.youtube.", () => {
        const resultLink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp'
        ]

        expect(ignoreUrl(fileIgnoreYoutube, links)).toStrictEqual(resultLink);
    })

    test("ignoreUrl emptyIgnore file", () => {
        const resultink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp',
            'https://www.youtube.com/watch?v=KDt01U859Ik',
        ]

        expect(ignoreUrl(fileIgnoreEmpty, links)).toStrictEqual(resultink);
        //'.\\testText\\ignoreEmpty'
    })

    test("ignoreUrl return empty youtube is in ignoreYoutube", () => {
        const oneLink = [
            'https://www.youtube.com/watch?v=KDt01U859Ik'
        ]

        const resultink = []

        expect(ignoreUrl(fileIgnoreYoutube, oneLink)).toStrictEqual(resultink);
    })
});

describe("ignoreUrl tests", () => {
    const url = "https://example.ca";

    test("resposne test", async () => {
        nock(url).get("/").reply(404, {});

        const data = await getStatus(url);
        const result = {
            url: url,
            status: 404
        }

        expect(data).toStrictEqual(result);
    })

    test("resposne test", async () => {
        nock(url).get("/").reply(200, {});

        const data = await getStatus(url);
        const result = {
            url: url,
            status: 200
        }

        expect(data).toStrictEqual(result);
    })
});


