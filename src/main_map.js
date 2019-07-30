import React, { Component } from 'react';
import { Map, TileLayer,FeatureGroup } from 'react-leaflet';
import * as L from 'leaflet';
// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

//
export default class MainMap extends Component {
   _onFeatureGroupReady= (reactFGref) => {
    /*const positions=[
        [
          37.82564992009924,
          -122.48043537139893
        ],
        [
          37.82629397920697,
          -122.48129367828368
        ],
        [
          37.82544653184479,
          -122.48240947723389
        ],
        [
          37.82632787689904,
          -122.48373985290527
        ],
        [
          37.82680244295304,
          -122.48425483703613
        ],
        [
          37.82639567223645,
          -122.48605728149415
        ],
        [
          37.82663295542695,
          -122.4898338317871
        ],
        [
          37.82415839321614,
          -122.4930953979492
        ],
        [
          37.821887146654376,
          -122.49700069427489
        ],
        [
          37.82171764783966,
          -122.4991464614868
        ],
        [
          37.81798857543524,
          -122.49850273132326
        ],
        [
          37.82090404811055,
          -122.50923156738281
        ],
        [
          37.823344820392535,
          -122.51232147216798
        ],
        [
          37.8271414168374,
          -122.50150680541992
        ],
        [
          37.83093781796035,
          -122.48743057250977
        ],
        [
          37.82822612280363,
          -122.48313903808594
        ],
        [
          37.82564992009924,
          -122.48043537139893
        ]
      ];
      let leafletFG = reactFGref.leafletElement;
      leafletFG.addLayer(L.circle([37.85425428219824, -122.5437355041504],2204.9223998213497));
      leafletFG.addLayer(L.circle([37.85425428219824, -122.4437355041504],1000.5329489815679,{color:'green'}));

      leafletFG.addLayer(L.polygon(positions,{color:'green'}));*/
      let leafletGeoJSON = new L.GeoJSON(getGeoJson(),{
        pointToLayer: function(feature, latlng) {
            if (feature.properties.radius) {
                return new L.Circle(latlng, feature.properties.radius,{color:feature.properties.color});
            }
            else  
            {
              return new L.Marker(latlng);
            }
        }
      });
      let leafletFG = reactFGref.leafletElement;

      leafletGeoJSON.eachLayer( (layer) => {
        if(layer.feature.properties.radius)
        {
          layer.setRadius(layer.feature.properties.radius);
        }
        leafletFG.addLayer(layer);
      });
   }
  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc
  render() {
    return (
      <Map center={[37.8189, -122.5437355041504]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={ (reactFGref) => {this._onFeatureGroupReady(reactFGref);} }>

        </FeatureGroup>
      </Map>
    );
  }
}

//data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176

function getGeoJson() {
  return {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
            "radius":871.4620685526583,
            "color":'red'
        },
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.525282,37.83026]
        }
      },
      {
        "type": "Feature",
        "properties": {
            "radius":410.5329489815679,
            "color":'green'
        },
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.503309,37.837649]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.526398, 37.830938]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.503395, 37.836361]
            
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.521076, 37.825243] 
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
            [-122.492752, 37.827141]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.48043537139893,
                37.82564992009924
              ],
              [
                -122.48129367828368,
                37.82629397920697
              ],
              [
                -122.48240947723389,
                37.82544653184479
              ],
              [
                -122.48373985290527,
                37.82632787689904
              ],
              [
                -122.48425483703613,
                37.82680244295304
              ],
              [
                -122.48605728149415,
                37.82639567223645
              ],
              [
                -122.4898338317871,
                37.82663295542695
              ],
              [
                -122.4930953979492,
                37.82415839321614
              ],
              [
                -122.49700069427489,
                37.821887146654376
              ],
              [
                -122.4991464614868,
                37.82171764783966
              ],
              [
                -122.49850273132326,
                37.81798857543524
              ],
              [
                -122.50923156738281,
                37.82090404811055
              ],
              [
                -122.51232147216798,
                37.823344820392535
              ],
              [
                -122.50150680541992,
                37.8271414168374
              ],
              [
                -122.48743057250977,
                37.83093781796035
              ],
              [
                -122.48313903808594,
                37.82822612280363
              ],
              [
                -122.48043537139893,
                37.82564992009924
              ]
            ]
          ]
        }
      }
    ]
  }
}
