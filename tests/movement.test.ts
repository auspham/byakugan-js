/*
 * Test movements including
 * - normally (4 directions)
 * - diagonally (8 directions)
 */

import Byakugan from "../build";
import { SettingsInterface } from "../build/interfaces/settings.interface";

const _4x4 = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
];

const _no_path_normal_4x4 = [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
];

const _no_path_all_4x4 = [
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [1, 1, 0, 0],
];

const _5x5 = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0],
];

const _no_path_all_5x5 = [
    [0, 0, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
];

describe("Normal movements", () => {
    describe("4x4 grid", () => {
        it("Should find the shortest path with normal movements <4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _4x4
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(6);
        });
    
        it("Should be no path with normal movements <no_path_normal_4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_normal_4x4
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(0);
        });

        it("Should be no path with normal movements <no_path_all_4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_all_4x4
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(0);
        });
    });

    

    describe("5x5 grid", () => {
        it("Should find the shortest path with normal movements <5x5>.", () => {
            const settings: SettingsInterface = {
                grid: _5x5
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(4, 0, 0, 4);
            expect(paths.length).toEqual(16);
        });

        it("Should be no with normal movements <no_path_all_5x5>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_all_5x5
            };

            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(4, 0, 0, 4);
            expect(paths.length).toEqual(0);
        });
    })


});

describe("Diagonal movement", () => {
    describe("4x4 grid", () => {
        it("Should find the shortest path with diagonal movements <4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _4x4,
                diagonal: true
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(3);
        });
    
        it("Should find the shortest path with diagonal movements <no_path_normal_4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_normal_4x4,
                diagonal: true
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(3);
        });
    
        it("Should be no path with diagonal movements <no_path_all_4x4>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_all_4x4,
                diagonal: true
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(0, 0, 3, 3);
            expect(paths.length).toEqual(0);
        });
    });
   
    describe("5x5 grid", () => {
        it("Should find the shortest path with diagonal movements <5x5>.", () => {
            const settings: SettingsInterface = {
                grid: _5x5,
                diagonal: true
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(4, 0, 0, 4);
            expect(paths.length).toEqual(12);
        });

        it("Should be no path with diagonal movements <no_path_all_5x5>.", () => {
            const settings: SettingsInterface = {
                grid: _no_path_all_5x5,
                diagonal: true
            };
    
            const byakugan: Byakugan = new Byakugan(settings);
            const paths = byakugan.search(4, 0, 0, 4);
            expect(paths.length).toEqual(0);
        });
    })
  
});
