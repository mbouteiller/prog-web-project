import './Map.css';

import { MapsComponent, LayersDirective, LayerDirective, Zoom, Inject } from '@syncfusion/ej2-react-maps';

function Map() {
  return (
    <div className="map-container">
      <MapsComponent id="maps"
                     centerPosition={{ latitude: 44.129,  longitude: 5.100 }}
                     zoomSettings={{ zoomFactor: 7, enable: true, toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset'] }}
                     >
        <Inject services={[Zoom]}/>
        <LayersDirective>
          <LayerDirective layerType='OSM' shapeSettings={{
            autofill: true
          }}>
          </LayerDirective>
        </LayersDirective>
      </MapsComponent>
    </div>
  );
}

export default Map;