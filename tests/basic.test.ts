/*
 * Test basic functionalities such as:
 * - Module initialization
 * - Module configuration
 */

import Byakugan from "../build";
import { SettingsInterface } from "../build/interfaces/settings.interface";

const grid = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
];

describe("Module initialisation", () => {
    it("Should intialise with a valid settings object.", () => {
    	const settings: SettingsInterface = {
            grid: grid,
		};

        const byakugan: Byakugan = new Byakugan(settings);
        expect(byakugan).toEqual(expect.anything());
    });

    it("Should ignore duplicate obstacle values.", () => {
        const settings: SettingsInterface = {
            grid: grid,
            obstacles: [1, 1, 1, 1, 1, 1, 1],
        };

        const byakugan: Byakugan = new Byakugan(settings);
        expect(byakugan.settings.obstacles.size).toEqual(1)
    });
});

describe('Module configuration', () => {
	it("It should call the callbacks function.", () => {
		let shouldNotBeEmpty;
		const settings: SettingsInterface = {
			grid: grid,
			callbacks: {
				nodeConstructions: (node: Object) => {
					shouldNotBeEmpty = node;
				}
			}
		};

		const byakugan: Byakugan = new Byakugan(settings);
		expect(shouldNotBeEmpty).toEqual(expect.anything());
	});

	it("Should throw error for invalid heuristic function name", () => {
		const settings: SettingsInterface = {
			grid: grid,
			heuristics: {
				normal: "myFunction"
			}
		};

		expect(() => {
			const byakugan: Byakugan = new Byakugan(settings);
		}).toThrow(Error);
	});

	it("Should use an override heuristic function if specified", () => {
		let shouldNotBeEmpty;
 
		const settings: SettingsInterface = {
			grid: grid,
			heuristics: {
				override: {
					normal: (a, b) => {
						shouldNotBeEmpty = 1;
						return shouldNotBeEmpty;
					}
				}
			}
		}

		const byakugan: Byakugan = new Byakugan(settings);
		byakugan.search(0, 0, 1, 1);
		expect(shouldNotBeEmpty).toEqual(1);
	})
	
});