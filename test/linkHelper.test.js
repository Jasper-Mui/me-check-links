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

    const fileIgnoreBad = "fileIgnoreBad";
    const fileIgnoreBadData = "notUrl";
  
    beforeAll(() => {
      fs.__setMockFileData(fileIgnoreYoutube, fileIgnoreYoutbeData);
      fs.__setMockFileData(fileIgnoreEmpty, fileIgnoreEmptyData);
      fs.__setMockFileData(fileIgnoreBad, fileIgnoreBadData);
    });

    test("bad ignore file, should throw error", () => {
        expect(() => ignoreUrl(fileIgnoreBad, links)).toThrow();
    })

    test("ignore file with https://www.youtube.", () => {
        const resultLink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp'
        ]

        expect(ignoreUrl(fileIgnoreYoutube, links)).toStrictEqual(resultLink);
    })
    
    test("ignore file with https://www.youtube.", () => {
        const resultLink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp'
        ]

        expect(ignoreUrl(fileIgnoreYoutube, links)).toStrictEqual(resultLink);
    })

    test("empty Ignore file, does not ignore still works", () => {
        const resultink = [
            'https://avatars1.githubusercontent.com/u/780020?s=400&amp',
            'https://www.youtube.com/watch?v=KDt01U859Ik',
        ]

        expect(ignoreUrl(fileIgnoreEmpty, links)).toStrictEqual(resultink);
        //'.\\testText\\ignoreEmpty'
    })

    test("return empty youtube host url is in ignoreYoutube", () => {
        const oneLink = [
            'https://www.youtube.com/watch?v=KDt01U859Ik'
        ]

        const resultink = []

        expect(ignoreUrl(fileIgnoreYoutube, oneLink)).toStrictEqual(resultink);
    })
});

describe("getStatus tests", () => {
    const url = "https://example.ca";

    test("404 resposne test", async () => {
        nock(url).get("/").reply(404, {});

        const data = await getStatus(url);
        const result = {
            url: url,
            status: 404
        }

        expect(data).toStrictEqual(result);
    })

    test("200 resposne", async () => {
        nock(url).get("/").reply(200, {});

        const data = await getStatus(url);
        const result = {
            url: url,
            status: 200
        }

        expect(data).toStrictEqual(result);
    })

    test("bad url test, return undefined status", async () => {

        const data = await getStatus("not a url");
        const result = {
            url: 'not a url',
            status: undefined
        }

        expect(data).toStrictEqual(result);
    })

    test("null url test, return undefined status", async () => {

        const data = await getStatus(null);
        const result = {
            url: null,
            status: undefined
        }

        expect(data).toStrictEqual(result);
    })

    test("empty url test, return undefined status", async () => {

        const data = await getStatus('');
        const result = {
            url: '',
            status: undefined
        }

        expect(data).toStrictEqual(result);
    })

    test("undefined url test, return undefined status", async () => {

        const data = await getStatus(undefined);
        const result = {
            url: undefined,
            status: undefined
        }

        expect(data).toStrictEqual(result);
    })
});