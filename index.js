#!/usr/bin/env node

const xml = require('xml');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const imagery = JSON.parse(fs.readFileSync(argv._.length > 0 ? argv._[0] : '/dev/stdin'));

const layers = imagery.features
    .filter((feature) => {
        return feature.properties.type === 'tms';
    })
    .filter((feature) => {
        if (argv.c) {
            if (feature.properties.country_code) {
                const countries = argv.c.split(',').map((country) => { return country.toUpperCase(); });
                return countries.includes(feature.properties.country_code.toUpperCase())
            } else {
                // filtering by country but this source doesn't have a country
                return false;
            }
        } else {
            return true;
        }
    })
    .map((feature) => {
        const attr = {};
        if (feature.properties.name) {
            attr.name = feature.properties.name;
        }
        if (feature.properties.min_zoom) {
            attr.zmin = feature.properties.min_zoom;
        }
        if (feature.properties.max_zoom) {
            attr.zmax = feature.properties.max_zoom;
        }
        if (feature.properties.url) {
            attr.url = convertUrl(feature.properties.url);
        }

        return {
            xyztiles: {
                _attr: attr
            }
        };
    });

const qgs = {
    qgsXYZTilesConnections: [{
        _attr: {
            version: "1.0"
        }
    },
    ...layers
    ]
}

if (argv._.length > 1) {
    fs.writeFileSync(argv._[1], xml(qgs, { indent: '  ' }));
} else {
    process.stdout.write(xml(qgs, { indent: '  ' }));
}

function convertUrl(url) {
    return url
        .replace('{zoom}', '{z}')
        .replace(/{switch:([^,}])[^}]*}/, '$1');
}
