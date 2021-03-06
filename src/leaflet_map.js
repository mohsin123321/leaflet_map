import React, { Component } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255


//


export default class EditControlExample extends Component {

  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  _onEdited = (e) => {

    let numEdited = 0;
    e.layers.eachLayer( (layer) => {
      console.log(layer.toGeoJSON());
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);
    this._onChange();
  }

  _onPlygonClick=(e)=>{
    console.log(e);
  }
  _onCreated = (e) => {
    let type = e.layerType;
    e.feature={};
    e.feature.properties={};
    e.feature.properties.myID='asdasd';
    console.log(e.layer.toGeoJSON());
    e.layer.on('click',function(layer){
     // console.log(e);
    });
    console.log("_onCreated: something else created:", type, e);
    // Do whatever else you need to. (save to db; etc)

    this._onChange();
  }

  _onDeleted = (e) => {

    let numDeleted = 0;
    e.layers.eachLayer( (layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    this._onChange();
  }

  _onMounted = (drawControl) => {
    console.log('_onMounted', drawControl);
  }

  _onEditStart = (e) => {
    console.log('_onEditStart', e);
  }

  _onEditStop = (e) => {
    console.log('_onEditStop', e);
  }

  _onDeleteStart = (e) => {
    console.log('_onDeleteStart', e);
  }

  _onDeleteStop = (e) => {
    console.log('_onDeleteStop', e);
  }

  render() {
    return (
      <Map center={[37.8189, -122.4786]} zoom={13} >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={ (reactFGref) => {this._onFeatureGroupReady(reactFGref);} }>
            <EditControl
              position='topleft'
              onEdited={this._onEdited}
              onCreated={this._onCreated}
              onDeleted={this._onDeleted}
              onMounted={this._onMounted}
              onEditStart={this._onEditStart}
              onEditStop={this._onEditStop}
              onDeleteStart={this._onDeleteStart}
              onDeleteStop={this._onDeleteStop}
              draw={{
                rectangle: false,
                circlemarker: false,
                polyline: false,
               
                marker: true,
                polygon: {
                  shapeOptions: {
                    color: 'green'
                  }
                }
              }}
            />
        </FeatureGroup>
      </Map>
    );
  }

  _editableFG = null

  _onFeatureGroupReady = (reactFGref) => {

    // populate the leaflet FeatureGroup with the geoJson layers

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
      console.log(layer);
      if(layer.feature.properties.radius)
      {
        layer.setRadius(layer.feature.properties.radius);
      }
      leafletFG.addLayer(layer);
    });

    // store the ref for future access to content

    this._editableFG = reactFGref;
  }

  _onChange = () => {

    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API

    const { onChange } = this.props;

    if (!this._editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    
    onChange(geojsonData);
  }
}

// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176

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
                [-122.502365, 37.821311]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.538929, 37.848697]
            
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": 
                [-122.4967, 37.852899]
            
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
