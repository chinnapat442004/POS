<script lang="ts" setup>
import 'leaflet/dist/leaflet.css'
import * as Leaflet from '@vue-leaflet/vue-leaflet'

import { LMap, LTileLayer, LMarker, LPopup, LTooltip, latLng } from '@vue-leaflet/vue-leaflet'

const zoom = 13
const center = Leaflet.latLng(47.41322, -1.219482)
const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
const withPopup = Leaflet.latLng(47.41322, -1.219482)
const withTooltip = Leaflet.latLng(47.41422, -1.250482)
const currentZoom = 11.5
const currentCenter = Leaflet.latLng(47.41322, -1.219482)
const showParagraph = false
const mapOptions = {
  zoomSnap: 0.5
}
const showMap = true

function zoomUpdate(zoom) {
  this.currentZoom = zoom
}
function centerUpdate(center) {
  this.currentCenter = center
}
function showLongText() {
  this.showParagraph = !this.showParagraph
}

function innerClick() {
  alert('Click!')
}
</script>
<template>
  <div style="height: 500px; width: 100%">
    <div style="height: 200px; overflow: auto">
      <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
      <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
      <button @click="showLongText">Toggle long popup</button>
      <button @click="showMap = !showMap">Toggle map</button>
    </div>
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut
              sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
      <l-marker :lat-lng="withTooltip">
        <l-tooltip :options="{ permanent: true, interactive: true }">
          <div @click="innerClick">
            I am a tooltip
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed pretium nisl, ut
              sagittis sapien. Sed vel sollicitudin nisi. Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>
