# osm-editor-layer-index-qgis

Converts the [OSM Editor Layer Index](https://github.com/osmlab/editor-layer-index/) into a QGIS XYZ Tiles Connections.

## Install and use globally

    npm install -g osm-editor-layer-index-qgis
    osm-editor-layer-index-qgis [-c AU,NZ,..] < imagery.geojson > imagery.xml

## Install and use locally

    git clone https://github.com/andrewharvey/osm-editor-layer-index-qgis.git
    cd osm-editor-layer-index-qgis
    npm install
    ./index.js [-c AU,NZ,..] < imagery.geojson > imagery.xml

## QGIS

In Browser > XYZ Tiles (right click Load Connections)

<img width="193" height="90" alt="QGIS XYZ Tiles Connections > Load Connections..." src="QGIS_XYZ_Tiles_Connections.png">
